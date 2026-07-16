import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Users, UserCheck, Briefcase, DollarSign, BarChart3,
  Headphones, Settings, Bell, Search, ChevronDown, ChevronRight, ChevronLeft,
  Moon, Sun, TrendingUp, TrendingDown, Star, Activity, Shield,
  MessageSquare, FileText, Globe, Zap, Eye, UserPlus, Filter,
  Download, RefreshCw, MoreHorizontal, CheckCircle, Clock, AlertTriangle,
  CreditCard, Wallet, ArrowUpRight, Building2, Target, Award, Sparkles,
  LogOut, Package, Layers, Cpu, ToggleLeft, Rocket, Users2, Crown,
  Phone, Tablet, MonitorSmartphone, GitBranch, Flame, X, Plus,
  ArrowRight, BadgeCheck, Bell as BellIcon, Inbox, Calendar,
  ChevronUp, Hash, Radio, PenSquare, Trash2, UserCog, Menu
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart as RPie, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart,
  RadialBarChart, RadialBar, ScatterChart, Scatter
} from "recharts";

// ─── Design tokens ────────────────────────────────────────────────────────────
const P = {
  navy: "#0C1B33", teal: "#0891B2", tealDark: "#0E7490", tealLight: "#E0F2FE",
  emerald: "#10B981", amber: "#F59E0B", violet: "#8B5CF6", rose: "#EF4444",
  slate: "#64748B", slateLight: "#94A3B8", bg: "#F1F5F9", card: "#FFFFFF",
  border: "rgba(12,27,51,0.07)",
};
const GRAD = [
  "linear-gradient(135deg,#0891B2,#0E7490)", "linear-gradient(135deg,#10B981,#059669)",
  "linear-gradient(135deg,#8B5CF6,#6D28D9)", "linear-gradient(135deg,#F59E0B,#D97706)",
  "linear-gradient(135deg,#EF4444,#DC2626)", "linear-gradient(135deg,#EC4899,#DB2777)",
];
const avatarGrad = (i: number) => GRAD[Math.abs(i) % GRAD.length];
const initials = (n: string) => n.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
const fmtK = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : `${n}`;
const fmtINR = (n: number) => {
  const a = Math.abs(n), pre = n < 0 ? "-₹" : "₹";
  return a >= 1e7 ? `${pre}${(a / 1e7).toFixed(2)}Cr` : a >= 1e5 ? `${pre}${(a / 1e5).toFixed(2)}L` : a >= 1e3 ? `${pre}${(a / 1e3).toFixed(1)}K` : `${pre}${a}`;
};
const tipStyle = { borderRadius: 12, border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: 12, padding: "8px 12px" };

