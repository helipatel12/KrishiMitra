"use client";

import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Set auth cookie so middleware can protect routes
      const token = await userCredential.user.getIdToken();
      document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict`;
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--cream)" }}
    >
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12"
        style={{
          background: "var(--forest)",
          width: "420px",
          flexShrink: 0,
        }}
      >
        <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "1.5rem" }}>🌱</span>
          <span className="serif" style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--cream)" }}>
            KrishiMitra
          </span>
        </Link>

        <div>
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🌾</div>
            <p className="serif" style={{ fontSize: "1.2rem", color: "var(--cream)", lineHeight: 1.6, fontWeight: 300, fontStyle: "italic" }}>
              KrishiMitra helped me choose the right crop this season. My yield went up by 30%.
            </p>
            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "var(--sage)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                }}
              >
                👨‍🌾
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)" }}>Ramesh Patel</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(250,247,242,0.55)" }}>Farmer, Gujarat</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { num: "12K+", label: "Farmers" },
              { num: "94%", label: "Accuracy" },
              { num: "28+", label: "Crops" },
            ].map((s) => (
              <div key={s.label}>
                <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--cream)" }}>{s.num}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(250,247,242,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm animate-fade-up">
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "2rem" }}>
            ← Back to home
          </Link>

          <h1 className="serif" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.5rem" }}>
            Welcome back
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>
            Sign in to your KrishiMitra account
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {error && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                  fontSize: "0.85rem",
                  color: "#b91c1c",
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem", display: "block" }}>
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem", display: "block" }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem", fontSize: "1rem", padding: "0.875rem" }}>
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Do not have an account?{" "}
            <Link href="/auth/signup" style={{ color: "var(--sage-dark)", fontWeight: 600, textDecoration: "none" }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}