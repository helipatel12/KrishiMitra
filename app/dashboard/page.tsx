"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "🌾", label: "My Crops" },
  { icon: "🦠", label: "Disease Scan" },
  { icon: "🌦️", label: "Weather" },
  { icon: "📊", label: "Analytics" },
  { icon: "🗓️", label: "Calendar" },
  { icon: "💰", label: "Finance" },
];

const bottomNav = [
  { icon: "↗️", label: "Transfers" },
  { icon: "🌿", label: "Nursery" },
];

const cropTable = [
  { rank: 1, name: "Wheat",     area: "1.2 ac", yield: "18 q", health: 98, revenue: "₹42,000", trend: "↑" },
  { rank: 2, name: "Cotton",    area: "0.8 ac", yield: "12 q", health: 91, revenue: "₹38,400", trend: "↑" },
  { rank: 3, name: "Mustard",   area: "0.7 ac", yield: "9 q",  health: 87, revenue: "₹27,000", trend: "→" },
  { rank: 4, name: "Chickpea",  area: "0.6 ac", yield: "7 q",  health: 82, revenue: "₹21,000", trend: "↓" },
  { rank: 5, name: "Soybean",   area: "0.5 ac", yield: "6 q",  health: 79, revenue: "₹18,600", trend: "→" },
  { rank: 6, name: "Groundnut", area: "0.7 ac", yield: "8 q",  health: 85, revenue: "₹32,000", trend: "↑" },
];

const cropEmoji: Record<string, string> = {
  Wheat: "🌾", Cotton: "🌸", Mustard: "🌼", Chickpea: "🫘", Soybean: "🌱", Groundnut: "🥜",
};

const miniStats = [
  { label: "SOIL MOISTURE",   value: "68%",      icon: "💧", bg: "rgba(14,165,233,0.1)"  },
  { label: "CROP HEALTH AVG", value: "87%",      icon: "💚", bg: "rgba(34,197,94,0.1)"   },
  { label: "IRRIGATION COST", value: "₹12.4k",   icon: "🚿", bg: "rgba(245,158,11,0.1)"  },
  { label: "YIELD FORECAST",  value: "7.2 q/ac", icon: "⭐", bg: "rgba(167,139,250,0.1)" },
];

