"use client";

import { useState } from "react";
import { dashboardPalette as G } from "@/lib/dashboard/palette";
import { Card, Badge } from "@/components/dashboard/ui";

export function DashboardOverview({ name }: { name: string }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      label: "Irrigation for Field 2",
      time: "Today, 8:00 AM",
      priority: "High",
      done: false,
    },
    {
      id: 2,
      label: "Apply fertilizer in Field 3",
      time: "Today, 4:00 PM",
      priority: "High",
      done: false,
    },
    {
      id: 3,
      label: "Pest inspection in Field 1",
      time: "Tomorrow, 9:00 AM",
      priority: "Medium",
      done: false,
    },
    {
      id: 4,
      label: "Weed cleaning in Field 4",
      time: "Tomorrow, 4:00 PM",
      priority: "Low",
      done: false,
    },
  ]);
  const toggle = (id: number) =>
    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)),
    );
  const priColor = (p: string) =>
    p === "High" ? G.red : p === "Medium" ? G.orange : G.teal;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: 700,
              color: G.ink,
              fontFamily: "Fraunces, serif",
            }}
          >
            {greeting}, {name}! 👋
          </h1>
          <p
            style={{
              margin: "0.2rem 0 0",
              fontSize: "0.85rem",
              color: G.muted,
            }}
          >
            Here&apos;s what&apos;s happening on your farm today.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: G.white,
              border: `1px solid ${G.border}`,
              borderRadius: 100,
              padding: "0.45rem 1rem",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>🔍</span>
            <input
              placeholder="Search anything..."
              style={{
                border: "none",
                outline: "none",
                fontSize: "0.82rem",
                color: G.ink,
                background: "transparent",
                width: "160px",
              }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: G.light,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              🔔
            </div>
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                width: 14,
                height: 14,
                background: G.red,
                borderRadius: "50%",
                fontSize: "0.55rem",
                color: G.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                border: `2px solid ${G.white}`,
              }}
            >
              3
            </span>
          </div>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: G.light,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            💬
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        <div
          style={{
            gridColumn: "span 2",
            background:
              "linear-gradient(135deg, #1a3c2e 0%, #2d6a4f 60%, #52b788 100%)",
            borderRadius: 16,
            padding: "1.25rem",
            color: G.white,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              opacity: 0.75,
              marginBottom: "0.5rem",
              letterSpacing: "0.06em",
            }}
          >
            CURRENT WEATHER
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "3rem",
                fontFamily: "Fraunces, serif",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              28°
            </span>
            <span style={{ fontSize: "3rem" }}>⛅</span>
            <div
              style={{
                marginLeft: "auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.25rem 1rem",
                fontSize: "0.72rem",
                opacity: 0.8,
              }}
            >
              {[
                ["Humidity", "62%"],
                ["Wind", "12 km/h"],
                ["Feels like", "30°C"],
                ["Rain chance", "10%"],
              ].map(([k, v]) => (
                <div key={k}>
                  <span style={{ opacity: 0.65 }}>{k}</span>
                  <br />
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 500,
              marginBottom: "0.85rem",
            }}
          >
            Partly Cloudy
          </div>
          <div style={{ display: "flex", gap: "0.9rem" }}>
            {[
              ["Mon", "☀️", "29/20"],
              ["Tue", "☀️", "31/21"],
              ["Wed", "🌤️", "30/20"],
              ["Thu", "🌧️", "29/19"],
              ["Fri", "⛅", "30/20"],
            ].map(([d, ic, t]) => (
              <div
                key={d}
                style={{
                  textAlign: "center",
                  fontSize: "0.7rem",
                  opacity: 0.85,
                }}
              >
                <div style={{ marginBottom: "0.2rem" }}>{d}</div>
                <div style={{ fontSize: "1.1rem" }}>{ic}</div>
                <div style={{ fontWeight: 500 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>

        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#d8f3dc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              marginBottom: "0.6rem",
            }}
          >
            🌿
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              color: G.muted,
              fontWeight: 600,
              letterSpacing: "0.05em",
              marginBottom: "0.25rem",
            }}
          >
            CROP HEALTH
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: G.ink,
              fontFamily: "Fraunces, serif",
              lineHeight: 1,
            }}
          >
            85%
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: G.teal,
              fontWeight: 600,
              margin: "0.2rem 0",
            }}
          >
            Healthy
          </div>
          <div style={{ fontSize: "0.7rem", color: G.muted }}>
            ↑ 12% from last week
          </div>
        </Card>

        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#fff3e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              marginBottom: "0.6rem",
            }}
          >
            🪨
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              color: G.muted,
              fontWeight: 600,
              letterSpacing: "0.05em",
              marginBottom: "0.25rem",
            }}
          >
            SOIL HEALTH
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: G.ink,
              fontFamily: "Fraunces, serif",
              lineHeight: 1,
            }}
          >
            72%
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: G.orange,
              fontWeight: 600,
              margin: "0.2rem 0",
            }}
          >
            Moderate
          </div>
          <div style={{ fontSize: "0.7rem", color: G.muted }}>
            ↑ 5% from last week
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <Card style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "#ffeded",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                margin: "0 auto 0.4rem",
              }}
            >
              🔴
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: G.muted,
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              ACTIVE ALERTS
            </div>
            <div
              style={{
                fontSize: "1.7rem",
                fontWeight: 800,
                color: G.ink,
                fontFamily: "Fraunces, serif",
                lineHeight: 1.2,
              }}
            >
              2
            </div>
            <div style={{ fontSize: "0.65rem", color: G.muted }}>
              Requires attention
            </div>
            <div
              style={{
                fontSize: "0.68rem",
                color: G.red,
                fontWeight: 600,
                marginTop: "0.3rem",
                cursor: "pointer",
              }}
            >
              View all alerts →
            </div>
          </Card>
          <Card style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "#e8f4fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                margin: "0 auto 0.4rem",
              }}
            >
              📋
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: G.muted,
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              TASKS TODAY
            </div>
            <div
              style={{
                fontSize: "1.7rem",
                fontWeight: 800,
                color: G.ink,
                fontFamily: "Fraunces, serif",
                lineHeight: 1.2,
              }}
            >
              4
            </div>
            <div style={{ fontSize: "0.65rem", color: G.muted }}>
              Pending tasks
            </div>
            <div
              style={{
                fontSize: "0.68rem",
                color: G.blue,
                fontWeight: 600,
                marginTop: "0.3rem",
                cursor: "pointer",
              }}
            >
              View tasks →
            </div>
          </Card>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink }}>
              Crop Health Overview
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: G.teal,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              See All
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <svg width={90} height={90} viewBox="0 0 90 90">
                <circle cx={45} cy={45} r={36} fill="none" stroke="#f0f0f0" strokeWidth={10} />
                <circle
                  cx={45}
                  cy={45}
                  r={36}
                  fill="none"
                  stroke={G.teal}
                  strokeWidth={10}
                  strokeDasharray={`${0.58 * 226} ${226}`}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
                <circle
                  cx={45}
                  cy={45}
                  r={36}
                  fill="none"
                  stroke={G.yellow}
                  strokeWidth={10}
                  strokeDasharray={`${0.25 * 226} ${226}`}
                  strokeDashoffset={`${-0.58 * 226}`}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
                <circle
                  cx={45}
                  cy={45}
                  r={36}
                  fill="none"
                  stroke={G.red}
                  strokeWidth={10}
                  strokeDasharray={`${0.17 * 226} ${226}`}
                  strokeDashoffset={`${-(0.58 + 0.25) * 226}`}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
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
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: G.ink,
                    fontFamily: "Fraunces, serif",
                    lineHeight: 1,
                  }}
                >
                  12
                </div>
                <div style={{ fontSize: "0.58rem", color: G.muted }}>
                  Total Fields
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
              {[
                ["🟢", "Healthy", "7 fields (58%)", G.teal],
                ["🟡", "Moderate", "3 fields (25%)", G.yellow],
                ["🔴", "Critical", "2 fields (17%)", G.red],
              ].map(([dot, lab, val, col]) => (
                <div
                  key={lab}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <span style={{ fontSize: "0.6rem" }}>{dot}</span>
                  <span style={{ fontSize: "0.78rem", color: G.muted, flex: 1 }}>
                    {lab}
                  </span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: col as string }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink }}>
              Soil Nutrient Status
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: G.teal,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              See Details
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {[
              ["N", "Nitrogen", "Medium", G.yellow],
              ["P", "Phosphorus", "High", G.teal],
              ["K", "Potassium", "Medium", G.yellow],
              ["pH", "6.5", "Good", G.teal],
            ].map(([sym, lab, st, col]) => (
              <div
                key={sym}
                style={{
                  background: G.bg,
                  borderRadius: 10,
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: G.ink,
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  {sym}
                </div>
                <div style={{ fontSize: "0.6rem", color: G.muted, margin: "0.1rem 0" }}>
                  {lab}
                </div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: col as string }}>
                  {st}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: G.muted,
              marginBottom: "0.35rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Overall Soil Health</span>
            <span style={{ fontWeight: 700, color: G.ink }}>72%</span>
          </div>
          <div
            style={{
              height: 7,
              background: "#eee",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "72%",
                background: `linear-gradient(90deg, ${G.teal}, ${G.mid})`,
                borderRadius: 6,
              }}
            />
          </div>
        </Card>

        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.85rem 1rem 0.5rem",
            }}
          >
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink }}>
              Farm Map
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: G.teal,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View Full Map
            </span>
          </div>
          <div
            style={{
              position: "relative",
              height: 170,
              background: "linear-gradient(160deg, #2d6a4f 0%, #40916c 40%, #74c69d 100%)",
              overflow: "hidden",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 280 170"
              style={{ position: "absolute", inset: 0 }}
            >
              <polygon
                points="20,20 120,10 130,90 30,95"
                fill="rgba(255,255,255,0.15)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
              />
              <polygon
                points="130,10 220,20 230,80 130,90"
                fill="rgba(255,255,255,0.1)"
                stroke="#f9c74f"
                strokeWidth="1.5"
              />
              <polygon
                points="20,100 130,95 140,155 25,160"
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon
                points="140,90 240,80 250,150 140,155"
                fill="rgba(255,255,255,0.13)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <circle cx="75" cy="52" r="8" fill={G.teal} stroke={G.white} strokeWidth="2" />
              <text x="75" y="56" textAnchor="middle" fontSize="8" fill={G.white}>
                ✓
              </text>
              <circle cx="175" cy="48" r="8" fill={G.teal} stroke={G.white} strokeWidth="2" />
              <text x="175" y="52" textAnchor="middle" fontSize="8" fill={G.white}>
                ✓
              </text>
              <circle cx="85" cy="128" r="8" fill={G.red} stroke={G.white} strokeWidth="2" />
              <text x="85" y="132" textAnchor="middle" fontSize="8" fill={G.white}>
                !
              </text>
              <circle cx="195" cy="122" r="8" fill={G.teal} stroke={G.white} strokeWidth="2" />
              <text x="195" y="126" textAnchor="middle" fontSize="8" fill={G.white}>
                ✓
              </text>
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              padding: "0.6rem 1rem",
              fontSize: "0.68rem",
              color: G.muted,
            }}
          >
            <span>🟢 Healthy</span>
            <span>🟡 Moderate</span>
            <span>🔴 Critical</span>
          </div>
        </Card>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #1a3c2e, #2d6a4f)",
          borderRadius: 16,
          padding: "1.1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            flexShrink: 0,
          }}
        >
          🤖
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.3rem",
            }}
          >
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: G.white }}>
              AI Crop Advisor
            </span>
            <span
              style={{
                background: G.teal,
                color: G.white,
                fontSize: "0.6rem",
                fontWeight: 700,
                padding: "0.15rem 0.5rem",
                borderRadius: 100,
              }}
            >
              Beta
            </span>
            <span style={{ marginLeft: "auto", fontSize: "1rem" }}>✨</span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.5,
            }}
          >
            Based on weather, soil & market trends, we recommend applying{" "}
            <strong style={{ color: G.white }}>organic fertilizer in Field 3</strong> to
            improve yield by 18%.
          </p>
        </div>
        <button
          type="button"
          style={{
            background: G.teal,
            border: "none",
            borderRadius: 10,
            padding: "0.65rem 1.25rem",
            color: G.white,
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          View Recommendation
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.85rem",
            }}
          >
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink }}>
              Market Prices
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: G.teal,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              See All
            </span>
          </div>
          {[
            ["🌾", "Wheat", "₹2,125", "+2.4%", true],
            ["🌾", "Rice", "₹1,890", "-1.1%", false],
            ["🌽", "Corn", "₹1,645", "+0.8%", true],
            ["🌱", "Soybean", "₹3,782", "+3.2%", true],
          ].map(([ic, name, price, chg, up]) => (
            <div
              key={name as string}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.55rem 0",
                borderBottom: `1px solid ${G.border}`,
              }}
            >
              <span style={{ fontSize: "1rem" }}>{ic}</span>
              <span style={{ flex: 1, fontSize: "0.82rem", fontWeight: 600, color: G.ink }}>
                {name}
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: G.ink }}>
                {price}
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: up ? G.teal : G.red,
                  minWidth: 38,
                  textAlign: "right",
                }}
              >
                {chg}
              </span>
            </div>
          ))}
        </Card>

        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.85rem",
            }}
          >
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink }}>
              Tasks & Reminders
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: G.teal,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View All
            </span>
          </div>
          {tasks.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.65rem",
                padding: "0.55rem 0",
                borderBottom: `1px solid ${G.border}`,
                cursor: "pointer",
              }}
              onClick={() => toggle(t.id)}
              onKeyDown={(e) => e.key === "Enter" && toggle(t.id)}
              role="button"
              tabIndex={0}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `2px solid ${t.done ? G.teal : G.border}`,
                  background: t.done ? G.teal : "transparent",
                  flexShrink: 0,
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {t.done && (
                  <span style={{ color: G.white, fontSize: "0.55rem" }}>✓</span>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: t.done ? G.muted : G.ink,
                    textDecoration: t.done ? "line-through" : "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.label}
                </div>
                <div style={{ fontSize: "0.68rem", color: G.muted }}>{t.time}</div>
              </div>
              <Badge label={t.priority} color={priColor(t.priority)} />
            </div>
          ))}
        </Card>

        <Card>
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: G.ink,
              marginBottom: "0.85rem",
            }}
          >
            Quick Actions
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
            {[
              ["➕", "Add New Field", "#d8f3dc", G.mid],
              ["🌿", "Record Observation", "#d8f3dc", G.mid],
              ["🧪", "Check Soil Health", "#e8f4fd", G.blue],
              ["🤖", "Ask AI Advisor", "#f0e6ff", "#7c3aed"],
            ].map(([ic, lab, bg, col]) => (
              <button
                key={lab as string}
                type="button"
                style={{
                  background: bg as string,
                  border: "none",
                  borderRadius: 12,
                  padding: "0.85rem 0.65rem",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>{ic}</div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: col as string,
                    lineHeight: 1.3,
                  }}
                >
                  {lab}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
