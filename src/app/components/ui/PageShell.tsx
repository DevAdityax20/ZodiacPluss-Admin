import React from "react";
import { useIsMobile } from "@/app/hooks/useResponsive";
import { P } from "@/app/data/designTokens";

export interface PageShellProps {
  title: string;
  sub?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function PageShell({ title, sub, action, children }: PageShellProps) {
  const isMobile = useIsMobile();
  return (
    <div>
      <div className={`flex ${isMobile ? "flex-col gap-3 items-stretch" : "items-start justify-between"} mb-7`}>
        <div>
          <h1 className="text-[22px] font-bold text-[#0C1B33] tracking-tight">{title}</h1>
          {sub && <p className="text-[12.5px] mt-1" style={{ color: P.slateLight }}>{sub}</p>}
        </div>
        {action && <div className={isMobile ? "w-full flex" : ""}>{action}</div>}
      </div>
      {children}
    </div>
  );
}

export default PageShell;
