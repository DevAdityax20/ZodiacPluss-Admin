import React, { useState, useEffect, useRef } from "react";
import { Menu, ChevronRight, Search, Sun, Moon, Globe, Bell, ChevronDown, UserCog, Settings, FileText, LogOut } from "lucide-react";
import { P } from "@/app/data/designTokens";
import { PAGE_CRUMBS } from "@/app/data/mockData";
import { useIsMobile } from "@/app/hooks/useResponsive";
import NotificationPanel from "./NotificationPanel";

export default function TopNavHeader({ ml, page, dark, setDark, onToggleSidebar, onLogout }: {
  ml: number; page: string; dark: boolean; setDark: (v: boolean) => void; onToggleSidebar: () => void; onLogout?: () => void;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const crumbs = PAGE_CRUMBS[page] ?? ["Dashboard"];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed top-0 right-0 z-30 h-16 flex items-center px-4 sm:px-6 gap-4 transition-all duration-300"
      style={{ left: isMobile ? 0 : ml, background: "rgba(241,245,249,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${P.border}` }}>

      <button onClick={onToggleSidebar}
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:bg-white"
        style={{ color: P.slate }}>
        <Menu size={18} />
      </button>

      <div className="hidden sm:flex items-center gap-1.5 text-[12.5px] flex-shrink-0">
        <span style={{ color: P.slateLight }}>ZodiacPluss</span>
        {crumbs.map((c, i) => (
          <span key={c} className="flex items-center gap-1.5">
            <ChevronRight size={11} style={{ color: "#CBD5E1" }} />
            <span className={i === crumbs.length - 1 ? "font-bold text-[#0C1B33]" : "text-[#94A3B8]"}>{c}</span>
          </span>
        ))}
      </div>

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
        <button onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white"
          style={{ color: P.slate }}>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white" style={{ color: P.slate }}>
          <Globe size={16} />
        </button>

        <div ref={notifRef} className="relative">
          <button onClick={() => setNotifOpen(v => !v)}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white"
            style={{ color: P.slate }}>
            <Bell size={16} />
          </button>
          {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
        </div>

        <div className="w-px h-6 mx-1" style={{ background: P.border }} />

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
                <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] hover:bg-rose-50 transition-all text-left"
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
