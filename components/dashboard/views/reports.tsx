"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardSurface } from "@/lib/dashboard/surface-theme";
import { DarkPageHeader } from "@/components/dashboard/dark-page-header";

const tabs = [
  "Overview",
  "Crop Report",
  "Soil Report",
  "Irrigation Report",
  "Weather Report",
  "Financial Report",
] as const;

export function ReportsView() {
  const D = useDashboardSurface();
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Farmer";
  const [active, setActive] = useState<(typeof tabs)[number]>("Overview");

  const dateRange = (
    <select
      style={{
        padding: "0.45rem 0.75rem",
        borderRadius: 10,
        border: `1px solid ${D.border}`,
        background: D.card,
        color: D.text,
        fontSize: "0.78rem",
      }}
    >
      <option>18 May – 24 May 2026</option>
      <option>This season</option>
    </select>
  );

  return (
    <div style={{ color: D.text, fontFamily: "DM Sans, sans-serif" }}>
      <DarkPageHeader
        title="Reports"
        subtitle="Analytics, exports, and season-over-season performance."
        displayName={displayName}
        trailing={dateRange}
      />

      <div
        style={{
          display: "flex",
          gap: "0.35rem",
          flexWrap: "wrap",
          marginBottom: "1.25rem",
          paddingBottom: "0.25rem",
          borderBottom: `1px solid ${D.border}`,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            style={{
              padding: "0.5rem 0.85rem",
              borderRadius: 10,
              border: "none",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              background: active === t ? D.accentDim : "transparent",
              color: active === t ? D.accent : D.muted,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {active === "Overview" ? (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: "0.85rem",
              marginBottom: "1rem",
            }}
            className="reports-kpi"
          >
            {[
              ["Total Fields", "8", "↑ 12%", D.accent],
              ["Total Crops", "6", "↑ 8%", D.blue],
              ["Avg. Crop Health", "78%", "↑ 5%", D.accent],
              ["Total Expenses", "₹24,560", "↓ 3%", D.orange],
              ["Est. Profit", "₹48,750", "↑ 18%", D.accent],
            ].map(([k, v, ch, col]) => (
              <div
                key={k}
                style={{
                  background: D.card,
                  border: `1px solid ${D.border}`,
                  borderRadius: 14,
                  padding: "1rem",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: D.muted }}>{k}</div>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, marginTop: "0.35rem" }}>{v}</div>
                <div style={{ fontSize: "0.72rem", color: col, marginTop: "0.25rem", fontWeight: 600 }}>
                  {ch} vs last week
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr 0.9fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
            className="reports-mid"
          >
            <div
              style={{
                background: D.card,
                border: `1px solid ${D.border}`,
                borderRadius: 14,
                padding: "1.15rem",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "0.85rem" }}>Crop health summary</div>
              <svg width="100%" height={140} viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="40" fill="none" stroke="#333" strokeWidth="16" />
                <circle
                  cx="60"
                  cy="60"
                  r="40"
                  fill="none"
                  stroke={D.accent}
                  strokeWidth="16"
                  strokeDasharray={`${0.45 * 251} 251`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="40"
                  fill="none"
                  stroke={D.blue}
                  strokeWidth="16"
                  strokeDasharray={`${0.3 * 251} 251`}
                  strokeDashoffset={`${-0.45 * 251}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="64" textAnchor="middle" fill={D.text} fontSize="10" fontWeight="700">
                  Mix
                </text>
              </svg>
              <div style={{ fontSize: "0.72rem", color: D.muted, marginTop: "0.5rem" }}>
                Excellent · Good · Moderate · Poor
              </div>
            </div>
            <div
              style={{
                background: D.card,
                border: `1px solid ${D.border}`,
                borderRadius: 14,
                padding: "1.15rem",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "0.65rem" }}>Field performance trend</div>
              <svg width="100%" height={120} viewBox="0 0 280 100">
                <polyline
                  points="0,70 40,65 80,55 120,50 160,45 200,40 240,38 280,35"
                  fill="none"
                  stroke={D.accent}
                  strokeWidth="2"
                />
                <polyline
                  points="0,85 40,82 80,78 120,75 160,72 200,68 240,65 280,62"
                  fill="none"
                  stroke={D.blue}
                  strokeWidth="2"
                  opacity={0.8}
                />
                <text x="4" y="12" fill={D.muted} fontSize="9">
                  Health %
                </text>
                <text x="200" y="12" fill={D.muted} fontSize="9">
                  Soil moisture %
                </text>
              </svg>
            </div>
            <div
              style={{
                background: D.card,
                border: `1px solid ${D.border}`,
                borderRadius: 14,
                padding: "1.15rem",
                fontSize: "0.82rem",
                lineHeight: 1.55,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "0.65rem" }}>Report insights</div>
              <p style={{ margin: 0, color: D.muted }}>
                Crop health improved 12% this week. Soil moisture stable — maintain current irrigation
                windows.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
            className="reports-row3"
          >
            <div
              style={{
                background: D.card,
                border: `1px solid ${D.border}`,
                borderRadius: 14,
                padding: "1.15rem",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "0.85rem" }}>Top performing fields</div>
              {[
                ["Wheat F1", 92],
                ["Maize F3", 88],
                ["Rice F2", 85],
              ].map(([name, pct]) => (
                <div key={name} style={{ marginBottom: "0.65rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                    <span>{name}</span>
                    <span style={{ fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "#333",
                      borderRadius: 4,
                      marginTop: "0.25rem",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: D.accent,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: D.card,
                border: `1px solid ${D.border}`,
                borderRadius: 14,
                padding: "1.15rem",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "0.85rem" }}>Resource usage</div>
              {[
                ["Water", 72, D.blue],
                ["Fertilizer", 58, D.accent],
                ["Pesticide", 41, D.orange],
              ].map(([lab, pct, col]) => (
                <div key={lab} style={{ marginBottom: "0.65rem" }}>
                  <div style={{ fontSize: "0.8rem" }}>{lab}</div>
                  <div
                    style={{
                      height: 8,
                      background: "#333",
                      borderRadius: 4,
                      marginTop: "0.25rem",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: col,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: D.card,
                border: `1px solid ${D.border}`,
                borderRadius: 14,
                padding: "1.15rem",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "0.85rem" }}>Recent reports</div>
              {[
                ["Season summary.pdf", "2.1 MB", "Today"],
                ["Yield export.xlsx", "890 KB", "Yesterday"],
              ].map(([f, sz, d]) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "0.55rem 0",
                    borderBottom: `1px solid ${D.border}`,
                    fontSize: "0.8rem",
                  }}
                >
                  <span>📄</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{f}</div>
                    <div style={{ fontSize: "0.72rem", color: D.muted }}>
                      {sz} · {d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: "1rem",
            }}
            className="reports-footer"
          >
            <div
              style={{
                background: D.card,
                border: `1px solid ${D.border}`,
                borderRadius: 14,
                padding: "1.15rem",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "0.65rem" }}>Monthly performance</div>
              <div
                style={{
                  height: 160,
                  borderRadius: 12,
                  background: D.card2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: D.muted,
                  fontSize: "0.82rem",
                }}
              >
                Combined bar & profit trend (demo)
              </div>
            </div>
            <div
              style={{
                background: D.card,
                border: `1px solid ${D.border}`,
                borderRadius: 14,
                padding: "1.15rem",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "0.85rem" }}>Export reports</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["PDF", "Excel", "CSV"].map((x) => (
                  <button
                    key={x}
                    type="button"
                    style={{
                      padding: "0.55rem 1rem",
                      borderRadius: 10,
                      border: `1px solid ${D.border}`,
                      background: D.card2,
                      color: D.text,
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      cursor: "pointer",
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <button
                type="button"
                style={{
                  marginTop: "0.85rem",
                  width: "100%",
                  padding: "0.65rem",
                  borderRadius: 10,
                  border: "none",
                  background: D.accentStrong,
                  color: "#042f2e",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Schedule auto reports
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "2rem",
            textAlign: "center",
            color: D.muted,
          }}
        >
          <p style={{ margin: 0 }}>
            <strong style={{ color: D.text }}>{active}</strong> — detailed export and charts coming in
            the next iteration.
          </p>
        </div>
      )}

      <style>{`
        @media (max-width: 1200px) {
          .reports-kpi { grid-template-columns: repeat(3, 1fr) !important; }
          .reports-mid { grid-template-columns: 1fr !important; }
          .reports-row3 { grid-template-columns: 1fr !important; }
          .reports-footer { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .reports-kpi { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
