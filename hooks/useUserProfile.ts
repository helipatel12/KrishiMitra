"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { userDoc } from "@/lib/firestore/paths";
import type { UserProfileDoc } from "@/lib/firestore/types";
import {
  defaultFarmDefaults,
  defaultPreferences,
  type UserFarmDefaults,
  type UserPreferences,
} from "@/lib/firestore/types";
import { useAuth } from "@/hooks/useAuth";

export type MergedUserProfile = {
  displayName: string;
  phone: string;
  location: string;
  preferences: UserPreferences;
  farmDefaults: UserFarmDefaults;
};

function mergeProfile(user: User | null, raw?: UserProfileDoc): MergedUserProfile | null {
  if (!user) return null;
  return {
    displayName: raw?.displayName ?? user.displayName ?? "",
    phone: raw?.phone ?? user.phoneNumber ?? "",
    location: raw?.location ?? "indore",
    preferences: { ...defaultPreferences, ...raw?.preferences },
    farmDefaults: { ...defaultFarmDefaults, ...raw?.farmDefaults },
  };
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<MergedUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    const ref = userDoc(user.uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setProfile(mergeProfile(user, snap.data() as UserProfileDoc | undefined));
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsub();
  }, [user]);

  const updateProfile = useCallback(
    async (patch: Partial<UserProfileDoc>) => {
      if (!user) return;
      await setDoc(
        userDoc(user.uid),
        { ...patch, updatedAt: serverTimestamp() },
        { merge: true },
      );
    },
    [user],
  );

  return { profile, loading, updateProfile };
}
