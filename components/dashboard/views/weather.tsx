"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardSurface } from "@/lib/dashboard/surface-theme";
import { DarkPageHeader } from "@/components/dashboard/dark-page-header";

const hourly = [9, 10, 11, 12, 13, 14, 15, 16].map((h, i) => ({
  h: `${h}:00`,
  t: 26 + i,
  icon: i % 3 === 0 ? "☀️" : "⛅",
}));

const week = [
  { d: "Mon", hi: 31, lo: 21, ic: "☀️" },
  { d: "Tue", hi: 30, lo: 20, ic: "⛅" },
  { d: "Wed", hi: 29, lo: 19, ic: "🌤️" },
  { d: "Thu", hi: 27, lo: 18, ic: "🌧️" },
  { d: "Fri", hi: 29, lo: 19, ic: "⛅" },
  { d: "Sat", hi: 32, lo: 22, ic: "☀️" },
  { d: "Sun", hi: 33, lo: 23, ic: "☀️" },
];

const rainBars = [2, 0, 4, 12, 6, 1, 0];

export function WeatherView() {
  const D = useDashboardSurface();
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Farmer";
  const [crop, setCrop] = useState("Wheat");

  return (
    <div style={{ color: D.text, fontFamily: "DM Sans, sans-serif" }}>
      <DarkPageHeader
        title="Weather"
        subtitle="Real-time weather updates for better farming decisions."
        displayName={displayName}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
        className="weather-top"
      >
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid ${D.border}`,
            background: `linear-gradient(145deg, #1e3a2f 0%, #0f172a 50%, #1e293b 100%)`,
            display: "grid",
            gridTemplateColumns: "1fr 200px",
            minHeight: 200,
          }}
        >
          <div style={{ padding: "1.35rem" }}>
            <div style={{ fontSize: "0.75rem", color: D.muted, marginBottom: "0.25rem" }}>
              Indore, Madhya Pradesh
            </div>
            <div style={{ fontSize: "3.2rem", fontWeight: 800, lineHeight: 1 }}>28°C</div>
            <div style={{ fontSize: "1rem", marginTop: "0.25rem" }}>Partly Cloudy</div>
            <div style={{ fontSize: "0.85rem", color: D.muted, marginTop: "0.35rem" }}>
              H 30° · L 22°
            </div>
          </div>
          <div
            style={{
              padding: "1rem",
              background: "rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "0.65rem",
              justifyContent: "center",
              fontSize: "0.78rem",
            }}
          >
            {[
              ["Feels like", "30°C"],
              ["Humidity", "62%"],
              ["Wind", "12 km/h SW"],
              ["Pressure", "1008 hPa"],
              ["Visibility", "10 km"],
            ].map(([a, b]) => (
              <div key={a} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: D.muted }}>{a}</span>
                <span style={{ fontWeight: 600 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 16,
            padding: "1.25rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: D.muted, marginBottom: "0.5rem" }}>
            Air Quality Index
          </div>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              margin: "0 auto",
              border: `6px solid ${D.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
              fontWeight: 800,
            }}
          >
            42
          </div>
          <div style={{ color: D.accent, fontWeight: 600, marginTop: "0.5rem" }}>Good</div>
          <div style={{ fontSize: "0.78rem", color: D.muted, marginTop: "1rem", textAlign: "left" }}>
            <div>🌅 Sunrise 6:12 AM</div>
            <div style={{ marginTop: "0.25rem" }}>🌇 Sunset 7:45 PM</div>
            <div style={{ marginTop: "0.25rem" }}>Day length 13h 33m</div>
          </div>
        </div>
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
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.75rem" }}>Hourly</div>
        <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
          {hourly.map((x) => (
            <div
              key={x.h}
              style={{
                flexShrink: 0,
                width: 64,
                textAlign: "center",
                background: D.card2,
                borderRadius: 12,
                padding: "0.65rem 0.35rem",
              }}
            >
              <div style={{ fontSize: "0.68rem", color: D.muted }}>{x.h}</div>
              <div style={{ fontSize: "1.25rem" }}>{x.icon}</div>
              <div style={{ fontWeight: 700 }}>{x.t}°</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
        className="weather-mid"
      >
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "1.15rem",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.85rem" }}>7-Day Forecast</div>
          {week.map((d) => (
            <div
              key={d.d}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem 0",
                borderBottom: `1px solid ${D.border}`,
                fontSize: "0.84rem",
              }}
            >
              <span style={{ width: 48, color: D.muted }}>{d.d}</span>
              <span style={{ fontSize: "1.2rem", width: 40 }}>{d.ic}</span>
              <span style={{ flex: 1, textAlign: "right", fontWeight: 600 }}>
                {d.hi}° / {d.lo}°
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "1rem",
            minHeight: 200,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Rain radar</div>
          <div
            style={{
              height: 160,
              borderRadius: 12,
              background: `linear-gradient(160deg, #1e293b, #0f172a)`,
              border: `1px solid ${D.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: D.muted,
              fontSize: "0.82rem",
            }}
          >
            Precipitation map (demo)
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
        className="weather-bottom"
      >
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "1.15rem",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Farming insights</div>
          {[
            ["Best time to irrigate — low evaporation tomorrow morning.", "Optimal", D.accent],
            ["Heat spike Thu; avoid spraying.", "Alert", D.orange],
            ["Soil drying faster than average.", "Moderate", D.warn],
          ].map(([txt, tag, col]) => (
            <div
              key={txt}
              style={{
                padding: "0.65rem 0",
                borderBottom: `1px solid ${D.border}`,
                fontSize: "0.82rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                <span style={{ lineHeight: 1.45 }}>{txt}</span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: col,
                    flexShrink: 0,
                  }}
                >
                  {tag}
                </span>
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
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontWeight: 700 }}>Weather impact · {crop}</span>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              style={{
                fontSize: "0.75rem",
                padding: "0.25rem 0.5rem",
                borderRadius: 8,
                border: `1px solid ${D.border}`,
                background: D.card2,
                color: D.text,
              }}
            >
              {["Wheat", "Soybean", "Cotton"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "inline-block",
              padding: "0.25rem 0.65rem",
              borderRadius: 8,
              background: `${D.warn}22`,
              color: D.warn,
              fontSize: "0.75rem",
              fontWeight: 700,
              marginBottom: "0.65rem",
            }}
          >
            Moderate risk
          </div>
          <div style={{ fontSize: "0.78rem", color: D.muted }}>5-day stress timeline (demo)</div>
          <div style={{ display: "flex", gap: 4, marginTop: "0.5rem", height: 8 }}>
            {[40, 55, 70, 45, 35].map((w, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  borderRadius: 4,
                  background: `rgba(251,191,36,${w / 100})`,
                }}
              />
            ))}
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
          <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Rainfall prediction (mm)</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100 }}>
            {rainBars.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: "100%",
                    height: `${Math.min(v * 5, 100)}%`,
                    minHeight: 4,
                    background: D.blue,
                    borderRadius: "4px 4px 0 0",
                    opacity: 0.85,
                  }}
                />
                <span style={{ fontSize: "0.65rem", color: D.faint }}>{week[i]?.d.slice(0, 2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1rem",
        }}
        className="weather-footer"
      >
        <div
          style={{
            background: D.card,
            border: `1px solid ${D.border}`,
            borderRadius: 14,
            padding: "1.15rem",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.85rem" }}>Detailed overview</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.75rem",
              fontSize: "0.78rem",
            }}
          >
            {[
              ["🌡️", "Temperature", "28°C"],
              ["💧", "Humidity", "62%"],
              ["💨", "Wind", "12 km/h"],
              ["📊", "Pressure", "1008 hPa"],
              ["☀️", "UV Index", "6 High"],
              ["☁️", "Clouds", "40%"],
              ["💨", "Dew point", "18°C"],
              ["👁️", "Visibility", "10 km"],
            ].map(([ic, lab, val]) => (
              <div
                key={lab}
                style={{
                  background: D.card2,
                  borderRadius: 10,
                  padding: "0.65rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.1rem" }}>{ic}</div>
                <div style={{ color: D.muted, marginTop: "0.2rem" }}>{lab}</div>
                <div style={{ fontWeight: 700, marginTop: "0.15rem" }}>{val}</div>
              </div>
            ))}
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
          <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Quick actions</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            {["Check soil moisture", "Schedule irrigation", "Ask AI Advisor", "Crop advisory"].map(
              (a) => (
                <button
                  key={a}
                  type="button"
                  style={{
                    padding: "0.75rem 0.5rem",
                    borderRadius: 10,
                    border: `1px solid ${D.border}`,
                    background: D.card2,
                    color: D.text,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {a}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .weather-top { grid-template-columns: 1fr !important; }
          .weather-mid { grid-template-columns: 1fr !important; }
          .weather-bottom { grid-template-columns: 1fr !important; }
          .weather-footer { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
