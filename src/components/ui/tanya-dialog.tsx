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
    const waUrl = `https://wa.me/6281234567890?text=${encodedText}`;
    
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
        className="dialog-panel relative w-full max-w-[460px] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, rgba(0, 113, 106, 0.25) 0%, rgba(0, 0, 0, 0.5) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Decorative Light Glows */}
        <div className="absolute -top-[20%] -left-[20%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-[20%] -right-[20%] w-[50%] h-[50%] rounded-full bg-[#d4a843]/20 blur-[60px] pointer-events-none" />

        {/* Content Container */}
        <div className="p-6 sm:p-8 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              {/* Question mark/chat icon */}
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            
            <Button
              onClick={onClose}
              variant="danger"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm whitespace-nowrap"
            >
              Tutup 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Title Area */}
          <div className="mb-6">
            <h2 className="text-white text-2xl font-bold tracking-tight mb-2">Tanya Ustadz</h2>
            <p className="text-white/60 text-xs sm:text-sm">
              Ajukan pertanyaan seputar agama Islam kepada Ustadz Moh. Shohibul Umam, Lc., M.Pd.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded bg-red-500/20 border border-red-500/30 text-red-200 text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-xs font-semibold mb-1">Nama Lengkap / Inisial</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Abdullah"
                  className="w-full px-4 py-2.5 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-xs font-semibold mb-1">Umur (Tahun)</label>
                <input
                  type="number"
                  value={umur}
                  onChange={(e) => setUmur(e.target.value)}
                  placeholder="Contoh: 25"
                  className="w-full px-4 py-2.5 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
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
              <label className="block text-white/80 text-xs font-semibold mb-1.5">Jenis Kelamin</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender("Ikhwan")}
                  className={[
                    "py-2 rounded-md text-xs font-bold transition-all border",
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
                    "py-2 rounded-md text-xs font-bold transition-all border",
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
              <label className="block text-white/80 text-xs font-semibold mb-1">Pertanyaan</label>
              <textarea
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
                placeholder="Tuliskan pertanyaan Anda secara detail dan jelas..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors resize-none"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
                required
              />
            </div>

            {/* Separator */}
            <div className="w-full h-[1px] my-6" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)" }} />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3.5 flex items-center justify-center gap-2"
              >
                {/* WA Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.114.957 11.99.957c-5.432 0-9.855 4.37-9.859 9.802-.001 1.77.475 3.493 1.378 5.017L2.5 21.5l6.147-1.597zM17.487 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-1.125-.56-1.92-1.01-2.67-2.3-.2-.34.2-.32.57-1.07.06-.13.03-.25-.01-.33-.05-.08-.47-1.13-.65-1.55-.175-.42-.35-.36-.48-.37h-.42c-.15 0-.38.06-.58.28-.2.22-.77.75-.77 1.83s.78 2.13.89 2.28c.11.15 1.54 2.35 3.74 3.3 1.15.5 2.05.8 2.76.99.55.17 1.05.15 1.44.09.44-.06 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.19-.57-.34z"/>
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
