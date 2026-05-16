"use client";

import { motion } from "framer-motion";
import { User, Calendar, BookOpen, MapPin } from "lucide-react";
import type { Mosque } from "@/types";

interface KhutbahTableProps {
  mosques: Mosque[];
}

export default function KhutbahTable({ mosques }: KhutbahTableProps) {
  // Flatten all khutbah entries from all mosques
  const allKhutbah = mosques.flatMap((mosque) => 
    (mosque.khutbah || []).map((k) => ({
      ...k,
      mosqueName: mosque.name,
      mosqueId: mosque.id
    }))
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="overflow-hidden rounded-md border border-border-default bg-white shadow-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-light border-b border-border-default">
              <th className="px-6 py-5 text-primary font-bold uppercase tracking-widest text-[11px]">Nama Masjid</th>
              <th className="px-6 py-5 text-primary font-bold uppercase tracking-widest text-[11px]">Khotib (Pengisi)</th>
              <th className="px-6 py-5 text-primary font-bold uppercase tracking-widest text-[11px]">Tanggal</th>
              <th className="px-6 py-5 text-primary font-bold uppercase tracking-widest text-[11px]">Judul Khutbah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {allKhutbah.map((item, idx) => (
              <motion.tr 
                key={`${item.mosqueId}-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-primary-10 transition-colors group"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-primary-10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                       <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-text-heading">{item.mosqueName}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-text-heading font-medium">
                    <User className="w-4 h-4 text-text-light" />
                    {item.ustadz}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-text-light text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    {item.date}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-text-light" />
                    <span className="text-text-heading italic font-serif group-hover:text-primary transition-colors">
                      "{item.title}"
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer / Info */}
      <div className="px-6 py-4 bg-bg-light border-t border-border-default flex justify-between items-center text-xs text-text-light">
         <span>Menampilkan {allKhutbah.length} jadwal khutbah jumat di wilayah Tulungagung</span>
         <span className="font-medium text-primary uppercase tracking-widest">Update Otomatis • Mei 2026</span>
      </div>
    </motion.div>
  );
}
