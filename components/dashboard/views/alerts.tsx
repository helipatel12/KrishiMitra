"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardSurface } from "@/lib/dashboard/surface-theme";
import { DarkPageHeader } from "@/components/dashboard/dark-page-header";

const filters = ["All", "Critical", "Warning", "Info"] as const;

const alertRows = [
  {
    sev: "Critical" as const,
    title: "Heavy rainfall expected",
    desc: "Field 2 & 3 — drainage check recommended within 12h.",
    where: "Green Valley Farm",
    when: "2h ago",
    icon: "🌧️",
  },
  {
    sev: "Warning" as const,
    title: "Pest infestation risk",
    desc: "Cotton field — monitor bollworm activity.",
    where: "Field 5",
    when: "5h ago",
    icon: "🐛",
  },
  {
    sev: "Warning" as const,
    title: "High temperature alert",
    desc: "Peak 41°C Thu — postpone spraying.",
    where: "All fields",
    when: "Yesterday",
    icon: "🌡️",
  },
  {
    sev: "Info" as const,
    title: "Irrigation reminder",
    desc: "Field 1 wheat — schedule evening water.",
    where: "Field 1",
    when: "Today 8 AM",
    icon: "💧",
  },
];

export function AlertsView() {
  const D = useDashboardSurface();
  const sevColor = {
    Critical: D.red,
    Warning: D.orange,
    Info: D.blue,
  };
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Farmer";
  const [tab, setTab] = useState<(typeof filters)[number]>("All");
  const [pushOn, setPushOn] = useState(true);
  const [smsOn, setSmsOn] = useState(false);
  const [emailOn, setEmailOn] = useState(true);

  const filtered =
    tab === "All"
      ? alertRows
      : alertRows.filter((a) => a.sev === (tab === "Critical" ? "Critical" : tab === "Warning" ? "Warning" : "Info"));

  return (
    <div style={{ color: D.text, fontFamily: "DM Sans, sans-serif" }}>
      <DarkPageHeader
        title="Alerts"
        subtitle="Stay ahead of weather, pests, and field risks."
        displayName={displayName}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "1.25rem",
          alignItems: "start",
        }}
        className="alerts-layout"
      >
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "0.85rem",
              marginBottom: "1rem",
            }}
            className="alerts-kpi"
          >
            {[
              { k: "Critical", n: 3, c: D.red },
              { k: "Warning", n: 5, c: D.orange },
              { k: "Info", n: 7, c: D.yellow },
              { k: "All", n: 15, c: D.purple },
            ].map((x) => (
              <div
                key={x.k}
                style={{
                  background: D.card,
                  border: `1px solid ${D.border}`,
                  borderRadius: 14,
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: x.c }}>{x.n}</div>
                <div style={{ fontSize: "0.78rem", color: D.muted }}>{x.k}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "0.85rem",
              marginBottom: "1rem",
              display: "flex",
              gap: "0.35rem",
              flexWrap: "wrap",
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setTab(f)}
                style={{
                  padding: "0.45rem 0.9rem",
                  borderRadius: 100,
                  border: "none",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif",
                  background: tab === f ? D.accentDim : "transparent",
                  color: tab === f ? D.accent : D.muted,
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            {filtered.map((a) => (
              <div
                key={a.title}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1rem 0",
                  borderBottom: `1px solid ${D.border}`,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${sevColor[a.sev]}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700 }}>{a.title}</span>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.45rem",
                        borderRadius: 6,
                        background: `${sevColor[a.sev]}33`,
                        color: sevColor[a.sev],
                      }}
                    >
                      {a.sev}
                    </span>
                  </div>
                  <p style={{ margin: "0.35rem 0", fontSize: "0.82rem", color: D.muted, lineHeight: 1.5 }}>
                    {a.desc}
                  </p>
                  <div style={{ fontSize: "0.72rem", color: D.faint }}>
                    📍 {a.where} · {a.when}
                  </div>
                </div>
                <button
                  type="button"
                  style={{
                    alignSelf: "flex-start",
                    padding: "0.35rem 0.75rem",
                    borderRadius: 8,
                    border: `1px solid ${D.border}`,
                    background: D.card2,
                    color: D.text,
                    fontSize: "0.72rem",
                    cursor: "pointer",
                  }}
                >
                  Resolve
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1rem",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Seasonal alert calendar</div>
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
              {["24", "25", "26", "27", "28", "29", "30"].map((d, i) => (
                <div
                  key={d}
                  style={{
                    flexShrink: 0,
                    width: 56,
                    textAlign: "center",
                    padding: "0.65rem 0.35rem",
                    borderRadius: 10,
                    background: i === 2 ? D.accentDim : D.card2,
                    border: `1px solid ${i === 2 ? D.accent : D.border}`,
                  }}
                >
                  <div style={{ fontSize: "0.65rem", color: D.muted }}>May</div>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{d}</div>
                  <div style={{ fontSize: "0.9rem" }}>{i % 3 === 0 ? "🌧️" : "·"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1.15rem",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "0.85rem" }}>Notifications</div>
            {[
              { label: "Push notifications", on: pushOn, set: setPushOn },
              { label: "SMS alerts", on: smsOn, set: setSmsOn },
              { label: "Email digest", on: emailOn, set: setEmailOn },
            ].map(({ label, on, set }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.55rem 0",
                  borderBottom: `1px solid ${D.border}`,
                  fontSize: "0.84rem",
                }}
              >
                {label}
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => set(!on)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    border: "none",
                    background: on ? D.accent : "#333",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      left: on ? 22 : 3,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.2s",
                    }}
                  />
                </button>
              </div>
            ))}
            <button
              type="button"
              style={{
                marginTop: "0.75rem",
                background: "none",
                border: "none",
                color: D.accent,
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Manage notification settings →
            </button>
          </div>

          <div
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1rem",
              minHeight: 160,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Critical alert map</div>
            <div
              style={{
                height: 120,
                borderRadius: 12,
                background: `linear-gradient(160deg, #1e293b, #0f172a)`,
                border: `1px solid ${D.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.78rem",
                color: D.muted,
              }}
            >
              Field pins (demo)
            </div>
          </div>

          <div
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1.15rem",
              fontSize: "0.82rem",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "0.65rem" }}>Alert insights</div>
            <div style={{ color: D.muted, marginBottom: "0.5rem" }}>↑ 25% vs last week</div>
            <div style={{ color: D.muted, marginBottom: "0.5rem" }}>12 resolved today</div>
            <div style={{ color: D.muted }}>Avg. response 2.5 hrs</div>
          </div>

          <div
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1rem",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "0.65rem" }}>Recommendations</div>
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
              {["Prep drainage", "Daily crop scans", "Hold pesticide"].map((t) => (
                <div
                  key={t}
                  style={{
                    flexShrink: 0,
                    width: 140,
                    padding: "0.75rem",
                    borderRadius: 12,
                    background: D.card2,
                    fontSize: "0.78rem",
                    border: `1px solid ${D.border}`,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .alerts-layout { grid-template-columns: 1fr !important; }
          .alerts-kpi { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
