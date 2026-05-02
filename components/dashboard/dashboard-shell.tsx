"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { dashboardPalette as G } from "@/lib/dashboard/palette";
import { useDashboardSurface } from "@/lib/dashboard/surface-theme";
import { dashboardNavItems, navItemIsActive } from "@/components/dashboard/nav-config";

const DARK_MAIN_PREFIXES = [
  "/dashboard/settings",
  "/dashboard/market-prices",
  "/dashboard/weather",
  "/dashboard/alerts",
  "/dashboard/reports",
  "/dashboard/field-management",
  "/dashboard/irrigation",
] as const;

export function DashboardShell({
  children,
  displayName,
}: {
  children: React.ReactNode;
  displayName: string;
}) {
  const surface = useDashboardSurface();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "token=; path=/; max-age=0";
    router.push("/auth/login");
  };

  const isDarkStyleRoute = DARK_MAIN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: isDarkStyleRoute ? surface.bg : G.bg,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          background: G.dark,
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 0.85rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            paddingLeft: "0.6rem",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: G.teal,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
            }}
          >
            🌱
          </div>
          <div>
            <div
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: G.white,
                lineHeight: 1,
              }}
            >
              KrishiMitra
            </div>
            <div
              style={{
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.05em",
              }}
            >
              Smart Farming, Better Tomorrow
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.08)",
            margin: "1rem 0.4rem",
          }}
        />

        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
          }}
        >
          {dashboardNavItems.map((item) => {
            const isActive = navItemIsActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: "0.65rem 0.85rem",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontSize: "0.845rem",
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "'DM Sans', sans-serif",
                  background: isActive ? G.teal : "transparent",
                  color: isActive ? G.white : "rgba(255,255,255,0.55)",
                  transition: "all 0.15s",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    fontSize: "1rem",
                    width: 20,
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
                {item.badge ? (
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      padding: "0.12rem 0.4rem",
                      borderRadius: 6,
                      background:
                        item.badgeTone === "alert"
                          ? "rgba(239,68,68,0.25)"
                          : "rgba(52,211,153,0.25)",
                      color: item.badgeTone === "alert" ? "#FCA5A5" : "#6EE7B7",
                    }}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            background: "rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "1rem",
            margin: "0.75rem 0",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>🌱</div>
          <div
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              color: G.white,
              marginBottom: "0.3rem",
            }}
          >
            Upgrade to Premium
          </div>
          <div
            style={{
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.5,
              marginBottom: "0.75rem",
            }}
          >
            Unlock advanced AI insights, detailed reports & more.
          </div>
          <button
            type="button"
            style={{
              background: G.teal,
              border: "none",
              borderRadius: 100,
              padding: "0.5rem 1.25rem",
              color: G.white,
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Upgrade Now
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.6rem 0.5rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: G.teal,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: G.white,
              fontSize: "0.82rem",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {displayName[0]?.toUpperCase() ?? "F"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: G.white,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayName}
            </div>
            <div
              style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)" }}
            >
              Farmer
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.9rem",
              padding: "0.2rem",
            }}
          >
            ⏻
          </button>
        </div>
      </aside>

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isDarkStyleRoute ? "0 1.75rem 1.75rem" : "1.75rem 1.75rem",
          background: isDarkStyleRoute ? surface.bg : undefined,
        }}
      >
        {children}
      </main>
    </div>
  );
}
