"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { SurfaceColors } from "@/lib/dashboard/surface-theme";
import { useDashboardSurface } from "@/lib/dashboard/surface-theme";
import { DarkPageHeader, MiniSparkline, TrendSparkline } from "@/components/dashboard/dark-page-header";

const rows = [
  { crop: "Wheat", icon: "🌾", variety: "Lokwan", market: "Indore Mandi", price: 2125, change: 2.4, up: true },
  { crop: "Rice", icon: "🌾", variety: "Basmati", market: "Indore Mandi", price: 1890, change: -1.1, up: false },
  { crop: "Soybean", icon: "🌱", variety: "JS-335", market: "Ujjain", price: 3782, change: 3.2, up: true },
  { crop: "Maize", icon: "🌽", variety: "Hybrid", market: "Dewas", price: 1645, change: 0.8, up: true },
  { crop: "Chana", icon: "🫘", variety: "Desi", market: "Indore", price: 4950, change: 0.3, up: true },
  { crop: "Tur (Arhar)", icon: "🟡", variety: "Local", market: "Ratlam", price: 8650, change: -0.6, up: false },
  { crop: "Mustard", icon: "🌼", variety: "Pusa", market: "Mandsaur", price: 5430, change: -0.5, up: false },
  { crop: "Cotton", icon: "🌸", variety: "Bt", market: "Khandwa", price: 6200, change: 1.8, up: true },
];

