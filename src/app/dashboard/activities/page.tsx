"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useQuery, useQueryClient } from "@tanstack/react-query" // Added useQueryClient
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Phone,
  Mail,
  MessageSquare,
  Users,
  FileText,
  ArrowRight,
  TrendingUp,
  UserCheck,
  MoreHorizontal,
  Search,
  X,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Calendar,
  Activity as ActivityIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { fetchApi, leadsApiUrl } from "../api"
// Import your socket getter (adjust path if needed)
import { getSocket } from "@/lib/socket-client"

gsap.registerPlugin(ScrollTrigger)

/* ─── Types ──────────────────────────────────────────── */

type Activity = {
  id: number
  type: string
  result: string | null
  description: string | null
  durationSeconds: number | null
  metadata: string | null
  createdAt: string
  user: {
    id: number
    name: string
    firstName: string | null
    lastName: string | null
  } | null
  lead: {
    id: number
    firstName: string
    lastName: string | null
    email: string | null
    phone: string | null
    stage: string
    status: string
  }
}

type ActivityStats = {
  totalAll: number
  todayCount: number
  callsToday: number
  emailsToday: number
  meetingsToday: number
  byType: { type: string; count: number }[]
}

type ActivitiesResponse = {
  success: boolean
  data: Activity[]
  pagination: { page: number; limit: number; total: number; totalPages: number }
  stats: ActivityStats
}

/* ─── Visual Maps (match dashboard) ─────────────────── */

const activityIcons: Record<string, LucideIcon> = {
  CALL: Phone,
  WHATSAPP: MessageSquare,
  EMAIL: Mail,
  SMS: MessageSquare,
  MEETING: Users,
  NOTE: FileText,
  STATUS_CHANGE: ArrowRight,
  STAGE_CHANGE: TrendingUp,
  ASSIGNMENT: UserCheck,
  OTHER: MoreHorizontal,
}

const activityColors: Record<string, string> = {
  CALL: "bg-[#0B73B9]/10 text-[#0B73B9]",
  WHATSAPP: "bg-green-100 text-green-600",
  EMAIL: "bg-purple-100 text-purple-600",
  SMS: "bg-blue-100 text-blue-600",
  MEETING: "bg-indigo-100 text-indigo-600",
  NOTE: "bg-slate-100 text-slate-600",
  STATUS_CHANGE: "bg-amber-100 text-amber-600",
  STAGE_CHANGE: "bg-teal-100 text-teal-600",
  ASSIGNMENT: "bg-orange-100 text-orange-600",
  OTHER: "bg-slate-100 text-slate-500",
}

const resultColors: Record<string, string> = {
  CONNECTED: "bg-green-50 text-green-700 border-green-200",
  NO_RESPONSE: "bg-slate-50 text-slate-600 border-slate-200",
  RESPONDED: "bg-blue-50 text-blue-700 border-blue-200",
  INVALID: "bg-red-50 text-red-700 border-red-200",
  PROVIDED_INFORMATION: "bg-teal-50 text-teal-700 border-teal-200",
  OTHER: "bg-slate-50 text-slate-600 border-slate-200",
}

const stageColors: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  INITIAL_CONTACT: "bg-cyan-50 text-cyan-700 border-cyan-200",
  FOLLOW_UP: "bg-teal-50 text-teal-700 border-teal-200",
  QUALIFIED: "bg-amber-50 text-amber-700 border-amber-200",
  INTERESTED: "bg-orange-50 text-orange-700 border-orange-200",
  APPLICATION: "bg-purple-50 text-purple-700 border-purple-200",
  BOOKING: "bg-indigo-50 text-indigo-700 border-indigo-200",
  WON: "bg-emerald-50 text-emerald-700 border-emerald-200",
  LOST: "bg-red-50 text-red-700 border-red-200",
}

const filterTypes = [
  { value: "ALL", label: "All", icon: ActivityIcon },
  { value: "CALL", label: "Calls", icon: Phone },
  { value: "WHATSAPP", label: "WhatsApp", icon: MessageSquare },
  { value: "EMAIL", label: "Emails", icon: Mail },
  { value: "MEETING", label: "Meetings", icon: Users },
  { value: "NOTE", label: "Notes", icon: FileText },
  { value: "STAGE_CHANGE", label: "Stage Changes", icon: TrendingUp },
  { value: "STATUS_CHANGE", label: "Status Changes", icon: ArrowRight },
  { value: "ASSIGNMENT", label: "Assignments", icon: UserCheck },
]

/* ─── Helpers ────────────────────────────────────────── */

const formatEnum = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

const formatTimeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / (1000 * 60))
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
}

const formatDateTime = (date: string) =>
  new Date(date).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })

