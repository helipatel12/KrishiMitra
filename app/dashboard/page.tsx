"use client";

import { useAuth } from "@/hooks/useAuth";
import { DashboardOverview } from "@/components/dashboard/views/overview";

export default function DashboardHomePage() {
  const { user } = useAuth();
  const name =
    user?.displayName || user?.email?.split("@")[0] || "Farmer";
  return <DashboardOverview name={name} />;
}
