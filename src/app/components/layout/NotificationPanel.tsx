import React, { useState } from "react";
import { X } from "lucide-react";
import { NOTIFICATIONS } from "@/app/data/mockData";
import { P } from "@/app/data/designTokens";
import { useIsMobile } from "@/app/hooks/useResponsive";

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const isMobile = useIsMobile();
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const unread = notes.filter(n => !n.read).length;
  const markAll = () => setNotes(prev => prev.map(n => ({ ...n, read: true })));
  const markOne = (id: number) => setNotes(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }} onClick={onClose}>
        <div className="mt-auto bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-slideUp" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${P.border}` }}>
            <div>
              <h3 className="text-[16px] font-bold text-[#0C1B33]">Notifications</h3>
              {unread > 0 && <p className="text-[11px] text-[#94A3B8]">{unread} unread</p>}
            </div>
            <div className="flex items-center gap-2">
              {unread > 0 && <button onClick={markAll} className="text-[11px] font-semibold hover:underline" style={{ color: P.teal }}>Mark all read</button>}
              <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-all" style={{ color: P.slate }}><X size={14} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {notes.map(n => {
              const Icon = n.icon;
              return (
                <div key={n.id} className={`flex gap-3 px-5 py-3.5 cursor-pointer transition-all hover:bg-slate-50 ${!n.read ? "bg-sky-50/40" : ""}`}
                  style={{ borderBottom: `1px solid ${P.border}` }} onClick={() => markOne(n.id)}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${n.color}18` }}><Icon size={15} style={{ color: n.color }} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[12.5px] font-semibold text-[#0C1B33] leading-snug ${!n.read ? "" : "font-medium"}`}>{n.title}</span>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: P.teal }} />}
                    </div>
                    <p className="text-[11px] leading-snug mt-0.5" style={{ color: P.slateLight }}>{n.body}</p>
                    <span className="text-[10px] mt-1 block" style={{ color: P.slateLight }}>{n.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-5 py-3 text-center" style={{ borderTop: `1px solid ${P.border}` }}>
            <button className="text-[12px] font-semibold hover:underline" style={{ color: P.teal }}>View all notifications</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-12 right-0 w-[380px] rounded-2xl shadow-2xl overflow-hidden z-50 bg-white"
      style={{ border: `1px solid ${P.border}` }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${P.border}` }}>
        <div>
          <h3 className="text-[14px] font-bold text-[#0C1B33]">Notifications</h3>
          {unread > 0 && <p className="text-[11px] text-[#94A3B8]">{unread} unread</p>}
        </div>
        <div className="flex items-center gap-2">
          {unread > 0 && (
            <button onClick={markAll} className="text-[11px] font-semibold hover:underline" style={{ color: P.teal }}>Mark all read</button>
          )}
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-all" style={{ color: P.slate }}>
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="max-h-[420px] overflow-y-auto">
        {notes.map(n => {
          const Icon = n.icon;
          return (
            <div key={n.id}
              className={`flex gap-3 px-5 py-3.5 cursor-pointer transition-all hover:bg-slate-50 ${!n.read ? "bg-sky-50/40" : ""}`}
              style={{ borderBottom: `1px solid ${P.border}` }}
              onClick={() => markOne(n.id)}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${n.color}18` }}>
                <Icon size={15} style={{ color: n.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[12.5px] font-semibold text-[#0C1B33] leading-snug ${!n.read ? "" : "font-medium"}`}>{n.title}</span>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: P.teal }} />}
                </div>
                <p className="text-[11px] leading-snug mt-0.5" style={{ color: P.slateLight }}>{n.body}</p>
                <span className="text-[10px] mt-1 block" style={{ color: P.slateLight }}>{n.time}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-3 text-center" style={{ borderTop: `1px solid ${P.border}` }}>
        <button className="text-[12px] font-semibold hover:underline" style={{ color: P.teal }}>View all notifications</button>
      </div>
    </div>
  );
}
