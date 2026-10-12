"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  X,
  Check,
  CheckCheck,
  UserPlus,
  TrendingUp,
  Clock,
  Calendar,
  MessageSquare,
  Settings,
  ChevronRight,
  Loader2,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useNotifications } from "@/contexts/NotificationContext"
import type { NotificationData } from "@/lib/socket-client"

/* ─── Type metadata (icons + colors) ─── */

const typeMeta: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  LEAD_ASSIGNED: { icon: UserPlus, color: "#0B73B9", bg: "bg-[#0B73B9]/10" },
  LEAD_UPDATED: { icon: TrendingUp, color: "#085C92", bg: "bg-[#085C92]/10" },
  TASK_ASSIGNED: { icon: Check, color: "#22c55e", bg: "bg-green-100" },
  TASK_REMINDER: { icon: Clock, color: "#f4d210", bg: "bg-[#f4d210]/10" },
  MEETING_REMINDER: { icon: Calendar, color: "#A855F7", bg: "bg-purple-100" },
  NEW_MESSAGE: { icon: MessageSquare, color: "#6366F1", bg: "bg-indigo-100" },
  SYSTEM: { icon: Settings, color: "#64748b", bg: "bg-slate-100" },
}

const formatTimeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
}

/* ─── Component ─── */

export function NotificationBell() {
  const router = useRouter()
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotifications()
  const [open, setOpen] = useState(false)
  const [markingAll, setMarkingAll] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const bellRef = useRef<HTMLButtonElement>(null)

  // Close on click outside
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [open])

  const handleNotificationClick = async (notif: NotificationData) => {
    if (!notif.isRead) {
      await markAsRead(notif.id)
    }
    setOpen(false)
    if (notif.link) {
      router.push(notif.link)
    }
  }

  const handleMarkAll = async () => {
    setMarkingAll(true)
    await markAllAsRead()
    setMarkingAll(false)
  }

  const displayCount = unreadCount > 99 ? "99+" : String(unreadCount)

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        ref={bellRef}
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors duration-200"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        aria-expanded={open}
      >
        <Bell size={16} strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#f4d210] text-[#001B30] text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
            {displayCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-[360px] sm:w-[380px] bg-white rounded-xl border border-slate-200 shadow-2xl z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#0B73B9] rounded-full" />
              <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#f4d210]/20 text-[#0B73B9]">
                  {unreadCount} unread
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAll}
                disabled={markingAll}
                className="flex items-center gap-1 text-xs font-semibold text-[#0B73B9] hover:text-[#085C92] disabled:opacity-50 transition-colors"
              >
                {markingAll ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <CheckCheck size={13} />
                )}
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[420px] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 size={20} className="animate-spin text-slate-300 mx-auto" />
                <p className="text-xs text-slate-400 mt-2">Loading…</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Bell size={18} className="text-slate-300" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-slate-600 mb-1">
                  No notifications
                </p>
                <p className="text-xs text-slate-400">
                  Yo&lsquo;re all caught up
                </p>
              </div>
            ) : (
              notifications.map((notif) => {
                const meta = typeMeta[notif.type] || typeMeta.SYSTEM
                const Icon = meta.icon

                return (
                  <button
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 last:border-0 ${
                      !notif.isRead ? "bg-[#0B73B9]/[0.03]" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.bg}`}
                    >
                      <Icon size={15} style={{ color: meta.color }} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {notif.title}
                        </p>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#0B73B9] flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {formatTimeAgo(notif.createdAt)}
                      </p>
                    </div>

                    {/* Chevron */}
                    {notif.link && (
                      <ChevronRight
                        size={14}
                        className="text-slate-300 flex-shrink-0 mt-2"
                      />
                    )}
                  </button>
                )
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-slate-100">
              <Link
                href="/dashboard/activities"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1 text-xs font-semibold text-[#0B73B9] hover:text-[#085C92] transition-colors"
              >
                View all activity <ChevronRight size={13} />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}