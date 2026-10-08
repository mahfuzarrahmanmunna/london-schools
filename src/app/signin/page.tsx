"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import {
  GraduationCap,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Fingerprint,
  Globe,
  ChevronRight,
} from "lucide-react"
import {
  checkEmail,
  authenticateUser,
  resetPassword,
  friendlyAuthError,
} from "@/lib/auth-api"
import { useAuth } from "../contexts/AuthContext"

/* ─── State machine ──────────────────────────────────── */
type AuthStep = "email" | "checking" | "signin" | "signup" | "authenticating"

/* ─── Password Strength ───────────────────────────────── */
function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "" }
  let score = 0
  if (pw.length >= 6) score++
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 1) return { score: 1, label: "Weak", color: "#EF4444" }
  if (score <= 2) return { score: 2, label: "Fair", color: "#F59E0B" }
  if (score <= 3) return { score: 3, label: "Good", color: "#0B73B9" }
  return { score: 4, label: "Strong", color: "#0F766E" }
}

/* ─── Component ──────────────────────────────────────── */

export default function AuthPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const pageRef = useRef<HTMLDivElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<AuthStep>("email")
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState("")
  const [info, setInfo] = useState("")

  /* ── Redirect if already authenticated ── */
  useEffect(() => {
    if (!authLoading && user) router.push("/dashboard")
  }, [user, authLoading, router])

  /* ── Page entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".auth-left", {
        opacity: 0, x: -50, duration: 1, ease: "power3.out",
      })
      gsap.from(".auth-right", {
        opacity: 0, x: 50, duration: 1, ease: "power3.out", delay: 0.15,
      })
      gsap.from(".auth-card-item", {
        opacity: 0, y: 24, duration: 0.6, stagger: 0.07,
        ease: "power3.out", delay: 0.4,
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* ── Step transition animation ── */
  useEffect(() => {
    if (step === "email" || step === "checking" || step === "authenticating") return
    const ctx = gsap.context(() => {
      gsap.fromTo(".auth-step-heading",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      )
      gsap.fromTo(".auth-dynamic-field",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
          ease: "power2.out", delay: 0.05 }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [step])

  /* ── Auto-focus on step change ── */
  useEffect(() => {
    if (step === "signin") setTimeout(() => passwordRef.current?.focus(), 350)
    else if (step === "signup") setTimeout(() => nameRef.current?.focus(), 350)
  }, [step])

  const normalizeEmail = (e: string) => e.trim().toLowerCase()
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const getHeading = () => {
    switch (step) {
      case "signin": return "Welcome back"
      case "signup": return "Create your account"
      case "checking": return "Checking..."
      case "authenticating": return authMode === "signin" ? "Signing in..." : "Creating account..."
      default: return "Sign in to LSHS"
    }
  }

  const getSubtext = () => {
    switch (step) {
      case "signin": return "Enter your password to access the CRM dashboard."
      case "signup": return "Set up your credentials to get started."
      case "checking": return "Looking up your email..."
      case "authenticating":
        return authMode === "signin" ? "Verifying your credentials..." : "Setting up your workspace..."
      default: return "Enter your email to continue."
    }
  }

  const getButtonText = () => {
    switch (step) {
      case "checking": return "Checking..."
      case "signin": return "Sign In"
      case "signup": return "Create Account"
      case "authenticating":
        return authMode === "signin" ? "Signing in..." : "Creating account..."
      default: return "Continue"
    }
  }

  const isLoading = step === "checking" || step === "authenticating"

  const handleBackToEmail = () => {
    setStep("email")
    setPassword("")
    setConfirmPassword("")
    setName("")
    setError("")
    setInfo("")
  }

  const handleForgotPassword = async () => {
    setError("")
    setInfo("")
    if (!isValidEmail(email)) {
      setError("Please enter a valid email first.")
      return
    }
    try {
      await resetPassword(normalizeEmail(email))
      setInfo("Password reset email sent. Check your inbox.")
    } catch (err) {
      setError(friendlyAuthError(err))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setInfo("")

    if (step === "email") {
      if (!isValidEmail(email)) {
        setError("Please enter a valid email address.")
        return
      }
      setStep("checking")
      try {
        const result = await checkEmail(normalizeEmail(email))
        if (result.exists) {
          setAuthMode("signin")
          setStep("signin")
        } else {
          setAuthMode("signup")
          setStep("signup")
        }
      } catch (err) {
        setError(friendlyAuthError(err))
        setStep("email")
      }
      return
    }

    if (step === "signin") {
      if (password.length < 6) {
        setError("Password must be at least 6 characters.")
        return
      }
      setStep("authenticating")
      try {
        await authenticateUser("signin", normalizeEmail(email), password)
        router.push("/dashboard")
      } catch (err) {
        setError(friendlyAuthError(err))
        setStep("signin")
      }
      return
    }

    if (step === "signup") {
      if (!name.trim() || name.trim().length < 2) {
        setError("Please enter your full name.")
        return
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.")
        return
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.")
        return
      }
      setStep("authenticating")
      try {
        await authenticateUser("signup", normalizeEmail(email), password, name.trim())
        router.push("/dashboard")
      } catch (err) {
        setError(friendlyAuthError(err))
        setStep("signup")
      }
      return
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#001B30]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0B73B9]/10 flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-[#0B73B9]" />
          </div>
          <p className="text-sm text-white/40">Loading workspace...</p>
        </div>
      </div>
    )
  }

  const pwStrength = getPasswordStrength(password)

  return (
    <div ref={pageRef} className="min-h-screen flex bg-[#001B30] overflow-hidden">

      {/* ═══════════════════════════════════════════════════
          LEFT PANEL — Immersive Branding
          ═══════════════════════════════════════════════════ */}
      <div className="auth-left hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 xl:p-16">

        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001B30] via-[#001B30] to-[#0a2d4a]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,115,185,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,115,185,0.03)_1px,transparent_1px)] bg-size-[48px_48px] pointer-events-none" />

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px] bg-[#0B73B9] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px] bg-[#f4d210] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[80px] bg-[#0B73B9] pointer-events-none" />

        {/* Decorative corner lines */}
        <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-[#0B73B9]/20 rounded-tl-xl pointer-events-none" />
        <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-[#f4d210]/15 rounded-br-xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B73B9] to-[#085C92] flex items-center justify-center shadow-lg shadow-[#0B73B9]/20">
            <GraduationCap size={24} className="text-white" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-lg font-bold text-white tracking-tight">LSHS</p>
            <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-semibold">CRM Platform</p>
          </div>
        </div>

        {/* Central Content */}
        <div className="relative z-10 max-w-lg">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#f4d210]/20 bg-[#f4d210]/5 mb-8">
            <Zap size={12} className="text-[#f4d210]" />
            <span className="text-[11px] font-semibold text-[#f4d210] tracking-wide uppercase">Intelligent CRM</span>
          </div>

          <h1
            className="text-4xl xl:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Every lead,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B73B9] to-[#f4d210]">
              perfectly tracked.
            </span>
          </h1>

          <p className="text-white/40 text-[15px] leading-relaxed mb-12 max-w-md">
            Monitor conversations, automate follow-ups, and convert leads into enrolled students — all from one unified workspace.
          </p>

          {/* Feature Cards */}
          <div className="space-y-4">
            {[
              { icon: TrendingUp, title: "Visual Pipeline", desc: "Track every lead from first contact to enrolment", accent: "#0B73B9" },
              { icon: Users, title: "Team Workspace", desc: "Assign leads, share notes, and collaborate in real time", accent: "#0B73B9" },
              { icon: Shield, title: "Secure Infrastructure", desc: "Enterprise-grade auth and data protection via Firebase", accent: "#f4d210" },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${f.accent}10`,
                      border: `1px solid ${f.accent}25`,
                    }}
                  >
                    <Icon size={18} style={{ color: f.accent }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white mb-0.5">{f.title}</p>
                    <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-white/15 group-hover:text-white/30 transition-colors flex-shrink-0" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between">
          <p className="text-[11px] text-white/20">
            © {new Date().getFullYear()} London School of Higher Studies
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-white/20">
            <Globe size={11} />
            <span>UK & Bangladesh</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          RIGHT PANEL — Auth Form
          ═══════════════════════════════════════════════════ */}
      <div className="auth-right flex-1 flex items-center justify-center p-6 sm:p-10 relative">
        {/* Mobile ambient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001B30] via-[#001B30] to-[#0a2d4a] lg:hidden" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.06] blur-[100px] bg-[#0B73B9] pointer-events-none lg:hidden" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-[0.04] blur-[80px] bg-[#f4d210] pointer-events-none lg:hidden" />

        <div className="w-full max-w-[420px] relative z-10">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B73B9] to-[#085C92] flex items-center justify-center shadow-lg shadow-[#0B73B9]/20">
              <GraduationCap size={22} className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-base font-bold text-white tracking-tight">LSHS CRM</p>
              <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-semibold">Platform</p>
            </div>
          </div>

          {/* Auth Card */}
          <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-7 sm:p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">

            {/* ── Step indicator bar ── */}
            <div className="auth-card-item flex items-center gap-2 mb-7">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step === "email" || step === "checking" ? "bg-[#0B73B9]" : "bg-[#0B73B9]/40"}`} />
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step === "signin" || step === "signup" ? "bg-[#0B73B9]" : "bg-white/10"}`} />
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step === "authenticating" ? "bg-[#0B73B9]" : "bg-white/10"}`} />
              </div>
              <div className="flex-1" />
              {(step === "signin" || step === "signup") && (
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-white/30 hover:text-white/60 transition-colors disabled:opacity-40"
                >
                  <ArrowLeft size={11} /> Back
                </button>
              )}
            </div>

            {/* Heading + subtext */}
            <div key={step} className="auth-step-heading auth-card-item mb-7">
              <h2
                className="text-2xl font-bold text-white tracking-tight mb-1.5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {getHeading()}
              </h2>
              <p className="text-sm text-white/35 leading-relaxed">{getSubtext()}</p>
            </div>

            {/* Info badge */}
            {info && !error && (
              <div className="auth-card-item mb-5 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#0F766E]/10 border border-[#0F766E]/20 text-sm text-[#5EEAD4]">
                <CheckCircle2 size={15} className="flex-shrink-0" />
                <span>{info}</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="auth-card-item mb-5 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-500/8 border border-red-500/15 text-sm text-red-400">
                <AlertCircle size={15} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ── Email field ── */}
              <div className="auth-card-item">
                {step === "email" || step === "checking" ? (
                  <>
                    <label className="block text-[11px] font-semibold text-white/40 mb-2 uppercase tracking-wider">
                      Email address
                    </label>
                    <div className="relative group">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#0B73B9] transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        autoComplete="email"
                        disabled={step === "checking"}
                        autoFocus
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/15 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20 focus:border-[#0B73B9]/40 focus:bg-white/[0.06] transition-all disabled:opacity-40"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5">
                    <div className="min-w-0 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0B73B9]/10 flex items-center justify-center flex-shrink-0">
                        <Mail size={14} className="text-[#0B73B9]" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[9px] font-semibold text-white/30 uppercase tracking-wider mb-0.5">
                          Email
                        </span>
                        <p className="text-sm text-white truncate">{email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      disabled={isLoading}
                      className="text-[11px] font-semibold text-[#0B73B9] hover:text-[#f4d210] transition-colors disabled:opacity-40 flex-shrink-0 ml-3"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>

              {/* ── Dynamic fields ── */}
              <div className="auth-dynamic-field">

                {/* Sign in: password */}
                {step === "signin" && (
                  <div>
                    <label className="block text-[11px] font-semibold text-white/40 mb-2 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#0B73B9] transition-colors" />
                      <input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-12 py-3.5 text-sm text-white placeholder-white/15 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20 focus:border-[#0B73B9]/40 focus:bg-white/[0.06] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Sign up: name + passwords */}
                {step === "signup" && (
                  <>
                    {/* Name */}
                    <div className="mb-5">
                      <label className="block text-[11px] font-semibold text-white/40 mb-2 uppercase tracking-wider">
                        Full name
                      </label>
                      <div className="relative group">
                        <UserIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#0B73B9] transition-colors" />
                        <input
                          ref={nameRef}
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Anderson"
                          autoComplete="name"
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/15 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20 focus:border-[#0B73B9]/40 focus:bg-white/[0.06] transition-all"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                      <label className="block text-[11px] font-semibold text-white/40 mb-2 uppercase tracking-wider">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#0B73B9] transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Minimum 6 characters"
                          autoComplete="new-password"
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-12 py-3.5 text-sm text-white placeholder-white/15 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20 focus:border-[#0B73B9]/40 focus:bg-white/[0.06] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>

                      {/* Password strength indicator */}
                      {password.length > 0 && (
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <div className="flex-1 flex gap-1">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className="h-1 flex-1 rounded-full transition-all duration-300"
                                style={{
                                  backgroundColor: pwStrength.score >= level
                                    ? pwStrength.color
                                    : "rgba(255,255,255,0.06)",
                                }}
                              />
                            ))}
                          </div>
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300"
                            style={{ color: pwStrength.color }}
                          >
                            {pwStrength.label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-[11px] font-semibold text-white/40 mb-2 uppercase tracking-wider">
                        Confirm password
                      </label>
                      <div className="relative group">
                        <Fingerprint size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#0B73B9] transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter your password"
                          autoComplete="new-password"
                          className={`w-full bg-white/[0.04] border rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/15 focus:outline-none focus:ring-2 transition-all ${
                            confirmPassword && password !== confirmPassword
                              ? "border-red-500/30 focus:ring-red-500/20 focus:bg-red-500/[0.02]"
                              : "border-white/[0.08] focus:ring-[#0B73B9]/20 focus:border-[#0B73B9]/40 focus:bg-white/[0.06]"
                          }`}
                        />
                      </div>
                      {confirmPassword && password !== confirmPassword && (
                        <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={11} /> Passwords do not match
                        </p>
                      )}
                      {confirmPassword && password === confirmPassword && password.length >= 6 && (
                        <p className="text-[11px] text-[#0F766E] mt-1.5 flex items-center gap-1">
                          <CheckCircle2 size={11} /> Passwords match
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* ── Forgot password ── */}
              {step === "signin" && (
                <div className="auth-dynamic-field flex justify-end -mt-1">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-medium text-white/30 hover:text-[#0B73B9] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* ── Submit button ── */}
              <div className="auth-card-item pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-[#0B73B9] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#085C92] hover:shadow-xl hover:shadow-[#0B73B9]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{getButtonText()}</span>
                    </>
                  ) : (
                    <>
                      <span>{getButtonText()}</span>
                      <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* ── Divider + helper text ── */}
            {step === "email" && (
              <div className="auth-card-item mt-6 pt-5 border-t border-white/[0.05]">
                <p className="text-center text-xs text-white/25 leading-relaxed">
                  New to LSHS? Enter your email to create an account automatically.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-white/15 mt-6 leading-relaxed max-w-xs mx-auto">
            By continuing, you agree to LSHS&apos;s terms of service and acknowledge our privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}