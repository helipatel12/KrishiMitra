import { doc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function userDoc(uid: string) {
  return doc(db, "users", uid);
}

export function tasksCollection(uid: string) {
  return collection(db, "users", uid, "tasks");
}
