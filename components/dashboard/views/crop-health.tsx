"use client";

import { dashboardPalette as G } from "@/lib/dashboard/palette";
import { Card, Badge } from "@/components/dashboard/ui";

export function CropHealthView() {
  const fields = [
    {
      id: 1,
      name: "Field 1 — Wheat",
      area: "1.2 ac",
      status: "Healthy",
      health: 96,
      issue: "None",
      lastCheck: "Today",
    },
    {
      id: 2,
      name: "Field 2 — Cotton",
      area: "0.8 ac",
      status: "Moderate",
      health: 74,
      issue: "Slight yellowing",
      lastCheck: "Yesterday",
    },
    {
      id: 3,
      name: "Field 3 — Mustard",
      area: "0.7 ac",
      status: "Critical",
      health: 48,
      issue: "Powdery mildew",
      lastCheck: "2 days ago",
    },
    {
      id: 4,
      name: "Field 4 — Chickpea",
      area: "0.6 ac",
      status: "Healthy",
      health: 91,
      issue: "None",
      lastCheck: "Today",
    },
    {
      id: 5,
      name: "Field 5 — Soybean",
      area: "0.5 ac",
      status: "Moderate",
      health: 69,
      issue: "Dry patches",
      lastCheck: "3 days ago",
    },
  ];
  const statusColor = (s: string) =>
    s === "Healthy" ? G.teal : s === "Moderate" ? G.orange : G.red;
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
        🌿 Crop Health
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
        {[
          ["🟢 Healthy Fields", "7", "58%", G.teal],
          ["🟡 Moderate", "3", "25%", G.orange],
          ["🔴 Critical", "2", "17%", G.red],
        ].map(([lab, num, pct, col]) => (
          <Card key={lab} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.8rem", color: G.muted, marginBottom: "0.4rem" }}>
              {lab}
            </div>
            <div
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                color: col as string,
                fontFamily: "Fraunces, serif",
              }}
            >
              {num}
            </div>
            <div style={{ fontSize: "0.78rem", color: G.muted }}>{pct} of total</div>
          </Card>
        ))}
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
          Field-by-Field Status
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${G.border}` }}>
              {["Field", "Area", "Status", "Health", "Issue", "Last Check", "Action"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.5rem 0.75rem",
                      textAlign: "left",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: G.muted,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.id} style={{ borderBottom: `1px solid ${G.border}` }}>
                <td style={{ padding: "0.75rem", fontWeight: 600, color: G.ink }}>
                  {f.name}
                </td>
                <td style={{ padding: "0.75rem", color: G.muted }}>{f.area}</td>
                <td style={{ padding: "0.75rem" }}>
                  <Badge label={f.status} color={statusColor(f.status)} />
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <div
                      style={{
                        flex: 1,
                        height: 5,
                        background: "#eee",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${f.health}%`,
                          background: statusColor(f.status),
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: G.ink,
                        minWidth: 32,
                      }}
                    >
                      {f.health}%
                    </span>
                  </div>
                </td>
                <td style={{ padding: "0.75rem", color: G.muted, fontSize: "0.78rem" }}>
                  {f.issue}
                </td>
                <td style={{ padding: "0.75rem", color: G.muted, fontSize: "0.78rem" }}>
                  {f.lastCheck}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <button
                    type="button"
                    style={{
                      background: G.light,
                      border: "none",
                      borderRadius: 8,
                      padding: "0.3rem 0.75rem",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: G.mid,
                      cursor: "pointer",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
