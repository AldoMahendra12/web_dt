"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import Button from "@/components/ui/button";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  className?: string;
  featured?: boolean;
}

export default function ArticleCard({
  title,
  excerpt,
  category,
  date,
  author,
  image,
  className,
  featured = false,
}: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-border-default bg-white transition-all duration-500 hover:shadow-card-hover",
        featured ? "md:flex-row md:col-span-2 aspect-[16/9] md:aspect-auto" : "aspect-[4/5]",
        className
      )}
    >
      {/* Category Badge - Floating */}
      <div className="absolute left-6 top-6 z-20">
        <div className="rounded-md bg-white/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md border border-white/30">
          {category}
        </div>
      </div>

      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden",
        featured ? "md:w-1/2 h-full" : "h-1/2 w-full"
      )}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Content Container */}
      <div className={cn(
        "relative flex flex-1 flex-col justify-between p-8",
        featured ? "md:w-1/2" : "w-full"
      )}>
        <div>
          <div className="mb-4 flex items-center gap-4 text-xs text-text-light">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {author}
            </span>
          </div>
          
          <h3 className={cn(
            "font-sans font-bold leading-tight text-text-heading group-hover:text-primary transition-colors",
            featured ? "text-3xl mb-4" : "text-xl mb-3"
          )}>
            {title}
          </h3>
          
          <p className="line-clamp-3 text-sm leading-relaxed text-text-light">
            {excerpt}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button variant="primary" size="default" className="px-5 py-2 group/btn">
            Baca Selengkapnya
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
