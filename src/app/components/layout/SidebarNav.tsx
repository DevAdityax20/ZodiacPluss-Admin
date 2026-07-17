import React from "react";
import zodiacLogo from "@/imports/Zodiac_Colored_Logo_croped-removebg-preview.png";
import { P, SIDEBAR_TEAL, SIDEBAR_W } from "@/app/data/designTokens";
import { NAV_MAIN, NAV_PAGES } from "@/app/data/mockData";
import { useIsMobile } from "@/app/hooks/useResponsive";

function NavItem({ label, isActive, badge, onClick }: {
  label: string; isActive: boolean; badge?: number; onClick: () => void;
}) {
  return (
    <div className="relative">
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

function renderSidebarContent(active: string, handleNavClick: (id: string) => void, onLogout?: () => void) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4 flex-shrink-0">
        <img src={zodiacLogo} alt="ZodiacPluss Logo" className="flex-shrink-0 w-[56px] h-[56px] object-contain" draggable={false} />
        <div>
          <div className="flex items-center gap-0.5 leading-none mb-0.5">
            <span className="text-[20px] font-bold tracking-tight" style={{ color: "#1a2332" }}>Zodiac</span>
            <span className="text-[20px] font-bold tracking-tight" style={{ color: SIDEBAR_TEAL }}>Pluss</span>
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

      {/* Greeting card */}
      <div className="mx-4 mb-4 flex-shrink-0">
        <div className="rounded-2xl px-4 py-3" style={{ background: "linear-gradient(135deg, #e8ecf0 0%, #dce3ea 100%)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
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
      <div className="mx-4 mb-1 flex-shrink-0" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="pt-2 pb-1 px-2">
          {NAV_MAIN.map(item => (
            <NavItem key={item.id} label={item.label} isActive={active === item.id}
              badge={"badge" in item ? item.badge : undefined} onClick={() => handleNavClick(item.id)} />
          ))}
        </div>
        <div className="mx-4 my-2" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />
        <div className="px-6 pt-1 pb-1">
          <p className="text-[10.5px] font-bold tracking-[0.12em] mb-2" style={{ color: "#94A3B8" }}>PAGES</p>
        </div>
        <div className="pb-2 px-2">
          {NAV_PAGES.map(item => (
            <NavItem key={item.id} label={item.label} isActive={active === item.id} onClick={() => handleNavClick(item.id)} />
          ))}
        </div>
        <div className="mx-4 my-2" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />
        <div className="pb-6 px-2">
          <NavItem label="Settings" isActive={active === "settings"} onClick={() => handleNavClick("settings")} />
          <button onClick={onLogout} className="w-full flex items-center px-6 py-[10px] text-[14.5px] font-medium transition-all hover:text-rose-500 text-left"
            style={{ color: "#1a2332" }}>Logout</button>
        </div>
      </div>
    </>
  );
}

export default function SidebarNav({ active, setActive, collapsed, setCollapsed, onLogout }: {
  active: string; setActive: (id: string) => void; collapsed: boolean; setCollapsed: (v: boolean) => void; onLogout?: () => void;
}) {
  const isMobile = useIsMobile();
  const sidebarOpen = !collapsed;

  const handleNavClick = (id: string) => {
    setActive(id);
    if (isMobile) setCollapsed(true);
  };

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
            onClick={() => setCollapsed(true)}
          />
        )}
        <aside
          className="fixed left-0 top-0 h-screen z-50 flex flex-col select-none overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: 280,
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            background: "#ffffff",
            boxShadow: sidebarOpen ? "8px 0 32px rgba(0,0,0,0.12)" : "none",
          }}>
          {renderSidebarContent(active, handleNavClick, onLogout)}
        </aside>
      </>
    );
  }

  return (
    <aside
      className="fixed left-0 top-0 h-screen z-40 flex flex-col select-none overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? 0 : SIDEBAR_W,
        background: "#ffffff",
        boxShadow: "4px 0 24px rgba(0,0,0,0.06)",
        borderRight: "1px solid rgba(0,0,0,0.05)",
      }}>
      {renderSidebarContent(active, handleNavClick, onLogout)}
    </aside>
  );
}
