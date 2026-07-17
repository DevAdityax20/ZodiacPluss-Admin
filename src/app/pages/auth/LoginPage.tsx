import React, { useState } from "react";
import zodiacLogo from "@/imports/Zodiac_Colored_Logo_croped-removebg-preview.png";
import { P, SIDEBAR_TEAL } from "@/app/data/designTokens";
import { Mail, Lock, ShieldAlert, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage({ onLogin, onGoToSignup }: {
  onLogin: (user: { email: string; role: string }) => void;
  onGoToSignup: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase() === "admin@zodiacpluss.com" && password === "password123") {
        onLogin({ email: email.toLowerCase(), role: "Super Admin" });
      } else {
        setError("Invalid email address or password. Try admin@zodiacpluss.com / password123");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: `linear-gradient(135deg, ${P.navy} 0%, #1e293b 100%)`, fontFamily: "'Inter', sans-serif" }}>
      
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: P.teal }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: P.violet }} />

      <div className="w-full max-w-[440px] bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative border overflow-hidden transition-all duration-300 hover:shadow-teal-500/5"
        style={{ borderColor: "rgba(255,255,255,0.08)", animation: "fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both" }}>
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-3">
            <div className="absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse" style={{ background: SIDEBAR_TEAL }} />
            <img src={zodiacLogo} alt="ZodiacPluss" className="w-[84px] h-[84px] object-contain relative" />
          </div>
          <div className="flex items-center gap-0.5 leading-none mb-1.5">
            <span className="text-[24px] font-extrabold tracking-tight text-white">Zodiac</span>
            <span className="text-[24px] font-extrabold tracking-tight" style={{ color: SIDEBAR_TEAL }}>Pluss</span>
          </div>
          <span className="text-[12px] font-semibold tracking-wider text-slate-400/80 uppercase">Super Admin Portal</span>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-500/10 border text-[12.5px] leading-relaxed text-rose-200"
            style={{ borderColor: "rgba(239,68,68,0.2)", animation: "fadeSlideUp 0.2s ease" }}>
            <ShieldAlert size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. admin@zodiacpluss.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl text-[13px] bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: "rgba(255,255,255,0.12)", fontFamily: "inherit" }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = SIDEBAR_TEAL;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${P.teal}22`;
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5 ml-1">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-2xl text-[13px] bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: "rgba(255,255,255,0.12)", fontFamily: "inherit" }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = SIDEBAR_TEAL;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${P.teal}22`;
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[12px] pt-1">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
              <input type="checkbox" className="accent-cyan-500 rounded border-slate-700 bg-slate-800" />
              Remember me
            </label>
            <button type="button" className="font-semibold text-slate-400 hover:text-white transition-colors">Forgot Password?</button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-[13.5px] font-bold shadow-xl transition-all active:scale-95 disabled:opacity-50 mt-2"
            style={{
              background: `linear-gradient(135deg, ${P.teal} 0%, ${P.tealDark} 100%)`,
              boxShadow: "0 4px 20px rgba(8,145,178,0.25)",
            }}>
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-[12.5px] text-slate-400">
          New to ZodiacPluss Admin?{" "}
          <button onClick={onGoToSignup} className="font-bold text-white hover:underline transition-all" style={{ color: SIDEBAR_TEAL }}>Create account</button>
        </div>
      </div>
    </div>
  );
}
