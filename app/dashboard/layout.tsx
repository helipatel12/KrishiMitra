"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--cream)" }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
            className="animate-float"
          >
            🌱
          </div>
          <p
            className="serif"
            style={{ color: "var(--text-muted)", fontSize: "1rem" }}
          >
            Loading your farm…
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const displayName =
    user.displayName || user.email?.split("@")[0] || "Farmer";

  return <DashboardShell displayName={displayName}>{children}</DashboardShell>;
}
