"use client";

import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set auth cookie so middleware can protect routes
      const token = await userCredential.user.getIdToken();
      document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict`;
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("email-already-in-use")) {
          setError("An account with this email already exists.");
        } else if (err.message.includes("invalid-email")) {
          setError("Please enter a valid email address.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--cream)" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12"
        style={{ background: "var(--forest)", width: "420px", flexShrink: 0 }}
      >
        <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "1.5rem" }}>🌱</span>
          <span className="serif" style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--cream)" }}>
            KrishiMitra
          </span>
        </Link>

        <div>
          <h2 className="serif" style={{ fontSize: "2rem", color: "var(--cream)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.4, marginBottom: "2rem" }}>
            Join thousands of farmers growing smarter
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "✓", text: "Free crop recommendations based on your soil & climate" },
              { icon: "✓", text: "Instant plant disease detection from photos" },
              { icon: "✓", text: "Hyperlocal weather forecasts for your farm" },
              { icon: "✓", text: "Season-over-season yield & profit tracking" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--sage-light)", fontWeight: 700, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: "0.9rem", color: "rgba(250,247,242,0.7)", lineHeight: 1.6 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm animate-fade-up">
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "2rem" }}>
            ← Back to home
          </Link>

          <h1 className="serif" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.5rem" }}>
            Create your account
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>
            Free forever. No credit card required.
          </p>

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#b91c1c" }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem", display: "block" }}>
                Email address
              </label>
              <input type="email" required placeholder="you@example.com" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem", display: "block" }}>
                Password
              </label>
              <input type="password" required placeholder="Min. 6 characters" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem", display: "block" }}>
                Confirm password
              </label>
              <input type="password" required placeholder="Repeat password" className="input-field" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem", fontSize: "1rem", padding: "0.875rem" }}>
              {loading ? "Creating account…" : "Create account →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "var(--sage-dark)", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}