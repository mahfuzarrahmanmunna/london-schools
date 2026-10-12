"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react"
import {
  connectSocket,
  disconnectSocket,
  getSocket,
  type NotificationData,
} from "@/lib/socket-client"
import { fetchApi, apiUrl } from "@/app/dashboard/api"
import { useAuth } from "@/app/contexts/AuthContext"

type NotificationContextValue = {
  notifications: NotificationData[]
  unreadCount: number
  loading: boolean
  markAsRead: (id: number) => Promise<void>
  markAllAsRead: () => Promise<void>
  refresh: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextValue>({
  notifications: [],
  unreadCount: 0,
  loading: false,
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  refresh: async () => {},
})

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const seenIdsRef = useRef<Set<number>>(new Set())

  /* ── Pure fetch logic — every setState happens after an `await`,
   * so none of them run synchronously in any effect body. ── */
  const fetchNotifications = useCallback(async () => {
    try {
      const [listRes, countRes] = await Promise.all([
        fetchApi<{ success: boolean; data: NotificationData[] }>(
          `${apiUrl}/notifications?limit=20`,
          { credentials: "include" }
        ),
        fetchApi<{ success: boolean; data: { count: number } }>(
          `${apiUrl}/notifications/unread-count`,
          { credentials: "include" }
        ),
      ])
      setNotifications(listRes.data ?? [])
      setUnreadCount(countRes.data?.count ?? 0)
      seenIdsRef.current = new Set((listRes.data ?? []).map((n) => n.id))
    } catch {
      // Silent — will retry on reconnect
    }
  }, [])

  /* ── Public refresh — toggles loading for user-triggered refreshes.
   * Safe to call from event handlers, not from effect bodies. ── */
  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      await fetchNotifications()
    } finally {
      setLoading(false)
    }
  }, [fetchNotifications])

  /* ── Connect Socket.IO when user is authenticated ── */
  useEffect(() => {
    if (authLoading || !user) return

    const socket = connectSocket()

    // Defer the initial fetch so state updates do not run from the effect body.
    const fetchTimeout = window.setTimeout(() => {
      void fetchNotifications()
    }, 0)

    // ── Listen for real-time notifications ──
    const handleNewNotification = (data: NotificationData) => {
      if (seenIdsRef.current.has(data.id)) return
      seenIdsRef.current.add(data.id)

      setNotifications((prev) => [data, ...prev].slice(0, 50))
      setUnreadCount((prev) => prev + 1)

      window.dispatchEvent(
        new CustomEvent("notification-toast", { detail: data })
      )
    }
    socket.on("notification:new", handleNewNotification)

    // ── On reconnect, reconcile from database ──
    // `refresh` is fine here because this is an event callback, not the
    // effect body — synchronous setState from event handlers is allowed.
    const handleReconnect = () => {
      refresh()
    }
    socket.io.on("reconnect", handleReconnect)

    return () => {
      window.clearTimeout(fetchTimeout)
      socket.off("notification:new", handleNewNotification)
      socket.io.off("reconnect", handleReconnect)
      disconnectSocket()
    }
  }, [user, authLoading, fetchNotifications, refresh])

  /* ── Mark one as read (optimistic) ── */
  const markAsRead = useCallback(
    async (id: number) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))

      try {
        await fetchApi(`${apiUrl}/notifications/${id}/read`, {
          method: "PATCH",
          credentials: "include",
        })
      } catch {
        refresh()
      }
    },
    [refresh]
  )

  /* ── Mark all as read (optimistic) ── */
  const markAllAsRead = useCallback(async () => {
    const previous = notifications
    const previousCount = unreadCount

    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    setUnreadCount(0)

    try {
      await fetchApi(`${apiUrl}/notifications/mark-all-read`, {
        method: "PATCH",
        credentials: "include",
      })
    } catch {
      setNotifications(previous)
      setUnreadCount(previousCount)
    }
  }, [notifications, unreadCount])

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, loading, markAsRead, markAllAsRead, refresh }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationContext)
}