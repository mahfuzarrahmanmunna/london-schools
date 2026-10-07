"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarClock,
  Check,
  Clock3,
  Mail,
  MessageSquare,
  Phone,
  Search,
  X,
} from "lucide-react";
import { dashboardQueryKeys, fetchApi, leadsApiUrl } from "../api";

type FollowUp = {
  id: number;
  followUpNumber: number;
  type: string;
  scheduledAt: string;
  nextFollowUpAt: string | null;
  completedAt: string | null;
  status: "PENDING" | "COMPLETED" | "MISSED" | "CANCELLED";
  outcome: string | null;
  notes: string | null;
  assignedTo: { id: number; name: string } | null;
  lead: {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    stage: string;
    assignedTo: { id: number; name: string } | null;
  };
};

type FollowUpStatus = "ALL" | "PENDING" | "OVERDUE" | "COMPLETED" | "MISSED" | "CANCELLED";
type FollowUpResponse = {
  success: boolean;
  data: FollowUp[];
  stats: { pending: number; overdue: number; completed: number; missed: number };
};

const statuses: FollowUpStatus[] = ["ALL", "PENDING", "OVERDUE", "COMPLETED", "MISSED", "CANCELLED"];
const formatLabel = (value: string) => value.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
const formatDate = (value: string) =>
  new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function MethodIcon({ method }: { method: string }) {
  if (method === "CALL") return <Phone size={16} />;
  if (method === "EMAIL") return <Mail size={16} />;
  if (method === "MEETING") return <CalendarClock size={16} />;
  return <MessageSquare size={16} />;
}

