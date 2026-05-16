"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

/* =========================================
   DonasiDialog — Liquid Glass Popup
   QR code, bank transfer info, WhatsApp CTA
   Matches Photo 1 liquid glass UI
   ========================================= */

interface DonasiDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function DonasiDialog({ open, onClose }: DonasiDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

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
        className="dialog-panel relative w-full max-w-[420px] rounded-xl overflow-hidden"
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
        <div className="p-8 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              {/* Wallet/Bank Icon */}
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            
            <Button
              onClick={onClose}
              variant="danger"
              className="flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap"
            >
              Tutup 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Title Area */}
          <div className="mb-2">
            <h3 className="text-white/80 text-lg font-medium mb-1">Bank Syariah Indonesia</h3>
            <h2 className="text-white text-4xl font-bold tracking-tight mb-4 font-mono text-center sm:text-left">7899 9978 49</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1.5 rounded-md text-xs font-medium text-white/90" style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                Dakwah Tulungagung Official
              </span>
              <span className="px-3 py-1.5 rounded-md text-xs font-medium text-white/90" style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                Kode Bank: 451
              </span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 rounded-md overflow-hidden p-2 flex items-center justify-center transition-transform duration-300 hover:scale-105" style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)" }}>
              <div className="relative w-full h-full rounded-md overflow-hidden bg-white flex items-center justify-center">
                {/* User requested QR code from photo 2 */}
                <Image 
                  src="/qr-donasi.png" 
                  alt="QR Code Donasi" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-full h-[1px] mb-6" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)" }} />

          {/* Footer Area */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white text-xl font-bold leading-tight">Konfirmasi</p>
              <p className="text-white/60 text-sm">via WhatsApp</p>
            </div>
            <Button
              href="https://wa.me/6285123456789?text=Assalamu%27alaikum%2C%20saya%20ingin%20konfirmasi%20donasi"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="px-6 py-3"
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
