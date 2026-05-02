"use client";

import { useAuth } from "@/hooks/useAuth";
import { useDashboardSurface } from "@/lib/dashboard/surface-theme";
import { DarkPageHeader } from "@/components/dashboard/dark-page-header";

export function IrrigationView() {
  const D = useDashboardSurface();
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Farmer";

  return (
    <div style={{ color: D.text, fontFamily: "DM Sans, sans-serif" }}>
      <DarkPageHeader
        title="Irrigation"
        subtitle="Schedules, soil moisture, and water usage in one place."
        displayName={displayName}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        {[
          ["Zones active", "4", D.blue],
          ["Water saved (est.)", "18%", D.accent],
          ["Next cycle", "Today 6 PM", D.warn],
        ].map(([k, v, col]) => (
          <div
            key={k}
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1.15rem",
            }}
          >
            <div style={{ fontSize: "0.75rem", color: D.muted }}>{k}</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, marginTop: "0.35rem", color: col }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: D.card,
          border: `1px solid ${D.border}`,
          borderRadius: 14,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>💧</div>
        <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem" }}>Irrigation control center</h2>
        <p style={{ margin: 0, color: D.muted, fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 480, marginInline: "auto" }}>
          Valve maps, soil-moisture sensors, and automated schedules will connect here. Use{" "}
          <strong style={{ color: D.text }}>Tasks</strong> for manual irrigation reminders in the
          meantime.
        </p>
      </div>
    </div>
  );
}