// ─── Static data ──────────────────────────────────────────────────────────────
const monthlyGrowth = [
  { m: "Aug", c: 18200, e: 820, eap: 2100 }, { m: "Sep", c: 19400, e: 890, eap: 2400 },
  { m: "Oct", c: 20100, e: 940, eap: 2800 }, { m: "Nov", c: 21300, e: 1010, eap: 3100 },
  { m: "Dec", c: 20800, e: 980, eap: 3000 }, { m: "Jan", c: 22100, e: 1080, eap: 3400 },
  { m: "Feb", c: 23400, e: 1130, eap: 3700 }, { m: "Mar", c: 22900, e: 1110, eap: 3600 },
  { m: "Apr", c: 23800, e: 1160, eap: 3900 }, { m: "May", c: 24200, e: 1200, eap: 4100 },
  { m: "Jun", c: 24700, e: 1230, eap: 4300 }, { m: "Jul", c: 24891, e: 1247, eap: 4520 },
];
const weekSessions = [
  { d: "Mon", total: 3420, done: 3180 }, { d: "Tue", total: 3870, done: 3590 },
  { d: "Wed", total: 4120, done: 3840 }, { d: "Thu", total: 3760, done: 3520 },
  { d: "Fri", total: 4380, done: 4100 }, { d: "Sat", total: 2940, done: 2720 },
  { d: "Sun", total: 2210, done: 2050 },
];
const revenueMonthly = [
  { m: "Jan", sub: 84200, sess: 38400, eap: 22100 }, { m: "Feb", sub: 88400, sess: 41200, eap: 24300 },
  { m: "Mar", sub: 91200, sess: 43800, eap: 26800 }, { m: "Apr", sub: 95600, sess: 46200, eap: 28400 },
  { m: "May", sub: 98900, sess: 49100, eap: 30200 }, { m: "Jun", sub: 103400, sess: 52300, eap: 32700 },
  { m: "Jul", sub: 108200, sess: 55800, eap: 35100 },
];
const retentionData = [
  { m: "Jan", d7: 72, d30: 54, d90: 38 }, { m: "Feb", d7: 74, d30: 56, d90: 40 },
  { m: "Mar", d7: 76, d30: 58, d90: 42 }, { m: "Apr", d7: 75, d30: 57, d90: 41 },
  { m: "May", d7: 78, d30: 61, d90: 44 }, { m: "Jun", d7: 80, d30: 63, d90: 46 },
  { m: "Jul", d7: 82, d30: 65, d90: 48 },
];
const expertCats = [
  { cat: "Astrology", experts: 312, sessions: 14200 }, { cat: "Therapy", experts: 248, sessions: 18900 },
  { cat: "Wellness", experts: 189, sessions: 11400 }, { cat: "Meditation", experts: 176, sessions: 9800 },
  { cat: "Nutrition", experts: 142, sessions: 7600 }, { cat: "Yoga", experts: 98, sessions: 6200 },
];
const userDist = [
  { name: "Clients", value: 24891, color: P.teal },
  { name: "Experts", value: 1247, color: P.emerald },
  { name: "EAP", value: 4520, color: P.amber },
];
const clients = [
  { id: "USR-4821", name: "Priya Sharma", email: "priya.sharma@gmail.com", plan: "Premium", sessions: 24, joined: "Jul 14, 2026", status: "active", sign: "Scorpio" },
  { id: "USR-4820", name: "Arjun Mehta", email: "arjun.m@outlook.com", plan: "Basic", sessions: 8, joined: "Jul 14, 2026", status: "active", sign: "Taurus" },
  { id: "USR-4819", name: "Sofia Laurent", email: "sofia.l@email.com", plan: "Premium+", sessions: 47, joined: "Jul 13, 2026", status: "active", sign: "Libra" },
  { id: "USR-4818", name: "Rahul Gupta", email: "rahulg@company.com", plan: "EAP", sessions: 12, joined: "Jul 13, 2026", status: "pending", sign: "Gemini" },
  { id: "USR-4817", name: "Emma Wilson", email: "emma.w@proton.me", plan: "Basic", sessions: 3, joined: "Jul 12, 2026", status: "active", sign: "Aries" },
  { id: "USR-4816", name: "Kavya Nair", email: "kavya.n@mail.com", plan: "Premium", sessions: 31, joined: "Jul 12, 2026", status: "inactive", sign: "Cancer" },
];
const experts = [
  { id: "EXP-0312", name: "Dr. Anika Rao", spec: "Vedic Astrology", rating: 4.9, sessions: 1284, earned: 38420, status: "verified" },
  { id: "EXP-0311", name: "James Hartwell", spec: "Jungian Therapy", rating: 4.8, sessions: 976, earned: 29380, status: "verified" },
  { id: "EXP-0310", name: "Preethi Venkat", spec: "Mindfulness Coach", rating: 4.7, sessions: 823, earned: 24690, status: "verified" },
  { id: "EXP-0309", name: "Mark Delacroix", spec: "Nutritionist", rating: 4.6, sessions: 641, earned: 19230, status: "pending" },
  { id: "EXP-0308", name: "Sunita Krishnan", spec: "Yoga Therapist", rating: 4.8, sessions: 512, earned: 15360, status: "verified" },
];
const eapCompanies = [
  { company: "TechCorp India", employees: 2400, active: 1820, util: 76, plan: "Enterprise", rev: 48000, renew: "Dec 2026" },
  { company: "GlobalBank Ltd.", employees: 1800, active: 1240, util: 69, plan: "Professional", rev: 36000, renew: "Mar 2027" },
  { company: "HealthFirst Pvt.", employees: 950, active: 760, util: 80, plan: "Enterprise", rev: 19000, renew: "Jan 2027" },
  { company: "Zephyr Solutions", employees: 620, active: 410, util: 66, plan: "Professional", rev: 12400, renew: "Sep 2026" },
  { company: "Meridian Holdings", employees: 480, active: 312, util: 65, plan: "Starter", rev: 9600, renew: "Nov 2026" },
];
const tickets = [
  { id: "TKT-8921", user: "Priya Sharma", type: "Billing", subject: "Subscription renewal failed", priority: "high", status: "open", date: "Jul 14", agent: "Ravi Kumar" },
  { id: "TKT-8920", user: "TechCorp India", type: "EAP", subject: "Employee onboarding issue", priority: "high", status: "in-progress", date: "Jul 14", agent: "Sneha Patel" },
  { id: "TKT-8919", user: "Mark Delacroix", type: "Expert", subject: "Profile verification pending", priority: "medium", status: "in-progress", date: "Jul 13", agent: "Ankit Singh" },
  { id: "TKT-8918", user: "Emma Wilson", type: "App", subject: "Session recording not saving", priority: "medium", status: "open", date: "Jul 13", agent: null },
  { id: "TKT-8917", user: "Arjun Mehta", type: "Billing", subject: "Refund for cancelled session", priority: "low", status: "resolved", date: "Jul 12", agent: "Ravi Kumar" },
  { id: "TKT-8916", user: "GlobalBank Ltd.", type: "EAP", subject: "Analytics report access", priority: "low", status: "resolved", date: "Jul 11", agent: "Sneha Patel" },
];
const transactions = [
  { id: "TXN-20192", user: "Priya Sharma", type: "Subscription", amount: 2999, status: "success", date: "Jul 14", method: "Card" },
  { id: "TXN-20191", user: "TechCorp India", type: "EAP Invoice", amount: 48000, status: "success", date: "Jul 14", method: "Bank Transfer" },
  { id: "TXN-20190", user: "Sofia Laurent", type: "Session", amount: 1499, status: "success", date: "Jul 13", method: "UPI" },
  { id: "TXN-20189", user: "Rahul Gupta", type: "Subscription", amount: 999, status: "pending", date: "Jul 13", method: "Card" },
  { id: "TXN-20188", user: "Emma Wilson", type: "Refund", amount: -1499, status: "processing", date: "Jul 12", method: "Card" },
  { id: "TXN-20187", user: "Dr. Anika Rao", type: "Expert Payout", amount: -12800, status: "success", date: "Jul 12", method: "Bank Transfer" },
];
const adminTeam = [
  { id: "ADM-001", name: "Rashmi Guia", role: "Super Admin", email: "rashmi.guia@zodiacpluss.com", dept: "Executive", status: "active", lastLogin: "2 min ago", perms: ["all"] },
  { id: "ADM-002", name: "Vikram Agarwal", role: "Finance Admin", email: "vikram.a@zodiacpluss.com", dept: "Finance", status: "active", lastLogin: "1 hour ago", perms: ["finance", "reports"] },
  { id: "ADM-003", name: "Sneha Patel", role: "Support Lead", email: "sneha.p@zodiacpluss.com", dept: "Support", status: "active", lastLogin: "15 min ago", perms: ["support", "users"] },
  { id: "ADM-004", name: "Ankit Singh", role: "Content Admin", email: "ankit.s@zodiacpluss.com", dept: "Product", status: "active", lastLogin: "3 hours ago", perms: ["content", "experts"] },
  { id: "ADM-005", name: "Ravi Kumar", role: "Support Agent", email: "ravi.k@zodiacpluss.com", dept: "Support", status: "active", lastLogin: "5 min ago", perms: ["support"] },
  { id: "ADM-006", name: "Meera Joshi", role: "Marketing Admin", email: "meera.j@zodiacpluss.com", dept: "Marketing", status: "inactive", lastLogin: "2 days ago", perms: ["analytics", "content"] },
];
const appReleases = [
  { app: "Client App (iOS)", version: "4.2.1", status: "live", users: "18.4K", rating: 4.8, date: "Jul 10, 2026" },
  { app: "Client App (Android)", version: "4.2.0", status: "live", users: "6.5K", rating: 4.6, date: "Jul 8, 2026" },
  { app: "Expert App (iOS)", version: "3.8.2", status: "live", users: "720", rating: 4.7, date: "Jul 9, 2026" },
  { app: "Expert App (Android)", version: "3.8.1", status: "review", users: "527", rating: 4.5, date: "Jul 12, 2026" },
  { app: "Admin Web Panel", version: "2.1.0", status: "live", users: "6", rating: null, date: "Jul 1, 2026" },
];
const featureFlags = [
  { name: "Astrology Chat v2", desc: "New real-time chat interface for astrology sessions", env: "Production", status: true, rollout: 100 },
  { name: "Group Sessions Beta", desc: "Allow experts to host sessions for up to 10 users", env: "Production", status: true, rollout: 25 },
  { name: "AI Match Engine", desc: "ML-based expert-user compatibility matching", env: "Staging", status: false, rollout: 0 },
  { name: "Voice Sessions", desc: "Audio-only session option for privacy-conscious users", env: "Production", status: true, rollout: 60 },
  { name: "EAP Dashboard v2", desc: "New corporate admin dashboard with drill-down analytics", env: "Dev", status: false, rollout: 0 },
  { name: "Smart Reminders", desc: "AI-generated session reminders based on user behaviour", env: "Production", status: true, rollout: 80 },
];
const contentItems = [
  { title: "Mercury Retrograde Guide 2026", type: "Article", category: "Astrology", status: "published", views: 48200, date: "Jul 10" },
  { title: "10-Minute Workplace Mindfulness", type: "Video", category: "Wellness", status: "published", views: 32100, date: "Jul 8" },
  { title: "Understanding Your Birth Chart", type: "Course", category: "Astrology", status: "draft", views: 0, date: "Jul 14" },
  { title: "Emotional Regulation Workbook", type: "PDF", category: "Therapy", status: "published", views: 19800, date: "Jun 28" },
  { title: "Full Moon Meditation Series", type: "Audio", category: "Meditation", status: "scheduled", views: 0, date: "Jul 20" },
];
const NOTIFICATIONS = [
  { id: 1, type: "alert", icon: AlertTriangle, color: P.rose, title: "High priority ticket opened", body: "TKT-8921 — Priya Sharma billing issue needs immediate attention", time: "2 min ago", read: false },
  { id: 2, type: "user", icon: UserPlus, color: P.teal, title: "New expert application", body: "Dr. Rahul Verma applied as a Vedic Astrology expert — review pending", time: "18 min ago", read: false },
  { id: 3, type: "payment", icon: DollarSign, color: P.emerald, title: "EAP invoice received", body: "TechCorp India paid ₹48,000 for July EAP subscription", time: "1h ago", read: false },
  { id: 4, type: "system", icon: Rocket, color: P.violet, title: "Expert App v3.8.2 in review", body: "Android app submitted to Play Store — review typically 24–48h", time: "3h ago", read: true },
  { id: 5, type: "alert", icon: Activity, color: P.amber, title: "Session volume spike", body: "Friday sessions are 24% above the weekly average — servers scaled", time: "5h ago", read: true },
  { id: 6, type: "user", icon: CheckCircle, color: P.emerald, title: "Expert verified", body: "James Hartwell's credentials were verified by the review team", time: "Yesterday", read: true },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────
const Badge = ({ s }: { s: string }) => {
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
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm ${className}`} style={{ border: `1px solid ${P.border}` }}>{children}</div>
);

type KpiProps = { icon: React.ElementType; label: string; value: string; sub: string; trend?: number; color: string; gradient?: boolean };
const Kpi = ({ icon: Icon, label, value, sub, trend, color, gradient }: KpiProps) => (
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

const SH = ({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-5">
    <div><h2 className="text-[14.5px] font-bold text-[#0C1B33]">{title}</h2>{sub && <p className="text-[11.5px] text-[#94A3B8] mt-0.5">{sub}</p>}</div>
    {right}
  </div>
);

const TH = ({ cols }: { cols: string[] }) => (
  <thead><tr style={{ borderBottom: `1px solid ${P.border}` }}>
    {cols.map(c => <th key={c} className="text-left text-[10.5px] font-semibold uppercase tracking-wide pb-3 pr-4" style={{ color: P.slateLight }}>{c}</th>)}
  </tr></thead>
);

const Av = ({ name, idx = 0, size = "w-8 h-8" }: { name: string; idx?: number; size?: string }) => (
  <div className={`${size} rounded-xl flex items-center justify-center text-[10.5px] font-bold text-white flex-shrink-0`}
    style={{ background: avatarGrad(idx) }}>{initials(name)}</div>
);

const ProgBar = ({ pct, color }: { pct: number; color: string }) => (
  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
  </div>
);

// ─── Sidebar nav config ───────────────────────────────────────────────────────
// Main section (top, above first divider)
const NAV_MAIN = [
  { id: "dashboard", label: "Dashboard" },
  { id: "clients", label: "Client Users" },
  { id: "experts", label: "Expert Users" },
  { id: "support", label: "Inbox", badge: 23 },
  { id: "finance", label: "Transactions" },
];

// Pages section (below PAGES label)
const NAV_PAGES = [
  { id: "pricing", label: "Pricing" },
  { id: "eap", label: "EAP / Calendar" },
  { id: "analytics", label: "Analytics" },
  { id: "operations", label: "Operations" },
  { id: "adminteam", label: "Admin Team" },
  { id: "reports", label: "Reports" },
  { id: "ui", label: "UI Elements" },
  { id: "table", label: "Data Table" },
];

const PAGE_CRUMBS: Record<string, string[]> = {
  dashboard: ["Dashboard"],
  clients: ["Client Users"],
  experts: ["Expert Users"],
  support: ["Inbox / Support"],
  finance: ["Finance", "Transactions"],
  pricing: ["Pages", "Pricing"],
  eap: ["Pages", "EAP / Calendar"],
  analytics: ["Pages", "Analytics"],
  operations: ["Pages", "Operations"],
  adminteam: ["Pages", "Admin Team"],
  reports: ["Pages", "Reports"],
  ui: ["Pages", "UI Elements"],
  table: ["Pages", "Data Table"],
  settings: ["Settings"],
};

// ─── Notification panel ───────────────────────────────────────────────────────
function NotifPanel({ onClose }: { onClose: () => void }) {
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const unread = notes.filter(n => !n.read).length;
  const markAll = () => setNotes(prev => prev.map(n => ({ ...n, read: true })));
  const markOne = (id: number) => setNotes(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="absolute top-12 right-0 w-[380px] rounded-2xl shadow-2xl overflow-hidden z-50 bg-white"
      style={{ border: `1px solid ${P.border}` }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${P.border}` }}>
        <div>
          <h3 className="text-[14px] font-bold text-[#0C1B33]">Notifications</h3>
          {unread > 0 && <p className="text-[11px] text-[#94A3B8]">{unread} unread</p>}
        </div>
        <div className="flex items-center gap-2">
          {unread > 0 && (
            <button onClick={markAll} className="text-[11px] font-semibold hover:underline" style={{ color: P.teal }}>Mark all read</button>
          )}
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-all" style={{ color: P.slate }}>
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="max-h-[420px] overflow-y-auto">
        {notes.map(n => {
          const Icon = n.icon;
          return (
            <div key={n.id}
              className={`flex gap-3 px-5 py-3.5 cursor-pointer transition-all hover:bg-slate-50 ${!n.read ? "bg-sky-50/40" : ""}`}
              style={{ borderBottom: `1px solid ${P.border}` }}
              onClick={() => markOne(n.id)}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${n.color}18` }}>
                <Icon size={15} style={{ color: n.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[12.5px] font-semibold text-[#0C1B33] leading-snug ${!n.read ? "" : "font-medium"}`}>{n.title}</span>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: P.teal }} />}
                </div>
                <p className="text-[11px] leading-snug mt-0.5" style={{ color: P.slateLight }}>{n.body}</p>
                <span className="text-[10px] mt-1 block" style={{ color: P.slateLight }}>{n.time}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-3 text-center" style={{ borderTop: `1px solid ${P.border}` }}>
        <button className="text-[12px] font-semibold hover:underline" style={{ color: P.teal }}>View all notifications</button>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
// Matches image-5.png exactly:
// white bg · ZodiacPluss logo · greeting card · plain-text nav (no icons)
// teal active pill + left-edge teal indicator · PAGES label · Settings/Logout
const SIDEBAR_TEAL = "#0D9DA8";
const SIDEBAR_W = 272;
const SIDEBAR_W_COL = 0; // fully hidden when "collapsed" (toggle via hamburger in topnav)

