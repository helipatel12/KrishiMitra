import type { CSSProperties, ReactNode } from "react";
import { dashboardPalette as G } from "@/lib/dashboard/palette";

export function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: G.white,
        borderRadius: 16,
        border: `1px solid ${G.border}`,
        padding: "1.25rem",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        background: color + "22",
        color,
        fontSize: "0.68rem",
        fontWeight: 700,
        padding: "0.2rem 0.55rem",
        borderRadius: 100,
        letterSpacing: "0.03em",
      }}
    >
      {label}
    </span>
  );
}
