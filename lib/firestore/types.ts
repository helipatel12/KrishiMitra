import type { Timestamp } from "firebase/firestore";

export type ThemePreference = "light" | "dark" | "system";

export type UserPreferences = {
  theme: ThemePreference;
  language: string;
  tempUnit: "C" | "F";
  rainUnit: "mm" | "inch";
  areaUnit: "Acre" | "Hectare";
  notif: {
    weather: boolean;
    irrigation: boolean;
    pest: boolean;
    market: boolean;
    weekly: boolean;
  };
  autoSync: boolean;
};

export type UserFarmDefaults = {
  defaultCrop: string;
  defaultFarm: string;
  season: string;
  soilType: string;
};

export type UserProfileDoc = {
  displayName?: string;
  phone?: string;
  location?: string;
  preferences?: Partial<UserPreferences>;
  farmDefaults?: Partial<UserFarmDefaults>;
  updatedAt?: Timestamp;
};

export type TaskDoc = {
  label: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  done: boolean;
  field: string;
  createdAt?: Timestamp;
};

export const defaultPreferences: UserPreferences = {
  theme: "system",
  language: "en",
  tempUnit: "C",
  rainUnit: "mm",
  areaUnit: "Acre",
  notif: {
    weather: true,
    irrigation: true,
    pest: true,
    market: false,
    weekly: true,
  },
  autoSync: true,
};

export const defaultFarmDefaults: UserFarmDefaults = {
  defaultCrop: "Wheat",
  defaultFarm: "Green Valley Farm",
  season: "Kharif 2026",
  soilType: "Clay Loam",
};
