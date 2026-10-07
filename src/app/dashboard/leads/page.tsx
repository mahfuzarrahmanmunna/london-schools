"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  Flame,
  UserPlus,
  TrendingUp,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  X,
  Plus,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { dashboardQueryKeys, fetchApi, leadsApiUrl } from "../api";

gsap.registerPlugin(ScrollTrigger);

/* ─── Badge Color Systems ──────────────────────────── */

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

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-50 text-green-700 border-green-200",
  CONVERTED: "bg-blue-50 text-blue-700 border-blue-200",
  LOST: "bg-red-50 text-red-700 border-red-200",
  NO_RESPONSE: "bg-slate-50 text-slate-600 border-slate-200",
  NOT_INTERESTED: "bg-orange-50 text-orange-700 border-orange-200",
  INVALID: "bg-red-50 text-red-700 border-red-200",
};

const tempColors: Record<string, string> = {
  HOT: "bg-red-50 text-red-600 border-red-200",
  WARM: "bg-orange-50 text-orange-600 border-orange-200",
  COLD: "bg-blue-50 text-blue-600 border-blue-200",
};

const priorityColors: Record<string, string> = {
  URGENT: "bg-red-50 text-red-600 border-red-200",
  HIGH: "bg-orange-50 text-orange-600 border-orange-200",
  MEDIUM: "bg-yellow-50 text-yellow-600 border-yellow-200",
  LOW: "bg-slate-50 text-slate-600 border-slate-200",
};

const formatStage = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

type Lead = {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  city: string | null;
  stage: string;
  status: string;
  temperature: string | null;
  priority: string | null;
  createdAt: string;
  source: { id: number; name: string } | null;
  assignedTo: { id: number; name: string; firstName: string | null; lastName: string | null } | null;
};

type LeadStats = { total: number; hot: number; new: number; converted: number };

const filterOptions = {
  status: ["ACTIVE", "CONVERTED", "LOST", "NO_RESPONSE", "NOT_INTERESTED", "INVALID"],
  stage: ["NEW", "INITIAL_CONTACT", "FOLLOW_UP", "QUALIFIED", "INTERESTED", "APPLICATION", "BOOKING", "WON", "LOST"],
  temperature: ["HOT", "WARM", "COLD"],
  priority: ["URGENT", "HIGH", "MEDIUM", "LOW"],
};

/* ─── Main Component ───────────────────────────────── */

