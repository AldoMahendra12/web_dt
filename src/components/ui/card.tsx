/* =========================================
   Card — UI Component
   Matches homepage .feature-card styling
   ========================================= */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={[
        "bg-bg-card border border-border-default p-10 rounded-xl transition-all duration-300",
        hover &&
          "hover:-translate-y-2.5 hover:shadow-card-hover hover:bg-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

/* ── Usage Example ──
  <Card>
    <h3>Feature Title</h3>
    <p>Feature description text</p>
  </Card>
*/
