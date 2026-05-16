"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MosqueCard from "@/components/ui/MosqueCard";
import ScheduleDialog from "@/components/ui/ScheduleDialog";
import KhutbahTable from "@/components/sections/jadwal/KhutbahTable";
import type { Mosque } from "@/types";

const MOSQUE_IMAGES = [
  "/media/masjid1.jpeg",
  "/media/masjid2.jpeg",
  "/media/masjid3.jpg",
  "/media/masjid4.webp",
  "/media/masjid5.jpeg",
  "/media/masjid6.jpg",
  "/media/masjid7.jpeg",
  "/media/masjid8.jpeg",
];

const MOCK_MOSQUES: Mosque[] = [
  {
    id: "1",
    name: "Masjid Al-Falah",
    image: MOSQUE_IMAGES[0],
    address: "Jl. Diponegoro No. 12, Tulungagung",
    contact: "0812-3456-7890",
    schedules: [
      { day: "Senin", time: "18:30 - 19:45", kitab: "Riyadhus Shalihin", ustadz: "Ust. Ahmad Fauzi" },
      { day: "Rabu", time: "19:30 - 20:45", kitab: "Bulughul Maram", ustadz: "KH. Mansur Syah" },
      { day: "Ahad", time: "05:00 - 06:30", kitab: "Tafsir Jalalain", ustadz: "Ust. Zulkifli Ali" },
    ],
    khutbah: [
      { date: "01 Mei 2026", ustadz: "Ust. Abdurrahman", title: "Menjaga Keikhlasan dalam Beramal" },
      { date: "08 Mei 2026", ustadz: "KH. Wahid Hasyim", title: "Pentingnya Silaturahmi di Era Digital" },
      { date: "15 Mei 2026", ustadz: "Ust. Adi Hidayat", title: "Meraih Keberkahan Rezeki" },
    ]
  },
  {
    id: "2",
    name: "Masjid Agung Al-Munawwar",
    image: MOSQUE_IMAGES[1],
    address: "Alun-alun Barat, Tulungagung",
    contact: "0857-1122-3344",
    schedules: [
      { day: "Selasa", time: "18:15 - 19:30", kitab: "Minhajul Abidin", ustadz: "KH. Marzuqi Mustamar" },
      { day: "Jumat", time: "18:15 - 19:30", kitab: "Ihya Ulumuddin", ustadz: "Gus Baha" },
    ],
    khutbah: [
      { date: "01 Mei 2026", ustadz: "Prof. Dr. KH. Nasaruddin Umar", title: "Spiritualitas Islam untuk Bangsa" },
      { date: "08 Mei 2026", ustadz: "Ust. Abdul Somad", title: "Mempersiapkan Bekal Akhirat" },
    ]
  },
  {
    id: "3",
    name: "Masjid Baiturrahman",
    image: MOSQUE_IMAGES[2],
    address: "Jl. Ahmad Yani, Ngunut, Tulungagung",
    contact: "0813-9988-7766",
    schedules: [
      { day: "Kamis", time: "19:45 - 21:00", kitab: "Al-Hikam", ustadz: "Ust. Salim A. Fillah" },
    ],
    khutbah: [
      { date: "01 Mei 2026", ustadz: "Ust. Hanan Attaki", title: "Seni Menata Hati" },
    ]
  },
  // Adding more to make 10 as requested
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: (i + 4).toString(),
    name: `Masjid Mitra DT ${i + 1}`,
    image: MOSQUE_IMAGES[(i + 3) % MOSQUE_IMAGES.length],
    address: "Wilayah Tulungagung & Sekitarnya",
    contact: "0811-0000-xxxx",
    schedules: [
      { day: "Ahad", time: "09:00 - 11:00", kitab: "Fathul Mu'in", ustadz: "Ustadz Lokal" },
    ],
    khutbah: [
      { date: "Mei 2026", ustadz: "Khatib Mitra", title: "Tema Mingguan Khutbah" },
    ]
  }))
];

interface MosqueGridProps {
  type: "kajian" | "khutbah";
}

export default function MosqueGrid({ type }: MosqueGridProps) {
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (mosque: Mosque) => {
    setSelectedMosque(mosque);
    setIsDialogOpen(true);
  };

  return (
    <section className="pb-32 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatePresence mode="wait">
          {type === "kajian" ? (
            <motion.div
              key="kajian-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-6"
            >
              {MOCK_MOSQUES.map((mosque) => (
                <MosqueCard 
                  key={mosque.id} 
                  mosque={mosque} 
                  onClick={() => handleCardClick(mosque)} 
                />
              ))}
            </motion.div>
          ) : (
            <KhutbahTable key="khutbah-view" mosques={MOCK_MOSQUES} />
          )}
        </AnimatePresence>
      </div>

      <ScheduleDialog 
        mosque={selectedMosque} 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        type={type}
      />
    </section>
  );
}