const formatDuration = (seconds: number | null) => {
  if (!seconds) return null
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}

const getUserInitials = (user: Activity["user"]) => {
  if (!user) return "SY"
  const name = user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim()
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
}

const getLeadName = (lead: Activity["lead"]) =>
  [lead.firstName, lead.lastName].filter(Boolean).join(" ")

/* ─── Main Component ─────────────────────────────────── */

export default function ActivitiesPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient() // Initialize query client
  const [page, setPage] = useState(1)
  const [type, setType] = useState("ALL")
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const limit = 20

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchInput])

  // ─── Socket.IO Real-time Listener ───
  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    // Listen for new activities broadcasted from backend
    const handleNewActivity = () => {
      // Invalidate the activities query to trigger an instant refetch
      queryClient.invalidateQueries({ queryKey: ["activities"] })
    }

    socket.on("activity:new", handleNewActivity)

    return () => {
      socket.off("activity:new", handleNewActivity)
    }
  }, [queryClient])

  // Build query string
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    type,
  })
  if (search) queryParams.set("search", search)

  // Fetch activities
  const activitiesQuery = useQuery({
    queryKey: ["activities", { page, limit, type, search }],
    queryFn: () =>
      fetchApi<ActivitiesResponse>(`${leadsApiUrl}/activities?${queryParams.toString()}`),
    // refetchInterval: 30_000, // Removed polling, now relies on socket events
  })

  const activities = activitiesQuery.data?.data ?? []
  const stats = activitiesQuery.data?.stats
  const pagination = activitiesQuery.data?.pagination
  const loading = activitiesQuery.isLoading
  const error = activitiesQuery.error instanceof Error
    ? activitiesQuery.error.message
    : activitiesQuery.isError
    ? "Unable to load activities."
    : ""

  /* ── GSAP animations ── */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    const ctx = gsap.context(() => {
      gsap.from(".act-header", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
      gsap.from(".act-kpi", { opacity: 0, y: 25, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.15 })
      gsap.from(".act-filter", { opacity: 0, y: 20, duration: 0.5, ease: "power3.out", delay: 0.25 })

      const items = gsap.utils.toArray<HTMLElement>(".act-timeline-item")
      items.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: -20,
          duration: 0.4,
          delay: i * 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 95%", once: true },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [activities])

  const resetFilters = () => {
    setType("ALL")
    setSearchInput("")
    setSearch("")
    setPage(1)
  }

  const hasActiveFilters = type !== "ALL" || search !== ""

  const kpiData = [
    {
      label: "Total Activities",
      value: (stats?.totalAll ?? 0).toLocaleString(),
      icon: ActivityIcon,
      color: "#0B73B9",
    },
    {
      label: "Today's Activities",
      value: (stats?.todayCount ?? 0).toLocaleString(),
      icon: Calendar,
      color: "#f4d210",
    },
    {
      label: "Calls Today",
      value: (stats?.callsToday ?? 0).toLocaleString(),
      icon: Phone,
      color: "#22c55e",
    },
    {
      label: "Meetings Today",
      value: (stats?.meetingsToday ?? 0).toLocaleString(),
      icon: Users,
      color: "#A855F7",
    },
  ]

  return (
    <div ref={pageRef} className="space-y-6">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <div className="act-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-6 bg-[#0B73B9] rounded-full" />
            <h1
              className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Activities
            </h1>
          </div>
          <p className="text-sm text-slate-400 ml-4">
            Track all interactions across your leads
          </p>
        </div>
      </div>

      {/* ═══════════════════ KPI CARDS ═══════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="act-kpi group relative bg-white rounded-xl border border-slate-100 p-4 md:p-5 hover:shadow-lg hover:border-slate-200 transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: kpi.color }}
              />
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${kpi.color}10`,
                    border: `1px solid ${kpi.color}20`,
                  }}
                >
                  <Icon size={17} strokeWidth={1.5} style={{ color: kpi.color }} />
                </div>
              </div>
              <p className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-none mb-1">
                {kpi.value}
              </p>
              <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                {kpi.label}
              </p>
            </div>
          )
        })}
      </div>

      {/* ═══════════════════ FILTER BAR ═══════════════════ */}
      <div className="act-filter bg-white rounded-xl border border-slate-100 p-4 md:p-5">
        {/* Type pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {filterTypes.map((ft) => {
            const Icon = ft.icon
            const active = type === ft.value
            return (
              <button
                key={ft.value}
                onClick={() => { setType(ft.value); setPage(1) }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[#0B73B9] text-white shadow-sm shadow-[#0B73B9]/20"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-slate-100"
                }`}
              >
                <Icon size={13} strokeWidth={2} />
                {ft.label}
              </button>
            )
          })}
        </div>

        {/* Search + clear */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by lead name, email, phone, or description..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20 focus:border-[#0B73B9]/40 transition-all"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              <X size={14} /> Clear Filters
            </button>
          )}

          <p className="text-xs text-slate-400 ml-auto">
            Showing{" "}
            <span className="font-bold text-slate-600">
              {pagination?.total ?? 0}
            </span>{" "}
            {pagination?.total === 1 ? "activity" : "activities"}
          </p>
        </div>
      </div>

      {/* ═══════════════════ ERROR ═══════════════════ */}
      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span className="flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </span>
          <button
            onClick={() => void activitiesQuery.refetch()}
            className="font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* ═══════════════════ TIMELINE ═══════════════════ */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#f4d210] rounded-full" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Activity Timeline
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {pagination ? `${pagination.total} total` : ""}
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-sm text-slate-400">
            <Loader2 size={20} className="inline animate-spin mb-2" />
            <p>Loading activities…</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && activities.length === 0 && !error && (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Search size={22} className="text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-600 mb-1">
              No activities found
            </p>
            <p className="text-xs text-slate-400">
              {hasActiveFilters
                ? "Try adjusting your filters or search terms"
                : "Activities will appear here as your team interacts with leads"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="mt-4 text-xs font-semibold text-[#0B73B9] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Timeline items */}
        {!loading && activities.length > 0 && (
          <div className="px-6 md:px-8 py-6">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-100" />

              {activities.map((act) => {
                const Icon = activityIcons[act.type] || MoreHorizontal
                const leadName = getLeadName(act.lead)

                return (
                  <div
                    key={act.id}
                    className="act-timeline-item relative flex gap-4 pb-6 last:pb-0"
                  >
                    {/* Icon */}
                    <div
                      className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activityColors[act.type] || activityColors.OTHER
                      }`}
                    >
                      <Icon size={15} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      {/* Top row: type + result + duration + time */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                          {formatEnum(act.type)}
                        </span>

                        {act.result && (
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[9px] font-bold ${
                              resultColors[act.result] || resultColors.OTHER
                            }`}
                          >
                            {formatEnum(act.result)}
                          </span>
                        )}

                        {act.durationSeconds && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <Clock size={10} /> {formatDuration(act.durationSeconds)}
                          </span>
                        )}

                        <span className="text-[10px] text-slate-300 ml-auto">
                          {formatTimeAgo(act.createdAt)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">
                        {act.description || "Activity recorded"}
                      </p>

                      {/* Bottom row: lead link + user */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Lead */}
                        <Link
                          href={`/dashboard/leads/${act.lead.id}`}
                          className="flex items-center gap-2 group/lead"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-bold text-slate-500">
                              {act.lead.firstName?.[0] ?? ""}
                              {act.lead.lastName?.[0] ?? ""}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-slate-700 group-hover/lead:text-[#0B73B9] transition-colors">
                            {leadName}
                          </span>
                        </Link>

                        {/* Lead stage badge */}
                        {act.lead.stage && (
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[9px] font-bold ${
                              stageColors[act.lead.stage] || ""
                            }`}
                          >
                            {formatEnum(act.lead.stage)}
                          </span>
                        )}

                        <span className="text-slate-300 text-[10px]">·</span>

                        {/* User */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0B73B9] to-[#085C92] flex items-center justify-center">
                            <span className="text-[8px] font-bold text-white">
                              {getUserInitials(act.user)}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {act.user?.name ?? "System"}
                          </span>
                        </div>

                        {/* Full timestamp (right-aligned) */}
                        <span className="text-[10px] text-slate-300 ml-auto hidden sm:block">
                          {formatDateTime(act.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination && pagination.total > 0 && (
          <div className="px-6 md:px-8 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-600">
                {(pagination.page - 1) * limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-600">
                {Math.min(pagination.page * limit, pagination.total)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-600">
                {pagination.total}
              </span>{" "}
              activities
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(1, pagination.page - 1))}
                disabled={pagination.page === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from(
                { length: Math.min(pagination.totalPages, 7) },
                (_, i) => {
                  let pageNum: number
                  if (pagination.totalPages <= 7) {
                    pageNum = i + 1
                  } else if (pagination.page <= 4) {
                    pageNum = i + 1
                  } else if (pagination.page >= pagination.totalPages - 3) {
                    pageNum = pagination.totalPages - 6 + i
                  } else {
                    pageNum = pagination.page - 3 + i
                  }
                  return pageNum
                }
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    pagination.page === pageNum
                      ? "bg-[#0B73B9] text-white border border-[#0B73B9]"
                      : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() =>
                  setPage(Math.min(pagination.totalPages, pagination.page + 1))
                }
                disabled={pagination.page === pagination.totalPages}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}