"use client";

import { useAuth } from "@/hooks/useAuth";
import Logout from "@/components/Logout";

const cards = [
  {
    icon: "🌾",
    title: "Crop Recommendation",
    desc: "Get best crop for your soil, climate, and market",
    badge: "94% accuracy",
    badgeColor: "rgba(122,158,126,0.15)",
    badgeText: "var(--sage-dark)",
    accent: "var(--sage-light)",
  },
  {
    icon: "🦠",
    title: "Disease Detection",
    desc: "Upload a photo to instantly detect plant disease",
    badge: "Upload & Scan",
    badgeColor: "rgba(232,168,56,0.15)",
    badgeText: "#92620a",
    accent: "var(--sun-light)",
  },
  {
    icon: "🌦️",
    title: "Weather Forecast",
    desc: "Hyperlocal forecasts and farm timing advice",
    badge: "Updated hourly",
    badgeColor: "rgba(100,149,237,0.12)",
    badgeText: "#2a5298",
    accent: "#bbd0f5",
  },
  {
    icon: "📊",
    title: "Yield Analytics",
    desc: "Track profit, costs, and yield across seasons",
    badge: "This season ↑23%",
    badgeColor: "rgba(193,123,90,0.15)",
    badgeText: "#8b4a2a",
    accent: "#e8c4a8",
  },
];

const stats = [
  { label: "Active Season", value: "Kharif 2025", icon: "🗓️" },
  { label: "Farm Area", value: "4.5 acres", icon: "🗺️" },
  { label: "Crop Health", value: "Good", icon: "💚" },
  { label: "Next Action", value: "Irrigate Thu", icon: "💧" },
];

export default function Dashboard() {
  const { user } = useAuth();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Farmer";

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Top bar */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid var(--cream-dark)",
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="flex items-center gap-3">
          <span style={{ fontSize: "1.4rem" }}>🌱</span>
          <span className="serif" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--forest)" }}>
            KrishiMitra
          </span>
          <span
            style={{
              background: "rgba(122,158,126,0.12)",
              color: "var(--sage-dark)",
              fontSize: "0.7rem",
              fontWeight: 600,
              padding: "0.2rem 0.6rem",
              borderRadius: "100px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Dashboard
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            style={{
              width: "34px",
              height: "34px",
              background: "var(--forest)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.85rem",
              color: "var(--cream)",
              fontWeight: 600,
            }}
          >
            {displayName[0].toUpperCase()}
          </div>
          <Logout />
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Greeting */}
        <div className="animate-fade-up" style={{ marginBottom: "2.5rem" }}>
          <h1 className="serif" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.35rem" }}>
            Good morning, {displayName} 👋
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Here what is happening on your farm today.
          </p>
        </div>

        {/* Stats strip */}
        <div
          className="animate-delay-1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "white",
                border: "1px solid var(--cream-dark)",
                borderRadius: "16px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.2rem" }}>
                  {s.label}
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--forest)" }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <h2 className="serif animate-delay-2" style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--forest)", marginBottom: "1.25rem" }}>
          Your Tools
        </h2>
        <div
          className="animate-delay-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="card-hover"
              style={{
                background: "white",
                border: "1px solid var(--cream-dark)",
                borderRadius: "20px",
                padding: "1.75rem",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Accent blob */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: card.accent,
                  opacity: 0.3,
                }}
              />

              <div style={{ fontSize: "2.25rem", marginBottom: "1rem" }}>{card.icon}</div>
              <h3 className="serif" style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--forest)", marginBottom: "0.5rem" }}>
                {card.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                {card.desc}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: card.badgeColor,
                  color: card.badgeText,
                  borderRadius: "100px",
                  padding: "0.3rem 0.85rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {card.badge}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="animate-delay-3"
          style={{
            marginTop: "2.5rem",
            background: "var(--forest)",
            borderRadius: "24px",
            padding: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--cream)", marginBottom: "0.5rem" }}>
              Ready to scan your crops? 🔬
            </h3>
            <p style={{ color: "rgba(250,247,242,0.6)", fontSize: "0.9rem" }}>
              Upload a photo and our AI will diagnose any disease in seconds.
            </p>
          </div>
          <button
            className="btn-primary"
            style={{ background: "var(--sun-light)", color: "var(--forest)", flexShrink: 0 }}
          >
            Upload Photo →
          </button>
        </div>
      </main>
    </div>
  );
}