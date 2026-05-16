"use client";

import { Calendar, Bell, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";

export default function JadwalComingSoon() {
  return (
    <section className="py-24 sm:py-32 bg-white flex flex-col items-center justify-center text-center px-5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* Icon / Illustration Area */}
        <div className="relative mb-12 flex justify-center">
          <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center relative z-10">
            <Calendar className="w-12 h-12 text-primary" />
          </div>
          {/* Decorative glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[60px] rounded-full -z-10" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-text-heading mb-6 tracking-tight">
          Segera Hadir: <br />
          <span className="text-primary">Update Jadwal Kajian</span>
        </h2>
        
        <p className="text-lg text-text-light mb-12 leading-relaxed">
          Kami sedang mempersiapkan integrasi data jadwal kajian rutin dan khutbah Jumat yang lebih akurat dan real-time. Nantikan fitur terbaru kami untuk memudahkan Anda mencari lokasi kajian terdekat.
        </p>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 text-left">
          <div className="p-6 bg-bg-light rounded-2xl border border-border-default hover:border-primary/30 transition-colors">
            <Clock className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-bold text-text-heading mb-2">Real-time</h4>
            <p className="text-sm text-text-muted">Data jadwal yang selalu terupdate setiap minggu.</p>
          </div>
          <div className="p-6 bg-bg-light rounded-2xl border border-border-default hover:border-primary/30 transition-colors">
            <Bell className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-bold text-text-heading mb-2">Notifikasi</h4>
            <p className="text-sm text-text-muted">Dapatkan pengingat untuk kajian favorit Anda.</p>
          </div>
          <div className="p-6 bg-bg-light rounded-2xl border border-border-default hover:border-primary/30 transition-colors">
            <Calendar className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-bold text-text-heading mb-2">Integrasi</h4>
            <p className="text-sm text-text-muted">Terhubung langsung dengan Google Maps & WA.</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/" variant="secondary">
            Kembali ke Beranda
          </Button>
          <Button href="https://wa.me/6281234567890" target="_blank" variant="primary">
            Hubungi Admin via WA
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
