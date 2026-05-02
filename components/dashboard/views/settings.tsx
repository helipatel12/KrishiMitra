"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/theme-provider";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useDashboardSurface, type SurfaceColors } from "@/lib/dashboard/surface-theme";
import {
  defaultFarmDefaults,
  defaultPreferences,
  type ThemePreference,
} from "@/lib/firestore/types";

type SettingsPalette = SurfaceColors & {
  danger: string;
  dangerBg: string;
  trackOff: string;
  inputBg: string;
  segmentBg: string;
};

function SettingsDarkCard({
  palette: c,
  title,
  children,
  style,
}: {
  palette: SettingsPalette;
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 16,
        padding: "1.25rem 1.35rem",
        ...style,
      }}
    >
      <h2
        style={{
          margin: "0 0 1rem",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: c.text,
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SettingsToggleRow({
  palette: c,
  label,
  description,
  checked,
  onChange,
  noDivider,
}: {
  palette: SettingsPalette;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  noDivider?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "0.65rem 0",
        borderBottom: noDivider ? "none" : `1px solid ${c.border}`,
      }}
    >
      <div>
        <div style={{ fontSize: "0.84rem", fontWeight: 500, color: c.text }}>{label}</div>
        {description ? (
          <div style={{ fontSize: "0.72rem", color: c.muted, marginTop: "0.2rem" }}>
            {description}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: 48,
          height: 26,
          borderRadius: 13,
          border: "none",
          padding: 3,
          cursor: "pointer",
          flexShrink: 0,
          background: checked ? c.accent : c.trackOff,
          position: "relative",
          transition: "background 0.2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: checked ? 25 : 3,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.35)",
          }}
        />
      </button>
    </div>
  );
}

function SettingsSegmented<T extends string>({
  palette: c,
  options,
  labels,
  value,
  onChange,
}: {
  palette: SettingsPalette;
  options: readonly T[];
  labels: Record<T, string>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        background: c.segmentBg,
        borderRadius: 10,
        padding: 3,
        gap: 2,
      }}
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              flex: 1,
              border: "none",
              borderRadius: 8,
              padding: "0.45rem 0.5rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              background: active ? c.accent : "transparent",
              color: active ? "#fff" : c.muted,
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {labels[opt]}
          </button>
        );
      })}
    </div>
  );
}

