"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  UserPlus,
  TrendingUp,
  Clock,
  Calendar,
  MessageSquare,
  Settings,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { NotificationData } from "@/lib/socket-client"

const typeMeta: Record<string, { icon: LucideIcon; color: string }> = {
  LEAD_ASSIGNED: { icon: UserPlus, color: "#0B73B9" },
  LEAD_UPDATED: { icon: TrendingUp, color: "#085C92" },
  TASK_ASSIGNED: { icon: Settings, color: "#22c55e" },
  TASK_REMINDER: { icon: Clock, color: "#f4d210" },
  MEETING_REMINDER: { icon: Calendar, color: "#A855F7" },
  NEW_MESSAGE: { icon: MessageSquare, color: "#6366F1" },
  SYSTEM: { icon: Settings, color: "#64748b" },
}

type ToastItem = {
  id: number
  data: NotificationData
  visible: boolean
}

export function NotificationToast() {
  const router = useRouter()
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<NotificationData>
      const data = customEvent.detail
      if (!data) return

      const toastId = Date.now() + Math.random()
      const toast: ToastItem = { id: toastId, data, visible: false }
      setToasts((prev) => [...prev, toast])

      // Animate in
      requestAnimationFrame(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === toastId ? { ...t, visible: true } : t))
        )
      })

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) =>
            t.id === toastId ? { ...t, visible: false } : t
          )
        )
        setTimeout(() => removeToast(toastId), 300)
      }, 5000)
    }

    window.addEventListener("notification-toast", handler)
    return () => window.removeEventListener("notification-toast", handler)
  }, [removeToast])

  const handleClick = (toast: ToastItem) => {
    if (toast.data.link) {
      router.push(toast.data.link)
    }
    removeToast(toast.id)
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const meta = typeMeta[toast.data.type] || typeMeta.SYSTEM
        const Icon = meta.icon

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 bg-[#001B30] border border-white/10 rounded-xl shadow-2xl p-4 transition-all duration-300 cursor-pointer hover:bg-[#002544] ${
              toast.visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
            onClick={() => handleClick(toast)}
          >
            {/* Icon */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: `${meta.color}20`,
                border: `1px solid ${meta.color}30`,
              }}
            >
              <Icon size={16} style={{ color: meta.color }} strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {toast.data.title}
              </p>
              <p className="text-xs text-white/60 leading-relaxed mt-0.5 line-clamp-2">
                {toast.data.message}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeToast(toast.id)
              }}
              className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
          </div>
        )
      })}
    </div>
  )
}