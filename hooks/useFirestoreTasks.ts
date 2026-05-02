"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { tasksCollection } from "@/lib/firestore/paths";
import type { TaskDoc } from "@/lib/firestore/types";
import { useAuth } from "@/hooks/useAuth";

export type TaskItem = TaskDoc & { id: string };

export function useFirestoreTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }
    const q = query(tasksCollection(user.uid), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setTasks(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as TaskDoc),
          })),
        );
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsub();
  }, [user]);

  const addTask = useCallback(
    async (label: string) => {
      if (!user || !label.trim()) return;
      await addDoc(tasksCollection(user.uid), {
        label: label.trim(),
        time: "Unscheduled",
        priority: "Low",
        done: false,
        field: "—",
        createdAt: serverTimestamp(),
      });
    },
    [user],
  );

  const toggleTask = useCallback(
    async (id: string, done: boolean) => {
      if (!user) return;
      await updateDoc(doc(db, "users", user.uid, "tasks", id), { done: !done });
    },
    [user],
  );

  return { tasks, loading, addTask, toggleTask };
}
