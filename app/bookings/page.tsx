"use client";

import { useState } from "react";

export default function BookingsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!email) return;
    setLoading(true);
    const response = await fetch(`/api/bookings/customer?email=${email}`);
    const data = await response.json();
    setBookings(Array.isArray(data) ? data : []);
    setSearched(true);
    setLoading(false);
  };

  const handleCancel = async (bookingReference: string) => {
    if (!confirm(`Are you sure you want to cancel booking ${bookingReference}?`)) return;
    setCancellingId(bookingReference);
    try {
      const response = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingReference }),
      });
      const data = await response.json();
      if (response.ok) {
        // Update the booking status in state without re-fetching
        setBookings((prev) =>
          prev.map((b) =>
            b.bookingReference === bookingReference
              ? { ...b, status: "CANCELLED" }
              : b
          )
        );
      } else {
        alert(data.error || "Failed to cancel booking.");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <main style={{ background: "#f8f7f4", minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 40px" }}>

        {/* Header */}
        <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>Dairy Flat Airways</p>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 16px", lineHeight: 1 }}>MY BOOKINGS</h1>
        <p style={{ color: "#666", fontSize: "16px", marginBottom: "60px" }}>Enter your email address to retrieve your bookings.</p>

        {/* Search Bar */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "60px" }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{ flex: 1, padding: "16px 24px", border: "1px solid #d4d0c8", borderRadius: "4px", fontSize: "16px", background: "white", outline: "none", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          />
          <button
            onClick={handleSearch}
            style={{ background: "#0a0a0a", color: "white", padding: "16px 36px", borderRadius: "4px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Empty state */}
        {searched && bookings.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 40px", border: "1px solid #e5e2d9", borderRadius: "4px", background: "white" }}>
            <p style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>No bookings found</p>
            <p style={{ color: "#888", fontSize: "15px" }}>No bookings are associated with this email address.</p>
          </div>
        )}

        {/* Bookings list */}
        {bookings.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #d4d0c8", paddingBottom: "16px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {bookings.length} Booking{bookings.length > 1 ? "s" : ""} Found
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {bookings.map((booking) => {
                const isCancelled = booking.status === "CANCELLED";
                const isCancelling = cancellingId === booking.bookingReference;

                return (
                  <div key={booking._id} style={{ background: "white", padding: "40px", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    
                    {/* Left — flight info */}
                    <div>
                      <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "8px" }}>
                        {booking.flightId?.flightNumber}
                      </p>
                      <h2 style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1 }}>
                        {booking.flightId?.departureAirport} → {booking.flightId?.arrivalAirport}
                      </h2>
                      <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
                        {new Date(booking.flightId?.departureTime).toLocaleString("en-NZ", { dateStyle: "full", timeStyle: "short" })}
                      </p>
                    </div>

                    {/* Right — ref, status, cancel */}
                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                      <div>
                        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "4px" }}>Ref</p>
                        <p style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "0.05em", margin: 0 }}>{booking.bookingReference}</p>
                      </div>

                      <span style={{
                        padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                        background: isCancelled ? "#fee2e2" : "#dcfce7",
                        color: isCancelled ? "#dc2626" : "#16a34a",
                      }}>
                        {booking.status}
                      </span>




                        {!isCancelled && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                          
                            <a href={`/bookings/confirmation?bookingReference=${booking.bookingReference}`}
                            style={{
                              border: "1px solid #d4d0c8",
                              color: "#0a0a0a",
                              padding: "8px 20px",
                              borderRadius: "4px",
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase" as const,
                              fontFamily: "ui-sans-serif, system-ui, sans-serif",
                              textDecoration: "none",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#0a0a0a";
                              e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "none";
                              e.currentTarget.style.color = "#0a0a0a";
                            }}
                          >
                            View Booking
                          </a>

                          
                           <a href={`/bookings/cancel?reference=${booking.bookingReference}`}
                            style={{
                              border: "1px solid #dc2626",
                              color: "#dc2626",
                              padding: "8px 20px",
                              borderRadius: "4px",
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase" as const,
                              fontFamily: "ui-sans-serif, system-ui, sans-serif",
                              textDecoration: "none",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#dc2626";
                              e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "none";
                              e.currentTarget.style.color = "#dc2626";
                            }}
                          >
                            Cancel Booking
                          </a>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}