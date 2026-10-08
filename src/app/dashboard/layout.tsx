"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Activity,
  Calendar,
  Tag,
  GraduationCap,
  Settings,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";
import Image from "next/image";

/* ─── Navigation Data (unchanged) ──────────────────── */

interface NavChild {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: "blue" | "gold" | "red" | "green";
}

interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: string;
  children?: NavChild[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "CRM",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      {
        label: "Leads",
        href: "/dashboard/leads",
        icon: Users,
        badge: "1.2k",
        children: [
          { label: "All Leads", href: "/dashboard/leads" },
          { label: "Add New", href: "/dashboard/leads/new", badge: "New", badgeColor: "gold" },
          { label: "Hot Leads", href: "/dashboard/leads?temperature=HOT", badge: "34", badgeColor: "red" },
          { label: "Won", href: "/dashboard/leads?status=CONVERTED", badge: "19", badgeColor: "green" },
        ],
      },
      { label: "Activities", href: "/dashboard/activities", icon: Activity, badge: "89" },
      {
        label: "Follow-ups",
        href: "/dashboard/follow-ups",
        icon: Calendar,
        children: [
          { label: "All Follow-ups", href: "/dashboard/follow-ups" },
          { label: "Pending", href: "/dashboard/follow-ups?status=PENDING" },
          { label: "Overdue", href: "/dashboard/follow-ups?status=OVERDUE", badgeColor: "red" },
          { label: "Completed", href: "/dashboard/follow-ups?status=COMPLETED" },
        ],
      },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Sources", href: "/dashboard/sources", icon: Tag },
      { label: "Programs", href: "/dashboard/programs", icon: GraduationCap },
      {
        label: "Users",
        href: "/dashboard/users",
        icon: Users,
        children: [
          { label: "All Users", href: "/dashboard/users" },
          { label: "Add User", href: "/dashboard/users/new", badge: "New", badgeColor: "gold" },
        ],
      },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

const childBadgeColors: Record<string, string> = {
  blue: "bg-[#0B73B9]/15 text-[#0B73B9]",
  gold: "bg-[#f4d210]/15 text-[#f4d210]",
  red: "bg-red-500/15 text-red-400",
  green: "bg-green-500/15 text-green-400",
};

/* ─── Layout Component ─────────────────────────────── */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mobile off-canvas drawer (existing)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Desktop collapsed (mini) state — new
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Hydration guard — prevents SSR/CSR mismatch on localStorage read
  const [mounted, setMounted] = useState(false);

  // Expanded-section / expanded-item state (existing)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    CRM: true,
    Management: false,
  });
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Floating submenu for collapsed-mode parent items (new)
  const [floatingSubmenu, setFloatingSubmenu] = useState<string | null>(null);

  // User popover in collapsed mode (new)
  const [userPopoverOpen, setUserPopoverOpen] = useState(false);

  const pathname = usePathname();

  /* ─── Load collapsed preference from localStorage ───
     Runs only after mount to avoid hydration mismatch.
     Server renders expanded, client matches, then we
     apply the saved state with the transition enabled.
  ─────────────────────────────────────────────────── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lshs_sidebar_collapsed");
      if (saved === "true") setSidebarCollapsed(true);
    } catch { }
    setMounted(true);
  }, []);

  /* ─── Persist preference ─── */
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("lshs_sidebar_collapsed", String(sidebarCollapsed));
    } catch { }
  }, [sidebarCollapsed, mounted]);

  /* ─── Close floating menus on route change / collapse toggle ─── */
  useEffect(() => {
    setFloatingSubmenu(null);
    setUserPopoverOpen(false);
  }, [pathname, sidebarCollapsed]);

  /* ─── Click-outside handler for floating menus ─── */
  useEffect(() => {
    if (!floatingSubmenu && !userPopoverOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-floating-menu]") && !t.closest("[data-floating-trigger]")) {
        setFloatingSubmenu(null);
        setUserPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [floatingSubmenu, userPopoverOpen]);

  /* ─── Auto-expand active section + parent item (existing) ─── */
  useEffect(() => {
    navSections.forEach((section) => {
      const hasActive = section.items.some(
        (item) =>
          pathname === item.href ||
          pathname.startsWith(item.href + "/") ||
          item.children?.some((c) => pathname === c.href.split("?")[0])
      );
      if (hasActive) {
        setExpandedSections((prev) => ({ ...prev, [section.title]: true }));
        section.items.forEach((item) => {
          if (item.children?.some((c) => pathname === c.href.split("?")[0])) {
            setExpandedItems((prev) => ({ ...prev, [item.label]: true }));
          }
        });
      }
    });
  }, [pathname]);

  const toggleSection = (title: string) =>
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const toggleItem = (label: string) =>
    setExpandedItems((prev) => ({ ...prev, [label]: !prev[label] }));

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    if (base === "/dashboard") return pathname === "/dashboard";
    return pathname === base || pathname.startsWith(base + "/");
  };

  const isChildActive = (href: string) => pathname === href.split("?")[0];

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname.startsWith("/dashboard/leads")) return "Leads";
    if (pathname.startsWith("/dashboard/activities")) return "Activities";
    if (pathname.startsWith("/dashboard/follow-ups")) return "Follow-ups";
    if (pathname.startsWith("/dashboard/sources")) return "Sources";
    if (pathname.startsWith("/dashboard/programs")) return "Programs";
    if (pathname.startsWith("/dashboard/users")) return "Users";
    if (pathname.startsWith("/dashboard/settings")) return "Settings";
    return "Dashboard";
  };

  const getPageIcon = () => {
    if (pathname.startsWith("/dashboard/leads")) return Users;
    if (pathname.startsWith("/dashboard/activities")) return Activity;
    if (pathname.startsWith("/dashboard/follow-ups")) return Calendar;
    if (pathname.startsWith("/dashboard/sources")) return Tag;
    if (pathname.startsWith("/dashboard/programs")) return GraduationCap;
    if (pathname.startsWith("/dashboard/settings")) return Settings;
    return LayoutDashboard;
  };

  const PageIcon = getPageIcon();
  const isCollapsed = mounted && sidebarCollapsed;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ═══════════════════ SIDEBAR ═══════════════════ */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen flex-shrink-0 bg-[#001B30] w-[260px] ${isCollapsed ? "lg:w-[76px]" : "lg:w-[260px]"
          } ${mounted ? "transition-all duration-300 ease-out" : ""} ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        aria-label="Main navigation"
      >
        {/* Grid pattern + ambient glow — extremely subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 blur-[80px] bg-[#0B73B9] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full opacity-5 blur-[60px] bg-[#f4d210] pointer-events-none" />

        {/* ─── Floating Collapse / Expand Button (desktop only) ─── */}
        {mounted && (
          <button
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center hover:scale-110 hover:shadow-lg hover:border-slate-300 transition-all duration-300 z-50"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight
              size={13}
              strokeWidth={2.5}
              className={`text-slate-600 transition-transform duration-300 ${sidebarCollapsed ? "rotate-0" : "rotate-180"
                }`}
            />
          </button>
        )}

        {/* ─── Close button (mobile only) ─── */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 h-full flex flex-col">
          {/* ─── Logo ─── */}
          <div className={`py-6 border-b border-white/5 ${isCollapsed ? "lg:px-2" : "px-6"}`}>
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <Image
                src='/logo/LSHS Logo.png'
                width={200}
                height={40}
                alt="LSHS Logo"
              />
            </Link>
          </div>

          {/* ─── Navigation ─── */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 sidebar-scroll" aria-label="Main">
            {navSections.map((section) => {
              const isSectionExpanded = isCollapsed ? true : expandedSections[section.title];

              return (
                <div key={section.title} className="mb-3">
                  {/* ── Section header ── */}
                  {isCollapsed ? (
                    // Collapsed: subtle divider line, no text
                    <div className="hidden lg:flex justify-center py-2 mb-1" aria-hidden="true">
                      <div className="w-8 h-px bg-white/10" />
                    </div>
                  ) : (
                    // Expanded: clickable title
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="group w-full flex items-center justify-between px-3 py-2 mb-1 text-left"
                      aria-expanded={isSectionExpanded}
                    >
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 group-hover:text-white/50 transition-colors">
                        {section.title}
                      </span>
                      <ChevronDown
                        size={13}
                        className={`text-white/20 transition-transform duration-300 ${isSectionExpanded ? "rotate-0" : "-rotate-90"
                          }`}
                      />
                    </button>
                  )}

                  {/* ── Items ── */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${isCollapsed || isSectionExpanded
                        ? "grid-template-rows-[1fr] opacity-100"
                        : "grid-template-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        const hasChildren = !!item.children?.length;
                        const isItemExpanded = expandedItems[item.label];
                        const isFloatingOpen = floatingSubmenu === item.label;

                        return (
                          <div key={item.href} className="mb-0.5 relative group/item">
                            <div className="flex items-stretch">
                              {/* ── Item Link ── */}
                              <Link
                                href={item.href}
                                onClick={(e) => {
                                  if (isCollapsed && hasChildren) {
                                    // Collapsed parent: open floating submenu instead of navigating
                                    e.preventDefault();
                                    setFloatingSubmenu(isFloatingOpen ? null : item.label);
                                  } else {
                                    setSidebarOpen(false);
                                  }
                                }}
                                data-floating-trigger={hasChildren && isCollapsed ? "true" : undefined}
                                aria-current={active ? "page" : undefined}
                                aria-label={item.label}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1 relative ${isCollapsed ? "lg:justify-center lg:px-2" : ""
                                  } ${active
                                    ? "bg-[#0B73B9]/15 text-white"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                  }`}
                              >
                                <Icon
                                  size={17}
                                  strokeWidth={1.5}
                                  className={`flex-shrink-0 transition-colors duration-200 ${active
                                      ? "text-[#0B73B9]"
                                      : "text-white/40 group-hover:text-white/70"
                                    }`}
                                />
                                <span
                                  className={`flex-1 truncate whitespace-nowrap ${isCollapsed ? "lg:hidden" : ""
                                    }`}
                                >
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-all duration-200 whitespace-nowrap ${isCollapsed ? "lg:hidden" : ""
                                      } ${active
                                        ? "bg-[#0B73B9]/20 text-[#0B73B9]"
                                        : "bg-white/5 text-white/40"
                                      }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                                {/* Parent indicator in collapsed mode (subtle gold dot) */}
                                {hasChildren && isCollapsed && (
                                  <span className="hidden lg:block absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#f4d210]" />
                                )}
                              </Link>

                              {/* Expand/Collapse toggle (expanded mode, items with children) */}
                              {hasChildren && !isCollapsed && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleItem(item.label);
                                  }}
                                  className="px-2 my-0.5 flex items-center text-white/30 hover:text-white/70 transition-colors"
                                  aria-label={`Toggle ${item.label} submenu`}
                                  aria-expanded={isItemExpanded}
                                >
                                  <ChevronRight
                                    size={14}
                                    className={`transition-transform duration-300 ${isItemExpanded ? "rotate-90" : ""
                                      }`}
                                  />
                                </button>
                              )}
                            </div>

                            {/* ── Tooltip (collapsed mode, on hover) ── */}
                            {isCollapsed && (
                              <div className="hidden lg:block absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-50">
                                {item.label}
                                {item.badge && (
                                  <span className="ml-2 text-[10px] text-slate-400">{item.badge}</span>
                                )}
                              </div>
                            )}

                            {/* ── Floating Submenu (collapsed mode, parent items only) ── */}
                            {hasChildren && isCollapsed && isFloatingOpen && (
                              <div
                                data-floating-menu="true"
                                className="hidden lg:block absolute left-full ml-2 top-0 min-w-[220px] bg-[#001B30] border border-white/10 rounded-lg shadow-2xl p-2 z-50"
                              >
                                <p className="text-[10px] font-bold tracking-wider uppercase text-white/40 px-2 py-1 mb-1">
                                  {item.label}
                                </p>
                                {/* "All {Item}" = parent route */}
                                <Link
                                  href={item.href}
                                  onClick={() => {
                                    setFloatingSubmenu(null);
                                    setSidebarOpen(false);
                                  }}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${active
                                      ? "text-[#0B73B9] bg-[#0B73B9]/10"
                                      : "text-white/60 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                  <span
                                    className={`w-1 h-1 rounded-full ${active ? "bg-[#0B73B9]" : "bg-white/20"
                                      }`}
                                  />
                                  <span className="flex-1 truncate">All {item.label}</span>
                                </Link>
                                {/* Child items */}
                                {item.children!.map((child) => {
                                  const childActive = isChildActive(child.href);
                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => {
                                        setFloatingSubmenu(null);
                                        setSidebarOpen(false);
                                      }}
                                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${childActive
                                          ? "text-[#0B73B9] bg-[#0B73B9]/10"
                                          : "text-white/60 hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                      <span
                                        className={`w-1 h-1 rounded-full ${childActive ? "bg-[#0B73B9]" : "bg-white/20"
                                          }`}
                                      />
                                      <span className="flex-1 truncate">{child.label}</span>
                                      {child.badge && (
                                        <span
                                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${childBadgeColors[child.badgeColor || "blue"] ||
                                            childBadgeColors.blue
                                            }`}
                                        >
                                          {child.badge}
                                        </span>
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}

                            {/* ── Inline Sub-items (expanded mode) ── */}
                            {hasChildren && !isCollapsed && (
                              <div
                                className={`grid transition-all duration-300 ease-out ${isItemExpanded
                                    ? "grid-template-rows-[1fr] opacity-100"
                                    : "grid-template-rows-[0fr] opacity-0"
                                  }`}
                              >
                                <div className="overflow-hidden">
                                  <div className="ml-6 pl-4 border-l border-white/5 mb-1 mt-0.5">
                                    {item.children!.map((child) => {
                                      const childActive = isChildActive(child.href);
                                      return (
                                        <Link
                                          key={child.href}
                                          href={child.href}
                                          onClick={() => setSidebarOpen(false)}
                                          aria-current={childActive ? "page" : undefined}
                                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 mb-0.5 ${childActive
                                              ? "text-[#0B73B9] bg-[#0B73B9]/10"
                                              : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                            }`}
                                        >
                                          <span
                                            className={`w-1 h-1 rounded-full transition-colors ${childActive ? "bg-[#0B73B9]" : "bg-white/20"
                                              }`}
                                          />
                                          <span className="flex-1 truncate">{child.label}</span>
                                          {child.badge && (
                                            <span
                                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${childBadgeColors[child.badgeColor || "blue"] ||
                                                childBadgeColors.blue
                                                }`}
                                            >
                                              {child.badge}
                                            </span>
                                          )}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* ─── Quick Add Button ─── */}
          <div className="px-3 pb-2">
            <Link
              href="/dashboard/leads/new"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center justify-center gap-2 rounded-lg bg-[#0B73B9] text-white text-sm font-semibold hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/20 transition-all duration-200 w-full px-4 py-2.5 ${isCollapsed ? "lg:w-[48px] lg:h-[48px] lg:mx-auto lg:p-0" : ""
                }`}
              title={isCollapsed ? "Add New Lead" : undefined}
              aria-label="Add New Lead"
            >
              <Plus size={isCollapsed ? 18 : 16} strokeWidth={2} />
              <span className={`whitespace-nowrap ${isCollapsed ? "lg:hidden" : ""}`}>
                Add New Lead
              </span>
            </Link>
          </div>

          {/* ─── User Profile ─── */}
          <div className="px-3 py-4 border-t border-white/5">
            {/* Expanded view — also shown in mobile drawer */}
            <div
              className={`flex items-center gap-3 px-3 py-3 rounded-lg bg-white/[0.03] border border-white/5 ${isCollapsed ? "lg:hidden" : ""
                }`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f4d210] to-[#D4AF37] flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#001B30]">JA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">James Anderson</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Manager</p>
              </div>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors duration-200"
                aria-label="Logout"
              >
                <LogOut size={15} strokeWidth={1.5} />
              </button>
            </div>

            {/* Collapsed view — desktop only */}
            <div className={`relative group ${isCollapsed ? "hidden lg:block" : "hidden"}`}>
              <button
                onClick={() => setUserPopoverOpen((v) => !v)}
                data-floating-trigger="true"
                className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-[#f4d210] to-[#D4AF37] flex items-center justify-center transition-transform hover:scale-105"
                aria-label="User menu"
                aria-expanded={userPopoverOpen}
              >
                <span className="text-xs font-bold text-[#001B30]">JA</span>
              </button>

              {/* Tooltip on hover (when popover is closed) */}
              {!userPopoverOpen && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-50">
                  James Anderson · Manager
                </div>
              )}

              {/* User popover */}
              <div
                data-floating-menu="true"
                className={`absolute left-full ml-2 bottom-0 min-w-[240px] bg-[#001B30] border border-white/10 rounded-lg shadow-2xl p-3 z-50 transition-all duration-200 ${userPopoverOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible pointer-events-none"
                  }`}
              >
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f4d210] to-[#D4AF37] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#001B30]">JA</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">James Anderson</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Manager</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 w-full px-2 py-2 rounded-md text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                  <LogOut size={14} strokeWidth={1.5} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══════════════════ MOBILE OVERLAY ═══════════════════ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══════════════════ MAIN CONTENT ═══════════════════
          flex-1 + min-w-0 means it auto-adjusts to sidebar width.
          No hardcoded margins — works on 1366 / 1440 / 1600 / 1920 / 2560.
          Sidebar width transition (300ms) cascades here automatically. */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ─── Top Bar (unchanged) ─── */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 md:px-8 py-3.5 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors duration-200"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:flex w-8 h-8 rounded-md bg-[#0B73B9]/5 border border-[#0B73B9]/10 items-center justify-center">
              <PageIcon size={16} className="text-[#0B73B9]" strokeWidth={1.5} />
            </div>
            <h1 className="text-base font-semibold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads, activities..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20 focus:border-[#0B73B9]/30 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              className="relative w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell size={16} strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f4d210] ring-2 ring-white" />
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-3 ml-1 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B73B9] to-[#085C92] flex items-center justify-center">
                <span className="text-xs font-bold text-white">JA</span>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* ─── Page Content ─── */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">{children}</main>
      </div>

      {/* ═══════════════════ SCROLLBAR STYLE ═══════════════════ */}
      <style jsx global>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}