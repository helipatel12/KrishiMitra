import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "1.5rem" }}>🌱</span>
          <span className="serif" style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--forest)" }}>
            KrishiMitra
          </span>
        </div>
        <div className="flex gap-3">
          <Link href="/auth/login">
            <button className="btn-ghost" style={{ padding: "0.5rem 1.25rem", fontSize: "0.9rem" }}>
              Sign In
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.9rem" }}>
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-24 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 animate-fade-up">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(122,158,126,0.12)",
              border: "1px solid rgba(122,158,126,0.3)",
              borderRadius: "100px",
              padding: "0.35rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--sage-dark)",
              marginBottom: "1.5rem",
            }}
          >
            <span>✦</span> AI-Powered Farming Intelligence
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--forest)",
              marginBottom: "1.5rem",
            }}
          >
            Grow smarter,
            <br />
            <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>not harder.</em>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "var(--text-muted)",
              maxWidth: "480px",
              marginBottom: "2.5rem",
            }}
          >
            KrishiMitra gives every farmer access to intelligent crop recommendations,
            real-time disease detection, and local weather insights — in one simple dashboard.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link href="/auth/signup">
              <button className="btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 2.25rem" }}>
                Start for free →
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="btn-ghost" style={{ fontSize: "1rem" }}>
                Sign in
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex gap-6 mt-10 flex-wrap">
            {[
              { icon: "🌾", label: "Crop AI" },
              { icon: "🔬", label: "Disease Scan" },
              { icon: "🌦️", label: "Live Weather" },
              { icon: "📊", label: "Yield Analytics" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative card cluster */}
        <div className="flex-1 relative hidden lg:flex justify-center animate-delay-2" style={{ minHeight: "420px" }}>
          <div
            className="animate-float"
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              background: "white",
              borderRadius: "20px",
              padding: "1.5rem",
              boxShadow: "0 12px 40px rgba(30,58,47,0.1)",
              width: "220px",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🌾</div>
            <div className="serif" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--forest)", marginBottom: "0.5rem" }}>
              Crop Recommendation
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              Wheat yields 18% higher with current soil pH
            </div>
            <div
              style={{
                marginTop: "1rem",
                background: "rgba(122,158,126,0.1)",
                borderRadius: "8px",
                padding: "0.4rem 0.75rem",
                fontSize: "0.75rem",
                color: "var(--sage-dark)",
                fontWeight: 500,
              }}
            >
              ↑ Confidence: 94%
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: "140px",
              right: "0px",
              background: "var(--forest)",
              borderRadius: "20px",
              padding: "1.5rem",
              boxShadow: "0 12px 40px rgba(30,58,47,0.25)",
              width: "200px",
              color: "var(--cream)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🌦️</div>
            <div className="serif" style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Weather Today
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 300, fontFamily: "Fraunces, serif" }}>28°C</div>
            <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.25rem" }}>Partly cloudy · Good for irrigation</div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "40px",
              background: "var(--sun-light)",
              borderRadius: "20px",
              padding: "1.25rem 1.5rem",
              boxShadow: "0 8px 24px rgba(232,168,56,0.25)",
              width: "260px",
            }}
          >
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--earth)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Yield Analytics
            </div>
            <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--forest)" }}>
              ↑ 23% this season
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section
        style={{
          background: "var(--forest)",
          padding: "5rem 2rem",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center" style={{ marginBottom: "3.5rem" }}>
            <h2
              className="serif"
              style={{ fontSize: "2.5rem", fontWeight: 600, color: "var(--cream)", marginBottom: "1rem" }}
            >
              Everything a farmer needs
            </h2>
            <p style={{ color: "rgba(250,247,242,0.6)", fontSize: "1.05rem", maxWidth: "500px", margin: "0 auto" }}>
              From seed selection to harvest, KrishiMitra has you covered.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🌾", title: "Smart Crop Selection", desc: "AI analysis of soil, climate, and market to recommend the best crops for your land." },
              { icon: "🦠", title: "Disease Detection", desc: "Upload a photo of any affected plant and get instant diagnosis with treatment advice." },
              { icon: "🌦️", title: "Hyperlocal Weather", desc: "Precise forecasts for your exact location, with irrigation and harvest timing recommendations." },
              { icon: "📊", title: "Profit Analytics", desc: "Track yields, costs, and profits season over season with actionable insights." },
            ].map((f, i) => (
              <div
                key={f.title}
                className="card-hover animate-delay-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  padding: "2rem",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{ fontSize: "2.25rem", marginBottom: "1rem" }}>{f.icon}</div>
                <h3 className="serif" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--cream)", marginBottom: "0.75rem" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(250,247,242,0.6)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "var(--cream-dark)",
          padding: "2.5rem 2rem",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "0.85rem",
        }}
      >
        <div className="flex items-center justify-center gap-2" style={{ marginBottom: "0.5rem" }}>
          <span>🌱</span>
          <span className="serif" style={{ fontWeight: 600, color: "var(--forest)", fontSize: "1rem" }}>KrishiMitra</span>
        </div>
        <p>© {new Date().getFullYear()} KrishiMitra. Built for Indian farmers.</p>
      </footer>
    </div>
  );
}