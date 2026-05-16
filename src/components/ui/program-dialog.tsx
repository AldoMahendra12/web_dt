"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/button";
import type { ProgramItem } from "@/types";

/* =========================================
   ProgramDialog — Liquid Glass Popup
   Matches the design of DonasiDialog
   ========================================= */

interface ProgramDialogProps {
  open: boolean;
  program: ProgramItem | null;
  onClose: () => void;
}

export default function ProgramDialog({ open, program, onClose }: ProgramDialogProps) {
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

  if (!open || !program) return null;

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
        className="dialog-panel relative w-full max-w-[500px] rounded-xl overflow-hidden"
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
          <div className="flex justify-end items-start mb-6">
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
          <div className="mb-6">
            <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {program.title}
            </h2>
          </div>

          {/* Separator */}
          <div className="w-full h-[1px] mb-6" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)" }} />

          {/* Description Section */}
          <div className="mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-white/80 text-base leading-relaxed">
              {program.fullDescription || program.description}
            </p>
          </div>

          {/* Footer Area */}
          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="text-white text-lg font-bold leading-tight">Dukung Program Ini</p>
              <p className="text-white/60 text-sm">Bantu kami mewujudkannya</p>
            </div>
            {/* The primary button will open Donasi - in a real app this might trigger DonasiDialog, 
                for now we just link to a whatsapp or we can leave it as Hubungi Kami */}
            <Button
              href="https://wa.me/6285123456789?text=Assalamu%27alaikum%2C%20saya%20ingin%20berdonasi%20untuk%20program%20ini"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="px-6 py-3 whitespace-nowrap"
            >
              Donasi Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
