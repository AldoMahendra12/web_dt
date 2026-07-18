"use client";

import Link from "next/link";

/* =========================================
   Button — UI Component
   Variants: primary, secondary, ghost
   Matches homepage .btn with animated
   gradient hover effect
   ========================================= */

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "default" | "lg";
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<string, string> = {
  primary:
    "btn-gradient-hover bg-gradient-to-br from-primary to-primary-dark text-white border-none hover:shadow-cta hover:-translate-y-0.5",
  secondary:
    "bg-white text-black tracking-[-0.3px] hover:bg-[#f0f0f0] hover:-translate-y-0.5 hover:shadow-lg",
  ghost:
    "border border-white/20 rounded-md text-white hover:bg-white hover:text-black hover:border-white",
  danger:
    "btn-danger-hover bg-gradient-to-br from-primary to-primary-dark text-white border-none hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)] hover:-translate-y-0.5",
};

const sizeClasses: Record<string, string> = {
  default: "px-6 py-3 text-sm",
  lg: "px-10 py-4 text-base font-bold",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
  target,
  rel,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2.5 font-semibold transition-all duration-300 rounded-md relative overflow-hidden",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href && !onClick) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap w-full">{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap w-full">{children}</span>
    </button>
  );
}

/* ── Usage Example ──
  <Button href="#" variant="primary">Donasi Sekarang</Button>
  <Button href="#" variant="secondary">Pelajari Lebih Lanjut</Button>
  <Button href="#" variant="ghost">Instagram</Button>
  <Button href="#" variant="primary" size="lg">Donasi Sekarang</Button>
*/
