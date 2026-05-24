"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CancelForm() {
  const searchParams = useSearchParams();
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ref = searchParams.get("reference");
    if (ref) setReference(ref);
  }, [searchParams]);

  const handleCancel = async () => {
    if (!reference.trim()) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingReference: reference.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Your booking has been successfully cancelled.");
      } else {
        setStatus("error");
        setMessage(data.error || "Booking not found. Please check your reference.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 40px" }}>
      <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>Dairy Flat Airways</p>
      <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 16px", lineHeight: 1 }}>CANCEL<br />BOOKING</h1>
      <p style={{ color: "#666", fontSize: "16px", marginBottom: "60px", lineHeight: 1.6 }}>
        Enter your booking reference to cancel your reservation. This action cannot be undone.
      </p>

      {status !== "success" && (
        <div style={{ background: "white", padding: "48px", borderRadius: "4px", marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>
            Booking Reference
          </label>
          <input
            type="text"
            placeholder="e.g. DFA-123456"
            value={reference}
            onChange={(e) => setReference(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleCancel()}
            style={{ width: "100%", padding: "16px 20px", border: "1px solid #d4d0c8", borderRadius: "4px", fontSize: "18px", fontWeight: 700, letterSpacing: "0.1em", background: "#f8f7f4", outline: "none", fontFamily: "ui-sans-serif, system-ui, sans-serif", boxSizing: "border-box" }}
          />

          {status === "error" && (
            <div style={{ marginTop: "16px", padding: "16px 20px", background: "#fee2e2", borderRadius: "4px", color: "#dc2626", fontSize: "14px" }}>
              {message}
            </div>
          )}

          <button
            onClick={handleCancel}
            disabled={status === "loading"}
            style={{ marginTop: "24px", width: "100%", background: status === "loading" ? "#555" : "#dc2626", color: "white", padding: "18px", borderRadius: "4px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {status === "loading" ? "Cancelling..." : "Cancel Booking"}
          </button>
        </div>
      )}

      {status === "success" && (
        <div style={{ background: "white", padding: "48px", borderRadius: "4px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "28px" }}>✓</div>
          <h2 style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "12px" }}>Booking Cancelled</h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px" }}>{message}</p>
          <a href="/" style={{ display: "inline-block", background: "#0a0a0a", color: "white", padding: "16px 36px", borderRadius: "4px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
            Return Home
          </a>
        </div>
      )}

      <p style={{ color: "#aaa", fontSize: "13px", textAlign: "center", marginTop: "24px" }}>
        Need help? Your booking reference can be found in your confirmation email.
      </p>
    </div>
  );
}

export default function CancelPage() {
  return (
    <main style={{ background: "#f8f7f4", minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <Suspense fallback={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <p style={{ color: "#888", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Loading...</p>
        </div>
      }>
        <CancelForm />
      </Suspense>
    </main>
  );
}