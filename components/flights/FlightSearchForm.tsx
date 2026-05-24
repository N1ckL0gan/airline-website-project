"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { airports } from "@/data/airports";
import { schedules } from "@/lib/schedules";
import { routes } from "@/data/routes";

export default function FlightSearchForm() {
  const searchParams = useSearchParams();

  const [from, setFrom] = useState(searchParams.get("from") ?? "");
  const [to, setTo] = useState(searchParams.get("to") ?? "");
  const [date, setDate] = useState("");

  // Get valid days of week for selected route
  const validDays = useMemo(() => {
    if (!from || !to) return null;
    const matchingFlightNumbers = routes
      .filter((r) => r.departureAirport === from && r.arrivalAirport === to)
      .map((r) => r.flightNumber);
    const days = new Set(
      schedules
        .filter((s) => matchingFlightNumbers.includes(s.flightNumber))
        .flatMap((s) => s.departureDays)
    );
    return days;
  }, [from, to]);

  // Get next 90 days, mark which are valid
const availableDates = useMemo(() => {
  if (!validDays) return [];
  const dates = [];
  
  const today = new Date();
  const localToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  for (let i = 1; i < 181; i++) {
    const d = new Date(localToday);
    d.setDate(localToday.getDate() + i);
    
    if (validDays.has(d.getDay())) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      dates.push(`${yyyy}-${mm}-${dd}`);
    }
  }
  return dates;
}, [validDays]);

  const handleSearch = () => {
    if (from === to) {
      alert("Departure and destination cannot be the same.");
      return;
    }
    if (!from || !to || !date) {
      alert("Please complete all fields.");
      return;
    }
    window.location.href = `/flights/search?from=${from}&to=${to}&date=${date}`;
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

  const selectStyle = {
    width: "100%",
    padding: "16px 20px",
    border: "1px solid #d4d0c8",
    borderRadius: "4px",
    fontSize: "15px",
    background: "#f8f7f4",
    outline: "none",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    color: "#0a0a0a",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 20px center",
    cursor: "pointer",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>

        {/* From */}
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>From</label>
          <select value={from} onChange={(e) => { setFrom(e.target.value); setDate(""); }} style={selectStyle}>
            <option value="">Select departure</option>
            {airports.map((a) => (
              <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
            ))}
          </select>
        </div>

        <div style={{ paddingBottom: "16px", color: "#aaa", fontSize: "20px", flexShrink: 0 }}>→</div>

        {/* To */}
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>To</label>
          <select value={to} onChange={(e) => { setTo(e.target.value); setDate(""); }} style={selectStyle}>
            <option value="">Select destination</option>
            {airports.map((a) => (
              <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div style={{ flex: "0 0 220px" }}>
          <label style={labelStyle}>Date</label>
          {!from || !to ? (
            // No route selected yet — show disabled input
            <input
              type="text"
              disabled
              placeholder="Select airports first"
              style={{ ...selectStyle, backgroundImage: "none", color: "#aaa", cursor: "not-allowed", boxSizing: "border-box" as const }}
            />
          ) : availableDates.length === 0 ? (
            <input
              type="text"
              disabled
              placeholder="No flights on this route"
              style={{ ...selectStyle, backgroundImage: "none", color: "#aaa", cursor: "not-allowed", boxSizing: "border-box" as const }}
            />
          ) : (
            // Route selected — show dropdown of valid dates only
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={selectStyle}
            >
              <option value="">Select a date</option>
              {availableDates.map((d) => {
                const dateObj = new Date(d + "T00:00:00");
                const label = dateObj.toLocaleDateString("en-NZ", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                return (
                  <option key={d} value={d}>{label}</option>
                );
              })}
            </select>
          )}
        </div>

        {/* Search */}
        <button
          onClick={handleSearch}
          style={{
            background: "#0a0a0a",
            color: "white",
            padding: "16px 36px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            marginBottom: "1px",
          }}
        >
          Search Flights
        </button>

      </div>

      {/* Route hint */}
      {from && to && validDays && validDays.size > 0 && (
        <p style={{ marginTop: "12px", fontSize: "12px", color: "#888", letterSpacing: "0.05em" }}>
          ✦ This route operates on{" "}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            .filter((_, i) => validDays.has(i))
            .join(", ")}
        </p>
      )}
    </div>
  );
}