"use client";

import { useEffect, useRef } from "react";
import { X, Clock, MapPin, Phone, Download, FileText } from "lucide-react";
import Button from "@/components/ui/button";
import type { Mosque } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface ScheduleDialogProps {
  mosque: Mosque | null;
  open: boolean;
  onClose: () => void;
  type: "kajian" | "khutbah";
}

export default function ScheduleDialog({ mosque, open, onClose, type }: ScheduleDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

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

  if (!mosque) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-md flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#ffffff",
              border: "1px solid var(--border-default)",
              boxShadow: "0 50px 100px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Header */}
            <div className="p-6 md:p-10 border-b border-border-default flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {type === "kajian" ? "Jadwal Kajian Rutin" : "Jadwal Khutbah Jumat"}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-2">{mosque.name}</h2>
                <div className="flex flex-wrap gap-4 text-text-light text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    {mosque.address}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-primary" />
                    {mosque.contact}
                  </span>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-bg-light text-text-light hover:text-primary hover:bg-primary-10 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
              {type === "kajian" ? (
                <div className="overflow-x-auto rounded-md border border-border-default bg-bg-light">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-primary-10">
                        <th className="px-6 py-4 text-primary font-bold uppercase tracking-wider text-xs border-b border-border-default">Hari</th>
                        <th className="px-6 py-4 text-primary font-bold uppercase tracking-wider text-xs border-b border-border-default">Waktu</th>
                        <th className="px-6 py-4 text-primary font-bold uppercase tracking-wider text-xs border-b border-border-default">Kitab / Materi</th>
                        <th className="px-6 py-4 text-primary font-bold uppercase tracking-wider text-xs border-b border-border-default">Ustadz / Pengampu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-default">
                      {mosque.schedules.map((item, idx) => (
                        <tr key={idx} className="hover:bg-white transition-colors group">
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 rounded-md bg-primary text-white text-sm font-bold">
                              {item.day}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-text-heading font-medium">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-text-light" />
                              {item.time}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-text-light italic font-serif text-lg">
                            "{item.kitab}"
                          </td>
                          <td className="px-6 py-5">
                            <div className="font-bold text-text-heading group-hover:text-primary transition-colors">
                              {item.ustadz}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {mosque.khutbah?.map((item, idx) => (
                     <div key={idx} className="p-6 rounded-md border border-border-default bg-bg-light flex justify-between items-center group hover:border-primary transition-all">
                        <div>
                           <p className="text-text-light text-xs mb-1 uppercase font-bold tracking-widest">{item.date}</p>
                           <h4 className="text-xl font-bold text-text-heading group-hover:text-primary transition-colors">{item.ustadz}</h4>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary-10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                           <FileText className="w-5 h-5" />
                        </div>
                     </div>
                   ))}
                </div>
              )}

              {/* Extra Info / Call to Action */}
              <div className="mt-10 p-6 rounded-md bg-bg-light border border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-cta">
                       <Download className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="text-text-heading font-bold">Unduh Jadwal Lengkap</h4>
                       <p className="text-text-light text-sm">Dapatkan versi PDF untuk dicetak atau disimpan.</p>
                    </div>
                 </div>
                 <Button variant="primary" className="px-8 shadow-cta">
                    Download PDF
                 </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-bg-light border-t border-border-default text-center text-text-light text-xs">
               Jadwal dapat berubah sewaktu-waktu. Informasi lebih lanjut hubungi pengurus masjid terkait.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
