import React from "react";

export interface SectionHeaderProps {
  title: string;
  sub?: string;
  right?: React.ReactNode;
}

export function SectionHeader({ title, sub, right }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-[14.5px] font-bold text-[#0C1B33]">{title}</h2>
        {sub && <p className="text-[11.5px] text-[#94A3B8] mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export default SectionHeader;
