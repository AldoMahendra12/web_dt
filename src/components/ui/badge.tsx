/* =========================================
   Badge — UI Component
   Matches homepage .activity-label styling
   ========================================= */

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "text-xs font-bold uppercase tracking-[1px] text-accent-teal",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

/* ── Usage Example ──
  <Badge>Program Sosial</Badge>
  <Badge>Wakaf Air</Badge>
  <Badge className="text-primary">RASULULLAH ﷺ BERSABDA</Badge>
*/
