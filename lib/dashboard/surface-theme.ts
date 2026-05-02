"use client";

import { D } from "@/lib/dashboard/dark-theme";
import { useTheme } from "@/components/theme-provider";

/** Light surfaces for “premium” dashboard pages when global theme is light. */
export const lightSurface = {
  bg: "#f0f4f1",
  card: "#ffffff",
  card2: "#f4f7f5",
  border: "#e2ece6",
  text: "#1a2e1c",
  muted: "rgba(26, 46, 28, 0.65)",
  faint: "rgba(26, 46, 28, 0.45)",
  accent: "#2d6a4f",
  accentStrong: "#1e3a2f",
  accentDim: "rgba(45, 106, 79, 0.12)",
  up: "#2d6a4f",
  down: "#c17b5a",
  warn: "#ca8a04",
  blue: "#2563eb",
  purple: "#7c3aed",
  orange: "#ea580c",
  red: "#dc2626",
  yellow: "#ca8a04",
} as const;

/** Dashboard “premium” pages share the same token keys for light and dark. */
export type SurfaceColors = { [K in keyof typeof D]: string };

export function useDashboardSurface(): SurfaceColors {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme === "dark") {
    return D as SurfaceColors;
  }
  return lightSurface;
}
