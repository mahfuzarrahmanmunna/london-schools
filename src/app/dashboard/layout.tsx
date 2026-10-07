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

/* ─── Navigation Data ─────────────────────────────── */

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
      {
        label: "Activities",
        href: "/dashboard/activities",
        icon: Activity,
        badge: "89",
      },
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

/* ─── Badge Color Map ──────────────────────────────── */

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    CRM: true,
    Management: false,
  });
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  // Auto-expand section + parent item containing active route
  useEffect(() => {
    navSections.forEach((section) => {
      const hasActive = section.items.some(
        (item) =>
          pathname === item.href ||
          pathname.startsWith(item.href + "/") ||
          (item.children?.some((c) => pathname === c.href.split("?")[0]))
      );
      if (hasActive) {
        setExpandedSections((prev) => ({ ...prev, [section.title]: true }));
        section.items.forEach((item) => {
          if (
            item.children &&
            item.children.some((c) => pathname === c.href.split("?")[0])
          ) {
            setExpandedItems((prev) => ({ ...prev, [item.label]: true }));
          }
        });
      }
    });
  }, [pathname]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleItem = (label: string) => {
    setExpandedItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => {
    const basePath = href.split("?")[0];
    if (basePath === "/dashboard") return pathname === "/dashboard";
    return pathname === basePath || pathname.startsWith(basePath + "/");
  };

  const isChildActive = (href: string) => {
    const basePath = href.split("?")[0];
    return pathname === basePath;
  };

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

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ═══════════════════ SIDEBAR ═══════════════════ */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] flex-shrink-0 bg-[#001B30] transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
        {/* Floating Accents */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 blur-[80px] bg-[#0B73B9] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full opacity-5 blur-[60px] bg-[#f4d210] pointer-events-none" />

        {/* Close Button (Mobile) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 h-full flex flex-col">
          {/* ─── Logo ─── */}
          <div className="px-6 py-7 border-b border-white/5">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0B73B9] to-[#085C92] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap size={20} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-white tracking-tight">LSHS</p>
                <p className="text-[10px] text-white/40 tracking-wider uppercase">CRM Dashboard</p>
              </div>
            </Link>
          </div>

          {/* ─── Navigation ─── */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 sidebar-scroll">
            {navSections.map((section) => {
              const isExpanded = expandedSections[section.title];
              return (
                <div key={section.title} className="mb-3">
                  {/* ── Section Header (clickable to collapse) ── */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="group w-full flex items-center justify-between px-3 py-2 mb-1 text-left"
                  >
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 group-hover:text-white/50 transition-colors">
                      {section.title}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`text-white/20 transition-transform duration-300 ${
                        isExpanded ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>

                  {/* ── Collapsible Section Content ── */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isExpanded
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

                        return (
                          <div key={item.href} className="mb-0.5">
                            {/* ── Item Row ── */}
                            <div className="flex items-stretch">
                              <Link
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1 ${
                                  active
                                    ? "bg-[#0B73B9]/15 text-white border-l-2 border-[#0B73B9]"
                                    : "text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                                }`}
                              >
                                <Icon
                                  size={17}
                                  strokeWidth={1.5}
                                  className={`transition-colors duration-200 ${
                                    active
                                      ? "text-[#0B73B9]"
                                      : "text-white/40 group-hover:text-white/70"
                                  }`}
                                />
                                <span className="flex-1 truncate">{item.label}</span>
                                {item.badge && (
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                                      active
                                        ? "bg-[#0B73B9]/20 text-[#0B73B9]"
                                        : "bg-white/5 text-white/40"
                                    }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </Link>

                              {/* ── Expand/Collapse Toggle (for items with children) ── */}
                              {hasChildren && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleItem(item.label);
                                  }}
                                  className="px-2 my-0.5 flex items-center text-white/30 hover:text-white/70 transition-colors"
                                  aria-label={`Toggle ${item.label} submenu`}
                                >
                                  <ChevronRight
                                    size={14}
                                    className={`transition-transform duration-300 ${
                                      isItemExpanded ? "rotate-90" : ""
                                    }`}
                                  />
                                </button>
                              )}
                            </div>

                            {/* ── Sub-items (children) ── */}
                            {hasChildren && (
                              <div
                                className={`grid transition-all duration-300 ease-out ${
                                  isItemExpanded
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
                                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 mb-0.5 ${
                                            childActive
                                              ? "text-[#0B73B9] bg-[#0B73B9]/10"
                                              : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                          }`}
                                        >
                                          {/* Dot indicator */}
                                          <span
                                            className={`w-1 h-1 rounded-full transition-colors ${
                                              childActive
                                                ? "bg-[#0B73B9]"
                                                : "bg-white/20"
                                            }`}
                                          />
                                          <span className="flex-1 truncate">{child.label}</span>
                                          {child.badge && (
                                            <span
                                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                                childBadgeColors[child.badgeColor || "blue"] ||
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
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#0B73B9] text-white text-sm font-semibold hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/20 transition-all duration-200"
            >
              <Plus size={16} strokeWidth={2} />
              Add New Lead
            </Link>
          </div>

          {/* ─── User Profile ─── */}
          <div className="px-3 py-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/[0.03] border border-white/5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f4d210] to-[#D4AF37] flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#001B30]">JA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">James Anderson</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Manager</p>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors duration-200">
                <LogOut size={15} strokeWidth={1.5} />
              </button>
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

      {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ─── Top Bar ─── */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 md:px-8 py-3.5 flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors duration-200"
          >
            <Menu size={18} />
          </button>

          {/* Dynamic Page Title */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:flex w-8 h-8 rounded-md bg-[#0B73B9]/5 border border-[#0B73B9]/10 items-center justify-center">
              <PageIcon size={16} className="text-[#0B73B9]" strokeWidth={1.5} />
            </div>
            <h1 className="text-base font-semibold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          {/* Search */}
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

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors duration-200">
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
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* ═══════════════════ INLINE SCROLLBAR STYLE ═══════════════════ */}
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