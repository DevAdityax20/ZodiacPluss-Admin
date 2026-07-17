import React, { useState, useEffect, useCallback } from "react";
import SplashScreen from "./components/SplashScreen";
import { Sparkles } from "lucide-react";
import { P, SIDEBAR_W } from "@/app/data/designTokens";
import { useIsMobile } from "@/app/hooks/useResponsive";
import { Card } from "@/app/components/ui/Card";
import { PageShell } from "@/app/components/ui/PageShell";

// ─── Layout Components ────────────────────────────────────────────────────────
import SidebarNav from "@/app/components/layout/SidebarNav";
import TopNavHeader from "@/app/components/layout/TopNavHeader";
import QuickActionButton from "@/app/components/layout/QuickActionButton";

// ─── Authentication pages ─────────────────────────────────────────────────────
import LoginPage from "@/app/pages/auth/LoginPage";
import SignupPage from "@/app/pages/auth/SignupPage";

// ─── Main private pages ───────────────────────────────────────────────────────
import DashboardOverviewPage from "@/app/pages/dashboard/DashboardOverviewPage";
import ClientsManagementPage from "@/app/pages/dashboard/ClientsManagementPage";
import ExpertsManagementPage from "@/app/pages/dashboard/ExpertsManagementPage";
import EAPCalendarPage from "@/app/pages/dashboard/EAPCalendarPage";
import TransactionsFinancePage from "@/app/pages/dashboard/TransactionsFinancePage";
import AnalyticsInsightsPage from "@/app/pages/dashboard/AnalyticsInsightsPage";
import OperationsReleasePage from "@/app/pages/dashboard/OperationsReleasePage";
import AdminTeamManagementPage from "@/app/pages/dashboard/AdminTeamManagementPage";
import SupportInboxPage from "@/app/pages/dashboard/SupportInboxPage";
import SettingsConfigPage from "@/app/pages/dashboard/SettingsConfigPage";

// Placeholder for pages not yet fully built
const ComingSoon = ({ title }: { title: string }) => (
  <PageShell title={title}>
    <Card className="p-16 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(13,157,168,0.18)" }}>
        <Sparkles size={28} style={{ color: "#0D9DA8" }} />
      </div>
      <h2 className="text-lg font-bold text-[#0C1B33] mb-1">{title}</h2>
      <p className="text-sm text-[#94A3B8]">This section is being built. Check back soon.</p>
    </Card>
  </PageShell>
);

const PAGES: Record<string, React.ReactNode> = {
  dashboard: <DashboardOverviewPage />,
  clients: <ClientsManagementPage />,
  experts: <ExpertsManagementPage />,
  eap: <EAPCalendarPage />,
  finance: <TransactionsFinancePage />,
  analytics: <AnalyticsInsightsPage />,
  operations: <OperationsReleasePage />,
  adminteam: <AdminTeamManagementPage />,
  support: <SupportInboxPage />,
  settings: <SettingsConfigPage />,
  pricing: <ComingSoon title="Pricing" />,
  reports: <ComingSoon title="Reports" />,
  ui: <ComingSoon title="UI Elements" />,
  table: <ComingSoon title="Data Table" />,
};

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(true);
  const [dark, setDark] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Authentication State
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [authView, setAuthView] = useState<"login" | "signup">("login");

  const isMobile = useIsMobile();

  // Load session from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("zp_admin_session");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("zp_admin_session");
      }
    }
  }, []);

  const handleLogin = (authenticatedUser: { email: string; role: string }) => {
    setUser(authenticatedUser);
    localStorage.setItem("zp_admin_session", JSON.stringify(authenticatedUser));
    setActive("dashboard");
  };

  const handleSignup = (registeredUser: { email: string; role: string }) => {
    setUser(registeredUser);
    localStorage.setItem("zp_admin_session", JSON.stringify(registeredUser));
    setActive("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("zp_admin_session");
  };

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  const ml = isMobile ? 0 : (collapsed ? 0 : SIDEBAR_W);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} minDuration={3500} />;
  }

  // If not logged in, render the login/signup switcher
  if (!user) {
    return authView === "login" ? (
      <LoginPage onLogin={handleLogin} onGoToSignup={() => setAuthView("signup")} />
    ) : (
      <SignupPage onSignup={handleSignup} onGoToLogin={() => setAuthView("login")} />
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-pageEnter {
          animation: fadeSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.22); }
      `}</style>
      <div className="min-h-screen" style={{ background: P.bg, fontFamily: "'Inter',system-ui,sans-serif" }}>
        <SidebarNav active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} onLogout={handleLogout} />
        <TopNavHeader ml={ml} page={active} dark={dark} setDark={setDark} onToggleSidebar={() => setCollapsed(v => !v)} onLogout={handleLogout} />
        <main className="pt-16 transition-all duration-300 ease-in-out" style={{ marginLeft: ml }}>
          <div className={`${isMobile ? "p-4" : "p-7"} max-w-[1600px] mx-auto`}>
            <div key={active} className="animate-pageEnter">
              {PAGES[active] ?? PAGES.dashboard}
            </div>
          </div>
        </main>
        <QuickActionButton />
      </div>
    </>
  );
}