function NavItem({ label, isActive, badge, onClick }: {
  label: string; isActive: boolean; badge?: number; onClick: () => void;
}) {
  return (
    <div className="relative">
      {/* left-edge active bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[36px] rounded-r-full"
          style={{ background: SIDEBAR_TEAL }} />
      )}
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-[10px] text-[14.5px] font-medium transition-all duration-150 rounded-xl mx-0"
        style={{
          background: isActive ? SIDEBAR_TEAL : "transparent",
          color: isActive ? "#ffffff" : "#1a2332",
          fontWeight: isActive ? 600 : 400,
        }}>
        <span>{label}</span>
        {badge ? (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: isActive ? "rgba(255,255,255,0.3)" : P.rose, color: "#fff" }}>{badge}</span>
        ) : null}
      </button>
    </div>
  );
}

function Sidebar({ active, setActive, collapsed, setCollapsed }: {
  active: string; setActive: (id: string) => void; collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen z-40 flex flex-col select-none overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? 0 : SIDEBAR_W,
        background: "#ffffff",
        boxShadow: "4px 0 24px rgba(0,0,0,0.06)",
        borderRight: "1px solid rgba(0,0,0,0.05)",
      }}>

      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4 flex-shrink-0">
        {/* Circular zodiac emblem */}
        <div className="flex-shrink-0 w-[52px] h-[52px] rounded-full flex items-center justify-center overflow-hidden"
          style={{ border: "2px solid #0D9DA8" }}>
          <svg viewBox="0 0 52 52" width="52" height="52" fill="none">
            <circle cx="26" cy="26" r="26" fill="#f0fafa" />
            <circle cx="26" cy="26" r="20" stroke="#0D9DA8" strokeWidth="1.2" fill="none" />
            <circle cx="26" cy="26" r="13" stroke="#0D9DA8" strokeWidth="0.8" fill="none" />
            {/* simplified face/zodiac lines */}
            <ellipse cx="26" cy="22" rx="5" ry="6" stroke="#1a2332" strokeWidth="1.2" fill="none" />
            <path d="M22 28 Q26 34 30 28" stroke="#1a2332" strokeWidth="1.2" fill="none" />
            <circle cx="23.5" cy="20.5" r="1" fill="#1a2332" />
            <circle cx="28.5" cy="20.5" r="1" fill="#1a2332" />
            {/* star accents */}
            <path d="M10 26 l1.5-1.5 1.5 1.5-1.5 1.5z" fill="#0D9DA8" opacity="0.6" />
            <path d="M39 20 l1-1 1 1-1 1z" fill="#0D9DA8" opacity="0.6" />
            <path d="M38 34 l1.2-1.2 1.2 1.2-1.2 1.2z" fill="#0D9DA8" opacity="0.5" />
          </svg>
        </div>
        {/* Brand name */}
        <div>
          <div className="flex items-center gap-1 leading-none">
            <span className="text-[20px] font-bold tracking-tight" style={{ color: "#1a2332" }}>Zodiac</span>
            <span className="text-[20px] font-bold tracking-tight" style={{ color: SIDEBAR_TEAL }}>Pluss</span>
            {/* leaf/sparkle accent */}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="ml-0.5 -mt-1">
              <path d="M10 2C10 2 14 6 14 11C14 14.3137 12.2091 17 10 17C7.79086 17 6 14.3137 6 11C6 6 10 2 10 2Z" fill="#0D9DA8" opacity="0.85" />
              <path d="M10 17V10" stroke="#fff" strokeWidth="1" />
              <circle cx="16" cy="4" r="1.5" fill="#F59E0B" />
              <circle cx="5" cy="6" r="1" fill="#0D9DA8" opacity="0.5" />
            </svg>
          </div>
          <p className="text-[10px] mt-0.5 tracking-wide" style={{ color: "#94A3B8" }}>Your Personal Wellness Companion</p>
        </div>
      </div>

      {/* ── Greeting card ── */}
      <div className="mx-4 mb-4 flex-shrink-0">
        <div className="rounded-2xl px-4 py-3"
          style={{ background: "linear-gradient(135deg, #e8ecf0 0%, #dce3ea 100%)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <div className="text-[14px] font-bold" style={{ color: "#1a2332" }}>Hello Rashmi !</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M10 3C10 3 6 7 6 11.5C6 14 7.8 16 10 16C12.2 16 14 14 14 11.5C14 7 10 3 10 3Z" fill="#0D9DA8" />
              <path d="M10 16V10" stroke="white" strokeWidth="1.2" />
              <circle cx="10" cy="10" r="1" fill="white" />
            </svg>
            <span className="text-[12px] font-bold italic tracking-wide" style={{ color: SIDEBAR_TEAL }}>GOOD MORNING</span>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-4 mb-1 flex-shrink-0" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />

      {/* ── Scrollable nav area ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Main nav items */}
        <div className="pt-2 pb-1 px-2">
          {NAV_MAIN.map(item => (
            <NavItem
              key={item.id}
              label={item.label}
              isActive={active === item.id}
              badge={"badge" in item ? item.badge : undefined}
              onClick={() => setActive(item.id)}
            />
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="mx-4 my-2" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />

        {/* PAGES section */}
        <div className="px-6 pt-1 pb-1">
          <p className="text-[10.5px] font-bold tracking-[0.12em] mb-2" style={{ color: "#94A3B8" }}>PAGES</p>
        </div>
        <div className="pb-2 px-2">
          {NAV_PAGES.map(item => (
            <NavItem
              key={item.id}
              label={item.label}
              isActive={active === item.id}
              onClick={() => setActive(item.id)}
            />
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="mx-4 my-2" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />

        {/* Settings + Logout */}
        <div className="pb-6 px-2">
          <NavItem label="Settings" isActive={active === "settings"} onClick={() => setActive("settings")} />
          <button
            className="w-full flex items-center px-6 py-[10px] text-[14.5px] font-medium transition-all hover:text-rose-500"
            style={{ color: "#1a2332" }}>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── Top Nav ──────────────────────────────────────────────────────────────────
function TopNav({ ml, page, dark, setDark, onToggleSidebar }: { ml: number; page: string; dark: boolean; setDark: (v: boolean) => void; onToggleSidebar: () => void }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const crumbs = PAGE_CRUMBS[page] ?? ["Dashboard"];
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed top-0 right-0 z-30 h-16 flex items-center px-6 gap-4 transition-all duration-300"
      style={{ left: ml, background: "rgba(241,245,249,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${P.border}` }}>

      {/* Hamburger toggle */}
      <button onClick={onToggleSidebar}
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:bg-white"
        style={{ color: P.slate }}>
        <Menu size={18} />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12.5px] flex-shrink-0">
        <span style={{ color: P.slateLight }}>ZodiacPluss</span>
        {crumbs.map((c, i) => (
          <span key={c} className="flex items-center gap-1.5">
            <ChevronRight size={11} style={{ color: "#CBD5E1" }} />
            <span className={i === crumbs.length - 1 ? "font-bold text-[#0C1B33]" : "text-[#94A3B8]"}>{c}</span>
          </span>
        ))}
      </div>

      {/* Search */}
      <div className="relative mx-4 flex-1 max-w-md hidden md:block">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: P.slateLight }} />
        <input type="text" placeholder="Search users, experts, tickets, reports…"
          className="w-full pl-8 pr-12 py-2 text-[12.5px] rounded-xl bg-white focus:outline-none focus:ring-2 transition-all"
          style={{ border: `1px solid ${P.border}`, color: P.navy, fontFamily: "inherit" }}
          onFocus={e => (e.currentTarget.style.boxShadow = `0 0 0 3px ${P.teal}22`)}
          onBlur={e => (e.currentTarget.style.boxShadow = "none")} />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono px-1.5 py-0.5 rounded"
          style={{ background: "#F1F5F9", color: P.slateLight, border: `1px solid ${P.border}` }}>⌘K</kbd>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Dark mode */}
        <button onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white"
          style={{ color: P.slate }}>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Globe */}
        <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white" style={{ color: P.slate }}>
          <Globe size={16} />
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button onClick={() => setNotifOpen(v => !v)}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white"
            style={{ color: P.slate }}>
            <Bell size={16} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                style={{ background: P.rose }}>{unread}</span>
            )}
          </button>
          {notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}
        </div>

        {/* Divider */}
        <div className="w-px h-6 mx-1" style={{ background: P.border }} />

        {/* Profile */}
        <div className="relative">
          <button onClick={() => setProfileOpen(v => !v)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl transition-all hover:bg-white">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: "linear-gradient(135deg,#0891B2,#0E7490)" }}>RG</div>
            <div className="hidden sm:block text-left">
              <div className="text-[12.5px] font-bold text-[#0C1B33] leading-none">Rashmi Guia</div>
              <div className="text-[10px] mt-0.5" style={{ color: P.slateLight }}>Super Admin</div>
            </div>
            <ChevronDown size={12} style={{ color: P.slateLight }} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 w-52 rounded-2xl shadow-xl overflow-hidden z-50 bg-white"
              style={{ border: `1px solid ${P.border}` }}>
              <div className="p-4" style={{ borderBottom: `1px solid ${P.border}` }}>
                <div className="text-[13px] font-bold text-[#0C1B33]">Rashmi Guia</div>
                <div className="text-[11px] mt-0.5" style={{ color: P.slateLight }}>rashmi.guia@zodiacpluss.com</div>
              </div>
              {[["My Profile", UserCog], ["Settings", Settings], ["Audit Log", FileText]].map(([l, Icon]) => (
                <button key={l as string} onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] hover:bg-slate-50 transition-all text-left"
                  style={{ color: P.slate }}>
                  <Icon size={13} style={{ color: P.teal }} />{l}
                </button>
              ))}
              <div style={{ borderTop: `1px solid ${P.border}` }}>
                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] hover:bg-rose-50 transition-all text-left"
                  style={{ color: P.rose }}>
                  <LogOut size={13} />Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Quick Actions FAB ────────────────────────────────────────────────────────
function QuickActions() {
  const [open, setOpen] = useState(false);
  const actions = [
    { label: "New User", icon: UserPlus, color: P.teal },
    { label: "New Ticket", icon: MessageSquare, color: P.violet },
    { label: "Export Report", icon: Download, color: P.emerald },
    { label: "Add Expert", icon: UserCheck, color: P.amber },
  ];
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
      {open && actions.map((a, i) => {
        const Icon = a.icon;
        return (
          <div key={a.label} className="flex items-center gap-2.5 group"
            style={{ animation: `fadeSlideUp 0.18s ease both`, animationDelay: `${i * 40}ms` }}>
            <div className="text-[11.5px] font-semibold bg-white px-3 py-1.5 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: P.navy, border: `1px solid ${P.border}` }}>{a.label}</div>
            <button className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: a.color }}>
              <Icon size={17} />
            </button>
          </div>
        );
      })}
      <button onClick={() => setOpen(v => !v)}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
        style={{ background: `linear-gradient(135deg,${P.teal},${P.tealDark})` }}>
        <div className={`transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <Plus size={22} />
        </div>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE SHELL
// ─────────────────────────────────────────────────────────────────────────────
const Page = ({ title, sub, action, children }: { title: string; sub?: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <div>
    <div className="flex items-start justify-between mb-7">
      <div>
        <h1 className="text-[22px] font-bold text-[#0C1B33] tracking-tight">{title}</h1>
        {sub && <p className="text-[12.5px] mt-1" style={{ color: P.slateLight }}>{sub}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <Page title="Overview" sub="Wednesday, 16 July 2026 · Welcome back, Rashmi 👋"
      action={
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-[12.5px] font-semibold shadow-md hover:shadow-lg transition-all"
          style={{ background: `linear-gradient(135deg,${P.teal},${P.tealDark})` }}>
          <Download size={14} />Export Report
        </button>
      }>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <Kpi icon={Users} label="Total Clients" value="24,891" sub="+312 this week" trend={5.8} color={P.teal} gradient />
        <Kpi icon={UserCheck} label="Active Experts" value="1,247" sub="94.2% verified" trend={3.2} color={P.emerald} gradient />
        <Kpi icon={Activity} label="Sessions Today" value="3,892" sub="avg 42 min/session" trend={8.4} color={P.violet} gradient />
        <Kpi icon={DollarSign} label="Revenue MTD" value="₹1.84Cr" sub="92% of ₹2Cr target" trend={12.1} color={P.amber} gradient />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Kpi icon={Briefcase} label="EAP Companies" value="48" sub="4,520 members" trend={6.3} color={P.teal} />
        <Kpi icon={Star} label="Expert Rating" value="4.72★" sub="184K reviews" trend={1.2} color={P.amber} />
        <Kpi icon={MessageSquare} label="Open Tickets" value="23" sub="Avg response 1.4h" trend={-18.2} color={P.rose} />
        <Kpi icon={TrendingUp} label="Conversion" value="8.4%" sub="Install → paid" trend={0.9} color={P.emerald} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2 p-6">
          <SH title="Platform Growth" sub="Monthly active users — all segments"
            right={<select className="text-[11px] rounded-lg px-2.5 py-1.5 focus:outline-none" style={{ border: `1px solid ${P.border}`, color: P.slate, background: "#F8FAFC" }}>
              <option>Last 12 months</option><option>Last 6 months</option>
            </select>} />
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={monthlyGrowth} margin={{ top: 2, right: 2, left: -22, bottom: 0 }}>
              <defs>
                {([["gc", P.teal], ["ge", P.emerald], ["ga", P.amber]] as [string, string][]).map(([id, c]) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.2} /><stop offset="95%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
              <Tooltip contentStyle={tipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              <Area type="monotone" dataKey="c" name="Clients" stroke={P.teal} strokeWidth={2.5} fill="url(#gc)" />
              <Area type="monotone" dataKey="eap" name="EAP Members" stroke={P.amber} strokeWidth={2.5} fill="url(#ga)" />
              <Area type="monotone" dataKey="e" name="Experts" stroke={P.emerald} strokeWidth={2.5} fill="url(#ge)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <SH title="User Distribution" sub="30,658 total accounts" />
          <ResponsiveContainer width="100%" height={165}>
            <RPie>
              <Pie data={userDist} cx="50%" cy="50%" innerRadius={48} outerRadius={74} paddingAngle={4} dataKey="value" stroke="none">
                {userDist.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={tipStyle} formatter={(v: number) => [v.toLocaleString(), ""]} />
            </RPie>
          </ResponsiveContainer>
          <div className="space-y-2.5 mt-2">
            {userDist.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-[12px]" style={{ color: P.slate }}>{d.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[12.5px] font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{d.value.toLocaleString()}</span>
                  <span className="text-[10px] ml-1.5" style={{ color: P.slateLight }}>{((d.value / 30658) * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <Card className="p-6">
          <SH title="Daily Sessions" sub="This week — total vs completed" />
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={weekSessions} margin={{ top: 2, right: 2, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
              <Tooltip contentStyle={tipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              <Bar dataKey="total" name="Total" fill={P.tealLight} radius={[5, 5, 0, 0]} />
              <Bar dataKey="done" name="Completed" fill={P.teal} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <SH title="Expert Specialties" sub="Sessions by category this week" />
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={expertCats} layout="vertical" margin={{ top: 2, right: 20, left: 62, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: P.slateLight }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
              <YAxis type="category" dataKey="cat" tick={{ fontSize: 11, fill: P.slate }} axisLine={false} tickLine={false} width={58} />
              <Tooltip contentStyle={tipStyle} />
              <Bar dataKey="sessions" name="Sessions" fill={P.teal} radius={[0, 5, 5, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <SH title="Recent Registrations" sub="Latest client accounts"
          right={<button className="text-[12.5px] font-semibold flex items-center gap-1" style={{ color: P.teal }}>View all <ArrowRight size={13} /></button>} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <TH cols={["User", "Plan", "Zodiac Sign", "Sessions", "Joined", "Status", ""]} />
            <tbody>
              {clients.map((u, i) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors"
                  style={{ borderBottom: i < clients.length - 1 ? `1px solid ${P.border}` : "none" }}>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <Av name={u.name} idx={i} />
                      <div><div className="text-[12.5px] font-semibold text-[#0C1B33]">{u.name}</div><div className="text-[10.5px]" style={{ color: P.slateLight }}>{u.email}</div></div>
                    </div>
                  </td>
                  <td className="py-3 pr-4"><span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: P.tealLight, color: P.teal }}>{u.plan}</span></td>
                  <td className="py-3 pr-4 text-[12.5px]" style={{ color: P.slate }}>{u.sign}</td>
                  <td className="py-3 pr-4 text-[12.5px] font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{u.sessions}</td>
                  <td className="py-3 pr-4 text-[11px]" style={{ color: P.slateLight }}>{u.joined}</td>
                  <td className="py-3 pr-4"><Badge s={u.status} /></td>
                  <td className="py-3"><button style={{ color: P.slateLight }} className="hover:text-[#0C1B33] transition-colors"><MoreHorizontal size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CLIENT USERS
// ─────────────────────────────────────────────────────────────────────────────
function ClientsPage() {
  const [q, setQ] = useState("");
  const rows = clients.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));
  const plans = [
    { plan: "Premium+", count: 3840, pct: 15.4, color: P.violet },
    { plan: "Premium", count: 8920, pct: 35.8, color: P.teal },
    { plan: "Basic", count: 7640, pct: 30.7, color: P.emerald },
    { plan: "EAP", count: 4491, pct: 18.0, color: P.amber },
  ];
  return (
    <Page title="Client Users" sub="Manage all registered client accounts">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <Kpi icon={Users} label="Total Clients" value="24,891" sub="All time" trend={5.8} color={P.teal} gradient />
        <Kpi icon={Activity} label="Active (30d)" value="18,420" sub="74% of total" trend={3.1} color={P.emerald} gradient />
        <Kpi icon={UserPlus} label="New Today" value="312" sub="+18% vs yesterday" trend={18} color={P.violet} gradient />
        <Kpi icon={TrendingDown} label="Churned (30d)" value="284" sub="1.1% churn rate" trend={-4.2} color={P.amber} gradient />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2 p-6">
          <SH title="Client Growth" sub="Monthly total clients" />
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={monthlyGrowth} margin={{ top: 2, right: 2, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="gcl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={P.teal} stopOpacity={0.2} /><stop offset="95%" stopColor={P.teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
              <Tooltip contentStyle={tipStyle} />
              <Area type="monotone" dataKey="c" name="Clients" stroke={P.teal} strokeWidth={2.5} fill="url(#gcl)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <SH title="Subscription Plans" sub="Active breakdown" />
          <div className="space-y-4 mt-1">
            {plans.map(p => (
              <div key={p.plan}>
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span className="font-semibold text-[#0C1B33]">{p.plan}</span>
                  <span style={{ color: P.slate, fontFamily: "'IBM Plex Sans',sans-serif" }}>{p.count.toLocaleString()} · {p.pct}%</span>
                </div>
                <ProgBar pct={p.pct * 2.5} color={p.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <div className="flex flex-wrap items-start gap-3 mb-5">
          <div><h2 className="text-[14.5px] font-bold text-[#0C1B33]">Client Directory</h2><p className="text-[11.5px]" style={{ color: P.slateLight }}>{rows.length} users shown</p></div>
          <div className="ml-auto flex flex-wrap gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: P.slateLight }} />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…"
                className="pl-8 pr-3 py-2 text-[12px] rounded-xl focus:outline-none w-44"
                style={{ border: `1px solid ${P.border}`, background: "#F8FAFC" }} />
            </div>
            {[["Filter", Filter], ["Export", Download]].map(([l, Icon]) => (
              <button key={l as string} className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-xl hover:bg-slate-50 transition-all"
                style={{ border: `1px solid ${P.border}`, color: P.slate }}>
                <Icon size={13} />{l}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <TH cols={["ID", "Name", "Plan", "Zodiac", "Sessions", "Status", "Joined", ""]} />
            <tbody>
              {rows.map((u, i) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors"
                  style={{ borderBottom: i < rows.length - 1 ? `1px solid ${P.border}` : "none" }}>
                  <td className="py-3 pr-4 text-[10.5px] font-mono" style={{ color: P.slateLight }}>{u.id}</td>
                  <td className="py-3 pr-4"><div className="flex items-center gap-2.5"><Av name={u.name} idx={i} /><div><div className="text-[12.5px] font-semibold text-[#0C1B33]">{u.name}</div><div className="text-[10.5px]" style={{ color: P.slateLight }}>{u.email}</div></div></div></td>
                  <td className="py-3 pr-4"><span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: P.tealLight, color: P.teal }}>{u.plan}</span></td>
                  <td className="py-3 pr-4 text-[12.5px]" style={{ color: P.slate }}>{u.sign}</td>
                  <td className="py-3 pr-4 text-[12.5px] font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{u.sessions}</td>
                  <td className="py-3 pr-4"><Badge s={u.status} /></td>
                  <td className="py-3 pr-4 text-[11px]" style={{ color: P.slateLight }}>{u.joined}</td>
                  <td className="py-3"><button style={{ color: P.slateLight }} className="hover:text-[#0C1B33]"><MoreHorizontal size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  EXPERTS
// ─────────────────────────────────────────────────────────────────────────────
function ExpertsPage() {
  return (
    <Page title="Expert Users" sub="Manage verified experts and monitor performance">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <Kpi icon={UserCheck} label="Total Experts" value="1,247" sub="All specialties" trend={3.2} color={P.emerald} gradient />
        <Kpi icon={CheckCircle} label="Verified" value="1,174" sub="94.1% verification rate" trend={1.8} color={P.teal} gradient />
        <Kpi icon={Clock} label="Pending Review" value="73" sub="Avg 2.4 days" trend={-12} color={P.amber} gradient />
        <Kpi icon={Star} label="Avg Rating" value="4.72" sub="184K reviews" trend={0.8} color={P.violet} gradient />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2 p-6">
          <SH title="Sessions by Specialty" sub="Weekly volume" />
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={expertCats} margin={{ top: 2, right: 2, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="cat" tick={{ fontSize: 10, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
              <Tooltip contentStyle={tipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              <Bar dataKey="sessions" name="Sessions" fill={P.emerald} radius={[5, 5, 0, 0]} />
              <Bar dataKey="experts" name="Experts" fill="#D1FAE5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <SH title="Top Earners" sub="This month" />
          <div className="space-y-4 mt-1">
            {experts.map((e, i) => (
              <div key={e.id} className="flex items-center gap-2.5">
                <div className="text-[11px] font-bold w-4 flex-shrink-0" style={{ color: P.slateLight, fontFamily: "'IBM Plex Sans',sans-serif" }}>{i + 1}</div>
                <Av name={e.name} size="w-8 h-8" idx={i + 2} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-[#0C1B33] truncate">{e.name}</div>
                  <div className="text-[10.5px]" style={{ color: P.slateLight }}>{e.spec}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[12px] font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{fmtINR(e.earned)}</div>
                  <div className="flex items-center gap-0.5 justify-end"><Star size={9} className="fill-amber-400 text-amber-400" /><span className="text-[10.5px]" style={{ color: P.slate }}>{e.rating}</span></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <SH title="Expert Directory"
          right={<button className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-xl hover:bg-slate-50 transition-all" style={{ border: `1px solid ${P.border}`, color: P.slate }}><Download size={13} />Export</button>} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <TH cols={["Expert", "Specialty", "Rating", "Sessions", "Earnings", "Status"]} />
            <tbody>
              {experts.map((e, i) => (
                <tr key={e.id} className="hover:bg-slate-50/60 transition-colors"
                  style={{ borderBottom: i < experts.length - 1 ? `1px solid ${P.border}` : "none" }}>
                  <td className="py-3 pr-4"><div className="flex items-center gap-2.5"><Av name={e.name} size="w-9 h-9" idx={i + 2} /><div><div className="text-[12.5px] font-semibold text-[#0C1B33]">{e.name}</div><div className="text-[10.5px] font-mono" style={{ color: P.slateLight }}>{e.id}</div></div></div></td>
                  <td className="py-3 pr-4 text-[12.5px]" style={{ color: P.slate }}>{e.spec}</td>
                  <td className="py-3 pr-4"><div className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /><span className="text-[12.5px] font-bold text-[#0C1B33]">{e.rating}</span></div></td>
                  <td className="py-3 pr-4 text-[12.5px] font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{e.sessions.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-[12.5px] font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{fmtINR(e.earned)}</td>
                  <td className="py-3"><Badge s={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CALENDAR DATA
// ─────────────────────────────────────────────────────────────────────────────
const CALENDAR_EVENTS = [
  {
    id: 1, title: "Design Conference", org: "Zillul Design Agency",
    date: "Today 07:19 AM", address: "56 Davion Mission Suite 157", location: "Meaghanberg",
    color: "#7C3AED", lightColor: "#EDE9FE",
    attendees: 18, gridCol: 3, gridRow: 2, span: 1,
    month: 10, day: 3,
  },
  {
    id: 2, title: "Weekend Festival", org: "",
    date: "16 October 2026 at 5:00 PM", address: "853 Moore Flats Suite 158", location: "Sweden",
    color: "#EC4899", lightColor: "#FCE7F3",
    attendees: 23, gridCol: 1, gridRow: 4, span: 1,
    month: 10, day: 18,
  },
  {
    id: 3, title: "Glastonbury Festival", org: "",
    date: "20–22 October 2026 at 8:00 PM", address: "646 Walter Road Apt. 571", location: "Turks and Caicos Islands",
    color: "#F97316", lightColor: "#FFEDD5",
    attendees: 17, gridCol: 5, gridRow: 4, span: 3,
    month: 10, day: 20,
  },
  {
    id: 4, title: "Ultra Europe 2026", org: "",
    date: "25 October 2026 at 10:00 PM", address: "506 Satterfield Tunnel Apt. 963", location: "San Marino",
    color: "#0891B2", lightColor: "#E0F2FE",
    attendees: 45, gridCol: 4, gridRow: 5, span: 1,
    month: 10, day: 25,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  EAP / CALENDAR PAGE
// ─────────────────────────────────────────────────────────────────────────────
function EAPPage() {
  const [calView, setCalView] = useState<"Day" | "Week" | "Month">("Month");
  const [calMonth] = useState({ name: "October", year: 2026 });
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // October 2026 calendar grid: starts on Thursday (day 4, 0-indexed from Mon)
  // We show 6 rows × 7 cols
  const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  // Build 6×7 grid for October 2026
  // Oct 1 = Thursday → index 3 (Mon=0)
  const startOffset = 3; // Thu
  const totalDays = 31;
  type CalCell = { day: number | null; isCurrentMonth: boolean };
  const cells: CalCell[] = [];
  // prev month fill (Sep has 30 days)
  for (let i = 0; i < startOffset; i++) cells.push({ day: 30 - startOffset + 1 + i, isCurrentMonth: false });
  for (let d = 1; d <= totalDays; d++) cells.push({ day: d, isCurrentMonth: true });
  // next month fill
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, isCurrentMonth: false });

  // Map events to grid cells
  const getEventForDay = (day: number | null) => {
    if (!day) return null;
    return CALENDAR_EVENTS.find(e => e.month === 10 && e.day === day);
  };
  const getSpanningEventForDay = (day: number | null) => {
    if (!day) return null;
    return CALENDAR_EVENTS.find(e => e.month === 10 && day >= e.day && day < e.day + e.span && e.span > 1);
  };
  const isSpanStart = (day: number | null) => {
    if (!day) return null;
    return CALENDAR_EVENTS.find(e => e.month === 10 && e.day === day && e.span > 1);
  };

  const hoveredEv = hoveredEvent !== null ? CALENDAR_EVENTS.find(e => e.id === hoveredEvent) : null;
  void hoveredEv; // used via hoveredEvent state directly on event elements

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-[22px] font-bold text-[#0C1B33] tracking-tight">Calender</h1>
      </div>

      <div className="flex gap-5" style={{ minHeight: 680 }}>
        {/* ── Left Panel: Events List ── */}
        <div className="flex-shrink-0 w-[300px]">
          <Card className="p-0 overflow-hidden h-full flex flex-col">
            {/* Add button */}
            <div className="p-5">
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[13.5px] font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg,#0D9DA8,#0E7490)" }}>
                <Plus size={16} />+ Add New Event
              </button>
            </div>

            <div className="px-5 pb-2">
              <p className="text-[13px] font-bold text-[#0C1B33]">You are going to</p>
            </div>

            {/* Events list */}
            <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-4">
              {CALENDAR_EVENTS.map((ev, i) => (
                <div key={ev.id}
                  className="flex gap-3 cursor-pointer group"
                  onMouseEnter={() => setHoveredEvent(ev.id)}
                  onMouseLeave={() => setHoveredEvent(null)}>
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center"
                    style={{ background: ev.lightColor }}>
                    <Av name={ev.title} idx={i} size="w-10 h-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#0C1B33] leading-snug group-hover:text-[#0D9DA8] transition-colors">{ev.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: P.slateLight }}>{ev.date}</p>
                    <p className="text-[11px]" style={{ color: P.slateLight }}>{ev.address}</p>
                    {ev.location && <p className="text-[11px]" style={{ color: P.slateLight }}>{ev.location}</p>}
                    {/* Attendee avatars */}
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="flex -space-x-1.5">
                        {[0, 1, 2].map(j => (
                          <div key={j} className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[7px] font-bold text-white"
                            style={{ background: avatarGrad(i + j) }}>
                            {String.fromCharCode(65 + j)}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 ml-0.5"
                        style={{ color: "#0D9DA8", borderColor: "#0D9DA8" }}>
                        {ev.attendees}+
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* See More */}
              <button className="w-full py-2.5 rounded-xl text-[13px] font-semibold mt-2 transition-all hover:bg-slate-100"
                style={{ border: `1.5px solid ${P.border}`, color: P.slate }}>
                See More
              </button>
            </div>
          </Card>
        </div>

        {/* ── Right Panel: Calendar Grid ── */}
        <div className="flex-1 min-w-0">
          <Card className="p-5 h-full flex flex-col">
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <button className="text-[12px] font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all" style={{ color: P.slate }}>
                  Today
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-all" style={{ color: P.slate }}>
                    <ChevronLeft size={14} />
                  </button>
                  <h2 className="text-[17px] font-bold text-[#0C1B33] w-44 text-center">
                    {calMonth.name} {calMonth.year}
                  </h2>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-all" style={{ color: P.slate }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
              {/* View toggle */}
              <div className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${P.border}` }}>
                {(["Day", "Week", "Month"] as const).map(v => (
                  <button key={v} onClick={() => setCalView(v)}
                    className="px-4 py-1.5 text-[12px] font-semibold transition-all"
                    style={{
                      background: calView === v ? "#0D9DA8" : "white",
                      color: calView === v ? "#fff" : P.slate,
                    }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS_OF_WEEK.map(d => (
                <div key={d} className="text-center text-[11px] font-bold tracking-wider py-2" style={{ color: P.slateLight }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="flex-1 grid grid-cols-7 grid-rows-6" style={{ border: `1px solid ${P.border}`, borderRadius: 12, overflow: "hidden" }}>
              {cells.map((cell, idx) => {
                const singleEv = getEventForDay(cell.isCurrentMonth ? cell.day : null);
                const spanEv = getSpanningEventForDay(cell.isCurrentMonth ? cell.day : null);
                const spanStartEv = isSpanStart(cell.isCurrentMonth ? cell.day : null);
                const isToday = cell.isCurrentMonth && cell.day === 3; // Oct 3 as "today" from image

                return (
                  <div key={idx} className="relative flex flex-col"
                    style={{
                      borderRight: (idx + 1) % 7 !== 0 ? `1px solid ${P.border}` : "none",
                      borderBottom: idx < 35 ? `1px solid ${P.border}` : "none",
                      background: !cell.isCurrentMonth ? "repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(0,0,0,0.015) 4px,rgba(0,0,0,0.015) 8px)" : "white",
                      minHeight: 90,
                    }}>
                    {/* Day number */}
                    <div className="px-2 pt-1.5 pb-0.5">
                      <span className={`text-[12.5px] font-bold inline-flex w-6 h-6 items-center justify-center rounded-full
                        ${isToday ? "text-white" : cell.isCurrentMonth ? "text-[#0C1B33]" : "text-[#CBD5E1]"}`}
                        style={isToday ? { background: "#0D9DA8" } : {}}>
                        {cell.day}
                      </span>
                    </div>

                    {/* Single-day event pill */}
                    {singleEv && singleEv.span === 1 && (
                      <div className="mx-1 mb-1 px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer transition-all hover:opacity-80 relative"
                        style={{ background: singleEv.lightColor, color: singleEv.color }}
                        onMouseEnter={() => setHoveredEvent(singleEv.id)}
                        onMouseLeave={() => setHoveredEvent(null)}>
                        {singleEv.title}

                        {/* Popup card */}
                        {hoveredEvent === singleEv.id && (
                          <div className="absolute left-full top-0 ml-2 z-50 w-[240px] bg-white rounded-2xl shadow-2xl overflow-hidden"
                            style={{ border: `1px solid ${P.border}` }}>
                            {/* Event image banner */}
                            <div className="w-full h-28 flex items-center justify-center"
                              style={{ background: `linear-gradient(135deg,${singleEv.color}33,${singleEv.color}22)` }}>
                              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white"
                                style={{ background: singleEv.color }}>
                                {singleEv.title[0]}
                              </div>
                            </div>
                            <div className="p-4">
                              <p className="text-[13.5px] font-bold text-[#0C1B33]">{singleEv.title}</p>
                              {singleEv.org && <p className="text-[11px] mt-0.5" style={{ color: P.teal }}>{singleEv.org}</p>}
                              <p className="text-[11px] mt-1.5" style={{ color: P.slateLight }}>{singleEv.date}</p>
                              <p className="text-[11px]" style={{ color: P.slateLight }}>{singleEv.address}</p>
                              <div className="flex items-center gap-1 mt-2.5">
                                <div className="flex -space-x-1.5">
                                  {[0, 1, 2].map(j => (
                                    <div key={j} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white"
                                      style={{ background: avatarGrad(j) }}>
                                      {String.fromCharCode(65 + j)}
                                    </div>
                                  ))}
                                </div>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 ml-0.5"
                                  style={{ color: "#0D9DA8", borderColor: "#0D9DA8" }}>
                                  {singleEv.attendees}+
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Multi-day spanning event: show bar only at start */}
                    {spanStartEv && (
                      <div className="absolute left-1 right-0 mx-0 bottom-2 h-5 z-10 flex items-center px-2"
                        style={{
                          background: spanStartEv.lightColor,
                          borderRadius: "4px 0 0 4px",
                          width: `calc(${spanStartEv.span * 100}% - 4px)`,
                        }}>
                        <span className="text-[10px] font-semibold truncate" style={{ color: spanStartEv.color }}>
                          {spanStartEv.title}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-6" style={{ border: `1px solid ${P.border}` }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-bold text-[#0C1B33]">Add New Event</h3>
              <button onClick={() => setShowAddModal(false)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100" style={{ color: P.slate }}>
                <X size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {[["Event Title", "e.g. Design Conference"], ["Organiser", "e.g. Zillul Agency"], ["Date & Time", "e.g. Oct 3 at 07:19 AM"], ["Location", "e.g. New York"]].map(([lbl, ph]) => (
                <div key={lbl}>
                  <label className="text-[11.5px] font-semibold text-[#0C1B33] mb-1 block">{lbl}</label>
                  <input placeholder={ph} className="w-full px-3 py-2.5 rounded-xl text-[12.5px] focus:outline-none transition-all"
                    style={{ border: `1px solid ${P.border}`, color: P.navy, fontFamily: "inherit" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#0D9DA8")}
                    onBlur={e => (e.currentTarget.style.borderColor = P.border)} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-slate-50 transition-all"
                style={{ border: `1px solid ${P.border}`, color: P.slate }}>
                Cancel
              </button>
              <button onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl text-white text-[13px] font-semibold transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#0D9DA8,#0E7490)" }}>
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  FINANCE
// ─────────────────────────────────────────────────────────────────────────────
function FinancePage() {
  return (
    <Page title="Finance" sub="Revenue, payouts, and transaction management">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <Kpi icon={TrendingUp} label="Revenue (Jul)" value="₹1.84Cr" sub="92% of ₹2Cr target" trend={12.1} color={P.emerald} gradient />
        <Kpi icon={Wallet} label="Subscriptions" value="₹1.08Cr" sub="59% of total" trend={8.4} color={P.teal} gradient />
        <Kpi icon={CreditCard} label="Session Revenue" value="₹55.8L" sub="30% of total" trend={14.2} color={P.violet} gradient />
        <Kpi icon={ArrowUpRight} label="Expert Payouts" value="₹38.4L" sub="Processed this month" trend={9.8} color={P.amber} gradient />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2 p-6">
          <SH title="Revenue by Source" sub="Jan–Jul 2026 · stacked by stream" />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueMonthly} margin={{ top: 2, right: 2, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [`₹${(v / 1000).toFixed(1)}K`, ""]} contentStyle={tipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              <Bar dataKey="sub" name="Subscription" fill={P.teal} stackId="a" />
              <Bar dataKey="sess" name="Session" fill={P.emerald} stackId="a" />
              <Bar dataKey="eap" name="EAP" fill={P.amber} stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <SH title="Revenue Mix" sub="July 2026" />
          <ResponsiveContainer width="100%" height={155}>
            <RPie>
              <Pie data={[{ v: 108200, c: P.teal }, { v: 55800, c: P.emerald }, { v: 35100, c: P.amber }]}
                cx="50%" cy="50%" innerRadius={42} outerRadius={70} paddingAngle={4} dataKey="v" stroke="none">
                {[P.teal, P.emerald, P.amber].map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`₹${(v / 1000).toFixed(1)}K`, ""]} contentStyle={tipStyle} />
            </RPie>
          </ResponsiveContainer>
          <div className="space-y-2.5 mt-2">
            {[{ n: "Subscription", p: "54.6%", a: "₹1.08Cr", c: P.teal }, { n: "Session", p: "28.2%", a: "₹55.8L", c: P.emerald }, { n: "EAP", p: "17.2%", a: "₹35.1L", c: P.amber }].map(d => (
              <div key={d.n} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: d.c }} /><span className="text-[12px]" style={{ color: P.slate }}>{d.n}</span></div>
                <div className="text-right"><div className="text-[12px] font-bold text-[#0C1B33]">{d.a}</div><div className="text-[10px]" style={{ color: P.slateLight }}>{d.p}</div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <SH title="Recent Transactions"
          right={<button className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-xl hover:bg-slate-50 transition-all" style={{ border: `1px solid ${P.border}`, color: P.slate }}><Download size={13} />Export</button>} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <TH cols={["Txn ID", "User / Company", "Type", "Amount", "Method", "Status", "Date"]} />
            <tbody>
              {transactions.map((t, i) => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition-colors"
                  style={{ borderBottom: i < transactions.length - 1 ? `1px solid ${P.border}` : "none" }}>
                  <td className="py-3 pr-4 text-[10.5px] font-mono" style={{ color: P.slateLight }}>{t.id}</td>
                  <td className="py-3 pr-4 text-[12.5px] font-semibold text-[#0C1B33]">{t.user}</td>
                  <td className="py-3 pr-4 text-[12px]" style={{ color: P.slate }}>{t.type}</td>
                  <td className="py-3 pr-4 text-[12.5px] font-bold" style={{ color: t.amount < 0 ? P.rose : "#0C1B33", fontFamily: "'IBM Plex Sans',sans-serif" }}>{fmtINR(t.amount)}</td>
                  <td className="py-3 pr-4 text-[12px]" style={{ color: P.slate }}>{t.method}</td>
                  <td className="py-3 pr-4"><Badge s={t.status} /></td>
                  <td className="py-3 text-[11px]" style={{ color: P.slateLight }}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────
function AnalyticsPage() {
  return (
    <Page title="Analytics" sub="Deep platform insights, retention, and engagement data">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <Kpi icon={Target} label="D7 Retention" value="82%" sub="+2% vs last month" trend={2.5} color={P.teal} gradient />
        <Kpi icon={Eye} label="D30 Retention" value="65%" sub="+2% vs last month" trend={3.2} color={P.emerald} gradient />
        <Kpi icon={Zap} label="Avg Session" value="41.3 min" sub="+3.4 min" trend={8.9} color={P.violet} gradient />
        <Kpi icon={Award} label="NPS Score" value="72" sub="World-class (>50)" trend={4.3} color={P.amber} gradient />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <Card className="p-6">
          <SH title="User Retention Cohorts" sub="D7 / D30 / D90 rates" />
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={retentionData} margin={{ top: 2, right: 2, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} contentStyle={tipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              <Line type="monotone" dataKey="d7" name="Day 7" stroke={P.teal} strokeWidth={2.5} dot={{ r: 3.5, fill: P.teal, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="d30" name="Day 30" stroke={P.emerald} strokeWidth={2.5} dot={{ r: 3.5, fill: P.emerald, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="d90" name="Day 90" stroke={P.amber} strokeWidth={2.5} dot={{ r: 3.5, fill: P.amber, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <SH title="Total Revenue Trend" sub="All streams combined — Jul 2025–Jul 2026" />
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={revenueMonthly.map(r => ({ ...r, total: r.sub + r.sess + r.eap }))} margin={{ top: 2, right: 2, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="grev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={P.teal} stopOpacity={0.2} /><stop offset="95%" stopColor={P.teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [`₹${(v / 1000).toFixed(1)}K`, ""]} contentStyle={tipStyle} />
              <Area type="monotone" dataKey="total" name="Total Revenue" stroke={P.teal} strokeWidth={2.5} fill="url(#grev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="col-span-2 p-6">
          <SH title="Category Performance" sub="Sessions vs expert count" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={expertCats} margin={{ top: 2, right: 2, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="cat" tick={{ fontSize: 10, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
              <Tooltip contentStyle={tipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              <Bar dataKey="sessions" name="Sessions" fill={P.teal} radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="experts" name="Experts" fill={P.emerald} radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <SH title="Platform Health" />
          <div className="space-y-4">
            {[
              { l: "iOS App Rating", v: "4.8★", p: 96, c: P.amber },
              { l: "Android Rating", v: "4.6★", p: 92, c: P.amber },
              { l: "Session Completion", v: "94%", p: 94, c: P.teal },
              { l: "Expert Satisfaction", v: "91%", p: 91, c: P.emerald },
              { l: "Support CSAT", v: "88%", p: 88, c: P.violet },
              { l: "System Uptime", v: "99.97%", p: 99.97, c: P.emerald },
            ].map(m => (
              <div key={m.l}>
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span style={{ color: P.slate }}>{m.l}</span>
                  <span className="font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{m.v}</span>
                </div>
                <ProgBar pct={m.p} color={m.c} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  OPERATIONS  (NEW)
// ─────────────────────────────────────────────────────────────────────────────
function OperationsPage() {
  const [flags, setFlags] = useState(featureFlags);
  const toggleFlag = (name: string) => setFlags(prev => prev.map(f => f.name === name ? { ...f, status: !f.status } : f));

  return (
    <Page title="Business Operations" sub="App releases, feature flags, and content management">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Kpi icon={MonitorSmartphone} label="App Versions Live" value="4" sub="2 iOS · 2 Android" trend={0} color={P.teal} gradient />
        <Kpi icon={Layers} label="Feature Flags" value="6" sub="4 active · 2 disabled" trend={0} color={P.emerald} gradient />
        <Kpi icon={FileText} label="Content Items" value="284" sub="18 scheduled" trend={8.2} color={P.violet} gradient />
        <Kpi icon={Cpu} label="System Uptime" value="99.97%" sub="Last 30 days" trend={0.02} color={P.amber} gradient />
      </div>

      {/* App Releases */}
      <Card className="p-6 mb-4">
        <SH title="App Releases" sub="Current live versions across platforms"
          right={<button className="flex items-center gap-1.5 text-[12px] px-4 py-2 rounded-xl text-white font-semibold" style={{ background: P.teal }}><Rocket size={13} />New Release</button>} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <TH cols={["Application", "Version", "Users", "Rating", "Release Date", "Status", ""]} />
            <tbody>
              {appReleases.map((r, i) => (
                <tr key={r.app} className="hover:bg-slate-50/60 transition-colors"
                  style={{ borderBottom: i < appReleases.length - 1 ? `1px solid ${P.border}` : "none" }}>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: r.app.includes("Expert") ? `${P.emerald}18` : r.app.includes("Admin") ? `${P.violet}18` : `${P.teal}18` }}>
                        {r.app.includes("Admin") ? <Globe size={15} style={{ color: P.violet }} />
                          : r.app.includes("Expert") ? <UserCheck size={15} style={{ color: P.emerald }} />
                            : <Phone size={15} style={{ color: P.teal }} />}
                      </div>
                      <span className="text-[12.5px] font-semibold text-[#0C1B33]">{r.app}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4"><code className="text-[11.5px] font-mono px-2 py-0.5 rounded-lg" style={{ background: "#F1F5F9", color: P.navy }}>{r.version}</code></td>
                  <td className="py-3 pr-4 text-[12.5px] font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{r.users}</td>
                  <td className="py-3 pr-4">
                    {r.rating ? (
                      <div className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /><span className="text-[12.5px] font-bold text-[#0C1B33]">{r.rating}</span></div>
                    ) : <span className="text-[11px]" style={{ color: P.slateLight }}>N/A</span>}
                  </td>
                  <td className="py-3 pr-4 text-[11px]" style={{ color: P.slateLight }}>{r.date}</td>
                  <td className="py-3 pr-4"><Badge s={r.status} /></td>
                  <td className="py-3"><button style={{ color: P.slateLight }} className="hover:text-[#0C1B33]"><MoreHorizontal size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Feature Flags */}
      <Card className="p-6 mb-4">
        <SH title="Feature Flags" sub="Toggle features in real-time across environments"
          right={<button className="flex items-center gap-1.5 text-[12px] px-4 py-2 rounded-xl text-white font-semibold" style={{ background: P.teal }}><Plus size={13} />Add Flag</button>} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {flags.map(f => (
            <div key={f.name} className="flex items-start gap-3 p-4 rounded-xl transition-all hover:bg-slate-50"
              style={{ border: `1px solid ${P.border}` }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13px] font-bold text-[#0C1B33] truncate">{f.name}</span>
                  <code className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: f.env === "Production" ? `${P.teal}18` : f.env === "Staging" ? `${P.amber}18` : "#F1F5F9", color: f.env === "Production" ? P.teal : f.env === "Staging" ? P.amber : P.slate }}>{f.env}</code>
                </div>
                <p className="text-[11.5px] leading-snug" style={{ color: P.slateLight }}>{f.desc}</p>
                {f.status && f.rollout > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-[10.5px] mb-1" style={{ color: P.slateLight }}>
                      <span>Rollout</span><span className="font-semibold">{f.rollout}%</span>
                    </div>
                    <ProgBar pct={f.rollout} color={P.teal} />
                  </div>
                )}
              </div>
              <button onClick={() => toggleFlag(f.name)}
                className="relative w-11 h-6 rounded-full flex-shrink-0 mt-0.5 transition-colors duration-200"
                style={{ background: f.status ? P.teal : "#E2E8F0" }}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${f.status ? "translate-x-5" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Content */}
      <Card className="p-6">
        <SH title="Content Management" sub="Articles, videos, and courses"
          right={<button className="flex items-center gap-1.5 text-[12px] px-4 py-2 rounded-xl text-white font-semibold" style={{ background: P.teal }}><PenSquare size={13} />New Content</button>} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <TH cols={["Title", "Type", "Category", "Views", "Status", "Date", ""]} />
            <tbody>
              {contentItems.map((c, i) => (
                <tr key={c.title} className="hover:bg-slate-50/60 transition-colors"
                  style={{ borderBottom: i < contentItems.length - 1 ? `1px solid ${P.border}` : "none" }}>
                  <td className="py-3 pr-4 max-w-[220px]"><div className="text-[12.5px] font-semibold text-[#0C1B33] truncate">{c.title}</div></td>
                  <td className="py-3 pr-4"><span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${P.violet}15`, color: P.violet }}>{c.type}</span></td>
                  <td className="py-3 pr-4 text-[12px]" style={{ color: P.slate }}>{c.category}</td>
                  <td className="py-3 pr-4 text-[12.5px] font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{c.views > 0 ? c.views.toLocaleString() : "—"}</td>
                  <td className="py-3 pr-4"><Badge s={c.status} /></td>
                  <td className="py-3 pr-4 text-[11px]" style={{ color: P.slateLight }}>{c.date}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button style={{ color: P.slateLight }} className="hover:text-[#0C1B33] transition-colors p-1"><PenSquare size={13} /></button>
                      <button style={{ color: P.slateLight }} className="hover:text-rose-500 transition-colors p-1"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ADMIN TEAM  (NEW)
// ─────────────────────────────────────────────────────────────────────────────
function AdminTeamPage() {
  const deptColors: Record<string, string> = { Executive: P.teal, Finance: P.emerald, Support: P.violet, Product: P.amber, Marketing: P.rose };
  return (
    <Page title="Admin Team" sub="Manage admin accounts, roles, and access permissions"
      action={<button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-[12.5px] font-semibold" style={{ background: `linear-gradient(135deg,${P.teal},${P.tealDark})` }}><UserPlus size={14} />Invite Admin</button>}>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Kpi icon={Crown} label="Total Admins" value="6" sub="1 Super Admin" trend={0} color={P.teal} gradient />
        <Kpi icon={CheckCircle} label="Active Now" value="4" sub="Online in last 30 min" trend={0} color={P.emerald} gradient />
        <Kpi icon={Shield} label="Departments" value="5" sub="Exec, Finance, Support…" trend={0} color={P.violet} gradient />
        <Kpi icon={Activity} label="Actions Today" value="142" sub="Across all admins" trend={12.4} color={P.amber} gradient />
      </div>

      {/* Department overview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <Card className="p-6">
          <SH title="Department Breakdown" sub="Admin distribution by department" />
          <div className="space-y-3 mt-2">
            {[
              { dept: "Executive", count: 1, pct: 17, color: P.teal },
              { dept: "Support", count: 2, pct: 33, color: P.violet },
              { dept: "Finance", count: 1, pct: 17, color: P.emerald },
              { dept: "Product", count: 1, pct: 17, color: P.amber },
              { dept: "Marketing", count: 1, pct: 17, color: P.rose },
            ].map(d => (
              <div key={d.dept}>
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span className="font-semibold text-[#0C1B33]">{d.dept}</span>
                  <span style={{ color: P.slate }}>{d.count} admin{d.count > 1 ? "s" : ""} · {d.pct}%</span>
                </div>
                <ProgBar pct={d.pct * 2} color={d.color} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <SH title="Permission Sets" sub="Access levels across the team" />
          <div className="space-y-3">
            {[
              { label: "Full Access (Super Admin)", count: 1, color: P.teal },
              { label: "Finance & Reports", count: 1, color: P.emerald },
              { label: "Support & Users", count: 2, color: P.violet },
              { label: "Content & Experts", count: 1, color: P.amber },
              { label: "Analytics Only", count: 1, color: P.rose },
            ].map(p => (
              <div key={p.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#F8FAFC", border: `1px solid ${P.border}` }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-[12.5px] font-medium text-[#0C1B33]">{p.label}</span>
                </div>
                <span className="text-[12px] font-bold" style={{ color: P.slate, fontFamily: "'IBM Plex Sans',sans-serif" }}>{p.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Admin directory */}
      <Card className="p-6">
        <SH title="Admin Directory" sub={`${adminTeam.length} team members`}
          right={<div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-xl hover:bg-slate-50 transition-all" style={{ border: `1px solid ${P.border}`, color: P.slate }}><Filter size={13} />Filter</button>
          </div>} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <TH cols={["Admin", "Role", "Department", "Email", "Last Login", "Status", ""]} />
            <tbody>
              {adminTeam.map((a, i) => (
                <tr key={a.id} className="hover:bg-slate-50/60 transition-colors"
                  style={{ borderBottom: i < adminTeam.length - 1 ? `1px solid ${P.border}` : "none" }}>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <Av name={a.name} idx={i} />
                        {a.status === "active" && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: P.emerald }} />}
                      </div>
                      <div>
                        <div className="text-[12.5px] font-semibold text-[#0C1B33] flex items-center gap-1.5">
                          {a.name}
                          {a.role === "Super Admin" && <Crown size={11} style={{ color: P.amber }} />}
                        </div>
                        <div className="text-[10.5px] font-mono" style={{ color: P.slateLight }}>{a.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${deptColors[a.dept] || P.slate}18`, color: deptColors[a.dept] || P.slate }}>{a.role}</span>
                  </td>
                  <td className="py-3 pr-4 text-[12px]" style={{ color: P.slate }}>{a.dept}</td>
                  <td className="py-3 pr-4 text-[11.5px]" style={{ color: P.slateLight }}>{a.email}</td>
                  <td className="py-3 pr-4 text-[11.5px]" style={{ color: P.slateLight }}>{a.lastLogin}</td>
                  <td className="py-3 pr-4"><Badge s={a.status} /></td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button style={{ color: P.slateLight }} className="hover:text-[#0C1B33] p-1 transition-colors"><UserCog size={14} /></button>
                      <button style={{ color: P.slateLight }} className="hover:text-rose-500 p-1 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SUPPORT
// ─────────────────────────────────────────────────────────────────────────────
function SupportPage() {
  return (
    <Page title="Support Center" sub="Manage tickets, agent assignments, and SLA compliance">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <Kpi icon={MessageSquare} label="Open Tickets" value="23" sub="High priority: 4" trend={-18.2} color={P.rose} gradient />
        <Kpi icon={Clock} label="Avg Response" value="1.4h" sub="SLA target: 2h" trend={12.4} color={P.emerald} gradient />
        <Kpi icon={CheckCircle} label="Resolved (7d)" value="184" sub="96.2% resolution rate" trend={8.1} color={P.teal} gradient />
        <Kpi icon={Star} label="CSAT" value="4.4 / 5" sub="Based on 142 reviews" trend={3.2} color={P.amber} gradient />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2 p-6">
          <SH title="Ticket Volume" sub="This week — opened vs. resolved" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekSessions.map(d => ({ d: d.d, opened: Math.round(d.total / 155), resolved: Math.round(d.done / 155) }))}
              margin={{ top: 2, right: 2, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: P.slateLight }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              <Bar dataKey="opened" name="Opened" fill="#FCA5A5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" name="Resolved" fill={P.emerald} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <SH title="Ticket Categories" />
          <ResponsiveContainer width="100%" height={155}>
            <RPie>
              <Pie data={[
                { name: "Billing", value: 38, color: P.rose },
                { name: "App Bug", value: 28, color: P.amber },
                { name: "EAP", value: 18, color: P.violet },
                { name: "Expert", value: 12, color: P.emerald },
                { name: "Other", value: 4, color: P.slateLight },
              ]} cx="50%" cy="50%" outerRadius={66} paddingAngle={2} dataKey="value" stroke="none">
                {[P.rose, P.amber, P.violet, P.emerald, P.slateLight].map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip contentStyle={tipStyle} />
            </RPie>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
            {[["Billing", "38%", P.rose], ["App Bug", "28%", P.amber], ["EAP", "18%", P.violet], ["Expert", "12%", P.emerald], ["Other", "4%", P.slateLight]].map(([n, p, c]) => (
              <div key={n as string} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c as string }} />
                <span className="text-[10.5px]" style={{ color: P.slate }}>{n} {p}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <SH title="Ticket Queue"
          right={<div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-xl hover:bg-slate-50 transition-all" style={{ border: `1px solid ${P.border}`, color: P.slate }}><Filter size={13} />Filter</button>
            <button className="text-[12px] px-4 py-2 rounded-xl text-white font-semibold" style={{ background: P.teal }}>+ New Ticket</button>
          </div>} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <TH cols={["Ticket ID", "User", "Type", "Subject", "Priority", "Agent", "Status", "Date"]} />
            <tbody>
              {tickets.map((t, i) => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                  style={{ borderBottom: i < tickets.length - 1 ? `1px solid ${P.border}` : "none" }}>
                  <td className="py-3 pr-4 text-[10.5px] font-mono" style={{ color: P.slateLight }}>{t.id}</td>
                  <td className="py-3 pr-4 text-[12.5px] font-semibold text-[#0C1B33]">{t.user}</td>
                  <td className="py-3 pr-4"><span className="text-[10.5px] px-2 py-0.5 rounded-full" style={{ background: "#F1F5F9", color: P.slate }}>{t.type}</span></td>
                  <td className="py-3 pr-4 text-[12px] max-w-[180px] truncate" style={{ color: P.slate }}>{t.subject}</td>
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-1.5 text-[11px] capitalize" style={{ color: P.slate }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: { high: P.rose, medium: P.amber, low: P.emerald }[t.priority as "high" | "medium" | "low"] }} />
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-[12px]" style={{ color: t.agent ? P.slate : P.slateLight }}>{t.agent ?? <em>Unassigned</em>}</td>
                  <td className="py-3 pr-4"><Badge s={t.status} /></td>
                  <td className="py-3 text-[11px]" style={{ color: P.slateLight }}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SETTINGS
// ─────────────────────────────────────────────────────────────────────────────
function SettingsPage() {
  const [notifs, setNotifs] = useState({ email: true, push: true, sms: false, digest: true });
  const [twofa, setTwofa] = useState(true);
  const Toggle = ({ on, fn }: { on: boolean; fn: () => void }) => (
    <button onClick={fn} className="relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200" style={{ background: on ? P.teal : "#E2E8F0" }}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${on ? "translate-x-5" : ""}`} />
    </button>
  );
  return (
    <Page title="Settings" sub="Platform configuration, admin preferences, and integrations">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-4">
          <Card className="p-6">
            <h3 className="text-[14px] font-bold text-[#0C1B33] mb-4">Admin Profile</h3>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white" style={{ background: "linear-gradient(135deg,#0891B2,#0E7490)" }}>RG</div>
              <div className="flex-1"><div className="text-[15px] font-bold text-[#0C1B33]">Rashmi Guia</div><div className="text-[11.5px]" style={{ color: P.slateLight }}>rashmi.guia@zodiacpluss.com</div><div className="text-[11px] font-semibold mt-0.5" style={{ color: P.teal }}>Super Admin · Director & CEO</div></div>
              <button className="text-[12px] px-4 py-2 rounded-xl" style={{ border: `1px solid ${P.border}`, color: P.slate }}>Edit Profile</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Full Name", "Rashmi Guia"], ["Role", "Super Admin"], ["Email", "rashmi.guia@zodiacpluss.com"], ["Phone", "+91 98765 43210"], ["Timezone", "Asia/Kolkata (IST)"], ["Language", "English (India)"]].map(([l, v]) => (
                <div key={l}><label className="text-[9.5px] font-bold uppercase tracking-wide block mb-1" style={{ color: P.slateLight }}>{l}</label>
                  <input defaultValue={v} className="w-full px-3 py-2 text-[12px] rounded-xl focus:outline-none transition-all" style={{ border: `1px solid ${P.border}`, background: "#F8FAFC", color: P.navy }} /></div>
              ))}
            </div>
            <button className="mt-4 px-5 py-2.5 text-[12.5px] font-semibold rounded-xl text-white transition-all" style={{ background: `linear-gradient(135deg,${P.teal},${P.tealDark})` }}>Save Changes</button>
          </Card>

          <Card className="p-6">
            <h3 className="text-[14px] font-bold text-[#0C1B33] mb-4">Notifications</h3>
            <div className="space-y-4">
              {[
                { k: "email" as const, l: "Email Notifications", s: "System alerts and weekly reports" },
                { k: "push" as const, l: "Push Notifications", s: "Browser and mobile push alerts" },
                { k: "sms" as const, l: "SMS Alerts", s: "Critical events via SMS" },
                { k: "digest" as const, l: "Weekly Digest", s: "Summary every Monday 9 AM" },
              ].map(n => (
                <div key={n.k} className="flex items-center justify-between py-1">
                  <div><div className="text-[13px] font-semibold text-[#0C1B33]">{n.l}</div><div className="text-[11px]" style={{ color: P.slateLight }}>{n.s}</div></div>
                  <Toggle on={notifs[n.k]} fn={() => setNotifs(p => ({ ...p, [n.k]: !p[n.k] }))} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[14px] font-bold text-[#0C1B33] mb-4">Security</h3>
            <div className="flex items-center justify-between mb-4">
              <div><div className="text-[13px] font-semibold text-[#0C1B33]">Two-Factor Authentication</div><div className="text-[11px]" style={{ color: P.slateLight }}>Secured via Google Authenticator</div></div>
              <Toggle on={twofa} fn={() => setTwofa(!twofa)} />
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 text-[12px] font-semibold rounded-xl hover:bg-slate-50 transition-all" style={{ border: `1px solid ${P.border}`, color: P.slate }}>Change Password</button>
              <button className="flex-1 py-2.5 text-[12px] font-semibold rounded-xl hover:bg-slate-50 transition-all" style={{ border: `1px solid ${P.border}`, color: P.slate }}>Active Sessions</button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-[14px] font-bold text-[#0C1B33] mb-3">Platform Info</h3>
            {[["Version", "v3.14.2"], ["Environment", "Production"], ["Last Deploy", "Jul 15, 2026"], ["Uptime (30d)", "99.97%"], ["Active Servers", "12 instances"], ["DB Region", "ap-south-1"], ["CDN", "Cloudflare"], ["Auth Provider", "Firebase"]].map(([l, v]) => (
              <div key={l as string} className="flex justify-between items-center py-2.5" style={{ borderBottom: `1px solid ${P.border}` }}>
                <span className="text-[11px]" style={{ color: P.slateLight }}>{l}</span>
                <span className="text-[12px] font-semibold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{v}</span>
              </div>
            ))}
          </Card>

          <Card className="p-6">
            <h3 className="text-[14px] font-bold text-[#0C1B33] mb-3">Admin Team</h3>
            <div className="space-y-3">
              {adminTeam.map((a, i) => (
                <div key={a.id} className="flex items-center gap-2.5">
                  <div className="relative"><Av name={a.name} idx={i} />{a.status === "active" && <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white" style={{ background: P.emerald }} />}</div>
                  <div className="flex-1 min-w-0"><div className="text-[12px] font-semibold text-[#0C1B33] truncate">{a.name}</div><div className="text-[10.5px]" style={{ color: P.slateLight }}>{a.role}</div></div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[14px] font-bold text-[#0C1B33] mb-3">Quick Actions</h3>
            <div className="space-y-1">
              {([[Download, "Export Full Report"], [RefreshCw, "Sync All Data"], [FileText, "View Audit Log"], [Shield, "Manage Permissions"], [GitBranch, "API Integrations"]] as [React.ElementType, string][]).map(([Icon, label]) => (
                <button key={label} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12.5px] text-left transition-all hover:bg-slate-50" style={{ color: P.slate }}>
                  <Icon size={13} style={{ color: P.teal }} />{label}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  APP ROOT
// ─────────────────────────────────────────────────────────────────────────────
// Placeholder for pages not yet fully built
const ComingSoon = ({ title }: { title: string }) => (
  <Page title={title}>
    <Card className="p-16 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${SIDEBAR_TEAL}18` }}>
        <Sparkles size={28} style={{ color: SIDEBAR_TEAL }} />
      </div>
      <h2 className="text-lg font-bold text-[#0C1B33] mb-1">{title}</h2>
      <p className="text-sm" style={{ color: P.slateLight }}>This section is being built. Check back soon.</p>
    </Card>
  </Page>
);

const PAGES: Record<string, React.ReactNode> = {
  dashboard: <DashboardPage />,
  clients: <ClientsPage />,
  experts: <ExpertsPage />,
  eap: <EAPPage />,
  finance: <FinancePage />,
  analytics: <AnalyticsPage />,
  operations: <OperationsPage />,
  adminteam: <AdminTeamPage />,
  support: <SupportPage />,
  settings: <SettingsPage />,
  pricing: <ComingSoon title="Pricing" />,
  reports: <ComingSoon title="Reports" />,
  ui: <ComingSoon title="UI Elements" />,
  table: <ComingSoon title="Data Table" />,
};

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const ml = collapsed ? 0 : SIDEBAR_W;

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.22); }
      `}</style>
      <div className="min-h-screen" style={{ background: P.bg, fontFamily: "'Inter',system-ui,sans-serif" }}>
        <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
        <TopNav ml={ml} page={active} dark={dark} setDark={setDark} onToggleSidebar={() => setCollapsed(v => !v)} />
        <main className="pt-16 transition-all duration-300 ease-in-out" style={{ marginLeft: ml }}>
          <div className="p-7 max-w-[1600px] mx-auto">
            {PAGES[active] ?? PAGES.dashboard}
          </div>
        </main>
        <QuickActions />
      </div>
    </>
  );
}
