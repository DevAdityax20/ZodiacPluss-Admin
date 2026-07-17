export const P = {
  navy: "#0C1B33",
  teal: "#0891B2",
  tealDark: "#0E7490",
  tealLight: "#E0F2FE",
  emerald: "#10B981",
  amber: "#F59E0B",
  violet: "#8B5CF6",
  rose: "#EF4444",
  slate: "#64748B",
  slateLight: "#94A3B8",
  bg: "#F1F5F9",
  card: "#FFFFFF",
  border: "rgba(12,27,51,0.07)",
};

export const GRAD = [
  "linear-gradient(135deg,#0891B2,#0E7490)",
  "linear-gradient(135deg,#10B981,#059669)",
  "linear-gradient(135deg,#8B5CF6,#6D28D9)",
  "linear-gradient(135deg,#F59E0B,#D97706)",
  "linear-gradient(135deg,#EF4444,#DC2626)",
  "linear-gradient(135deg,#EC4899,#DB2777)",
];

export const avatarGrad = (i: number) => GRAD[Math.abs(i) % GRAD.length];

export const initials = (n: string) =>
  n.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const fmtK = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : `${n}`;

export const fmtINR = (n: number) => {
  const a = Math.abs(n),
    pre = n < 0 ? "-₹" : "₹";
  return a >= 1e7
    ? `${pre}${(a / 1e7).toFixed(2)}Cr`
    : a >= 1e5
    ? `${pre}${(a / 1e5).toFixed(2)}L`
    : a >= 1e3
    ? `${pre}${(a / 1e3).toFixed(1)}K`
    : `${pre}${a}`;
};

export const tipStyle = {
  borderRadius: 12,
  border: "none",
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  fontSize: 12,
  padding: "8px 12px",
};

export const SIDEBAR_TEAL = "#0D9DA8";
export const SIDEBAR_W = 272;
