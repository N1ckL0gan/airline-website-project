"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLink = (href: string, label: string) => (
    <Link href={href} style={{
      textDecoration: "none",
      color: pathname === href ? "black" : "#6b7280",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      borderBottom: pathname === href ? "2px solid black" : "2px solid transparent",
      paddingBottom: "2px",
      transition: "color 0.2s",
    }}>
      {label}
    </Link>
  );

  return (
    <>
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
          <img src="/images/hero.jpg" alt="Dairy Flat Airways" style={{ height: "32px", width: "auto" }} />
        </Link>

        {/* NAV */}
        <nav style={{ display: "flex", gap: "48px" }}>
          {navLink("/", "Home")}
          {navLink("/bookings", "Manage Bookings")}
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

      {/* SPACER */}
      <div style={{ height: "70px" }} />
    </>
  );
}