"use client";

import { dashboardPalette as G } from "@/lib/dashboard/palette";
import { Card, Badge } from "@/components/dashboard/ui";

export function SoilHealthView() {
  const nutrients = [
    { label: "Nitrogen (N)", value: 65, status: "Medium", color: G.yellow },
    { label: "Phosphorus (P)", value: 82, status: "High", color: G.teal },
    { label: "Potassium (K)", value: 70, status: "Medium", color: G.yellow },
    { label: "Organic Matter", value: 55, status: "Low", color: G.orange },
    { label: "pH Level", value: 78, status: "Good", color: G.teal },
    { label: "Moisture", value: 68, status: "Medium", color: G.blue },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
      <h1
        style={{
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: 700,
          color: G.ink,
          fontFamily: "Fraunces, serif",
        }}
      >
        🪨 Soil Health
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Card>
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: G.ink,
              marginBottom: "1rem",
            }}
          >
            Overall Soil Health Score
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ position: "relative" }}>
              <svg width={110} height={110} viewBox="0 0 110 110">
                <circle cx={55} cy={55} r={44} fill="none" stroke="#eee" strokeWidth={12} />
                <circle
                  cx={55}
                  cy={55}
                  r={44}
                  fill="none"
                  stroke={G.teal}
                  strokeWidth={12}
                  strokeDasharray={`${0.72 * 276} 276`}
                  strokeLinecap="round"
                  transform="rotate(-90 55 55)"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: G.ink,
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  72%
                </div>
                <div style={{ fontSize: "0.6rem", color: G.muted }}>Moderate</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: G.muted,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Soil quality is moderate. Key improvements needed in organic matter and
                nitrogen levels. Recommend adding compost to Field 3.
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: G.ink,
              marginBottom: "1rem",
            }}
          >
            💡 Recommendations
          </div>
          {[
            ["Add compost to Field 3 to boost organic matter", "High"],
            ["Apply nitrogen-rich fertilizer to Fields 1 & 5", "Medium"],
            ["Check drainage in Field 2 — excess moisture", "High"],
            ["pH is balanced — no lime application needed", "Low"],
          ].map(([r, p]) => (
            <div
              key={r}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "0.5rem",
                padding: "0.5rem 0",
                borderBottom: `1px solid ${G.border}`,
                fontSize: "0.8rem",
                color: G.ink,
                lineHeight: 1.4,
              }}
            >
              <span>• {r}</span>
              <Badge
                label={p}
                color={p === "High" ? G.red : p === "Medium" ? G.orange : G.teal}
              />
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <div
          style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: G.ink,
            marginBottom: "1rem",
          }}
        >
          Nutrient Breakdown
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {nutrients.map((n) => (
            <div
              key={n.label}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <div
                style={{
                  width: 130,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: G.ink,
                  flexShrink: 0,
                }}
              >
                {n.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  background: "#eee",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${n.value}%`,
                    background: n.color,
                    borderRadius: 6,
                    transition: "width 1s",
                  }}
                />
              </div>
              <div
                style={{
                  width: 40,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: G.ink,
                  textAlign: "right",
                }}
              >
                {n.value}%
              </div>
              <Badge label={n.status} color={n.color} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
