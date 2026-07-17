import React from "react";
import { Download, Users, UserCheck, Activity, DollarSign, Briefcase, Star, MessageSquare, TrendingUp, ArrowRight, MoreHorizontal } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart as RPie, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { P, fmtK, fmtINR, tipStyle } from "@/app/data/designTokens";
import { monthlyGrowth, weekSessions, expertCats, userDist, clients, experts } from "@/app/data/mockData";
import { PageShell } from "@/app/components/ui/PageShell";
import { Card } from "@/app/components/ui/Card";
import { KpiCard } from "@/app/components/ui/KpiCard";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { TableHeader } from "@/app/components/ui/TableHeader";
import { InitialsAvatar } from "@/app/components/ui/InitialsAvatar";
import { StatusBadge } from "@/app/components/ui/StatusBadge";

export default function DashboardOverviewPage() {
  return (
    <PageShell title="Overview" sub="Wednesday, 16 July 2026 · Welcome back, Rashmi 👋"
      action={
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-[12.5px] font-semibold shadow-md hover:shadow-lg transition-all"
          style={{ background: `linear-gradient(135deg,${P.teal},${P.tealDark})` }}>
          <Download size={14} />Export Report
        </button>
      }>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <KpiCard icon={Users} label="Total Clients" value="24,891" sub="+312 this week" trend={5.8} color={P.teal} gradient />
        <KpiCard icon={UserCheck} label="Active Experts" value="1,247" sub="94.2% verified" trend={3.2} color={P.emerald} gradient />
        <KpiCard icon={Activity} label="Sessions Today" value="3,892" sub="avg 42 min/session" trend={8.4} color={P.violet} gradient />
        <KpiCard icon={DollarSign} label="Revenue MTD" value="₹1.84Cr" sub="92% of ₹2Cr target" trend={12.1} color={P.amber} gradient />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard icon={Briefcase} label="EAP Companies" value="48" sub="4,520 members" trend={6.3} color={P.teal} />
        <KpiCard icon={Star} label="Expert Rating" value="4.72★" sub="184K reviews" trend={1.2} color={P.amber} />
        <KpiCard icon={MessageSquare} label="Open Tickets" value="23" sub="Avg response 1.4h" trend={-18.2} color={P.rose} />
        <KpiCard icon={TrendingUp} label="Conversion" value="8.4%" sub="Install → paid" trend={0.9} color={P.emerald} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <Card className="col-span-1 xl:col-span-2 p-6">
          <SectionHeader title="Platform Growth" sub="Monthly active users — all segments"
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
          <SectionHeader title="User Distribution" sub="30,658 total accounts" />
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
          <SectionHeader title="Daily Sessions" sub="This week — total vs completed" />
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
          <SectionHeader title="Expert Specialties" sub="Sessions by category this week" />
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
        <SectionHeader title="Recent Registrations" sub="Latest client accounts"
          right={<button className="text-[12.5px] font-semibold flex items-center gap-1" style={{ color: P.teal }}>View all <ArrowRight size={13} /></button>} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader cols={["User", "Plan", "Zodiac Sign", "Sessions", "Joined", "Status", ""]} />
            <tbody>
              {clients.map((u, i) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors"
                  style={{ borderBottom: i < clients.length - 1 ? `1px solid ${P.border}` : "none" }}>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <InitialsAvatar name={u.name} idx={i} />
                      <div><div className="text-[12.5px] font-semibold text-[#0C1B33]">{u.name}</div><div className="text-[10.5px]" style={{ color: P.slateLight }}>{u.email}</div></div>
                    </div>
                  </td>
                  <td className="py-3 pr-4"><span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: P.tealLight, color: P.teal }}>{u.plan}</span></td>
                  <td className="py-3 pr-4 text-[12.5px]" style={{ color: P.slate }}>{u.sign}</td>
                  <td className="py-3 pr-4 text-[12.5px] font-bold text-[#0C1B33]" style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{u.sessions}</td>
                  <td className="py-3 pr-4 text-[11px]" style={{ color: P.slateLight }}>{u.joined}</td>
                  <td className="py-3 pr-4"><StatusBadge s={u.status} /></td>
                  <td className="py-3"><button style={{ color: P.slateLight }} className="hover:text-[#0C1B33] transition-colors"><MoreHorizontal size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
