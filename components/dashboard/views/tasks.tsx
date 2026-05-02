"use client";

import { useState } from "react";
import { dashboardPalette as G } from "@/lib/dashboard/palette";
import { Card, Badge } from "@/components/dashboard/ui";
import { useAuth } from "@/hooks/useAuth";
import { useFirestoreTasks } from "@/hooks/useFirestoreTasks";

export function TasksView() {
  const { user } = useAuth();
  const { tasks, loading, addTask, toggleTask } = useFirestoreTasks();
  const [newTask, setNewTask] = useState("");

  const add = async () => {
    if (!newTask.trim() || !user) return;
    await addTask(newTask);
    setNewTask("");
  };

  const priColor = (p: string) =>
    p === "High" ? G.red : p === "Medium" ? G.orange : G.teal;
  const done = tasks.filter((t) => t.done).length;

  if (!user) {
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
          ✅ Tasks & Reminders
        </h1>
        <Card>
          <p style={{ margin: 0, fontSize: "0.9rem", color: G.muted }}>
            Sign in to save tasks to your account. They sync with Firebase and stay available on
            every device.
          </p>
        </Card>
      </div>
    );
  }

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
        ✅ Tasks & Reminders
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
        {[
          ["Total Tasks", tasks.length.toString(), G.blue],
          ["Completed", done.toString(), G.teal],
          ["Pending", (tasks.length - done).toString(), G.orange],
        ].map(([l, v, c]) => (
          <Card key={l} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: c as string,
                fontFamily: "Fraunces, serif",
              }}
            >
              {v}
            </div>
            <div style={{ fontSize: "0.8rem", color: G.muted }}>{l}</div>
          </Card>
        ))}
      </div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: G.ink }}>
            Overall Progress
          </span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: G.teal }}>
            {tasks.length ? Math.round((done / tasks.length) * 100) : 0}%
          </span>
        </div>
        <div
          style={{
            height: 8,
            background: "#eee",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${tasks.length ? (done / tasks.length) * 100 : 0}%`,
              background: `linear-gradient(90deg, ${G.teal}, ${G.mid})`,
              borderRadius: 6,
              transition: "width 0.5s",
            }}
          />
        </div>
      </Card>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink }}>
            All Tasks
            {loading ? (
              <span style={{ fontWeight: 500, color: G.muted, marginLeft: "0.5rem" }}>
                (loading…)
              </span>
            ) : null}
          </span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void add();
              }}
              placeholder="Add new task..."
              disabled={loading}
              style={{
                border: `1.5px solid ${G.border}`,
                borderRadius: 100,
                padding: "0.4rem 0.85rem",
                fontSize: "0.78rem",
                outline: "none",
                fontFamily: "DM Sans, sans-serif",
                width: 200,
                opacity: loading ? 0.7 : 1,
              }}
            />
            <button
              type="button"
              onClick={() => void add()}
              disabled={loading}
              style={{
                background: G.dark,
                color: G.white,
                border: "none",
                borderRadius: 100,
                padding: "0.4rem 1rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: loading ? "wait" : "pointer",
                fontFamily: "DM Sans, sans-serif",
                opacity: loading ? 0.85 : 1,
              }}
            >
              + Add
            </button>
          </div>
        </div>
        {!loading && tasks.length === 0 ? (
          <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem", color: G.muted }}>
            No tasks yet. Add one above — it is stored in your Firebase account.
          </p>
        ) : null}
        {tasks.map((t) => (
          <div
            key={t.id}
            onClick={() => void toggleTask(t.id, t.done)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void toggleTask(t.id, t.done);
            }}
            role="button"
            tabIndex={0}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              padding: "0.8rem 0",
              borderBottom: `1px solid ${G.border}`,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: `2px solid ${t.done ? G.teal : "#ccc"}`,
                background: t.done ? G.teal : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              {t.done ? (
                <span style={{ color: G.white, fontSize: "0.6rem" }}>✓</span>
              ) : null}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: t.done ? G.muted : G.ink,
                  textDecoration: t.done ? "line-through" : "none",
                }}
              >
                {t.label}
              </div>
              <div style={{ fontSize: "0.7rem", color: G.muted }}>
                {t.time} · {t.field}
              </div>
            </div>
            <Badge label={t.priority} color={priColor(t.priority)} />
          </div>
        ))}
      </Card>
    </div>
  );
}
