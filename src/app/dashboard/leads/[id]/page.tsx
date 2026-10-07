"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Building2,
  Clock,
  UserCheck,
  FileText,
  Phone as PhoneIcon,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  MoreHorizontal,
  Plus,
  Send,
  CalendarClock,
  Check,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { dashboardQueryKeys, fetchApi, leadsApiUrl } from "../../api";

gsap.registerPlugin(ScrollTrigger);

/* ─── Badge Colors ──────────────────────────────────── */

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
const activityIcons: Record<string, LucideIcon> = { CALL: PhoneIcon, WHATSAPP: MessageSquare, EMAIL: Mail, NOTE: FileText, STATUS_CHANGE: ArrowRight, STAGE_CHANGE: TrendingUp, ASSIGNMENT: UserCheck, OTHER: MoreHorizontal };
const activityColors: Record<string, string> = { CALL: "bg-[#0B73B9]/10 text-[#0B73B9]", WHATSAPP: "bg-green-100 text-green-600", EMAIL: "bg-purple-100 text-purple-600", NOTE: "bg-slate-100 text-slate-600", STATUS_CHANGE: "bg-amber-100 text-amber-600", STAGE_CHANGE: "bg-teal-100 text-teal-600", ASSIGNMENT: "bg-orange-100 text-orange-600", OTHER: "bg-slate-100 text-slate-500" };

const formatStage = (s: string) => s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const formatDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const formatTime = (d: string) => new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
const toDateTimeInput = (date: Date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
};
const formatDuration = (s: number | null) => { if (!s) return null; const m = Math.floor(s / 60); const sec = s % 60; return `${m}m ${sec}s`; };
const formatTimeAgo = (d: string) => { const diff = Date.now() - new Date(d).getTime(); const mins = Math.floor(diff / 60000); if (mins < 1) return "Just now"; if (mins < 60) return `${mins}m ago`; const h = Math.floor(mins / 60); if (h < 24) return `${h}h ago`; const days = Math.floor(h / 24); return `${days}d ago`; };