function WheatTrendChart({ D }: { D: SurfaceColors }) {
  const pts = "0,80 40,65 80,70 120,45 160,50 200,35 240,40";
  return (
    <div style={{ padding: "0.5rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: D.text }}>Price Trend (Wheat)</span>
        <select
          style={{
            fontSize: "0.72rem",
            padding: "0.25rem 0.5rem",
            borderRadius: 8,
            border: `1px solid ${D.border}`,
            background: D.card2,
            color: D.text,
          }}
        >
          <option>7 Days</option>
          <option>30 Days</option>
        </select>
      </div>
      <svg width="100%" height={120} viewBox="0 0 260 100" style={{ display: "block" }}>
        <defs>
          <linearGradient id="wheatFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={D.accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={D.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={pts}
          fill="none"
          stroke={D.accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          transform="scale(1 0.9) translate(0,5)"
        />
        <polygon
          points={`0,100 ${pts} 240,100`}
          fill="url(#wheatFill)"
          transform="scale(1 0.9) translate(0,5)"
        />
        <circle cx={240} cy={40} r={5} fill={D.accent} stroke={D.bg} strokeWidth={2} />
        <text x={200} y={28} fill={D.muted} fontSize="10">
          24 May · ₹2,125
        </text>
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.65rem",
          color: D.faint,
          marginTop: "0.25rem",
        }}
      >
        {["18 May", "19", "20", "21", "22", "23", "24 May"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export function MarketPricesView() {
  const D = useDashboardSurface();
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Farmer";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = rows.filter(
    (r) =>
      r.crop.toLowerCase().includes(q.toLowerCase()) &&
      (cat === "all" || r.crop.toLowerCase().includes(cat)),
  );

  return (
    <div style={{ color: D.text, fontFamily: "DM Sans, sans-serif", minHeight: "100%" }}>
      <DarkPageHeader
        title="Market Prices"
        subtitle="Live mandi rates and trends to time your sales."
        displayName={displayName}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
        className="market-kpi-row"
      >
        {[
          {
            t: "Average Price (All Crops)",
            v: "₹2,182",
            sub: "/ quintal",
            ch: "+3.6%",
            up: true,
            hint: "vs yesterday",
            spark: true,
          },
          {
            t: "Price Rising",
            v: "6",
            sub: "Crops",
            ch: "Good time to sell",
            up: true,
            hint: "",
            icon: "↑",
          },
          {
            t: "Price Stable",
            v: "4",
            sub: "Crops",
            ch: "Market steady",
            up: true,
            hint: "",
            icon: "—",
          },
          {
            t: "Price Falling",
            v: "2",
            sub: "Crops",
            ch: "Wait for better prices",
            up: false,
            hint: "",
            icon: "↓",
          },
        ].map((k) => (
          <div
            key={k.t}
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1.1rem 1.15rem",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: D.muted, marginBottom: "0.45rem" }}>{k.t}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "1.45rem", fontWeight: 800 }}>{k.v}</span>
              <span style={{ fontSize: "0.8rem", color: D.muted }}>{k.sub}</span>
            </div>
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: k.up ? D.up : D.down,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {"icon" in k && k.icon ? (
                <span style={{ fontSize: "1.1rem" }}>{k.icon}</span>
              ) : null}
              {k.ch}
              {"spark" in k && k.spark ? <MiniSparkline positive /> : null}
            </div>
            {k.hint ? (
              <div style={{ fontSize: "0.68rem", color: D.faint, marginTop: "0.25rem" }}>{k.hint}</div>
            ) : null}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "1.25rem",
          alignItems: "start",
        }}
        className="market-grid"
      >
        <style>{`
          @media (max-width: 1024px) {
            .market-grid { grid-template-columns: 1fr !important; }
            .market-kpi-row { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 520px) {
            .market-kpi-row { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "1.15rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.65rem",
              marginBottom: "1rem",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Search crops…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{
                flex: "1 1 160px",
                padding: "0.55rem 0.85rem",
                borderRadius: 10,
                border: `1px solid ${D.border}`,
                background: D.card2,
                color: D.text,
                fontSize: "0.82rem",
                outline: "none",
              }}
            />
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              style={{
                padding: "0.55rem 0.85rem",
                borderRadius: 10,
                border: `1px solid ${D.border}`,
                background: D.card2,
                color: D.text,
                fontSize: "0.8rem",
              }}
            >
              <option value="all">All Commodities</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
            </select>
            <button
              type="button"
              style={{
                padding: "0.55rem 1rem",
                borderRadius: 10,
                border: `1px solid ${D.border}`,
                background: D.card2,
                color: D.text,
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Filter
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${D.border}` }}>
                  {["Commodity", "Variety", "Market", "Price (₹/q)", "Change", "Trend"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.6rem 0.5rem",
                        color: D.muted,
                        fontWeight: 600,
                        fontSize: "0.68rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.crop} style={{ borderBottom: `1px solid ${D.border}` }}>
                    <td style={{ padding: "0.65rem 0.5rem" }}>
                      <span style={{ marginRight: "0.35rem" }}>{r.icon}</span>
                      <strong>{r.crop}</strong>
                    </td>
                    <td style={{ padding: "0.65rem 0.5rem", color: D.muted }}>{r.variety}</td>
                    <td style={{ padding: "0.65rem 0.5rem", color: D.muted }}>{r.market}</td>
                    <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700 }}>₹{r.price.toLocaleString()}</td>
                    <td
                      style={{
                        padding: "0.65rem 0.5rem",
                        fontWeight: 600,
                        color: r.up ? D.up : D.down,
                      }}
                    >
                      {r.up ? "↑" : "↓"} {Math.abs(r.change)}%
                    </td>
                    <td style={{ padding: "0.65rem 0.5rem" }}>
                      <TrendSparkline positive={r.up} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
              fontSize: "0.78rem",
              color: D.muted,
            }}
          >
            <span>
              1 to {filtered.length} of {rows.length} crops
            </span>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {["←", "1", "2", "→"].map((x, i) => (
                <button
                  key={i}
                  type="button"
                  style={{
                    minWidth: 32,
                    height: 32,
                    borderRadius: 8,
                    border: `1px solid ${D.border}`,
                    background: x === "1" ? D.accentDim : D.card2,
                    color: D.text,
                    cursor: "pointer",
                    fontSize: "0.78rem",
                  }}
                >
                  {x}
                </button>
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
            <WheatTrendChart D={D} />
          </div>
          <div
            style={{
              background: D.card,
              border: `1px solid ${D.border}`,
              borderRadius: 14,
              padding: "1.15rem",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "0.85rem", fontSize: "0.9rem" }}>
              Market Insights
            </div>
            {[
              { ic: "↑", c: D.up, t: "Wheat prices expected to rise over the next week.", a: "View Details" },
              { ic: "↓", c: D.down, t: "Rice prices may drop — consider staggered sales.", a: "View Details" },
              { ic: "i", c: D.warn, t: "Best window to sell soybean in your mandi.", a: "View Details" },
            ].map((x, i) => (
              <div
                key={i}
                style={{
                  padding: "0.75rem 0",
                  borderBottom: i < 2 ? `1px solid ${D.border}` : "none",
                  display: "flex",
                  gap: "0.65rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: `${x.c}22`,
                    color: x.c,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {x.ic}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.82rem", lineHeight: 1.45 }}>{x.t}</div>
                  <button
                    type="button"
                    style={{
                      marginTop: "0.35rem",
                      background: "none",
                      border: "none",
                      color: D.accent,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {x.a} →
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: `linear-gradient(135deg, ${D.accentDim}, rgba(52,211,153,0.05))`,
              border: `1px solid ${D.accent}44`,
              borderRadius: 14,
              padding: "1.25rem",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.35rem" }}>📣</div>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>Get Price Alerts</div>
            <p style={{ margin: "0 0 1rem", fontSize: "0.82rem", color: D.muted, lineHeight: 1.5 }}>
              Notify me when crops cross my target price.
            </p>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "0.65rem",
                borderRadius: 10,
                border: "none",
                background: D.accentStrong,
                color: "#042f2e",
                fontWeight: 700,
                fontSize: "0.84rem",
                cursor: "pointer",
              }}
            >
              Configure Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