export default function FollowUpsPage() {
  const [status, setStatus] = useState<FollowUpStatus>("ALL");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const readStatusFromUrl = () => {
      const requested = new URLSearchParams(window.location.search).get("status");
      setStatus(statuses.includes(requested as FollowUpStatus) ? requested as FollowUpStatus : "ALL");
    };
    readStatusFromUrl();
    window.addEventListener("popstate", readStatusFromUrl);
    return () => window.removeEventListener("popstate", readStatusFromUrl);
  }, []);

  const followUpsQuery = useQuery({
    queryKey: [...dashboardQueryKeys.followUps, { status, search }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (status !== "ALL") params.set("status", status);
      if (search.trim()) params.set("search", search.trim());
      const query = params.toString();
      return fetchApi<FollowUpResponse>(`${leadsApiUrl}/follow-ups${query ? `?${query}` : ""}`);
    },
    refetchInterval: 15_000,
  });

  const updateMutation = useMutation({
    mutationFn: (input: { leadId: number; followUpId: number; status: "COMPLETED" | "CANCELLED" | "MISSED" }) =>
      fetchApi(`${leadsApiUrl}/${input.leadId}/follow-ups/${input.followUpId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: input.status }),
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.followUps }),
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.leads }),
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.dashboard }),
      ]);
    },
  });

  const followUps = followUpsQuery.data?.data ?? [];
  const stats = followUpsQuery.data?.stats;
  const snapshotTime = followUpsQuery.dataUpdatedAt;

  const selectStatus = (nextStatus: FollowUpStatus) => {
    setStatus(nextStatus);
    const url = new URL(window.location.href);
    if (nextStatus === "ALL") url.searchParams.delete("status");
    else url.searchParams.set("status", nextStatus);
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  };

  return (
    <main className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B73B9]">CRM workspace</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Follow-ups</h1>
          <p className="mt-1 text-sm text-slate-500">Plan and track every next conversation with your leads.</p>
        </div>
        <p className="text-xs text-slate-400">Refreshes automatically every 15 seconds</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Pending", value: stats?.pending ?? 0, icon: Clock3, style: "text-amber-700 bg-amber-50" },
          { label: "Overdue", value: stats?.overdue ?? 0, icon: CalendarClock, style: "text-red-700 bg-red-50" },
          { label: "Completed", value: stats?.completed ?? 0, icon: Check, style: "text-emerald-700 bg-emerald-50" },
          { label: "Missed", value: stats?.missed ?? 0, icon: X, style: "text-orange-700 bg-orange-50" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{item.label}</span>
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.style}`}><Icon size={17} /></span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{item.value}</p>
            </div>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 md:px-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Follow-up schedule</h2>
              <p className="mt-1 text-xs text-slate-500">Up to 200 records shown, with the next scheduled follow-ups first.</p>
            </div>
            <label className="relative block w-full lg:max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search lead, notes, or outcome"
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#0B73B9]/20"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {statuses.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => selectStatus(option)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  status === option ? "bg-[#0B73B9] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {formatLabel(option)}
              </button>
            ))}
          </div>
        </div>

        {updateMutation.isError && (
          <p role="alert" className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700 md:px-7">
            {updateMutation.error instanceof Error ? updateMutation.error.message : "Could not update this follow-up."}
          </p>
        )}
        {followUpsQuery.isLoading ? (
          <div className="px-6 py-16 text-center text-sm text-slate-500">Loading follow-ups…</div>
        ) : followUpsQuery.isError ? (
          <div role="alert" className="px-6 py-12 text-center">
            <p className="text-sm font-semibold text-red-700">
              {followUpsQuery.error instanceof Error ? followUpsQuery.error.message : "Could not load follow-ups."}
            </p>
            <button type="button" onClick={() => void followUpsQuery.refetch()} className="mt-2 text-xs font-semibold text-[#0B73B9] underline">Try again</button>
          </div>
        ) : followUps.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <CalendarClock size={28} className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-700">No follow-ups match this view</p>
            <p className="mt-1 text-xs text-slate-400">Schedule one from a lead’s detail page to get started.</p>
            <Link href="/dashboard/leads" className="mt-4 inline-flex rounded-lg bg-[#0B73B9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#085C92]">Browse leads</Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {followUps.map((item) => {
              const overdue = item.status === "PENDING" && new Date(item.scheduledAt).getTime() < snapshotTime;
              const badge = overdue
                ? "border-red-200 bg-red-50 text-red-700"
                : item.status === "PENDING"
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : item.status === "COMPLETED"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : item.status === "MISSED"
                      ? "border-orange-200 bg-orange-50 text-orange-700"
                      : "border-slate-200 bg-slate-50 text-slate-600";
              return (
                <article key={item.id} className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:px-7">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${overdue ? "bg-red-50 text-red-600" : item.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600" : "bg-[#0B73B9]/10 text-[#0B73B9]"}`}>
                    <MethodIcon method={item.type} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/dashboard/leads/${item.lead.id}`} className="text-sm font-bold text-slate-900 hover:text-[#0B73B9]">
                        {item.lead.firstName} {item.lead.lastName ?? ""}
                      </Link>
                      <span className="text-xs text-slate-400">· #{item.followUpNumber} {formatLabel(item.type)}</span>
                      <span className={`rounded border px-2 py-0.5 text-[10px] font-bold ${badge}`}>{overdue ? "OVERDUE" : formatLabel(item.status)}</span>
                    </div>
                    <p className={`mt-1 text-xs ${overdue ? "font-semibold text-red-600" : "text-slate-500"}`}>
                      {formatDate(item.scheduledAt)}
                    </p>
                    {(item.lead.phone || item.lead.email) && (
                      <p className="mt-1 text-xs text-slate-400">{[item.lead.phone, item.lead.email].filter(Boolean).join(" · ")}</p>
                    )}
                    {item.notes && <p className="mt-2 whitespace-pre-wrap text-xs text-slate-600">{item.notes}</p>}
                    {item.outcome && <p className="mt-1 text-xs text-emerald-700">Outcome: {item.outcome}</p>}
                    {item.nextFollowUpAt && <p className="mt-1 text-xs font-medium text-[#0B73B9]">Next contact: {formatDate(item.nextFollowUpAt)}</p>}
                    <p className="mt-1 text-[11px] text-slate-400">
                      {item.assignedTo ? `Follow-up owner: ${item.assignedTo.name}` : item.lead.assignedTo ? `Lead owner: ${item.lead.assignedTo.name}` : "Unassigned"}
                    </p>
                  </div>
                  {item.status === "PENDING" && (
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        disabled={updateMutation.isPending}
                        onClick={() => updateMutation.mutate({ leadId: item.lead.id, followUpId: item.id, status: "COMPLETED" })}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                      >
                        <Check size={13} /> Complete
                      </button>
                      <button
                        type="button"
                        disabled={updateMutation.isPending}
                        onClick={() => updateMutation.mutate({ leadId: item.lead.id, followUpId: item.id, status: "CANCELLED" })}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      {overdue && (
                        <button
                          type="button"
                          disabled={updateMutation.isPending}
                          onClick={() => updateMutation.mutate({ leadId: item.lead.id, followUpId: item.id, status: "MISSED" })}
                          className="rounded-lg border border-orange-200 px-3 py-2 text-xs font-semibold text-orange-700 hover:bg-orange-50 disabled:opacity-50"
                        >
                          Mark missed
                        </button>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
