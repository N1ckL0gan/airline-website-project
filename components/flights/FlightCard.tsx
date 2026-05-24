import Link from "next/link";

export default function FlightCard({ flight }: any) {
  const seatsLeft = flight.capacity - (flight.bookedSeats ?? 0);
  const departure = new Date(flight.departureTime);
  const arrival = new Date(flight.arrivalTime);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-NZ", { hour: "2-digit", minute: "2-digit", hour12: true });

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-NZ", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const durationMins = Math.round((arrival.getTime() - departure.getTime()) / 60000);
  const durationStr = `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;

  return (
    <div style={{
      background: "white",
      borderRadius: "4px",
      padding: "40px 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "40px",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
    }}>

      {/* Flight number + aircraft */}
      <div style={{ minWidth: "140px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>
          {flight.flightNumber}
        </p>
        <p style={{ fontSize: "13px", color: "#555", margin: 0 }}>{flight.aircraft}</p>
      </div>

      {/* Route + times */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "10px" }}>
          {formatDate(departure)}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div>
            <p style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>
              {formatTime(departure)}
            </p>
            <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>{flight.departureAirport}</p>
          </div>

          <div style={{ textAlign: "center", flex: 1 }}>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "4px", letterSpacing: "0.1em" }}>{durationStr}</p>
            <div style={{ height: "1px", background: "#d4d0c8", position: "relative" }}>
              <span style={{ position: "absolute", right: 0, top: "-5px", color: "#aaa", fontSize: "10px" }}>▶</span>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>
              {formatTime(arrival)}
            </p>
            <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>{flight.arrivalAirport}</p>
          </div>
        </div>
      </div>

      {/* Seats */}
      <div style={{ textAlign: "center", minWidth: "80px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>Seats</p>
        <p style={{ fontSize: "28px", fontWeight: 900, margin: 0, color: seatsLeft <= 1 ? "#dc2626" : "#0a0a0a" }}>
          {seatsLeft}
        </p>
        <p style={{ fontSize: "11px", color: "#aaa", margin: "2px 0 0" }}>remaining</p>
      </div>

      {/* Price + Book */}
      <div style={{ textAlign: "right", minWidth: "140px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "4px" }}>Per person</p>
        <p style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.02em", margin: "0 0 16px", lineHeight: 1 }}>
          ${flight.price}
        </p>
        <Link
          href={`/flights/${flight._id}`}
          style={{
            display: "inline-block",
            background: "#0a0a0a",
            color: "white",
            padding: "14px 28px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Book Flight
        </Link>
      </div>

    </div>
  );
}