export default function LeadsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    stage: "",
    temperature: "",
    priority: "",
    source: "",
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  const limit = 10;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const ctx = gsap.context(() => {
      gsap.from(".leads-header", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" });
      gsap.from(".stat-card", { opacity: 0, y: 25, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 });
      gsap.from(".filter-bar", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out", delay: 0.3 });

      const rows = gsap.utils.toArray<HTMLElement>(".lead-row");
      rows.forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          y: 15,
          duration: 0.4,
          delay: i * 0.03,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 95%" },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const listQuery = useQuery({
    queryKey: [
      ...dashboardQueryKeys.leads,
      { currentPage, limit, search, sortBy, sortOrder, ...filters },
    ],
    queryFn: async () => {
      const query = new URLSearchParams({
        page: String(currentPage),
        limit: String(limit),
        search,
        sortBy,
        sortOrder,
      });
      Object.entries(filters).forEach(([key, value]) => {
        if (value) query.set(key, value);
      });
      const result = await fetchApi<{
        success: boolean;
        data: Lead[];
        pagination: { page: number; limit: number; total: number; totalPages: number };
        stats: LeadStats;
        sources: { id: number; name: string }[];
      }>(`${leadsApiUrl}?${query.toString()}`);
      if (!result.success) throw new Error("Unable to load leads");
      return result;
    },
    refetchInterval: 15_000,
  });
  const leads = listQuery.data?.data ?? [];
  const sources = listQuery.data?.sources ?? [];
  const statsData = listQuery.data?.stats ?? { total: 0, hot: 0, new: 0, converted: 0 };
  const totalFiltered = listQuery.data?.pagination.total ?? 0;
  const totalPages = Math.max(listQuery.data?.pagination.totalPages ?? 1, 1);
  const loading = listQuery.isLoading;
  const error = listQuery.error instanceof Error ? listQuery.error.message : "";

  const paginatedLeads = leads;

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedLeads((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    const pageIds = paginatedLeads.map((lead) => lead.id);
    if (pageIds.every((id) => selectedLeads.includes(id))) {
      setSelectedLeads((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedLeads((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const resetFilters = () => {
    setFilters({ status: "", stage: "", temperature: "", priority: "", source: "" });
    setSearch("");
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(search || filters.status || filters.stage || filters.temperature || filters.priority || filters.source);

  const exportLeads = () => {
    const columns = ["First name", "Last name", "Email", "Phone", "Country", "City", "Stage", "Status", "Created at"];
    const rows = leads.map((lead) => [
      lead.firstName,
      lead.lastName ?? "",
      lead.email ?? "",
      lead.phone ?? "",
      lead.country ?? "",
      lead.city ?? "",
      lead.stage,
      lead.status,
      lead.createdAt,
    ]);
    const csv = [columns, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-page-${currentPage}.csv`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const stats = [
    { label: "Total Leads", value: statsData.total, icon: Users, color: "#0B73B9" },
    { label: "Hot Leads", value: statsData.hot, icon: Flame, color: "#ef4444" },
    { label: "New Leads", value: statsData.new, icon: UserPlus, color: "#f4d210" },
    { label: "Converted", value: statsData.converted, icon: TrendingUp, color: "#22c55e" },
  ];

  const inputClasses =
    "w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20 focus:border-[#0B73B9]/40 transition-all";
  const selectClasses = `${inputClasses} appearance-none cursor-pointer pr-8`;

  return (
    <div ref={pageRef} className="space-y-6">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <div className="leads-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-6 bg-[#0B73B9] rounded-full" />
            <h1
              className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Leads
            </h1>
          </div>
          <p className="text-sm text-slate-400 ml-4">Manage and track all your leads</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportLeads} disabled={loading || leads.length === 0} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors">
            <Download size={15} /> Export
          </button>
          <Link
            href="/dashboard/leads/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B73B9] text-white text-sm font-semibold hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/20 transition-all"
          >
            <Plus size={16} /> Add Lead
          </Link>
        </div>
      </div>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="stat-card bg-white rounded-xl border border-slate-100 p-4 md:p-5 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${stat.color}10`, border: `1px solid ${stat.color}20` }}
              >
                <Icon size={17} strokeWidth={1.5} style={{ color: stat.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-slate-900 leading-none">{stat.value}</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 truncate">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══════════════════ FILTER BAR ═══════════════════ */}
      <div className="filter-bar bg-white rounded-xl border border-slate-100 p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name, email, phone..."
              className={`${inputClasses} pl-10`}
            />
            {search && (
              <button onClick={() => { setSearch(""); setCurrentPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Status */}
          <select value={filters.status} onChange={(e) => { setFilters({ ...filters, status: e.target.value }); setCurrentPage(1); }} className={selectClasses} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.1rem" }}>
            <option value="">All Statuses</option>
            {filterOptions.status.map((s) => <option key={s} value={s}>{formatStage(s)}</option>)}
          </select>

          {/* Stage */}
          <select value={filters.stage} onChange={(e) => { setFilters({ ...filters, stage: e.target.value }); setCurrentPage(1); }} className={selectClasses} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.1rem" }}>
            <option value="">All Stages</option>
            {filterOptions.stage.map((s) => <option key={s} value={s}>{formatStage(s)}</option>)}
          </select>

          {/* Temperature */}
          <select value={filters.temperature} onChange={(e) => { setFilters({ ...filters, temperature: e.target.value }); setCurrentPage(1); }} className={selectClasses} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.1rem" }}>
            <option value="">All Temps</option>
            {filterOptions.temperature.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          {/* Priority */}
          <select value={filters.priority} onChange={(e) => { setFilters({ ...filters, priority: e.target.value }); setCurrentPage(1); }} className={selectClasses} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.1rem" }}>
            <option value="">All Priorities</option>
            {filterOptions.priority.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Source filter + Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-3">
          <select value={filters.source} onChange={(e) => { setFilters({ ...filters, source: e.target.value }); setCurrentPage(1); }} className={`${selectClasses} sm:max-w-50`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.1rem" }}>
            <option value="">All Sources</option>
            {sources.map((source) => <option key={source.id} value={source.name}>{source.name}</option>)}
          </select>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors">
              <X size={14} /> Clear Filters
            </button>
          )}
          <p className="text-xs text-slate-400 ml-auto">
            Showing <span className="font-bold text-slate-600">{totalFiltered}</span> of {statsData.total} leads
          </p>
        </div>
      </div>

      {error && (
        <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="flex items-center gap-2"><AlertCircle size={16} /> {error}</span>
          <button onClick={() => void listQuery.refetch()} className="font-semibold underline">Retry</button>
        </div>
      )}

      {/* ═══════════════════ TABLE ═══════════════════ */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={paginatedLeads.length > 0 && paginatedLeads.every((lead) => selectedLeads.includes(lead.id))}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-[#0B73B9] focus:ring-[#0B73B9]/30 cursor-pointer"
                  />
                </th>
                {[
                  { key: "firstName", label: "Name", sortable: true },
                  { key: "stage", label: "Stage", sortable: true },
                  { key: "status", label: "Status", sortable: true, hidden: "hidden xl:table-cell" },
                  { key: "temperature", label: "Temp", sortable: true, hidden: "hidden md:table-cell" },
                  { key: "priority", label: "Priority", sortable: true, hidden: "hidden lg:table-cell" },
                  { key: "source", label: "Source", sortable: true, hidden: "hidden xl:table-cell" },
                  { key: "assignedTo", label: "Assigned", sortable: true, hidden: "hidden lg:table-cell" },
                  { key: "createdAt", label: "Created", sortable: true, hidden: "hidden md:table-cell" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className={`px-3 py-3.5 text-left text-[10px] font-bold tracking-wider uppercase text-slate-400 ${col.hidden || ""}`}
                  >
                    {col.sortable ? (
                      <button onClick={() => handleSort(col.key)} className="flex items-center gap-1 hover:text-slate-600 transition-colors">
                        {col.label}
                        <ArrowUpDown size={11} className={sortBy === col.key ? "text-[#0B73B9]" : "text-slate-300"} />
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
                <th className="px-4 py-3.5 text-right text-[10px] font-bold tracking-wider uppercase text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-14 text-center text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading leads…</span>
                  </td>
                </tr>
              ) : paginatedLeads.map((lead) => (
                <tr key={lead.id} className="lead-row border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selectedLeads.includes(lead.id)} onChange={() => toggleSelect(lead.id)} className="w-4 h-4 rounded border-slate-300 text-[#0B73B9] focus:ring-[#0B73B9]/30 cursor-pointer" />
                  </td>
                  <td className="px-3 py-3">
                    <Link href={`/dashboard/leads/${lead.id}`} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-bold text-slate-500">{lead.firstName?.[0] ?? ""}{lead.lastName?.[0] ?? ""}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-[#0B73B9] transition-colors">{lead.firstName} {lead.lastName ?? ""}</p>
                        <p className="text-xs text-slate-400 truncate">{lead.email || lead.phone || "No email or phone"}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${stageColors[lead.stage]}`}>{formatStage(lead.stage)}</span>
                  </td>
                  <td className="px-3 py-3 hidden xl:table-cell">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${statusColors[lead.status]}`}>{formatStage(lead.status)}</span>
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell">
                    {lead.temperature && <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${tempColors[lead.temperature]}`}>{lead.temperature}</span>}
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell">
                    {lead.priority && <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${priorityColors[lead.priority]}`}>{lead.priority}</span>}
                  </td>
                  <td className="px-3 py-3 hidden xl:table-cell"><span className="text-xs text-slate-500">{lead.source?.name ?? "—"}</span></td>
                  <td className="px-3 py-3 hidden lg:table-cell">
                    {lead.assignedTo ? <span className="text-xs font-medium text-slate-600">{[lead.assignedTo.firstName, lead.assignedTo.lastName].filter(Boolean).join(" ") || lead.assignedTo.name}</span> : <span className="text-xs text-slate-300 italic">Unassigned</span>}
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell"><span className="text-xs text-slate-400">{formatDate(lead.createdAt)}</span></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/dashboard/leads/${lead.id}`} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#0B73B9]/5 hover:border-[#0B73B9]/20 hover:text-[#0B73B9] transition-all">
                        <Eye size={14} />
                      </Link>
                      <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && paginatedLeads.length === 0 && !error && (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Search size={22} className="text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-600 mb-1">No leads found</p>
            <p className="text-xs text-slate-400">Try adjusting your filters or search terms</p>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="mt-4 text-xs font-semibold text-[#0B73B9] hover:underline">Clear all filters</button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalFiltered > 0 && (
          <div className="px-4 md:px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              Showing <span className="font-bold text-slate-600">{(currentPage - 1) * limit + 1}</span> to{" "}
              <span className="font-bold text-slate-600">{Math.min(currentPage * limit, totalFiltered)}</span> of{" "}
              <span className="font-bold text-slate-600">{totalFiltered}</span> leads
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === page
                      ? "bg-[#0B73B9] text-white border border-[#0B73B9]"
                      : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}