type LeadDetail = {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  city: string | null;
  highestEducation: string | null;
  jobTitle: string | null;
  company: string | null;
  workExperienceYears: number | null;
  stage: string;
  status: string;
  temperature: string | null;
  priority: string | null;
  quality: string | null;
  source: { id: number; name: string; code: string } | null;
  assignedTo: { id: number; name: string; email: string; role: string } | null;
  programInterests: { course: { id: number; title: string; code: string } }[];
  activities: {
    id: number;
    type: string;
    description: string | null;
    user: { name: string } | null;
    durationSeconds: number | null;
    result: string | null;
    createdAt: string;
  }[];
  followUps: {
    id: number;
    followUpNumber: number;
    type: string;
    scheduledAt: string;
    nextFollowUpAt: string | null;
    completedAt: string | null;
    status: string;
    outcome: string | null;
    notes: string | null;
    assignedTo: { id: number; name: string } | null;
  }[];
  notes: { id: number; content: string; user: { name: string } | null; createdAt: string }[];
  statusHistory: {
    id: number;
    oldStatus: string | null;
    newStatus: string;
    changedBy: { name: string } | null;
    reason: string | null;
    createdAt: string;
  }[];
  stageHistory: {
    id: number;
    oldStage: string | null;
    newStage: string;
    changedBy: { name: string } | null;
    reason: string | null;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

/* ─── Component ─────────────────────────────────────── */

export default function LeadDetailPage() {
  const params = useParams();
  const id = String(params.id ?? "");
  const pageRef = useRef<HTMLDivElement>(null);
  const [newNote, setNewNote] = useState("");
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [followUpType, setFollowUpType] = useState("CALL");
  const [followUpScheduledAt, setFollowUpScheduledAt] = useState(() =>
    toDateTimeInput(new Date(Date.now() + 60 * 60 * 1000))
  );
  const [nextFollowUpAt, setNextFollowUpAt] = useState("");
  const [followUpAssignedToId, setFollowUpAssignedToId] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");
  const [followUpOutcomeDrafts, setFollowUpOutcomeDrafts] = useState<Record<number, string>>({});
  const [followUpScheduleDrafts, setFollowUpScheduleDrafts] = useState<Record<number, string>>({});
  const [showStageDropdown, setShowStageDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const queryClient = useQueryClient();
  const leadQuery = useQuery({
    queryKey: dashboardQueryKeys.lead(id),
    enabled: Boolean(id),
    queryFn: () =>
      fetchApi<{ success: boolean; data: LeadDetail }>(`${leadsApiUrl}/${id}`),
    refetchInterval: 15_000,
  });
  const followUpMetadataQuery = useQuery({
    queryKey: dashboardQueryKeys.leadMetadata,
    enabled: showFollowUpForm,
    queryFn: () =>
      fetchApi<{
        success: boolean;
        data: { users: { id: number; name: string; role: string }[] };
      }>(`${leadsApiUrl}/metadata`),
    staleTime: 60_000,
  });
  const updateLeadMutation = useMutation({
    mutationFn: (changes: { stage?: string; status?: string }) =>
      fetchApi(`${leadsApiUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.lead(id) }),
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.leads }),
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.dashboard }),
      ]);
    },
  });
  const addNoteMutation = useMutation({
    mutationFn: (content: string) =>
      fetchApi(`${leadsApiUrl}/${id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      }),
    onSuccess: async () => {
      setNewNote("");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.lead(id) }),
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.dashboard }),
      ]);
    },
  });
  const addFollowUpMutation = useMutation({
    mutationFn: (data: { type: string; scheduledAt: string; nextFollowUpAt: string | null; notes: string | null; assignedToId: number | null }) =>
      fetchApi(`${leadsApiUrl}/${id}/follow-ups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: async () => {
      setShowFollowUpForm(false);
      setFollowUpNotes("");
      setNextFollowUpAt("");
      setFollowUpAssignedToId("");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.lead(id) }),
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.dashboard }),
      ]);
    },
  });
  const updateFollowUpMutation = useMutation({
    mutationFn: (input: { followUpId: number; changes: { status?: string; outcome?: string; scheduledAt?: string } }) =>
      fetchApi(`${leadsApiUrl}/${id}/follow-ups/${input.followUpId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input.changes),
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.lead(id) }),
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.dashboard }),
      ]);
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const ctx = gsap.context(() => {
      gsap.from(".detail-header", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" });
      const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
      items.forEach((item) => {
        gsap.fromTo(item, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 92%", once: true } });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const lead = leadQuery.data?.data;
  const querySnapshotTime = leadQuery.dataUpdatedAt;

  const stages = ["NEW", "INITIAL_CONTACT", "FOLLOW_UP", "QUALIFIED", "INTERESTED", "APPLICATION", "BOOKING", "WON", "LOST"];
  const statuses = ["ACTIVE", "CONVERTED", "LOST", "NO_RESPONSE", "NOT_INTERESTED", "INVALID"];

  if (leadQuery.isLoading) {
    return <div className="py-20 text-center text-sm text-slate-500">Loading lead…</div>;
  }
  if (leadQuery.isError || !lead) {
    return (
      <div role="alert" className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        <p>{leadQuery.error instanceof Error ? leadQuery.error.message : "Lead not found"}</p>
        <button onClick={() => void leadQuery.refetch()} className="mt-3 font-semibold underline">Retry</button>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <div className="detail-header flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/leads" className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
            <ChevronLeft size={18} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#0B73B9] rounded-full" />
            <h1 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              {lead.firstName} {lead.lastName}
            </h1>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 ml-12">
          <span className={`inline-flex items-center px-3 py-1 rounded-md border text-xs font-bold ${stageColors[lead.stage]}`}>{formatStage(lead.stage)}</span>
          <span className={`inline-flex items-center px-3 py-1 rounded-md border text-xs font-bold ${statusColors[lead.status]}`}>{formatStage(lead.status)}</span>
          {lead.temperature && <span className={`inline-flex items-center px-3 py-1 rounded-md border text-xs font-bold ${tempColors[lead.temperature]}`}>{lead.temperature}</span>}
          {lead.priority && <span className={`inline-flex items-center px-3 py-1 rounded-md border text-xs font-bold ${priorityColors[lead.priority]}`}>{lead.priority}</span>}
          {lead.quality && <span className="inline-flex items-center px-3 py-1 rounded-md border text-xs font-bold bg-slate-50 text-slate-600 border-slate-200">{formatStage(lead.quality)}</span>}
        </div>
      </div>

      {/* ═══════════════════ MAIN GRID ═══════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ─── LEFT COLUMN ─── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Contact Info */}
          <div className="reveal-item bg-white rounded-xl border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 bg-[#0B73B9] rounded-full" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Mail, label: "Email", value: lead.email },
                { icon: Phone, label: "Phone", value: lead.phone },
                { icon: MapPin, label: "Country", value: lead.country },
                { icon: MapPin, label: "City", value: lead.city || "—" },
                { icon: GraduationCap, label: "Education", value: lead.highestEducation ? formatStage(lead.highestEducation) : "—" },
                { icon: Briefcase, label: "Job Title", value: lead.jobTitle || "—" },
                { icon: Building2, label: "Company", value: lead.company || "—" },
                { icon: Clock, label: "Experience", value: lead.workExperienceYears ? `${lead.workExperienceYears} years` : "—" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0B73B9]/5 border border-[#0B73B9]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-[#0B73B9]" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-slate-700 truncate">{item.value || "—"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activities Timeline */}
          <div className="reveal-item bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-[#f4d210] rounded-full" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Activities</h2>
              </div>
              <span className="text-xs text-slate-400">{lead.activities.length} activities</span>
            </div>
            <div className="px-6 md:px-8 py-5">
              <div className="relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-100" />
                {lead.activities.map((act) => {
                  const Icon = activityIcons[act.type] || MoreHorizontal;
                  return (
                    <div key={act.id} className="relative flex gap-4 pb-6 last:pb-0">
                      <div className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activityColors[act.type] || activityColors.OTHER}`}>
                        <Icon size={15} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">{act.type.replace(/_/g, " ")}</span>
                          {act.durationSeconds && <span className="text-[10px] text-slate-400 flex items-center gap-0.5"><Clock size={10} /> {formatDuration(act.durationSeconds)}</span>}
                          {act.result && <span className="text-[10px] text-slate-400">· {act.result.replace(/_/g, " ")}</span>}
                          <span className="text-[10px] text-slate-300 ml-auto">{formatTimeAgo(act.createdAt)}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-1">{act.description}</p>
                        <p className="text-[10px] text-slate-400">by {act.user?.name ?? "System"}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Follow-ups */}
          <div className="reveal-item bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-[#0B73B9] rounded-full" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Follow-ups</h2>
                <span className="text-xs text-slate-400">{lead.followUps.length} total</span>
              </div>
              <button
                type="button"
                onClick={() => setShowFollowUpForm((visible) => !visible)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0B73B9] text-white text-xs font-semibold hover:bg-[#085C92] transition-colors"
              >
                {showFollowUpForm ? <X size={13} /> : <Plus size={13} />}
                {showFollowUpForm ? "Close" : "Schedule"}
              </button>
            </div>
            {showFollowUpForm && (
              <form
                className="border-b border-slate-100 bg-slate-50/70 px-6 md:px-8 py-5 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  addFollowUpMutation.mutate({
                    type: followUpType,
                    scheduledAt: new Date(followUpScheduledAt).toISOString(),
                    nextFollowUpAt: nextFollowUpAt ? new Date(nextFollowUpAt).toISOString() : null,
                    notes: followUpNotes.trim() || null,
                    assignedToId: followUpAssignedToId
                      ? Number(followUpAssignedToId)
                      : lead.assignedTo?.id ?? null,
                  });
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-600">Contact method</span>
                    <select
                      value={followUpType}
                      onChange={(event) => setFollowUpType(event.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20"
                    >
                      {["CALL", "WHATSAPP", "EMAIL", "SMS", "MEETING", "OTHER"].map((type) => (
                        <option key={type} value={type}>{formatStage(type)}</option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-600">Date and time</span>
                    <input
                      type="datetime-local"
                      required
                      min={toDateTimeInput(new Date(querySnapshotTime))}
                      value={followUpScheduledAt}
                      onChange={(event) => setFollowUpScheduledAt(event.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20"
                    />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-600">Next follow-up <span className="font-normal text-slate-400">(optional)</span></span>
                    <input
                      type="datetime-local"
                      min={followUpScheduledAt}
                      value={nextFollowUpAt}
                      onChange={(event) => setNextFollowUpAt(event.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20"
                    />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-600">Follow-up owner</span>
                    <select
                      value={followUpAssignedToId}
                      onChange={(event) => setFollowUpAssignedToId(event.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20"
                    >
                      <option value="">Lead owner{lead.assignedTo ? ` (${lead.assignedTo.name})` : " (unassigned)"}</option>
                      {(followUpMetadataQuery.data?.data.users ?? []).map((user) => (
                        <option key={user.id} value={user.id}>{user.name} · {formatStage(user.role)}</option>
                      ))}
                    </select>
                    {followUpMetadataQuery.isError && (
                      <span role="alert" className="block text-xs text-red-600">
                        Could not load staff: {followUpMetadataQuery.error instanceof Error ? followUpMetadataQuery.error.message : "request failed"}
                      </span>
                    )}
                  </label>
                </div>
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-600">Preparation notes <span className="font-normal text-slate-400">(optional)</span></span>
                  <textarea
                    rows={2}
                    maxLength={5000}
                    value={followUpNotes}
                    onChange={(event) => setFollowUpNotes(event.target.value)}
                    placeholder="What should be discussed or prepared?"
                    className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20"
                  />
                </label>
                {lead.assignedTo && (
                  <p className="text-xs text-slate-500">Assigned to {lead.assignedTo.name}, the lead owner.</p>
                )}
                {addFollowUpMutation.isError && (
                  <p role="alert" className="text-xs text-red-600">
                    {addFollowUpMutation.error instanceof Error ? addFollowUpMutation.error.message : "Could not schedule this follow-up."}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={addFollowUpMutation.isPending || !followUpScheduledAt}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0B73B9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#085C92] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CalendarClock size={14} />
                    {addFollowUpMutation.isPending ? "Scheduling..." : "Save follow-up"}
                  </button>
                </div>
              </form>
            )}
            {updateFollowUpMutation.isError && (
              <p role="alert" className="border-b border-red-100 bg-red-50 px-6 md:px-8 py-3 text-xs text-red-700">
                {updateFollowUpMutation.error instanceof Error ? updateFollowUpMutation.error.message : "Could not update the follow-up."}
              </p>
            )}
            <div className="divide-y divide-slate-50">
              {lead.followUps.length === 0 ? (
                <div className="px-6 md:px-8 py-10 text-center">
                  <CalendarClock size={24} className="mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-600">No follow-ups scheduled</p>
                  <p className="mt-1 text-xs text-slate-400">Plan the next contact so nothing falls through the cracks.</p>
                </div>
              ) : lead.followUps.map((fu) => {
                const overdue = fu.status === "PENDING" && new Date(fu.scheduledAt).getTime() < querySnapshotTime;
                const statusStyle = fu.status === "COMPLETED"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : fu.status === "PENDING"
                    ? overdue
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                    : fu.status === "MISSED"
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : "bg-slate-50 text-slate-600 border-slate-200";
                return (
                  <div key={fu.id} className="px-6 md:px-8 py-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${fu.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600" : overdue ? "bg-red-50 text-red-600" : fu.status === "PENDING" ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-400"}`}>
                        {fu.type === "CALL" ? <Phone size={15} /> : fu.type === "MEETING" ? <CalendarClock size={15} /> : fu.type === "EMAIL" ? <Mail size={15} /> : <MessageSquare size={15} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-slate-700">Follow-up #{fu.followUpNumber} · {formatStage(fu.type)}</span>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[9px] font-bold ${statusStyle}`}>
                            {overdue ? "OVERDUE" : formatStage(fu.status)}
                          </span>
                        </div>
                        <p className={`mt-1 text-xs ${overdue ? "font-semibold text-red-600" : "text-slate-500"}`}>
                          {formatDate(fu.scheduledAt)} at {formatTime(fu.scheduledAt)}
                        </p>
                        {fu.notes && <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-slate-600">{fu.notes}</p>}
                        {fu.assignedTo && <p className="mt-1 text-[11px] text-slate-400">Assigned to {fu.assignedTo.name}</p>}
                        {fu.outcome && <p className="mt-2 rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-800">Outcome: {fu.outcome}</p>}
                        {fu.nextFollowUpAt && <p className="mt-2 text-[11px] font-medium text-[#0B73B9]">Next follow-up: {formatDate(fu.nextFollowUpAt)} at {formatTime(fu.nextFollowUpAt)}</p>}
                        {fu.status === "PENDING" && (
                          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                            <input
                              type="text"
                              maxLength={5000}
                              value={followUpOutcomeDrafts[fu.id] ?? ""}
                              onChange={(event) => setFollowUpOutcomeDrafts((current) => ({ ...current, [fu.id]: event.target.value }))}
                              placeholder="Outcome (optional)"
                              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20"
                            />
                            <div className="flex gap-2">
                              <input
                                type="datetime-local"
                                min={toDateTimeInput(new Date())}
                                value={followUpScheduleDrafts[fu.id] ?? toDateTimeInput(new Date(fu.scheduledAt))}
                                onChange={(event) => setFollowUpScheduleDrafts((current) => ({ ...current, [fu.id]: event.target.value }))}
                                aria-label={`Reschedule follow-up ${fu.followUpNumber}`}
                                className="min-w-0 rounded-lg border border-slate-200 px-2 py-2 text-[11px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20"
                              />
                              <button
                                type="button"
                                disabled={updateFollowUpMutation.isPending || !followUpScheduleDrafts[fu.id]}
                                onClick={() => {
                                  const date = followUpScheduleDrafts[fu.id];
                                  if (!date) return;
                                  updateFollowUpMutation.mutate({
                                    followUpId: fu.id,
                                    changes: { scheduledAt: new Date(date).toISOString() },
                                  });
                                }}
                                className="rounded-lg border border-[#0B73B9]/20 px-3 py-2 text-[11px] font-semibold text-[#0B73B9] hover:bg-[#0B73B9]/5 disabled:opacity-50"
                              >
                                Reschedule
                              </button>
                              <button
                                type="button"
                                disabled={updateFollowUpMutation.isPending}
                                onClick={() => updateFollowUpMutation.mutate({
                                  followUpId: fu.id,
                                  changes: { status: "COMPLETED", outcome: followUpOutcomeDrafts[fu.id]?.trim() || "" },
                                })}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                              >
                                <Check size={13} /> Complete
                              </button>
                              {overdue && (
                                <button
                                  type="button"
                                  disabled={updateFollowUpMutation.isPending}
                                  onClick={() => updateFollowUpMutation.mutate({ followUpId: fu.id, changes: { status: "MISSED" } })}
                                  className="rounded-lg border border-orange-200 px-3 py-2 text-[11px] font-semibold text-orange-700 hover:bg-orange-50 disabled:opacity-50"
                                >
                                  Mark missed
                                </button>
                              )}
                              <button
                                type="button"
                                disabled={updateFollowUpMutation.isPending}
                                onClick={() => updateFollowUpMutation.mutate({ followUpId: fu.id, changes: { status: "CANCELLED" } })}
                                className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="reveal-item bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-[#f4d210] rounded-full" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Notes</h2>
              </div>
              <span className="text-xs text-slate-400">{lead.notes.length} notes</span>
            </div>
            <div className="px-6 md:px-8 py-5 space-y-4">
              {lead.notes.map((note) => (
                <div key={note.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-slate-500">{(note.user?.name ?? "System").split(" ").map((n) => n[0]).join("")}</span>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-lg p-3.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-700">{note.user?.name ?? "System"}</span>
                      <span className="text-[10px] text-slate-400">{formatTimeAgo(note.createdAt)}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{note.content}</p>
                  </div>
                </div>
              ))}
              {/* Add Note */}
              <div className="flex gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-[#0B73B9] flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-white">JA</span>
                </div>
                <div className="flex-1 flex gap-2">
                  <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a quick note..." className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20" />
                  <button
                    type="button"
                    aria-label="Add note"
                    disabled={!newNote.trim() || addNoteMutation.isPending}
                    onClick={() => addNoteMutation.mutate(newNote.trim())}
                    className="w-10 h-10 rounded-lg bg-[#0B73B9] flex items-center justify-center text-white hover:bg-[#085C92] transition-colors flex-shrink-0 disabled:opacity-50"
                  >
                    <Send size={15} />
                  </button>
                </div>
                {(addNoteMutation.isError || updateLeadMutation.isError) && (
                  <p role="alert" className="text-xs text-red-600">
                    {(addNoteMutation.error ?? updateLeadMutation.error) instanceof Error
                      ? (addNoteMutation.error ?? updateLeadMutation.error)?.message
                      : "Could not save this change."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Stage Card */}
          <div className="reveal-item bg-white rounded-xl border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 bg-[#0B73B9] rounded-full" />
              <h3 className="text-base font-bold text-slate-900">Pipeline Stage</h3>
            </div>
            <div className="relative">
              <button onClick={() => setShowStageDropdown(!showStageDropdown)} className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-bold ${stageColors[lead.stage]}`}>{formatStage(lead.stage)}</span>
                <ChevronLeft size={15} className={`text-slate-400 transition-transform ${showStageDropdown ? "-rotate-90" : ""}`} />
              </button>
              {showStageDropdown && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1 max-h-60 overflow-y-auto">
                  {stages.map((s) => (
                    <button key={s} disabled={updateLeadMutation.isPending} onClick={() => { setShowStageDropdown(false); if (s !== lead.stage) updateLeadMutation.mutate({ stage: s }); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${s === lead.stage ? "font-bold text-[#0B73B9]" : "text-slate-600"}`}>
                      {formatStage(s)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Click to change stage</p>
          </div>

          {/* Status Card */}
          <div className="reveal-item bg-white rounded-xl border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 bg-[#f4d210] rounded-full" />
              <h3 className="text-base font-bold text-slate-900">Lead Status</h3>
            </div>
            <div className="relative">
              <button onClick={() => setShowStatusDropdown(!showStatusDropdown)} className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-bold ${statusColors[lead.status]}`}>{formatStage(lead.status)}</span>
                <ChevronLeft size={15} className={`text-slate-400 transition-transform ${showStatusDropdown ? "-rotate-90" : ""}`} />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1 max-h-60 overflow-y-auto">
                  {statuses.map((s) => (
                    <button key={s} disabled={updateLeadMutation.isPending} onClick={() => { setShowStatusDropdown(false); if (s !== lead.status) updateLeadMutation.mutate({ status: s }); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${s === lead.status ? "font-bold text-[#0B73B9]" : "text-slate-600"}`}>
                      {formatStage(s)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Assignment */}
          <div className="reveal-item bg-white rounded-xl border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 bg-[#0B73B9] rounded-full" />
              <h3 className="text-base font-bold text-slate-900">Assigned To</h3>
            </div>
            {lead.assignedTo ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B73B9] to-[#085C92] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">{lead.assignedTo.name.split(" ").map((n) => n[0]).join("")}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{lead.assignedTo.name}</p>
                  <p className="text-[10px] text-slate-400">{lead.assignedTo.email}</p>
                </div>
              </div>
            ) : (
              <button className="w-full px-4 py-2.5 rounded-lg border border-dashed border-slate-300 text-sm text-slate-500 hover:border-[#0B73B9] hover:text-[#0B73B9] transition-colors">Assign Lead</button>
            )}
          </div>

          {/* Program Interests */}
          <div className="reveal-item bg-white rounded-xl border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 bg-[#f4d210] rounded-full" />
              <h3 className="text-base font-bold text-slate-900">Programs of Interest</h3>
            </div>
            <div className="space-y-2">
              {lead.programInterests.map((pi) => (
                <div key={pi.course.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-md bg-[#0B73B9]/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={14} className="text-[#0B73B9]" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{pi.course.title}</p>
                    <p className="text-[10px] text-slate-400">{pi.course.code}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div className="reveal-item bg-[#001B30] rounded-xl p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-[50px] bg-[#0B73B9] pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase text-white/40">Source</span>
                <span className="text-xs font-semibold text-white/80">{lead.source?.name ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase text-white/40">Created</span>
                <span className="text-xs font-semibold text-white/80">{formatDate(lead.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase text-white/40">Updated</span>
                <span className="text-xs font-semibold text-white/80">{formatDate(lead.updatedAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase text-white/40">Lead ID</span>
                <span className="text-xs font-semibold text-white/80">#{lead.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════ HISTORY ═══════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Stage History */}
        <div className="reveal-item bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-[#0B73B9] rounded-full" />
              <h3 className="text-base font-bold text-slate-900">Stage History</h3>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {lead.stageHistory.map((h) => (
              <div key={h.id} className="px-6 py-3.5 flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1">
                  {h.oldStage && <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${stageColors[h.oldStage]}`}>{formatStage(h.oldStage)}</span>}
                  <ArrowRight size={12} className="text-slate-300" />
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${stageColors[h.newStage]}`}>{formatStage(h.newStage)}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">{h.changedBy?.name ?? "System"}</p>
                  <p className="text-[10px] text-slate-300">{formatDate(h.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status History */}
        <div className="reveal-item bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-[#f4d210] rounded-full" />
              <h3 className="text-base font-bold text-slate-900">Status History</h3>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {lead.statusHistory.map((h) => (
              <div key={h.id} className="px-6 py-3.5 flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1">
                  {h.oldStatus && <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${statusColors[h.oldStatus]}`}>{formatStage(h.oldStatus)}</span>}
                  {h.oldStatus && <ArrowRight size={12} className="text-slate-300" />}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${statusColors[h.newStatus]}`}>{formatStage(h.newStatus)}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">{h.changedBy?.name ?? "System"}</p>
                  <p className="text-[10px] text-slate-300">{formatDate(h.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}