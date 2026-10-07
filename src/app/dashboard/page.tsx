"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  UserPlus,
  Flame,
  TrendingUp,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  ArrowRight,
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  Sparkles,
  ChevronRight,
  UserCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { dashboardQueryKeys, fetchApi, leadsApiUrl } from "./api";

gsap.registerPlugin(ScrollTrigger);

/* ─── SplitText Component ──────────────────────────── */

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden pb-2">
          <span className="inline-block" style={{ willChange: "transform, opacity" }}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

type DashboardLead = {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  stage: string;
  status: string;
  temperature: string | null;
  createdAt: string;
  source: { name: string } | null;
  assignedTo: { name: string; firstName: string | null; lastName: string | null } | null;
};
type DashboardSummary = {
  stats: { total: number; newThisWeek: number; hot: number; converted: number; conversionRate: number };
  pipeline: { stage: string; count: number }[];
  sources: { name: string; count: number }[];
  recentLeads: DashboardLead[];
  activities: {
    id: number;
    type: string;
    description: string;
    userName: string;
    leadName: string;
    leadId: number;
    duration: number | null;
    createdAt: string;
  }[];
};
const pipelineColors: Record<string, string> = {
  NEW: "#0B73B9",
  INITIAL_CONTACT: "#085C92",
  FOLLOW_UP: "#0EA5E9",
  QUALIFIED: "#f4d210",
  INTERESTED: "#F59E0B",
  APPLICATION: "#A855F7",
  BOOKING: "#6366F1",
  WON: "#22c55e",
  LOST: "#ef4444",
};
const sourceColors = ["#0B73B9", "#f4d210", "#22c55e", "#ef4444", "#A855F7", "#64748b"];

/* ─── Helper Functions ──────────────────────────────── */

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
};

const tempColors: Record<string, string> = {
  HOT: "bg-red-50 text-red-600 border-red-200",
  WARM: "bg-orange-50 text-orange-600 border-orange-200",
  COLD: "bg-blue-50 text-blue-600 border-blue-200",
};

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
};

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
};

