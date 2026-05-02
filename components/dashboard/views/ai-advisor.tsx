"use client";

import { useState } from "react";
import { dashboardPalette as G } from "@/lib/dashboard/palette";
import { Card } from "@/components/dashboard/ui";

type ChatMessage = { role: "ai" | "user"; text: string };

export function AIAdvisorView() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Hello! I'm your KrishiMitra AI Advisor. Ask me anything about your crops, soil, weather, or market conditions. I analyze your farm data to give personalized recommendations.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data: { reply?: string } = await res.json();
      const reply =
        data.reply ??
        "I'm sorry, I couldn't process that. Please try again.";
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "Network error. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Best crops for Kharif season?",
    "How to treat powdery mildew?",
    "When should I irrigate wheat?",
    "Current best price crop to grow?",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "calc(100vh - 120px)",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: 700,
          color: G.ink,
          fontFamily: "Fraunces, serif",
        }}
      >
        🤖 AI Crop Advisor
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "1rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        <Card style={{ display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: `1px solid ${G.border}`,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: G.dark,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
              }}
            >
              🤖
            </div>
            <div>
              <div style={{ fontWeight: 700, color: G.ink, fontSize: "0.9rem" }}>
                KrishiMitra AI
              </div>
              <div style={{ fontSize: "0.7rem", color: G.teal }}>
                ● Online — Powered by Claude
              </div>
            </div>
            <span
              style={{
                marginLeft: "auto",
                background: G.teal,
                color: G.white,
                fontSize: "0.6rem",
                fontWeight: 700,
                padding: "0.2rem 0.5rem",
                borderRadius: 100,
              }}
            >
              Beta
            </span>
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "78%",
                    background: m.role === "user" ? G.dark : G.bg,
                    color: m.role === "user" ? G.white : G.ink,
                    borderRadius:
                      m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    padding: "0.75rem 1rem",
                    fontSize: "0.83rem",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  padding: "0.75rem 1rem",
                  background: G.bg,
                  borderRadius: "16px 16px 16px 4px",
                  width: "fit-content",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: G.teal,
                      animation: `bounce 1s ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              padding: "0.85rem 1.25rem",
              borderTop: `1px solid ${G.border}`,
              display: "flex",
              gap: "0.6rem",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about your crops, soil, weather..."
              style={{
                flex: 1,
                border: `1.5px solid ${G.border}`,
                borderRadius: 100,
                padding: "0.6rem 1rem",
                fontSize: "0.83rem",
                outline: "none",
                fontFamily: "DM Sans, sans-serif",
                color: G.ink,
              }}
            />
            <button
              type="button"
              onClick={send}
              disabled={loading}
              style={{
                background: G.dark,
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                fontSize: "1rem",
              }}
            >
              ➤
            </button>
          </div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Card>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: G.ink,
                marginBottom: "0.75rem",
              }}
            >
              💡 Quick Questions
            </div>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setInput(s)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: G.bg,
                  border: `1px solid ${G.border}`,
                  borderRadius: 10,
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.78rem",
                  color: G.ink,
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                {s}
              </button>
            ))}
          </Card>
          <Card>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: G.ink,
                marginBottom: "0.75rem",
              }}
            >
              📋 Today&apos;s Recommendations
            </div>
            {[
              ["🌿", "Apply organic fertilizer to Field 3"],
              ["💧", "Irrigate Field 2 by evening"],
              ["🔬", "Inspect Field 3 for mildew spread"],
            ].map(([ic, txt]) => (
              <div
                key={txt}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  padding: "0.5rem 0",
                  borderBottom: `1px solid ${G.border}`,
                  fontSize: "0.78rem",
                  color: G.ink,
                }}
              >
                <span>{ic}</span>
                <span>{txt}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}
