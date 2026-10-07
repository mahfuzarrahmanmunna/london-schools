"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys, fetchApi, leadsApiUrl } from "../../api";
import {
  ChevronLeft,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Send,
  User,
  MapPin,
  Briefcase,
  Tag,
  UserCheck,
  StickyNote,
} from "lucide-react";

type LeadMetadata = {
  sources: { id: number; name: string }[];
  programs: { id: number; title: string; code: string }[];
  users: { id: number; name: string; role: string }[];
};

/* ─── Component ─────────────────────────────────────── */

export default function CreateLeadPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const metadataQuery = useQuery({
    queryKey: dashboardQueryKeys.leadMetadata,
    queryFn: () =>
      fetchApi<{ success: boolean; data: LeadMetadata }>(`${leadsApiUrl}/metadata`),
    refetchInterval: 60_000,
  });
  const metadata = metadataQuery.data?.data;
  const createLeadMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      fetchApi<{ success: boolean; data: { id: number } }>(leadsApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.leads }),
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.dashboard }),
      ]);
    },
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    company: "",
    jobTitle: "",
    workExperienceYears: "",
    highestEducation: "",
    sourceId: "",
    externalLeadId: "",
    priority: "",
    temperature: "",
    quality: "",
    assignedToId: "",
    programIds: [] as number[],
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleProgram = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      programIds: prev.programIds.includes(id)
        ? prev.programIds.filter((p) => p !== id)
        : [...prev.programIds, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName || undefined,
        email: formData.email || undefined,
        phone: formData.phone,
        country: formData.country || undefined,
        city: formData.city || undefined,
        company: formData.company || undefined,
        jobTitle: formData.jobTitle || undefined,
        workExperienceYears: formData.workExperienceYears
          ? Number(formData.workExperienceYears)
          : undefined,
        highestEducation: formData.highestEducation || undefined,
        sourceId: formData.sourceId ? Number(formData.sourceId) : undefined,
        externalLeadId: formData.externalLeadId || undefined,
        priority: formData.priority || undefined,
        temperature: formData.temperature || undefined,
        quality: formData.quality || undefined,
        assignedToId: formData.assignedToId ? Number(formData.assignedToId) : undefined,
        programIds: formData.programIds,
        notes: formData.notes || undefined,
      };
      await createLeadMutation.mutateAsync(payload);
      setIsSubmitted(true);
      router.push("/dashboard/leads");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create lead. Please try again.");
    }
  };

  const isSubmitting = createLeadMutation.isPending;

  const inputClasses =
    "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B73B9]/20 focus:border-[#0B73B9]/40 transition-all disabled:opacity-50";
  const labelClasses = "block text-xs font-bold tracking-wider uppercase text-slate-500 mb-2";
  const selectClasses = `${inputClasses} appearance-none cursor-pointer pr-10`;

  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 0.75rem center",
    backgroundSize: "1.1rem",
  };

  const sectionIcon = "w-4 h-4 text-[#0B73B9]";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/leads" className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-6 bg-[#0B73B9] rounded-full" />
            <h1 className="text-2xl font-medium text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Create New Lead
            </h1>
          </div>
          <p className="text-sm text-slate-400 ml-4">Add a new lead to the CRM system</p>
        </div>
      </div>

      {metadataQuery.isLoading && (
        <p role="status" className="mb-4 text-sm text-slate-500">
          Loading lead sources, programs, and users…
        </p>
      )}
      {metadataQuery.isError && (
        <div role="alert" className="mb-4 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{metadataQuery.error instanceof Error ? metadataQuery.error.message : "Unable to load lead options."}</span>
          <button type="button" onClick={() => void metadataQuery.refetch()} className="font-semibold underline">
            Retry
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#0B73B9]/5 border border-[#0B73B9]/10 flex items-center justify-center">
              <User className={sectionIcon} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Personal Information</h2>
              <p className="text-xs text-slate-400">Basic contact details</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>First Name *</label>
              <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="John" />
            </div>
            <div>
              <label className={labelClasses}>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="Doe" />
            </div>
            <div>
              <label className={labelClasses}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="john@gmail.com" />
            </div>
            <div>
              <label className={labelClasses}>Phone Number *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="+44 7700 000000" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#0B73B9]/5 border border-[#0B73B9]/10 flex items-center justify-center">
              <MapPin className={sectionIcon} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Location</h2>
              <p className="text-xs text-slate-400">Where the lead is based</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="United Kingdom" />
            </div>
            <div>
              <label className={labelClasses}>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="London" />
            </div>
          </div>
        </div>

        {/* Professional */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#0B73B9]/5 border border-[#0B73B9]/10 flex items-center justify-center">
              <Briefcase className={sectionIcon} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Professional Details</h2>
              <p className="text-xs text-slate-400">Education and work background</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Highest Education</label>
              <select name="highestEducation" value={formData.highestEducation} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={selectClasses} style={selectStyle}>
                <option value="">Select education</option>
                <option value="HIGH_SCHOOL">High School</option>
                <option value="DIPLOMA">Diploma</option>
                <option value="BACHELORS">Bachelors</option>
                <option value="MASTERS">Masters</option>
                <option value="PHD">PhD</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Job Title</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="Procurement Manager" />
            </div>
            <div>
              <label className={labelClasses}>Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="Company Ltd." />
            </div>
            <div>
              <label className={labelClasses}>Work Experience (Years)</label>
              <input type="number" name="workExperienceYears" value={formData.workExperienceYears} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="5" min="0" max="80" />
            </div>
          </div>
        </div>

        {/* Lead Info */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#0B73B9]/5 border border-[#0B73B9]/10 flex items-center justify-center">
              <Tag className={sectionIcon} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Lead Information</h2>
              <p className="text-xs text-slate-400">Source, priority, and classification</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Lead Source</label>
              <select name="sourceId" value={formData.sourceId} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={selectClasses} style={selectStyle}>
                <option value="">Select source</option>
                {(metadata?.sources ?? []).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClasses}>External Lead ID</label>
              <input type="text" name="externalLeadId" value={formData.externalLeadId} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={inputClasses} placeholder="Meta/Google lead ID" />
            </div>
            <div>
              <label className={labelClasses}>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={selectClasses} style={selectStyle}>
                <option value="">Select priority</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Temperature</label>
              <select name="temperature" value={formData.temperature} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={selectClasses} style={selectStyle}>
                <option value="">Select temperature</option>
                <option value="HOT">Hot</option>
                <option value="WARM">Warm</option>
                <option value="COLD">Cold</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Lead Quality</label>
              <select name="quality" value={formData.quality} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={selectClasses} style={selectStyle}>
                <option value="">Select quality</option>
                <option value="TOP_QUALITY">Top Quality</option>
                <option value="HIGH_QUALITY">High Quality</option>
                <option value="MEDIUM_QUALITY">Medium Quality</option>
                <option value="LOW_QUALITY">Low Quality</option>
                <option value="IRRELEVANT">Irrelevant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assignment + Programs */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#0B73B9]/5 border border-[#0B73B9]/10 flex items-center justify-center">
              <UserCheck className={sectionIcon} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Assignment & Programs</h2>
              <p className="text-xs text-slate-400">Assign salesperson and select programs of interest</p>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <label className={labelClasses}>Assign To</label>
              <select name="assignedToId" value={formData.assignedToId} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={selectClasses} style={selectStyle}>
                <option value="">Leave unassigned</option>
                {(metadata?.users ?? []).map((u) => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
              </select>
            </div>
            <div>
              <label className={labelClasses}>Programs of Interest</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {(metadata?.programs ?? []).map((p) => (
                  <label key={p.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${formData.programIds.includes(p.id) ? "border-[#0B73B9] bg-[#0B73B9]/5" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input type="checkbox" checked={formData.programIds.includes(p.id)} onChange={() => toggleProgram(p.id)} className="w-4 h-4 rounded border-slate-300 text-[#0B73B9] focus:ring-[#0B73B9]/30" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">{p.title}</p>
                      <p className="text-[10px] text-slate-400">{p.code}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#0B73B9]/5 border border-[#0B73B9]/10 flex items-center justify-center">
              <StickyNote className={sectionIcon} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Notes</h2>
              <p className="text-xs text-slate-400">Any additional information about this lead</p>
            </div>
          </div>
          <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange} disabled={isSubmitting || isSubmitted} className={`${inputClasses} resize-none`} placeholder="Interested in MBA Global. Budget confirmed. Wants to start in March intake..." />
        </div>

        {/* Error / Success */}
        {error && (
          <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-lg text-sm font-medium">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {isSubmitted && (
          <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-4 rounded-lg text-sm font-medium">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-bold">Lead Created Successfully</p>
              <p className="text-xs text-emerald-600 mt-0.5">The lead has been added to the CRM with stage: NEW and status: ACTIVE.</p>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center gap-3 pb-8">
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={`group flex items-center justify-center gap-3 px-8 py-3.5 text-white rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300 min-h-[50px] ${
              isSubmitted ? "bg-emerald-500 cursor-not-allowed" : isSubmitting ? "bg-[#085C92] cursor-wait" : "bg-[#0B73B9] hover:bg-[#085C92] hover:shadow-lg hover:shadow-[#0B73B9]/20"
            }`}
          >
            {isSubmitted ? (<><CheckCircle2 size={16} /> Lead Created</>) : isSubmitting ? (<><Loader2 size={16} className="animate-spin" /> Creating Lead...</>) : (<>Create Lead <Send size={15} className="group-hover:translate-x-1 transition-transform" /></>)}
          </button>
          <Link href="/dashboard/leads" className="px-6 py-3.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}