const C = {
  teal: "#0d9488",
  tealDark: "#0f766e",
  tealLight: "#ccfbf1",
  forest: "#134e4a",
  white: "#ffffff",
  border: "rgba(13,148,136,0.13)",
  cardBg: "rgba(255,255,255,0.78)",
  muted: "#6b7f7d",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Farmer";

  const card: React.CSSProperties = {
    background: C.cardBg,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "18px",
    border: `1px solid ${C.border}`,
    boxShadow: "0 2px 20px rgba(13,148,136,0.07)",
    padding: "1.35rem 1.5rem",
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "linear-gradient(135deg, #ccfbf1 0%, #e0f2fe 45%, #dbeafe 100%)",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: "215px",
        flexShrink: 0,
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        padding: "1.75rem 0.9rem",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingLeft: "0.7rem", marginBottom: "2.25rem" }}>
          <span style={{ fontSize: "1.3rem" }}>🌱</span>
          <span style={{ fontFamily: "Fraunces, serif", fontSize: "1.1rem", fontWeight: 700, color: C.forest }}>
            Krishi<span style={{ color: C.teal }}>Mitra</span>
          </span>
        </div>

        {/* Main nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
          {navItems.map((item) => {
            const active = activeNav === item.label;
            return (
              <button key={item.label} onClick={() => setActiveNav(item.label)} style={{
                display: "flex", alignItems: "center", gap: "0.7rem",
                padding: "0.7rem 0.9rem", borderRadius: "12px",
                border: "none", cursor: "pointer", width: "100%", textAlign: "left",
                fontSize: "0.875rem", fontWeight: active ? 600 : 400,
                fontFamily: "'DM Sans', sans-serif",
                background: active ? C.teal : "transparent",
                color: active ? C.white : C.muted,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "rgba(13,148,136,0.08)"; e.currentTarget.style.color = C.forest; }}}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}}
              >
                <span style={{ fontSize: "1rem", width: "18px", textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Bottom nav + user pill */}
        <div>
          <div style={{ height: "1px", background: C.border, margin: "0.75rem 0.4rem" }} />
          {bottomNav.map((item) => (
            <button key={item.label} style={{
              display: "flex", alignItems: "center", gap: "0.7rem",
              padding: "0.7rem 0.9rem", borderRadius: "12px",
              border: "none", cursor: "pointer", width: "100%", textAlign: "left",
              fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif",
              background: "transparent", color: C.muted, transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(13,148,136,0.08)"; e.currentTarget.style.color = C.forest; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}
            >
              <span style={{ fontSize: "1rem", width: "18px", textAlign: "center" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* User pill at bottom of sidebar */}
          <div style={{ height: "1px", background: C.border, margin: "0.75rem 0.4rem" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.6rem 0.75rem", borderRadius: "12px", background: "rgba(13,148,136,0.06)" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontSize: "0.78rem", fontWeight: 700, flexShrink: 0 }}>
              {displayName[0].toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: C.forest, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{displayName}</div>
              <div style={{ fontSize: "0.65rem", color: C.muted }}>Farmer</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* Inline page title — no sticky header */}
        <div style={{ padding: "1.75rem 2rem 0.75rem", flexShrink: 0 }}>
          <div style={{ fontSize: "0.78rem", color: C.teal, fontWeight: 600, marginBottom: "0.15rem" }}>
            Welcome back, {displayName} 🌾
          </div>
          <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "2rem", fontWeight: 700, color: C.forest, margin: 0, lineHeight: 1 }}>
            Dashboard
          </h1>
        </div>

        {/* Grid content */}
        <main style={{ flex: 1, overflow: "auto", padding: "0.5rem 2rem 2rem", display: "grid", gridTemplateColumns: "1fr 295px", gap: "1.1rem", alignContent: "start" }}>

          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

            {/* Next harvest */}
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.1rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: C.forest }}>Next harvest</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", color: C.teal, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>View calendar</button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem" }}>
                <div style={{ background: C.tealLight, borderRadius: "8px", padding: "0.28rem 0.75rem", fontSize: "0.73rem", color: C.tealDark, fontWeight: 600 }}>
                  🌱 Kharif Season
                </div>
                <span style={{ fontSize: "0.75rem", color: C.muted }}>📅 Est. Nov 20, 2025</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "rgba(13,148,136,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.9rem" }}>🌾</div>
                  <div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: C.forest, fontFamily: "Fraunces, serif" }}>Wheat</div>
                    <div style={{ fontSize: "0.73rem", color: C.muted }}>1.2 acres</div>
                  </div>
                </div>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.forest})`, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontSize: "0.7rem", fontWeight: 700, boxShadow: "0 4px 12px rgba(13,148,136,0.35)" }}>vs</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: C.forest, fontFamily: "Fraunces, serif" }}>Maize</div>
                    <div style={{ fontSize: "0.73rem", color: C.muted }}>0.8 acres</div>
                  </div>
                  <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.9rem" }}>🌽</div>
                </div>
                <div style={{ width: "1px", height: "54px", background: C.border, margin: "0 0.25rem" }} />
                <div style={{ fontSize: "0.78rem", color: C.muted, lineHeight: 1.65, maxWidth: "150px" }}>
                  <div style={{ color: C.forest, fontWeight: 600, marginBottom: "0.15rem", fontSize: "0.8rem" }}>AI Recommendation</div>
                  Wheat yields 18% higher based on current soil pH
                </div>
              </div>
            </div>

            {/* Crop performance table */}
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.1rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: C.forest }}>Crop Performance</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", color: C.teal, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>View all</button>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["#", "CROP", "AREA", "YIELD", "HEALTH", "REVENUE", ""].map((h) => (
                      <th key={h} style={{ padding: "0.35rem 0.6rem", fontSize: "0.63rem", fontWeight: 600, color: "#94a3b8", textAlign: "left", letterSpacing: "0.05em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cropTable.map((row, i) => (
                    <tr key={row.name}
                      style={{ borderBottom: i < cropTable.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(13,148,136,0.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "0.6rem 0.6rem", fontSize: "0.78rem", color: "#94a3b8", fontWeight: 500 }}>{row.rank}</td>
                      <td style={{ padding: "0.6rem 0.6rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: "rgba(13,148,136,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 }}>{cropEmoji[row.name] || "🌱"}</div>
                          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: C.forest }}>{row.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "0.6rem 0.6rem", fontSize: "0.8rem", color: C.muted }}>{row.area}</td>
                      <td style={{ padding: "0.6rem 0.6rem", fontSize: "0.8rem", color: C.muted }}>{row.yield}</td>
                      <td style={{ padding: "0.6rem 0.6rem", minWidth: "96px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                          <div style={{ flex: 1, height: "4px", background: "rgba(0,0,0,0.07)", borderRadius: "4px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${row.health}%`, borderRadius: "4px", background: row.health > 90 ? "#22c55e" : row.health > 80 ? "#f59e0b" : "#ef4444" }} />
                          </div>
                          <span style={{ fontSize: "0.73rem", color: C.forest, fontWeight: 500, minWidth: "28px" }}>{row.health}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "0.6rem 0.6rem", fontSize: "0.85rem", fontWeight: 600, color: C.forest }}>{row.revenue}</td>
                      <td style={{ padding: "0.6rem 0.6rem", fontSize: "1rem", fontWeight: 700, color: row.trend === "↑" ? "#22c55e" : row.trend === "↓" ? "#ef4444" : "#f59e0b" }}>{row.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

            {/* Season stats */}
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: C.forest }}>Season stats</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", color: C.teal, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>View all</button>
              </div>
              <div style={{ marginBottom: "1.1rem" }}>
                <div style={{ height: "6px", background: "rgba(0,0,0,0.07)", borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "68%", background: `linear-gradient(90deg, ${C.forest}, ${C.teal})`, borderRadius: "6px" }} />
                </div>
                <div style={{ marginTop: "3px", marginLeft: "63%", width: "18%", height: "3px", background: "rgba(239,68,68,0.35)", borderRadius: "3px" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center" }}>
                {[{ label: "CR", value: "6" }, { label: "HEALTHY", value: "4" }, { label: "AT RISK", value: "1" }, { label: "DONE", value: "1" }].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "Fraunces, serif", fontSize: "1.6rem", fontWeight: 700, color: C.forest, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: "0.57rem", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.04em", marginTop: "0.25rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2×2 mini stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              {miniStats.map((s) => (
                <div key={s.label} style={{ ...card, padding: "1rem 1.1rem" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", marginBottom: "0.65rem" }}>{s.icon}</div>
                  <div style={{ fontSize: "0.57rem", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "0.2rem" }}>{s.label}</div>
                  <div style={{ fontFamily: "Fraunces, serif", fontSize: "1.2rem", fontWeight: 700, color: C.forest }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* CTA banner */}
            <div style={{
              borderRadius: "18px", padding: "1.4rem",
              background: `linear-gradient(135deg, ${C.forest} 0%, ${C.tealDark} 55%, ${C.teal} 100%)`,
              boxShadow: "0 8px 28px rgba(13,148,136,0.28)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: "-30px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(204,251,241,0.12)" }} />
              <div style={{ position: "absolute", top: "14px", right: "14px", fontSize: "3.5rem", opacity: 0.2 }}>🌿</div>
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: "0.6rem", color: "rgba(204,251,241,0.8)", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.5rem" }}>DON'T FORGET</div>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: "1.2rem", fontWeight: 700, color: C.white, lineHeight: 1.35, marginBottom: "1rem" }}>
                  Scan your crops<br />for diseases
                </div>
                <button style={{
                  background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "100px", padding: "0.45rem 1rem", color: C.white,
                  fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                >
                  Go to Disease Scanner →
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}