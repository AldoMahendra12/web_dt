"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProgramCategory, ProgramItem } from "@/types";
import Button from "@/components/ui/button";
import ProgramDialog from "@/components/ui/program-dialog";

/* =========================================
   ProgramContent — Card Grid with Filtering
   Filtered by activeId from Parent/Hero Toggle
   ========================================= */

interface ProgramContentProps {
  activeId: string;
  categories: ProgramCategory[];
  items: ProgramItem[];
}

export default function ProgramContent({
  activeId,
  categories,
  items,
}: ProgramContentProps) {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  /* Active category meta */
  const activeCategory = categories.find((c) => c.id === activeId);
  const filteredItems = items.filter((i) => i.categoryId === activeId);

  return (
    <section className="pb-16 sm:pb-24 bg-white">
      {/* ── Category Description ── */}
      <div className="max-w-[1200px] mx-auto px-5 pt-4 pb-12 text-center">
        <div className="max-w-[700px] mx-auto">
          <p className="text-xs font-bold tracking-[4px] text-primary/60 mb-3 uppercase">
            Program {activeCategory?.label}
          </p>
          <p className="text-base text-text-light leading-relaxed">
            {activeCategory?.description}
          </p>
        </div>
      </div>

      {/* ── Program Card Grid ── */}
      <div className="max-w-[1200px] mx-auto px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <ProgramCard 
                key={item.id} 
                item={item} 
                index={index} 
                onSelect={() => setSelectedProgram(item)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProgramDialog 
        open={!!selectedProgram} 
        program={selectedProgram} 
        onClose={() => setSelectedProgram(null)} 
      />
    </section>
  );
}

/* ── Individual Program Card ── */
function ProgramCard({
  item,
  index,
  onSelect,
}: {
  item: ProgramItem;
  index: number;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border border-border-default/50"
    >
      {/* Subtitle badge */}
      <span className="text-[11px] font-bold tracking-[2px] text-primary/70 uppercase mb-2">
        {item.subtitle}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold text-text-heading mb-3 group-hover:text-primary transition-colors duration-300">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-light leading-relaxed mb-6 flex-1">
        {item.description}
      </p>

      {/* CTA */}
      <Button 
        onClick={(e) => {
          e.preventDefault();
          onSelect();
        }}
        variant="primary" 
        size="default" 
        className="mt-auto mx-auto whitespace-nowrap w-fit"
      >
        Selengkapnya
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </Button>
    </motion.div>
  );
}
