// src/lib/auth-api.ts

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
} from "firebase/auth"
import { firebaseAuth, isFirebaseConfigured } from "./firebase"
import { apiUrl } from "../app/dashboard/api"

type AuthUser = {
  id: number
  name: string
  firstName: string | null
  lastName: string | null
  email: string
  role: string
}

/* ─── CHECK EMAIL ──────────────────────────────────────
   Asks backend if email belongs to an existing user.
   Backend checks PostgreSQL (not Firebase) — the DB is
   the source of truth for CRM users.                       */
export async function checkEmail(
  email: string
): Promise<{ exists: boolean; next: "signin" | "signup" }> {
  let response: Response
  try {
    response = await fetch(`${apiUrl}/auth/check-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    })
  } catch {
    throw new Error(
      "Cannot connect to the server. Make sure the backend is running on http://localhost:5000"
    )
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || "Unable to check this email.")
  }
  return result.data
}

/* ─── AUTHENTICATE ─────────────────────────────────────
   Firebase auth → backend session creation.
   Includes fallback: if signup fails with "email-already-in-use"
   (previous attempt created Firebase account but backend failed),
   automatically falls back to sign-in.                       */
export async function authenticateUser(
  mode: "signin" | "signup",
  email: string,
  password: string,
  name?: string
): Promise<AuthUser> {
  if (!isFirebaseConfigured || !firebaseAuth) {
    throw new Error(
      "Firebase is not configured. Check your .env.local file and restart the dev server."
    )
  }

  // Step 1: Firebase auth
  let credential
  try {
    if (mode === "signup") {
      credential = await createUserWithEmailAndPassword(
        firebaseAuth, email, password
      )
      if (name) {
        await updateProfile(credential.user, { displayName: name })
      }
    } else {
      credential = await signInWithEmailAndPassword(
        firebaseAuth, email, password
      )
    }
  } catch (error) {
    // Recovery: if signup says "email already in use", the Firebase
    // account exists from a previous attempt — try signing in instead
    if (
      mode === "signup" &&
      error instanceof Error &&
      error.message.includes("email-already-in-use")
    ) {
      try {
        credential = await signInWithEmailAndPassword(
          firebaseAuth, email, password
        )
      } catch {
        // Sign-in also failed — re-throw the original error
        throw error
      }
    } else {
      throw error
    }
  }

  // Step 2: Get Firebase ID token
  const idToken = await credential.user.getIdToken()

  // Step 3: Send to backend → creates/finds user + sets httpOnly cookie
  const endpoint = mode === "signup" ? "/auth/signup" : "/auth/signin"
  let response: Response
  try {
    response = await fetch(`${apiUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idToken, name }),
    })
  } catch {
    // Backend unreachable — sign out from Firebase to allow retry
    await firebaseSignOut(firebaseAuth)
    throw new Error(
      "Cannot connect to the server. Make sure the backend is running on http://localhost:5000"
    )
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || "Authentication failed")
  }

  return result.data as AuthUser
}

/* ─── FETCH CURRENT USER ────────────────────────────── */
export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const response = await fetch(`${apiUrl}/auth/me`, {
      credentials: "include",
    })
    if (!response.ok) return null
    const result = await response.json()
    if (!result.success) return null
    return result.data as AuthUser
  } catch {
    return null
  }
}

/* ─── SIGN OUT ──────────────────────────────────────── */
export async function signOutUser(): Promise<void> {
  if (firebaseAuth) {
    try { await firebaseSignOut(firebaseAuth) } catch {}
  }
  try {
    await fetch(`${apiUrl}/auth/signout`, {
      method: "POST",
      credentials: "include",
    })
  } catch {}
}

/* ─── RESET PASSWORD ────────────────────────────────── */
export async function resetPassword(email: string): Promise<void> {
  if (!firebaseAuth) {
    throw new Error("Firebase is not configured.")
  }
  await sendPasswordResetEmail(firebaseAuth, email)
}

/* ─── ERROR TRANSLATION ─────────────────────────────── */
export function friendlyAuthError(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error)

  if (msg.includes("operation-not-allowed"))
    return "Email/Password authentication is not enabled in Firebase Console."
  if (msg.includes("email-already-in-use"))
    return "An account with this email already exists."
  if (msg.includes("wrong-password") || msg.includes("invalid-credential"))
    return "Incorrect email or password."
  if (msg.includes("user-not-found"))
    return "No account found with this email."
  if (msg.includes("weak-password"))
    return "Password is too weak. Use at least 6 characters."
  if (msg.includes("too-many-requests"))
    return "Too many attempts. Please try again later."
  if (msg.includes("invalid-email"))
    return "Please enter a valid email address."
  if (msg.includes("network") || msg.includes("fetch"))
    return "Network error. Please check your connection."
  if (msg.includes("Cannot connect to the server"))
    return msg
  if (msg.includes("Firebase is not configured"))
    return "Firebase is not configured. Check your .env.local file and restart."

  return msg
}