/** Shared dashboard color tokens (inline-style UI). */
export const dashboardPalette = {
  dark: "#1a3c2e",
  mid: "#2d6a4f",
  teal: "#52b788",
  light: "#d8f3dc",
  white: "#ffffff",
  bg: "#f4f7f5",
  border: "#e2ece6",
  muted: "#6b8f71",
  ink: "#1a2e1c",
  orange: "#f4a261",
  red: "#e76f51",
  yellow: "#f9c74f",
  blue: "#4895ef",
} as const;

export type DashboardPalette = typeof dashboardPalette;
