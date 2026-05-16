"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Calendar, ArrowUpRight } from "lucide-react";
import type { Mosque } from "@/types";

interface MosqueCardProps {
  mosque: Mosque;
  onClick: () => void;
}

export default function MosqueCard({ mosque, onClick }: MosqueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, shadow: "var(--shadow-card-hover)" }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-md border border-border-default bg-white flex flex-col md:flex-row transition-all duration-300"
    >
      {/* Photo Container */}
      <div className="relative w-full md:w-[320px] aspect-video md:aspect-auto overflow-hidden bg-bg-card">
        <Image
          src={mosque.image}
          alt={mosque.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Real-time Indicator */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-cta">
           Real-time View
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold text-text-heading group-hover:text-primary transition-colors tracking-tight">
              {mosque.name}
            </h3>
            <div className="hidden md:flex w-10 h-10 rounded-md bg-primary-10 items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <p className="text-text-light text-sm leading-snug">
                 {mosque.address}
              </p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-text-heading text-sm font-bold">
                 {mosque.contact}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border-default">
           <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-widest">
              LIHAT JADWAL LENGKAP
              <MessageCircle className="w-4 h-4" />
           </div>
           
           <div className="w-8 h-8 rounded-md bg-bg-light flex items-center justify-center text-text-light group-hover:bg-primary-10 group-hover:text-primary transition-colors">
              <ArrowUpRight className="w-4 h-4" />
           </div>
        </div>
      </div>
    </motion.div>
  );
}
