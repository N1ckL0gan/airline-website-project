export default function Footer() {
  return (
    <footer style={{
      background: "#0a0a0a",
      color: "white",
      borderTop: "1px solid #1a1a1a",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>

        {/* Left — brand */}
        <div>
          <p style={{ fontSize: "15px", fontWeight: 700, color: "white", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
            Dairy Flat Airways
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", margin: 0, letterSpacing: "0.05em" }}>
            © 2026 All rights reserved
          </p>
        </div>

        {/* Center — tagline */}
        <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: 0 }}>
          Precision · Luxury · Regional Aviation
        </p>

        {/* Right — links */}
        <div style={{ display: "flex", gap: "32px" }}>
          {[
            { label: "Search Flights", href: "/flights/search" },
            { label: "My Bookings", href: "/bookings" },
            { label: "Cancel Booking", href: "/bookings/cancel" },
          ].map((link) => (
            <a key={link.href} href={link.href} style={{
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
            }}>
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}