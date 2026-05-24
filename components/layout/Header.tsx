import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
      height: "70px",
      background: "white",
      borderBottom: "1px solid #e5e7eb",
    }}>

      {/* LOGO */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="/images/logo.png" alt="Dairy Flat Airways" style={{ height: "32px", width: "auto" }} />
        <span style={{ fontWeight: 700, fontSize: "16px", color: "black", letterSpacing: "-0.02em" }}>
          Dairy Flat Airways
        </span>
      </Link>

      {/* NAV */}
      <nav style={{ display: "flex", gap: "48px" }}>
        <Link href="/" style={{
          textDecoration: "none",
          color: "black",
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          borderBottom: "2px solid black",
          paddingBottom: "2px",
        }}>
          Home
        </Link>
        <Link href="/bookings" style={{
          textDecoration: "none",
          color: "#6b7280",
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}>
          Manage Bookings
        </Link>
      </nav>

      {/* CTA */}
      <Link href="/flights/search" style={{
        background: "black",
        color: "white",
        padding: "12px 28px",
        borderRadius: "999px",
        fontSize: "14px",
        fontWeight: 600,
        textDecoration: "none",
        letterSpacing: "0.02em",
      }}>
        Book Now
      </Link>

    </header>
  );
}