import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ background: "#f8f7f4", color: "#0a0a0a", fontFamily: "ui-sans-serif, system-ui, sans-serif", overflowX: "hidden" }}>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "flex-end" }}>
        <img src="/images/hero.jpg" alt="Luxury Jet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 80px 80px", maxWidth: "900px" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "20px" }}>Dairy Flat Airways</p>
          <h1 style={{ fontSize: "clamp(60px, 10vw, 130px)", fontWeight: 900, color: "white", lineHeight: 0.9, margin: "0 0 32px", letterSpacing: "-0.03em" }}>LUXURY<br />IN FLIGHT.</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "18px", maxWidth: "480px", lineHeight: 1.6, marginBottom: "48px" }}>Defining regional aviation through precision engineering, luxury cabins, and elite point-to-point travel.</p>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/flights/search" style={{ background: "white", color: "black", padding: "16px 36px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase" }}>Book Now</Link>
            <Link href="/bookings" style={{ border: "1px solid rgba(255,255,255,0.4)", color: "white", padding: "16px 36px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase" }}>Manage</Link>
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section style={{ padding: "120px 80px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "80px", borderBottom: "1px solid #d4d0c8", paddingBottom: "32px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>Our Fleet</p>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 900, margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>THE AIRCRAFT</h2>
          </div>
          <p style={{ color: "#888", fontSize: "14px", maxWidth: "280px", textAlign: "right", lineHeight: 1.6 }}>Three meticulously selected aircraft, each serving a distinct role in our network.</p>
        </div>

        {/* SYBERJET */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "80px", marginBottom: "80px", paddingBottom: "80px", borderBottom: "1px solid #e5e2d9" }}>
          <div style={{ width: "55%", minWidth: "55%", height: "420px", borderRadius: "4px", overflow: "hidden" }}>
            <img src="/images/syberjet.jpg" alt="SyberJet SJ30i" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", maxWidth: "none" }} />
          </div>
          <div style={{ width: "45%" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>01 — Flagship Aircraft</p>
            <h3 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, margin: "0 0 24px", lineHeight: 1, letterSpacing: "-0.02em" }}>SYBERJET<br />SJ30i</h3>
            <p style={{ color: "#555", fontSize: "16px", lineHeight: 1.7 }}>Ultra-premium long-range executive aircraft operating the Sydney route. Built for those who demand the exceptional.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "32px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>Routes</p>
              <Link href="/flights/search?from=NZNE&to=YSSY" style={{ fontSize: "14px", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #d4d0c8", paddingBottom: "2px", width: "fit-content" }}>Dairy Flat → Sydney</Link>
              <Link href="/flights/search?from=YSSY&to=NZNE" style={{ fontSize: "14px", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #d4d0c8", paddingBottom: "2px", width: "fit-content" }}>Sydney → Dairy Flat</Link>
              <p style={{ fontSize: "12px", color: "#aaa", margin: "4px 0 0" }}>Weekly · Fridays outbound, Sundays return · 6 seats</p>
            </div>
            <Link href="/flights/search" style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #0a0a0a", paddingBottom: "2px" }}>Book This Aircraft →</Link>
          </div>
        </div>

        {/* CIRRUS */}
        <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "80px", marginBottom: "80px", paddingBottom: "80px", borderBottom: "1px solid #e5e2d9" }}>
          <div style={{ width: "55%", minWidth: "55%", height: "420px", borderRadius: "4px", overflow: "hidden" }}>
            <img src="/images/cirrus.jpg" alt="Cirrus SF50" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", maxWidth: "none" }} />
          </div>
          <div style={{ width: "45%" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>02 — Regional Fleet</p>
            <h3 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, margin: "0 0 24px", lineHeight: 1, letterSpacing: "-0.02em" }}>CIRRUS<br />SF50</h3>
            <p style={{ color: "#555", fontSize: "16px", lineHeight: 1.7 }}>Efficient regional jet connecting coastal routes. Precision handling meets understated luxury.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "32px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>Routes</p>
              <Link href="/flights/search?from=NZNE&to=NZRO" style={{ fontSize: "14px", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #d4d0c8", paddingBottom: "2px", width: "fit-content" }}>Dairy Flat → Rotorua</Link>
              <Link href="/flights/search?from=NZNE&to=NZGB" style={{ fontSize: "14px", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #d4d0c8", paddingBottom: "2px", width: "fit-content" }}>Dairy Flat → Great Barrier Island</Link>
              <p style={{ fontSize: "12px", color: "#aaa", margin: "4px 0 0" }}>Mon–Fri twice daily (Rotorua) · Mon, Wed, Fri (Great Barrier) · 4 seats</p>
            </div>
            <Link href="/flights/search" style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #0a0a0a", paddingBottom: "2px" }}>Book This Aircraft →</Link>
          </div>
        </div>

        {/* HONDAJET */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "80px" }}>
          <div style={{ width: "55%", minWidth: "55%", height: "420px", borderRadius: "4px", overflow: "hidden" }}>
            <img src="/images/hondajet.jpg" alt="HondaJet Elite" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", maxWidth: "none" }} />
          </div>
          <div style={{ width: "45%" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>03 — Executive Range</p>
            <h3 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, margin: "0 0 24px", lineHeight: 1, letterSpacing: "-0.02em" }}>HONDAJET<br />ELITE</h3>
            <p style={{ color: "#555", fontSize: "16px", lineHeight: 1.7 }}>Advanced executive aircraft serving premium island routes. Where engineering artistry meets island paradise.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "32px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>Routes</p>
              <Link href="/flights/search?from=NZNE&to=NZCI" style={{ fontSize: "14px", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #d4d0c8", paddingBottom: "2px", width: "fit-content" }}>Dairy Flat → Chatham Islands</Link>
              <Link href="/flights/search?from=NZNE&to=NZTL" style={{ fontSize: "14px", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #d4d0c8", paddingBottom: "2px", width: "fit-content" }}>Dairy Flat → Lake Tekapo</Link>
              <p style={{ fontSize: "12px", color: "#aaa", margin: "4px 0 0" }}>Tue & Fri (Chatham) · Mondays (Tekapo) · 5 seats</p>
            </div>
            <Link href="/flights/search" style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #0a0a0a", paddingBottom: "2px" }}>Book This Aircraft →</Link>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section style={{ background: "#0a0a0a", color: "white", padding: "120px 80px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>Where We Fly</p>
        <h2 style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 900, margin: "0 0 80px", letterSpacing: "-0.03em" }}>KEY DESTINATIONS</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {[
            { num: "01", name: "Dairy Flat", code: "NZNE", coords: "36.6333° S, 174.6500° E" },
            { num: "02", name: "Sydney", code: "YSSY", coords: "33.8688° S, 151.2093° E" },
            { num: "03", name: "Rotorua", code: "NZRO", coords: "37.5511° S, 176.0000° E" },
            { num: "04", name: "Great Barrier Island", code: "NZGB", coords: "36.2333° S, 175.4667° E" },
            { num: "05", name: "Chatham Islands", code: "NZCI", coords: "43.8100° S, 176.4500° W" },
            { num: "06", name: "Lake Tekapo", code: "NZTL", coords: "44.0050° S, 170.4440° E" },
          ].map((dest) => (
            <div key={dest.num} style={{ background: "#111", padding: "48px 40px", borderRadius: "2px" }}>
              <p style={{ fontSize: "64px", fontWeight: 900, color: "rgba(255,255,255,0.06)", margin: "0 0 24px", lineHeight: 1 }}>{dest.num}</p>
              <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 4px" }}>{dest.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", margin: "0 0 4px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{dest.code}</p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", margin: "0 0 32px" }}>{dest.coords}</p>
              <Link href="/flights/search" style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "2px" }}>
                Discover →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "40px 80px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>© 2024 Dairy Flat Airways</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", letterSpacing: "0.1em" }}>Premium · Luxury · Regional Aviation</p>
      </footer>

    </main>
  );
}