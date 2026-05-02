"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onSnapshot } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { userDoc } from "@/lib/firestore/paths";
import type { ThemePreference } from "@/lib/firestore/types";

type ThemeContextValue = {
  /** User-selected preference (light / dark / system). */
  preference: ThemePreference;
  /** Resolved light or dark for styling. */
  resolvedTheme: "light" | "dark";
  setTheme: (p: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "krishi-theme";

function resolvePreference(pref: ThemePreference): "light" | "dark" {
  if (pref === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return pref;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setPreferenceState(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const resolved = resolvePreference(preference);
    setResolvedTheme(resolved);
    document.documentElement.dataset.theme = resolved;
  }, [preference, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (preference === "system") {
        const r = mq.matches ? "dark" : "light";
        setResolvedTheme(r);
        document.documentElement.dataset.theme = r;
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference, mounted]);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(userDoc(user.uid), (snap) => {
      const t = snap.data()?.preferences?.theme;
      if (t === "light" || t === "dark" || t === "system") {
        setPreferenceState(t);
        localStorage.setItem(STORAGE_KEY, t);
      }
    });
    return () => unsub();
  }, [user]);

  const setTheme = useCallback((p: ThemePreference) => {
    setPreferenceState(p);
    localStorage.setItem(STORAGE_KEY, p);
    const r = resolvePreference(p);
    setResolvedTheme(r);
    document.documentElement.dataset.theme = r;
  }, []);

  const value = useMemo(
    () => ({ preference, resolvedTheme, setTheme }),
    [preference, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
