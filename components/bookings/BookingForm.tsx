"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm({ flight }: any) {
  const router = useRouter();
  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async () => {
    if (!passengerName.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flightId: flight._id,
          passengerName,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Booking failed. Please try again.");
        setLoading(false);
        return;
      }

      router.push(`/bookings/confirmation?bookingReference=${data.bookingReference}`);

    } catch (err) {
      setError("An error occurred while processing your booking.");
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 20px",
    border: "1px solid #d4d0c8",
    borderRadius: "4px",
    fontSize: "15px",
    background: "#f8f7f4",
    outline: "none",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    color: "#0a0a0a",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    color: "#888",
    marginBottom: "8px",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      <div>
        <label style={labelStyle}>Passenger Name</label>
        <input
          type="text"
          placeholder="Full name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Email Address</label>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </div>

      {error && (
        <div style={{ padding: "16px 20px", background: "#fee2e2", borderRadius: "4px", color: "#dc2626", fontSize: "14px", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
          {error}
        </div>
      )}

      <button
        onClick={handleBooking}
        disabled={loading}
        style={{
          background: loading ? "#555" : "#0a0a0a",
          color: "white",
          padding: "18px",
          borderRadius: "4px",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          transition: "background 0.2s",
        }}
      >
        {loading ? "Processing..." : `Confirm Booking — $${flight.price}`}
      </button>

      <p style={{ fontSize: "12px", color: "#aaa", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        By confirming you agree to our terms. A confirmation will be sent to your email.
      </p>

    </div>
  );
}