function SettingsSelectField({
  palette: c,
  label,
  value,
  onChange,
  options,
}: {
  palette: SettingsPalette;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label style={{ display: "block", marginBottom: "1rem" }}>
      <span
        style={{
          display: "block",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: c.muted,
          marginBottom: "0.4rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.65rem 0.85rem",
          borderRadius: 10,
          border: `1px solid ${c.border}`,
          background: c.inputBg,
          color: c.text,
          fontSize: "0.84rem",
          fontFamily: "DM Sans, sans-serif",
          outline: "none",
          cursor: "pointer",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SettingsView() {
  const { user } = useAuth();
  const s = useDashboardSurface();
  const { preference, setTheme, resolvedTheme } = useTheme();
  const { profile, loading, updateProfile } = useUserProfile();

  const C = useMemo(
    (): SettingsPalette => ({
      ...s,
      danger: "#D32F2F",
      dangerBg: "rgba(211, 47, 47, 0.12)",
      trackOff: resolvedTheme === "dark" ? "#2a2a2a" : "#d1d5db",
      inputBg: resolvedTheme === "dark" ? "#1a1a1a" : s.card2,
      segmentBg: resolvedTheme === "dark" ? "#1a1a1a" : "#e2ece6",
    }),
    [s, resolvedTheme],
  );

  const displayName =
    profile?.displayName || user?.displayName || user?.email?.split("@")[0] || "Farmer";
  const email = user?.email ?? "—";
  const phone = profile?.phone || user?.phoneNumber || "+91 —";

  const prefs = profile?.preferences ?? defaultPreferences;
  const location = profile?.location ?? "indore";
  const farmDefaults = profile?.farmDefaults ?? defaultFarmDefaults;

  const [lastBackup] = useState("28 Apr 2026, 06:30");

  if (user && loading && !profile) {
    return (
      <div
        style={{
          minHeight: "100%",
          padding: "2rem",
          background: C.bg,
          color: C.muted,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Loading settings…
      </div>
    );
  }

  const locations = [
    { value: "indore", label: "Indore, Madhya Pradesh" },
    { value: "vadodara", label: "Vadodara, Gujarat" },
    { value: "pune", label: "Pune, Maharashtra" },
  ];

  return (
    <div
      style={{
        minHeight: "100%",
        background: C.bg,
        color: C.text,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top header */}
      <header
        style={{
          padding: "1.35rem 1.75rem 1rem",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "1.65rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Settings
          </h1>
          <p style={{ margin: "0.35rem 0 0", fontSize: "0.88rem", color: C.muted }}>
            Manage your account, preferences and app settings.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <select
            value={location}
            onChange={(e) => {
              void updateProfile({ location: e.target.value });
            }}
            aria-label="Location"
            style={{
              padding: "0.55rem 1rem",
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              background: C.card,
              color: C.text,
              fontSize: "0.82rem",
              fontFamily: "DM Sans, sans-serif",
              cursor: "pointer",
            }}
          >
            {locations.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              type="button"
              style={{
                position: "relative",
                width: 40,
                height: 40,
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                background: C.card,
                cursor: "pointer",
                fontSize: "1.1rem",
              }}
            >
              🔔
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  minWidth: 16,
                  height: 16,
                  borderRadius: 8,
                  background: C.danger,
                  color: "#fff",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                }}
              >
                3
              </span>
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.35rem 0.85rem 0.35rem 0.35rem",
                borderRadius: 12,
                border: `1px solid ${C.border}`,
                background: C.card,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.accent}, #2e7d32)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#fff",
                }}
              >
                {displayName[0]?.toUpperCase() ?? "F"}
              </div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 600 }}>{displayName}</div>
                <div style={{ fontSize: "0.72rem", color: C.accent }}>Premium Farmer</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content grid */}
      <div
        style={{
          padding: "1.5rem 1.75rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1.25rem",
          alignItems: "start",
        }}
        className="settings-grid"
      >
        <style>{`
          @media (max-width: 1100px) {
            .settings-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 720px) {
            .settings-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Column 1 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <SettingsDarkCard palette={C} title="Profile Settings">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.accent}, #1b5e20)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                }}
              >
                {displayName[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>{displayName}</div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.35rem",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: C.accent,
                    background: C.accentDim,
                    padding: "0.2rem 0.55rem",
                    borderRadius: 100,
                  }}
                >
                  Premium Member
                </span>
              </div>
            </div>
            <div style={{ fontSize: "0.82rem", color: C.muted, marginBottom: "0.35rem" }}>
              Email
            </div>
            <div style={{ fontSize: "0.88rem", marginBottom: "0.85rem" }}>{email}</div>
            <div style={{ fontSize: "0.82rem", color: C.muted, marginBottom: "0.35rem" }}>
              Phone
            </div>
            <div style={{ fontSize: "0.88rem", marginBottom: "1.1rem" }}>{phone}</div>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "0.65rem",
                borderRadius: 10,
                border: "none",
                background: C.accent,
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.84rem",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Edit Profile
            </button>
          </SettingsDarkCard>

          <SettingsDarkCard palette={C} title="Preferences">
            <SettingsSelectField palette={C}
              label="Language"
              value={prefs.language}
              onChange={(v) => {
                void updateProfile({ preferences: { language: v } });
              }}
              options={[
                { value: "en", label: "English" },
                { value: "hi", label: "हिन्दी" },
                { value: "gu", label: "ગુજરાતી" },
              ]}
            />
            <SettingsSelectField palette={C}
              label="Theme"
              value={preference}
              onChange={(v) => {
                const t = v as ThemePreference;
                setTheme(t);
                void updateProfile({ preferences: { theme: t } });
              }}
              options={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
                { value: "system", label: "System" },
              ]}
            />
            <div style={{ marginBottom: "0.75rem" }}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: C.muted,
                  marginBottom: "0.45rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Temperature Unit
              </div>
              <SettingsSegmented palette={C}
                options={["C", "F"] as const}
                labels={{ C: "°C", F: "°F" }}
                value={prefs.tempUnit}
                onChange={(v) => {
                  void updateProfile({ preferences: { tempUnit: v } });
                }}
              />
            </div>
            <div style={{ marginBottom: "0.75rem" }}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: C.muted,
                  marginBottom: "0.45rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Rainfall Unit
              </div>
              <SettingsSegmented palette={C}
                options={["mm", "inch"] as const}
                labels={{ mm: "mm", inch: "inch" }}
                value={prefs.rainUnit}
                onChange={(v) => {
                  void updateProfile({ preferences: { rainUnit: v } });
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: C.muted,
                  marginBottom: "0.45rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Area Unit
              </div>
              <SettingsSegmented palette={C}
                options={["Acre", "Hectare"] as const}
                labels={{ Acre: "Acre", Hectare: "Hectare" }}
                value={prefs.areaUnit}
                onChange={(v) => {
                  void updateProfile({ preferences: { areaUnit: v } });
                }}
              />
            </div>
          </SettingsDarkCard>

          <SettingsDarkCard palette={C} title="Notifications">
            <SettingsToggleRow palette={C}
              label="Weather Alerts"
              checked={prefs.notif.weather}
              onChange={(v) =>
                void updateProfile({
                  preferences: { notif: { ...prefs.notif, weather: v } },
                })
              }
            />
            <SettingsToggleRow palette={C}
              label="Irrigation Reminders"
              checked={prefs.notif.irrigation}
              onChange={(v) =>
                void updateProfile({
                  preferences: { notif: { ...prefs.notif, irrigation: v } },
                })
              }
            />
            <SettingsToggleRow palette={C}
              label="Pest & Disease Alerts"
              checked={prefs.notif.pest}
              onChange={(v) =>
                void updateProfile({
                  preferences: { notif: { ...prefs.notif, pest: v } },
                })
              }
            />
            <SettingsToggleRow palette={C}
              label="Market Price Updates"
              checked={prefs.notif.market}
              onChange={(v) =>
                void updateProfile({
                  preferences: { notif: { ...prefs.notif, market: v } },
                })
              }
            />
            <SettingsToggleRow palette={C}
              label="Weekly Reports"
              checked={prefs.notif.weekly}
              onChange={(v) =>
                void updateProfile({
                  preferences: { notif: { ...prefs.notif, weekly: v } },
                })
              }
              noDivider
            />
          </SettingsDarkCard>
        </div>

        {/* Column 2 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <SettingsDarkCard palette={C} title="Data & Sync">
            <SettingsToggleRow palette={C}
              label="Auto Sync"
              checked={prefs.autoSync}
              onChange={(v) => {
                void updateProfile({ preferences: { autoSync: v } });
              }}
            />
            <div
              style={{
                padding: "0.85rem 0",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div style={{ fontSize: "0.84rem", fontWeight: 600 }}>Data Backup</div>
              <div style={{ fontSize: "0.75rem", color: C.muted, marginTop: "0.25rem" }}>
                Last backup: {lastBackup}
              </div>
              <button
                type="button"
                style={{
                  marginTop: "0.65rem",
                  padding: "0.5rem 1rem",
                  borderRadius: 8,
                  border: `1px solid ${C.accent}`,
                  background: "transparent",
                  color: C.accent,
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                Backup Now
              </button>
            </div>
            <button
              type="button"
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.85rem 0",
                border: "none",
                borderBottom: `1px solid ${C.border}`,
                background: "none",
                color: C.text,
                fontSize: "0.84rem",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Export My Data
              <span style={{ color: C.muted }}>→</span>
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.85rem",
              }}
            >
              <div>
                <div style={{ fontSize: "0.84rem", fontWeight: 600 }}>Clear Cache</div>
                <div style={{ fontSize: "0.75rem", color: C.muted }}>125 MB used</div>
              </div>
              <button
                type="button"
                style={{
                  padding: "0.45rem 0.9rem",
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                  background: C.inputBg,
                  color: C.text,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                Clear
              </button>
            </div>
          </SettingsDarkCard>

          <SettingsDarkCard
            palette={C}
            title="Danger Zone"
            style={{
              borderColor: "rgba(211, 47, 47, 0.35)",
              background: C.dangerBg,
            }}
          >
            <p style={{ margin: "0 0 1rem", fontSize: "0.82rem", color: C.muted, lineHeight: 1.5 }}>
              Permanently delete your account and all farm data. This cannot be undone.
            </p>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "0.65rem",
                borderRadius: 10,
                border: `1px solid ${C.danger}`,
                background: "transparent",
                color: C.danger,
                fontWeight: 700,
                fontSize: "0.84rem",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Delete Account
            </button>
          </SettingsDarkCard>
        </div>

        {/* Column 3 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <SettingsDarkCard palette={C} title="Quick Preferences">
            {[
              ["Default Crop", farmDefaults.defaultCrop],
              ["Default Farm", farmDefaults.defaultFarm],
              ["Season", farmDefaults.season],
              ["Soil Type", farmDefaults.soilType],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.55rem 0",
                  borderBottom: `1px solid ${C.border}`,
                  fontSize: "0.82rem",
                }}
              >
                <span style={{ color: C.muted }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <button
              type="button"
              style={{
                width: "100%",
                marginTop: "0.75rem",
                padding: "0.65rem",
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                background: C.inputBg,
                color: C.text,
                fontWeight: 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Manage All Preferences
            </button>
          </SettingsDarkCard>

          <SettingsDarkCard palette={C} title="Connected Services">
            {(
              [
                { name: "Google Account" },
                { name: "WhatsApp" },
                { name: "Email Service" },
              ] as const
            ).map(({ name }) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.65rem 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <span style={{ fontSize: "0.84rem" }}>{name}</span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: C.accent,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  ✓ Connected
                </span>
              </div>
            ))}
            <button
              type="button"
              style={{
                width: "100%",
                marginTop: "0.75rem",
                padding: "0.65rem",
                borderRadius: 10,
                border: "none",
                background: C.accent,
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Manage Connections
            </button>
          </SettingsDarkCard>

          <SettingsDarkCard palette={C} title="About KrishiMitra">
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.35rem" }}>🌱</div>
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>KrishiMitra</div>
              <div style={{ fontSize: "0.78rem", color: C.muted, marginTop: "0.25rem" }}>
                Version 2.1.0
              </div>
            </div>
            <p style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.6, margin: "0 0 1rem" }}>
              Smart tools for Indian farmers — soil, weather, crops, and markets in one place.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: C.accent,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: C.accent,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                Terms of Service
              </button>
            </div>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "0.65rem",
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                background: C.inputBg,
                color: C.text,
                fontWeight: 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Check for Updates
            </button>
          </SettingsDarkCard>
        </div>
      </div>
    </div>
  );
}
