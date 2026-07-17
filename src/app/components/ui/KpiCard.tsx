import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { P } from "@/app/data/designTokens";

export interface KpiCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  trend?: number;
  color: string;
  gradient?: boolean;
}

export function KpiCard({ icon: Icon, label, value, sub, trend, color, gradient }: KpiCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ border: `1px solid ${P.border}`, background: gradient ? `linear-gradient(135deg,${color}ee,${color}bb)` : "white" }}>
      {gradient && <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.08)" }} />}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: gradient ? "rgba(255,255,255,0.2)" : `${color}1a` }}>
          <Icon size={18} style={{ color: gradient ? "#fff" : color }} />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-[10.5px] font-bold px-2 py-0.5 rounded-full ${trend >= 0 ? (gradient ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600") : (gradient ? "bg-black/15 text-white" : "bg-rose-50 text-rose-600")}`}>
            {trend >= 0 ? <TrendingUp size={9} /> : <TrendingDown size={9} />}{Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className={`text-[22px] font-bold tracking-tight mb-0.5 ${gradient ? "text-white" : "text-[#0C1B33]"}`}
        style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{value}</div>
      <div className={`text-[12.5px] font-medium ${gradient ? "text-white/80" : "text-[#64748B]"}`}>{label}</div>
      <div className={`text-[11px] mt-0.5 ${gradient ? "text-white/50" : "text-[#94A3B8]"}`}>{sub}</div>
    </div>
  );
}

export default KpiCard;
