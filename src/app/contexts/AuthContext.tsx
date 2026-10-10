"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { onAuthStateChanged } from "firebase/auth"
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

    unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!mounted) return

      if (firebaseUser) {
        try {
          const userData = await fetchCurrentUser()
          if (!mounted) return

          if (userData) {
            setUser(userData)
          } else {
            // Backend session expired or backend temporarily down.
            // Keep Firebase auth intact so the user can retry later.
            setUser(null)
          }
        } catch {
          if (!mounted) return
          setUser(null)
        }
      } else {
        // Firebase says: not signed in
        setUser(null)
      }
      setLoading(false)
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
