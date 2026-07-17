import React from "react";
import { P } from "@/app/data/designTokens";

export interface TableHeaderProps {
  cols: string[];
}

export function TableHeader({ cols }: TableHeaderProps) {
  return (
    <thead>
      <tr style={{ borderBottom: `1px solid ${P.border}` }}>
        {cols.map(c => (
          <th key={c} className="text-left text-[10.5px] font-semibold uppercase tracking-wide pb-3 pr-4" style={{ color: P.slateLight }}>
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
