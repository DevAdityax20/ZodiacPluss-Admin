import React from "react";
import { P } from "@/app/data/designTokens";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm ${className}`} style={{ border: `1px solid ${P.border}` }}>
      {children}
    </div>
  );
}

export default Card;
