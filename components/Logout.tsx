"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

/** Sign out of Firebase and clear the middleware cookie. */
export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "token=; path=/; max-age=0";
    router.push("/auth/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="btn-ghost"
      style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }}
    >
      Sign out
    </button>
  );
}
