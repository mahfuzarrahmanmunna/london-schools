"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { firebaseAuth, isFirebaseConfigured } from "@/lib/firebase"
import { fetchCurrentUser, signOutUser } from "@/lib/auth-api"

type AuthUser = {
  id: number
  name: string
  firstName: string | null
  lastName: string | null
  email: string
  role: string
}

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(
    Boolean(isFirebaseConfigured && firebaseAuth),
  )

  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      return
    }

    let unsubscribe: (() => void) | null = null
    let mounted = true

    // Safety timeout — if onAuthStateChanged doesn't fire within 5s,
    // stop loading so the user doesn't see an infinite spinner
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false)
    }, 5000)

    import("firebase/auth")
      .then(({ onAuthStateChanged }) => {
        if (!mounted || !firebaseAuth) return

        unsubscribe = onAuthStateChanged(
          firebaseAuth,
          async (firebaseUser) => {
            if (!mounted) return

            if (firebaseUser) {
              try {
                const userData = await fetchCurrentUser()
                if (!mounted) return

                if (userData) {
                  setUser(userData)
                } else {
                  // Backend session expired OR backend temporarily down.
                  // DON'T call signOutUser() — if the backend is just
                  // unreachable (not "unauthenticated"), the Firebase auth
                  // is still valid. Clear local state only; the user can
                  // retry when the backend comes back.
                  setUser(null)
                }
              } catch {
                if (!mounted) return
                // Network error, backend down, etc.
                // Don't sign out from Firebase — just clear local state.
                // User's Firebase session persists; they'll be
                // auto-restored when the backend is reachable again.
                setUser(null)
              }
            } else {
              // Firebase says: not signed in
              setUser(null)
            }
            setLoading(false)
          }
        )
      })
      .catch((error) => {
        console.error("[Auth] Failed to load Firebase auth module:", error)
        if (mounted) setLoading(false)
      })

    // ✅ This return IS from useEffect — React calls it on unmount
    return () => {
      mounted = false
      clearTimeout(timeout)
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const signOut = async () => {
    await signOutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}