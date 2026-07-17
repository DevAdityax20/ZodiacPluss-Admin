import React, { useState } from "react";
import zodiacLogo from "@/imports/Zodiac_Colored_Logo_croped-removebg-preview.png";
import { P, SIDEBAR_TEAL } from "@/app/data/designTokens";
import { Mail, Lock, ShieldAlert, ArrowRight, User, Shield } from "lucide-react";

export default function SignupPage({ onSignup, onGoToLogin }: {
  onSignup: (user: { email: string; role: string }) => void;
  onGoToLogin: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("Support");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onSignup({ email: email.toLowerCase(), role: "Admin Agent" });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: `linear-gradient(135deg, ${P.navy} 0%, #1e293b 100%)`, fontFamily: "'Inter', sans-serif" }}>
      
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: P.teal }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: P.violet }} />

      <div className="w-full max-w-[440px] bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative border overflow-hidden transition-all duration-300"
        style={{ borderColor: "rgba(255,255,255,0.08)", animation: "fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both" }}>
        
        <div className="flex flex-col items-center text-center mb-6">
          <img src={zodiacLogo} alt="ZodiacPluss" className="w-[68px] h-[68px] object-contain mb-2" />
          <div className="flex items-center gap-0.5 leading-none mb-1">
            <span className="text-[22px] font-extrabold tracking-tight text-white">Zodiac</span>
            <span className="text-[22px] font-extrabold tracking-tight" style={{ color: SIDEBAR_TEAL }}>Pluss</span>
          </div>
          <span className="text-[11px] font-semibold tracking-wider text-slate-400/80 uppercase">Request Access Panel</span>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2.5 p-3 rounded-2xl bg-rose-500/10 border text-[12px] leading-relaxed text-rose-200"
            style={{ borderColor: "rgba(239,68,68,0.2)" }}>
            <ShieldAlert size={15} className="text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-[10.5px] font-bold text-slate-300 uppercase tracking-wider block mb-1 ml-1">Full Name</label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Rashmi Guia"
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl text-[13px] bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: "rgba(255,255,255,0.12)", fontFamily: "inherit" }}
                onFocus={e => (e.currentTarget.style.borderColor = SIDEBAR_TEAL)}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>
          </div>

          <div>
            <label className="text-[10.5px] font-bold text-slate-300 uppercase tracking-wider block mb-1 ml-1">Email Address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. admin@zodiacpluss.com"
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl text-[13px] bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: "rgba(255,255,255,0.12)", fontFamily: "inherit" }}
                onFocus={e => (e.currentTarget.style.borderColor = SIDEBAR_TEAL)}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>
          </div>

          <div>
            <label className="text-[10.5px] font-bold text-slate-300 uppercase tracking-wider block mb-1 ml-1">Department</label>
            <div className="relative">
              <Shield size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={dept}
                onChange={e => setDept(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl text-[13px] bg-slate-900 border text-white focus:outline-none transition-all appearance-none"
                style={{ borderColor: "rgba(255,255,255,0.12)", fontFamily: "inherit" }}>
                <option value="Executive">Executive</option>
                <option value="Finance">Finance</option>
                <option value="Support">Support</option>
                <option value="Product">Product</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10.5px] font-bold text-slate-300 uppercase tracking-wider block mb-1 ml-1">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl text-[13px] bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: "rgba(255,255,255,0.12)", fontFamily: "inherit" }}
                onFocus={e => (e.currentTarget.style.borderColor = SIDEBAR_TEAL)}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-white text-[13px] font-bold shadow-xl transition-all active:scale-95 disabled:opacity-50 mt-4"
            style={{
              background: `linear-gradient(135deg, ${P.teal} 0%, ${P.tealDark} 100%)`,
            }}>
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            ) : (
              <>
                Register Account <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-[12px] text-slate-400">
          Already have an account?{" "}
          <button onClick={onGoToLogin} className="font-bold text-white hover:underline transition-all" style={{ color: SIDEBAR_TEAL }}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
