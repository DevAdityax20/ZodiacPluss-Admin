import React from "react";
import { P } from "@/app/data/designTokens";

export interface StatusBadgeProps {
  s: string;
}

export function StatusBadge({ s }: StatusBadgeProps) {
  const map: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    inactive: "bg-slate-50 text-slate-500 border-slate-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    verified: "bg-sky-50 text-sky-700 border-sky-200",
    open: "bg-rose-50 text-rose-700 border-rose-100",
    "in-progress": "bg-violet-50 text-violet-700 border-violet-200",
    resolved: "bg-emerald-50 text-emerald-700 border-emerald-100",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    processing: "bg-amber-50 text-amber-700 border-amber-200",
    live: "bg-emerald-50 text-emerald-700 border-emerald-100",
    review: "bg-amber-50 text-amber-700 border-amber-200",
    published: "bg-sky-50 text-sky-700 border-sky-200",
    draft: "bg-slate-50 text-slate-500 border-slate-200",
    scheduled: "bg-violet-50 text-violet-700 border-violet-200",
    Enterprise: "bg-violet-50 text-violet-700 border-violet-200",
    Professional: "bg-sky-50 text-sky-700 border-sky-200",
    Starter: "bg-slate-50 text-slate-600 border-slate-200",
  };
  return (
    <span className={`inline-flex items-center text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full border capitalize ${map[s] ?? "bg-slate-50 text-slate-500 border-slate-200"}`}>{s}</span>
  );
}

export default StatusBadge;
