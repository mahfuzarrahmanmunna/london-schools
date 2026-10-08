// src/lib/firebase.ts
// Defensive Firebase initialization — won't crash the site if env vars are missing

import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

/* Check if all critical values are actually set (not undefined, not empty string) */
const isSet = (val: string | undefined): val is string =>
  typeof val === "string" && val.length > 0 && val !== "undefined"

export const isFirebaseConfigured =
  isSet(firebaseConfig.apiKey) &&
  isSet(firebaseConfig.authDomain) &&
  isSet(firebaseConfig.projectId) &&
  isSet(firebaseConfig.appId)

/* Only initialize if configured — prevents the crash */
let firebaseAuth: Auth | null = null

if (isFirebaseConfigured) {
  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
    firebaseAuth = getAuth(app)
  } catch (error) {
    console.error("[Firebase] Initialization error:", error)
  }
} else {
  console.warn(
    "\n[Firebase] NOT CONFIGURED — auth features disabled.\n" +
    "Create .env.local at your project root (same folder as package.json) with:\n\n" +
    "NEXT_PUBLIC_FIREBASE_API_KEY=AIza...\n" +
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com\n" +
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx\n" +
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com\n" +
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx\n" +
    "NEXT_PUBLIC_FIREBASE_APP_ID=1:xxx:web:xxx\n\n" +
    "Then: stop server → rm -rf .next → npm run dev\n"
  )
  console.table({
    apiKey: isSet(firebaseConfig.apiKey) ? "✓ SET" : "✗ MISSING",
    authDomain: isSet(firebaseConfig.authDomain) ? "✓ SET" : "✗ MISSING",
    projectId: isSet(firebaseConfig.projectId) ? "✓ SET" : "✗ MISSING",
    storageBucket: isSet(firebaseConfig.storageBucket) ? "✓ SET" : "✗ MISSING",
    messagingSenderId: isSet(firebaseConfig.messagingSenderId) ? "✓ SET" : "✗ MISSING",
    appId: isSet(firebaseConfig.appId) ? "✓ SET" : "✗ MISSING",
  })
}

export { firebaseAuth }
export default firebaseAuth