const formatStage = (stage: string) =>
  stage.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const formatTimeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const formatDuration = (seconds: number | null) => {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

/* ─── Main Page Component ──────────────────────────── */

export default function DashboardPage() {
  const pageRef = useRef(null);
  const currentDate = useSyncExternalStore(
    () => () => {},
    () => new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
    () => ""
  );
  const dashboardQuery = useQuery({
    queryKey: dashboardQueryKeys.dashboard,
    queryFn: () =>
      fetchApi<{ success: boolean; data: DashboardSummary }>(
        `${leadsApiUrl}/dashboard-summary`
      ),
    refetchInterval: 15_000,
  });
  const summary = dashboardQuery.data?.data;
  const summaryStats = summary?.stats ?? {
    total: 0,
    newThisWeek: 0,
    hot: 0,
    converted: 0,
    conversionRate: 0,
  };
  const stageOrder = ["NEW", "INITIAL_CONTACT", "FOLLOW_UP", "QUALIFIED", "INTERESTED", "APPLICATION", "BOOKING", "WON", "LOST"];
  const stageCounts = new Map<string, number>(
    (summary?.pipeline ?? []).map(({ stage, count }) => [stage, count] as const)
  );
  const maxStageCount = Math.max(1, ...stageCounts.values());
  const pipelineData = stageOrder.map((stage) => {
    const count = stageCounts.get(stage) ?? 0;
    return {
      stage,
      count,
      percentage: summaryStats.total ? Number(((count / summaryStats.total) * 100).toFixed(1)) : 0,
      width: count ? Math.max(4, (count / maxStageCount) * 100) : 0,
      color: pipelineColors[stage],
    };
  });
  const leadSources = (summary?.sources ?? []).map((source, index) => ({
    ...source,
    percentage: summaryStats.total
      ? Number(((source.count / summaryStats.total) * 100).toFixed(1))
      : 0,
    width: summaryStats.total ? Math.max(3, (source.count / summaryStats.total) * 100) : 0,
    color: sourceColors[index % sourceColors.length],
  }));
  const recentLeads = summary?.recentLeads ?? [];
  const recentActivities = summary?.activities ?? [];
  const kpiData = [
    { label: "Total Leads", value: summaryStats.total.toLocaleString(), icon: Users, color: "#0B73B9" },
    { label: "New This Week", value: summaryStats.newThisWeek.toLocaleString(), icon: UserPlus, color: "#f4d210" },
    { label: "Hot Leads", value: summaryStats.hot.toLocaleString(), icon: Flame, color: "#ef4444" },
    { label: "Conversion Rate", value: `${summaryStats.conversionRate}%`, icon: TrendingUp, color: "#22c55e" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Welcome banner
      const bannerTl = gsap.timeline({ delay: 0.2 });
      bannerTl
        .from(".welcome-badge", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
        .from(".split-word span", { y: "110%", opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" }, "-=0.5")
        .from(".welcome-desc", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".welcome-stat", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4");

      // KPI Cards
      gsap.from(".kpi-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });

      // Reveal items
      const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 90%", once: true },
          }
        );
      });

      // Pipeline bars
      gsap.utils.toArray<HTMLElement>(".pipeline-bar").forEach((bar) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: bar.dataset.width || "0%",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 95%", once: true },
          }
        );
      });

      // Source bars
      gsap.utils.toArray<HTMLElement>(".source-bar").forEach((bar) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: bar.dataset.width || "0%",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 95%", once: true },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const refreshDashboard = () => void dashboardQuery.refetch();

  return (
    <div ref={pageRef}>
      {dashboardQuery.isError && (
        <div role="alert" className="mb-5 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="flex items-center gap-2"><AlertCircle size={16} /> {dashboardQuery.error instanceof Error ? dashboardQuery.error.message : "Unable to load dashboard data."}</span>
          <button onClick={refreshDashboard} className="font-semibold underline">Retry</button>
        </div>
      )}
      {/* ═══════════════════ WELCOME BANNER ═══════════════════ */}
      <section className="reveal-item relative rounded-2xl overflow-hidden bg-[#001B30] mb-6 md:mb-8">
        {/* Converted grid bg to inline style to avoid Tailwind purging arbitrary values incorrectly */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }} 
        />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 blur-[80px] bg-[#0B73B9] pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-5 blur-[60px] bg-[#f4d210] pointer-events-none" />

        <div className="relative z-10 px-6 md:px-10 py-8 md:py-10">
          <div className="welcome-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-5">
            <Sparkles size={13} className="text-[#f4d210]" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-white/60">
              {currentDate || "\u00A0"}
            </span>
          </div>

          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.15] tracking-tight mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <SplitText text="Welcome to your dashboard" className="block" />
          </h1>

          <p className="welcome-desc text-sm md:text-base text-white/50 max-w-2xl leading-relaxed font-light mb-6">
            {dashboardQuery.isLoading
              ? "Loading your latest lead activity…"
              : `There are ${summaryStats.newThisWeek} new leads this week and ${summaryStats.hot} hot leads waiting for follow-up.`}
          </p>

          <div className="flex flex-wrap gap-6 md:gap-8">
            <div className="welcome-stat flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0B73B9]/15 border border-[#0B73B9]/20 flex items-center justify-center">
                <Users size={15} className="text-[#0B73B9]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">{summaryStats.total.toLocaleString()}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider mt-0.5">Total Leads</p>
              </div>
            </div>
            <div className="welcome-stat flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#f4d210]/10 border border-[#f4d210]/20 flex items-center justify-center">
                <Flame size={15} className="text-[#f4d210]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">{summaryStats.hot.toLocaleString()}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider mt-0.5">Hot Leads</p>
              </div>
            </div>
            <div className="welcome-stat flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <TrendingUp size={15} className="text-green-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">{summaryStats.conversionRate}%</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider mt-0.5">Conversion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ KPI CARDS ═══════════════════ */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="kpi-card group relative bg-white rounded-xl border border-slate-100 p-5 md:p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ backgroundColor: kpi.color }} />
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${kpi.color}10`, border: `1px solid ${kpi.color}20` }}
                >
                  <Icon size={18} strokeWidth={1.5} style={{ color: kpi.color }} />
                </div>
                </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-1">{kpi.value}</p>
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">{kpi.label}</p>
            </div>
          );
        })}
      </section>

      {/* ═══════════════════ PIPELINE + SOURCES ═══════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Pipeline */}
        <div className="reveal-item lg:col-span-2 bg-white rounded-xl border border-slate-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-5 bg-[#0B73B9] rounded-full" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Pipeline Overview</h2>
              </div>
              <p className="text-xs text-slate-400 ml-4">Lead distribution across stages</p>
            </div>
            <Link href="/dashboard/leads" className="text-xs font-semibold text-[#0B73B9] hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {pipelineData.map((item) => (
              <div key={item.stage} className="flex items-center gap-4">
                <div className="w-32 md:w-40 flex-shrink-0">
                  <p className="text-xs font-semibold text-slate-600 truncate">{formatStage(item.stage)}</p>
                  <p className="text-[10px] text-slate-400">{item.count} leads</p>
                </div>
                <div className="flex-1 h-7 bg-slate-50 rounded-md overflow-hidden relative">
                  <div
                    className="pipeline-bar h-full rounded-md flex items-center justify-end pr-2"
                    data-width={`${item.width}%`}
                    style={{ backgroundColor: item.color, minWidth: "30px" }}
                  >
                    <span className="text-[10px] font-bold text-white">{item.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="reveal-item bg-white rounded-xl border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-5 bg-[#f4d210] rounded-full" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Lead Sources</h2>
          </div>
          <p className="text-xs text-slate-400 mb-6 ml-4">Where leads come from</p>

          <div className="space-y-4">
            {leadSources.map((src) => (
              <div key={src.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-600">{src.name}</span>
                  <span className="text-xs font-bold text-slate-900">{src.count}</span>
                </div>
                <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div
                    className="source-bar h-full rounded-full"
                    data-width={`${src.width}%`}
                    style={{ backgroundColor: src.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ RECENT LEADS + ACTIVITIES ═══════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Leads Table */}
        <div className="reveal-item lg:col-span-2 bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1 h-5 bg-[#0B73B9] rounded-full" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Leads</h2>
              </div>
              <p className="text-xs text-slate-400 ml-4">Latest leads added to the system</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                <Filter size={14} />
              </button>
              <Link
                href="/dashboard/leads"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0B73B9] text-white text-xs font-semibold hover:bg-[#085C92] transition-colors"
              >
                <UserPlus size={13} /> Add Lead
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 md:px-8 py-3 text-left text-[10px] font-bold tracking-wider uppercase text-slate-400">Name</th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold tracking-wider uppercase text-slate-400">Stage</th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold tracking-wider uppercase text-slate-400 hidden md:table-cell">Temp</th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold tracking-wider uppercase text-slate-400 hidden lg:table-cell">Source</th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold tracking-wider uppercase text-slate-400 hidden sm:table-cell">Assigned</th>
                  <th className="px-6 md:px-8 py-3 text-right text-[10px] font-bold tracking-wider uppercase text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} onClick={() => { window.location.href = `/dashboard/leads/${lead.id}`; }} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 md:px-8 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-[11px] font-bold text-slate-500">
                            {lead.firstName?.[0] ?? ""}{lead.lastName?.[0] ?? ""}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-[#0B73B9] transition-colors">
                            {lead.firstName} {lead.lastName ?? ""}
                          </p>
                          <p className="text-xs text-slate-400 truncate">{lead.email ?? lead.phone ?? "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${stageColors[lead.stage]}`}>
                        {formatStage(lead.stage)}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 hidden md:table-cell">
                      {lead.temperature && (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${tempColors[lead.temperature]}`}>
                          {lead.temperature}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-slate-500">{lead.source?.name ?? "—"}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden sm:table-cell">
                      {lead.assignedTo ? (
                        <span className="text-xs font-medium text-slate-600">{[lead.assignedTo.firstName, lead.assignedTo.lastName].filter(Boolean).join(" ") || lead.assignedTo.name}</span>
                      ) : (
                        <span className="text-xs text-slate-300 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 md:px-8 py-3.5 text-right">
                      <span className="text-xs text-slate-400">{formatDate(lead.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 md:px-8 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              {dashboardQuery.isLoading ? <Loader2 size={13} className="inline animate-spin" /> : `Showing ${recentLeads.length} of ${summaryStats.total.toLocaleString()} leads`}
            </p>
            <Link href="/dashboard/leads" className="text-xs font-semibold text-[#0B73B9] hover:underline flex items-center gap-1">
              View All Leads <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="reveal-item bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-5 bg-[#f4d210] rounded-full" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Activities</h2>
            </div>
            <p className="text-xs text-slate-400 ml-4">Latest interactions with leads</p>
          </div>

          <div className="px-6 py-4">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-100" />

              {recentActivities.map((act) => {
                const Icon = activityIcons[act.type] || MoreHorizontal;
                return (
                  <div key={act.id} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* Icon */}
                    <div className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activityColors[act.type] || activityColors.OTHER}`}>
                      <Icon size={15} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                          {act.type.replace(/_/g, " ")}
                        </span>
                        {act.duration && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <Clock size={10} /> {formatDuration(act.duration)}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-300 ml-auto">{formatTimeAgo(act.createdAt)}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-1.5">{act.description}</p>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="font-semibold text-slate-700">{act.leadName}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-400">by {act.userName}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-100">
            <Link href="/dashboard/activities" className="text-xs font-semibold text-[#0B73B9] hover:underline flex items-center gap-1">
              View All Activities <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ QUICK ACTIONS ═══════════════════ */}
      <section className="reveal-item mt-6 md:mt-8">
        <div className="bg-white rounded-xl border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-5 bg-[#0B73B9] rounded-full" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: "Add Lead", icon: UserPlus, href: "/dashboard/leads/new", color: "#0B73B9" },
              { label: "Schedule Follow-up", icon: Calendar, href: "/dashboard/follow-ups", color: "#f4d210" },
              { label: "Log Call", icon: Phone, href: "/dashboard/activities", color: "#22c55e" },
              { label: "Add Note", icon: FileText, href: "/dashboard/leads", color: "#A855F7" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${action.color}10`, border: `1px solid ${action.color}20` }}
                  >
                    <Icon size={18} strokeWidth={1.5} style={{ color: action.color }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 text-center">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}