"use client";

import { useState } from "react";
import { useDashboardSurface } from "@/lib/dashboard/surface-theme";

type DarkPageHeaderProps = {
  title: string;
  subtitle: string;
  displayName: string;
  lastUpdated?: string;
  /** Extra controls on the right (e.g. date range, farm selector). */
  trailing?: React.ReactNode;
};

const LOCATIONS = [
  { value: "indore", label: "Indore, Madhya Pradesh" },
  { value: "vadodara", label: "Vadodara, Gujarat" },
  { value: "pune", label: "Pune, Maharashtra" },
];

export function DarkPageHeader({
  title,
  subtitle,
  displayName,
  lastUpdated = "Today, 10:30 AM",
  trailing,
}: DarkPageHeaderProps) {
  const D = useDashboardSurface();
  const [location, setLocation] = useState("indore");

  return (
    <header
      style={{
        padding: "1.25rem 0 1.5rem",
        borderBottom: `1px solid ${D.border}`,
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 240px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: 700,
              color: D.text,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          <p style={{ margin: "0.35rem 0 0", fontSize: "0.88rem", color: D.muted }}>
            {subtitle}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Location"
            style={{
              padding: "0.5rem 0.85rem",
              borderRadius: 10,
              border: `1px solid ${D.border}`,
              background: D.card,
              color: D.text,
              fontSize: "0.8rem",
              fontFamily: "DM Sans, sans-serif",
              cursor: "pointer",
            }}
          >
            {LOCATIONS.map((l) => (
              <option key={l.value} value={l.value}>
                📍 {l.label}
              </option>
            ))}
          </select>
          {trailing}
          <span style={{ fontSize: "0.78rem", color: D.faint, whiteSpace: "nowrap" }}>
            Last updated: {lastUpdated}
          </span>
          <button
            type="button"
            title="Refresh"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: `1px solid ${D.border}`,
              background: D.card,
              cursor: "pointer",
              color: D.muted,
            }}
          >
            ↻
          </button>
          <button
            type="button"
            style={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: 10,
              border: `1px solid ${D.border}`,
              background: D.card,
              cursor: "pointer",
              fontSize: "1.05rem",
            }}
          >
            🔔
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                minWidth: 16,
                height: 16,
                borderRadius: 8,
                background: D.red,
                color: "#fff",
                fontSize: "0.65rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </span>
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.25rem 0.65rem 0.25rem 0.25rem",
              borderRadius: 12,
              border: `1px solid ${D.border}`,
              background: D.card,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${D.accent}, #059669)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "#fff",
              }}
            >
              {displayName[0]?.toUpperCase() ?? "F"}
            </div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: D.text }}>
                {displayName}
              </div>
              <div style={{ fontSize: "0.7rem", color: D.accent }}>Premium Farmer</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function MiniSparkline({ positive }: { positive: boolean }) {
  const T = useDashboardSurface();
  const pts = positive
    ? "0,14 16,11 32,9 48,5 64,3 80,2"
    : "0,3 16,5 32,7 48,10 64,12 80,13";
  return (
    <svg width={72} height={16} viewBox="0 0 80 16" style={{ display: "block" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? T.up : T.down}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TrendSparkline({ positive }: { positive: boolean }) {
  const T = useDashboardSurface();
  const pts = positive
    ? "0,28 30,22 60,12 90,8 120,4"
    : "0,6 30,10 60,16 90,22 120,26";
  return (
    <svg width={56} height={22} viewBox="0 0 120 30" style={{ display: "block" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? T.up : T.down}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.85}
      />
    </svg>
  );
}
