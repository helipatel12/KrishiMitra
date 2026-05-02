export type DashboardNavItem = {
  href: string;
  label: string;
  icon: string;
  /** Use exact path match (for `/dashboard` home). */
  exact?: boolean;
  /** Small pill e.g. "NEW" or "3". */
  badge?: string;
  badgeTone?: "new" | "alert";
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠", exact: true },
  { href: "/dashboard/weather", label: "Weather", icon: "🌦️" },
  { href: "/dashboard/crop-health", label: "Crop Health", icon: "🌿" },
  { href: "/dashboard/soil-health", label: "Soil Health", icon: "🪨" },
  { href: "/dashboard/market-prices", label: "Market Prices", icon: "📈" },
  { href: "/dashboard/field-management", label: "Field Management", icon: "🗺️" },
  { href: "/dashboard/irrigation", label: "Irrigation", icon: "💧" },
  { href: "/dashboard/ai-advisor", label: "AI Advisor", icon: "🤖", badge: "NEW", badgeTone: "new" },
  { href: "/dashboard/tasks", label: "Tasks", icon: "✅" },
  { href: "/dashboard/reports", label: "Reports", icon: "📋" },
  { href: "/dashboard/alerts", label: "Alerts", icon: "🔔", badge: "3", badgeTone: "alert" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export function navItemIsActive(pathname: string, item: DashboardNavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
