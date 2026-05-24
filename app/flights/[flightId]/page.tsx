import BookingForm from "@/components/bookings/BookingForm";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ flightId: string }>;
}) {
  const { flightId } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/flights/${flightId}`, {
    cache: "no-store",
  });

  const flight = await response.json();

  if (!flight || flight.error) {
    return (
      <main style={{ background: "#f8f7f4", minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>Error</p>
          <h1 style={{ fontSize: "48px", fontWeight: 900, marginBottom: "16px" }}>Flight Not Found</h1>
          <a href="/flights/search" style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #0a0a0a", paddingBottom: "2px" }}>
            Back to Search
          </a>
        </div>
      </main>
    );
  }

  const departure = new Date(flight.departureTime);
  const arrival = new Date(flight.arrivalTime);
  const seatsLeft = flight.capacity - (flight.bookedSeats ?? 0);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-NZ", { hour: "2-digit", minute: "2-digit", hour12: true });

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-NZ", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const durationMins = Math.round((arrival.getTime() - departure.getTime()) / 60000);
  const durationStr = `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;

  return (
    <main style={{ background: "#f8f7f4", minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 40px" }}>

        {/* Header */}
        <a href="/flights/search" style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", textDecoration: "none", display: "inline-block", marginBottom: "48px" }}>
          ← Back to Search
        </a>
        <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>
          {flight.flightNumber} · {flight.aircraft}
        </p>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 60px", lineHeight: 1 }}>
          BOOK FLIGHT
        </h1>

        {/* Flight summary card */}
        <div style={{ background: "white", borderRadius: "4px", padding: "48px", marginBottom: "4px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "24px" }}>
            {formatDate(departure)}
          </p>

          {/* Route */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "40px" }}>
            <div>
              <p style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>{formatTime(departure)}</p>
              <p style={{ fontSize: "16px", color: "#888", margin: "6px 0 0" }}>{flight.departureAirport}</p>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "6px", letterSpacing: "0.1em" }}>{durationStr}</p>
              <div style={{ height: "1px", background: "#d4d0c8", position: "relative" }}>
                <span style={{ position: "absolute", right: 0, top: "-5px", color: "#aaa", fontSize: "10px" }}>▶</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>{formatTime(arrival)}</p>
              <p style={{ fontSize: "16px", color: "#888", margin: "6px 0 0" }}>{flight.arrivalAirport}</p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "2px" }}>
            {[
              { label: "Price per person", value: `$${flight.price}` },
              { label: "Seats remaining", value: seatsLeft, danger: seatsLeft <= 1 },
              { label: "Aircraft", value: flight.aircraft },
            ].map((stat) => (
              <div key={stat.label} style={{ flex: 1, background: "#f8f7f4", padding: "20px 24px", borderRadius: "2px" }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>{stat.label}</p>
                <p style={{ fontSize: "22px", fontWeight: 900, margin: 0, color: stat.danger ? "#dc2626" : "#0a0a0a" }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking form */}
        <div style={{ background: "white", borderRadius: "4px", padding: "48px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "24px" }}>Passenger Details</p>
          <BookingForm flight={flight} />
        </div>

      </div>
    </main>
  );
}