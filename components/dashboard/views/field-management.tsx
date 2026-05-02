"use client";

import { useAuth } from "@/hooks/useAuth";
import { useDashboardSurface } from "@/lib/dashboard/surface-theme";
import { DarkPageHeader } from "@/components/dashboard/dark-page-header";

export function FieldManagementView() {
  const D = useDashboardSurface();
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Farmer";

  const farmSelect = (
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
      <option>Farm: Green Valley Farm</option>
      <option>North Plot</option>
    </select>
  );

  return (
    <div style={{ color: D.text, fontFamily: "DM Sans, sans-serif" }}>
      <DarkPageHeader
        title="Field Management"
        subtitle="Monitor and manage your fields efficiently."
        displayName={displayName}
        trailing={farmSelect}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "0.85rem",
          marginBottom: "1rem",
        }}
        className="fm-kpi"
      >
        {[
          ["Total Fields", "8", "2.45 ha total", D.accent],
          ["Active Crops", "6", "75% area cultivated", D.blue],
          ["Avg. Field Health", "78%", "↑ 12% vs last week", D.purple],
          ["Pending Tasks", "5", "2 high priority", D.orange],
        ].map(([t, v, s, col]) => (
          <div
            key={t}
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1rem",
              borderLeft: `3px solid ${col}`,
            }}
          >
            <div style={{ fontSize: "0.72rem", color: D.muted }}>{t}</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, marginTop: "0.35rem" }}>{v}</div>
            <div style={{ fontSize: "0.75rem", color: D.muted, marginTop: "0.25rem" }}>{s}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
        className="fm-mid"
      >
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "0.85rem 1rem",
              borderBottom: `1px solid ${D.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 700 }}>Fields overview</span>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {["Satellite", "Health"].map((x) => (
                <button
                  key={x}
                  type="button"
                  style={{
                    padding: "0.3rem 0.65rem",
                    borderRadius: 8,
                    border: `1px solid ${D.border}`,
                    background: D.card2,
                    color: D.text,
                    fontSize: "0.72rem",
                    cursor: "pointer",
                  }}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              height: 320,
              background: `linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #14532d 100%)`,
              position: "relative",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 500 320">
              <polygon
                points="30,30 200,20 210,160 40,170"
                fill="rgba(52,211,153,0.2)"
                stroke={D.accent}
                strokeWidth="2"
              />
              <text x="120" y="100" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                F1 Wheat
              </text>
              <polygon
                points="220,20 380,30 390,150 230,160"
                fill="rgba(251,191,36,0.15)"
                stroke={D.warn}
                strokeWidth="2"
              />
              <text x="305" y="90" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                F2 Cotton
              </text>
              <polygon
                points="30,180 210,170 220,320 40,330"
                fill="rgba(248,113,113,0.12)"
                stroke={D.red}
                strokeWidth="2"
              />
              <text x="125" y="255" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                F3 Maize
              </text>
              <polygon
                points="230,160 400,150 410,310 240,320"
                fill="rgba(52,211,153,0.18)"
                stroke={D.accent}
                strokeWidth="2"
              />
              <text x="320" y="240" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                F4 Rice
              </text>
            </svg>
          </div>
          <div
            style={{
              padding: "0.6rem 1rem",
              fontSize: "0.72rem",
              color: D.muted,
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span>🟢 Good</span>
            <span>🟡 Moderate</span>
            <span>🔴 Poor</span>
            <span>⚪ Fallow</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1rem",
              flex: 1,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Field activity</div>
            {[
              ["Field 1 · Wheat", "Irrigation completed", "Completed", D.accent],
              ["Field 3 · Maize", "Pest scout due", "Pending", D.red],
              ["Field 2 · Cotton", "Fertilizer applied", "In progress", D.orange],
            ].map(([field, act, st, col]) => (
              <div
                key={field}
                style={{
                  padding: "0.65rem 0",
                  borderBottom: `1px solid ${D.border}`,
                  fontSize: "0.8rem",
                }}
              >
                <div style={{ fontWeight: 600 }}>{field}</div>
                <div style={{ color: D.muted, marginTop: "0.2rem" }}>{act}</div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.35rem",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: col,
                  }}
                >
                  {st}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.2fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
        className="fm-charts"
      >
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "1rem",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.65rem" }}>Task summary</div>
          <svg width="100%" height={120} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#333" strokeWidth="12" />
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke={D.red}
              strokeWidth="12"
              strokeDasharray={`${0.4 * 220} 220`}
              transform="rotate(-90 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke={D.orange}
              strokeWidth="12"
              strokeDasharray={`${0.4 * 220} 220`}
              strokeDashoffset={`${-0.4 * 220}`}
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="54" textAnchor="middle" fill={D.text} fontSize="10" fontWeight="700">
              5
            </text>
          </svg>
          <div style={{ fontSize: "0.72rem", color: D.muted }}>High · Medium · Low</div>
        </div>
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "1rem",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.65rem" }}>Crop distribution</div>
          <div style={{ fontSize: "0.78rem", color: D.muted, lineHeight: 1.6 }}>
            Wheat 32% · Rice 24% · Maize 18% · Cotton 14% · Other 12%
          </div>
        </div>
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "1rem",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Field health trend</div>
          <svg width="100%" height={100} viewBox="0 0 240 80">
            <polyline
              points="0,60 40,55 80,50 120,45 160,40 200,38 240,35"
              fill="none"
              stroke={D.accent}
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
        className="fm-bottom"
      >
        <div
          style={{
            background: `linear-gradient(90deg, ${D.accentDim}, transparent)`,
            border: `1px solid ${D.accent}44`,
            borderRadius: 14,
            padding: "1.15rem",
          }}
        >
          <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>🤖</div>
          <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>AI field insights</div>
          <p style={{ margin: "0 0 0.85rem", fontSize: "0.84rem", color: D.muted, lineHeight: 1.55 }}>
            Field 3 (Maize) shows high growth potential — keep irrigation on schedule for best yield.
          </p>
          <button
            type="button"
            style={{
              padding: "0.55rem 1.1rem",
              borderRadius: 10,
              border: "none",
              background: D.accentStrong,
              color: "#042f2e",
              fontWeight: 700,
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            View AI recommendations
          </button>
        </div>
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "1rem",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Quick actions</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            {[
              "Add field",
              "Schedule task",
              "View reports",
              "Activity log",
              "Add observation",
              "Export data",
            ].map((a) => (
              <button
                key={a}
                type="button"
                style={{
                  padding: "0.65rem",
                  borderRadius: 10,
                  border: `1px solid ${D.border}`,
                  background: D.card2,
                  color: D.text,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .fm-kpi { grid-template-columns: repeat(2, 1fr) !important; }
          .fm-mid { grid-template-columns: 1fr !important; }
          .fm-charts { grid-template-columns: 1fr !important; }
          .fm-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
