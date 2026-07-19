"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/button";

/* =========================================
   TanyaDialog — Liquid Glass Popup
   Form Tanya Ustadz, submits directly to WhatsApp
   Matches Photo 1 liquid glass UI
   ========================================= */

interface TanyaDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function TanyaDialog({ open, onClose }: TanyaDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [gender, setGender] = useState("Ikhwan");
  const [pertanyaan, setPertanyaan] = useState("");
  const [error, setError] = useState("");

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* Lock body scroll */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !umur.trim() || !pertanyaan.trim()) {
      setError("Semua kolom wajib diisi.");
      return;
    }
    setError("");

    // Formatted WhatsApp message
    const waText = 
`Assalamu'alaikum warahmatullah wabarakatuh Ustadz,

Saya ingin bertanya. Berikut data saya:
- *Nama:* ${nama.trim()}
- *Umur:* ${umur.trim()} tahun
- *Jenis Kelamin:* ${gender}

*Pertanyaan:*
${pertanyaan.trim()}`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/6285731110003?text=${encodedText}`;
    
    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 dialog-backdrop"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="dialog-panel relative w-full max-w-[460px] rounded-xl overflow-y-auto overflow-x-hidden scrollbar-hide max-h-[calc(100vh-2rem)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, rgba(0, 113, 106, 0.25) 0%, rgba(0, 0, 0, 0.5) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Style to hide webkit scrollbar */}
        <style dangerouslySetInnerHTML={{__html: `
          .dialog-panel::-webkit-scrollbar {
            display: none;
          }
        `}} />
        {/* Decorative Light Glows */}
        <div className="absolute -top-[20%] -left-[20%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-[20%] -right-[20%] w-[50%] h-[50%] rounded-full bg-[#d4a843]/20 blur-[60px] pointer-events-none" />

        {/* Content Container */}
        <div className="p-5 sm:p-6 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              {/* Question mark/chat icon */}
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            
            <Button
              onClick={onClose}
              variant="danger"
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 text-sm whitespace-nowrap"
            >
              Tutup 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Title Area */}
          <div className="mb-4">
            <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight mb-1">Tanya Ustadz</h2>
            <p className="text-white/60 text-xs sm:text-sm">
              Ajukan pertanyaan seputar agama Islam kepada Ustadz Moh. Shohibul Umam, Lc., M.Pd.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="p-3 rounded bg-red-500/20 border border-red-500/30 text-red-200 text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-white/80 text-[11px] font-semibold mb-1">Nama Lengkap / Inisial</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Abdullah"
                  className="w-full px-3.5 py-2 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-[11px] font-semibold mb-1">Umur (Tahun)</label>
                <input
                  type="number"
                  value={umur}
                  onChange={(e) => setUmur(e.target.value)}
                  placeholder="Contoh: 25"
                  className="w-full px-3.5 py-2 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-[11px] font-semibold mb-1.5">Jenis Kelamin</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender("Ikhwan")}
                  className={[
                    "py-1.5 rounded-md text-xs font-bold transition-all border",
                    gender === "Ikhwan"
                      ? "bg-primary text-white border-primary"
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10",
                  ].join(" ")}
                >
                  Ikhwan (Laki-laki)
                </button>
                <button
                  type="button"
                  onClick={() => setGender("Akhwat")}
                  className={[
                    "py-1.5 rounded-md text-xs font-bold transition-all border",
                    gender === "Akhwat"
                      ? "bg-primary text-white border-primary"
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10",
                  ].join(" ")}
                >
                  Akhwat (Perempuan)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-[11px] font-semibold mb-1">Pertanyaan</label>
              <textarea
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
                placeholder="Tuliskan pertanyaan Anda secara detail dan jelas..."
                rows={3}
                className="w-full px-3.5 py-2 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors resize-none"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
                required
              />
            </div>

            {/* Separator */}
            <div className="w-full h-[1px] my-4" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)" }} />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 flex items-center justify-center gap-2"
              >
                {/* WA Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                Kirim via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
