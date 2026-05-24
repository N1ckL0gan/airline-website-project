export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingReference?: string }>;
}) {
  const params = await searchParams;
  const bookingReference = params.bookingReference;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/bookings/reference?bookingReference=${bookingReference}`,
    { cache: "no-store" }
  );

  const text = await response.text();

  let booking;
  try {
    booking = JSON.parse(text);
  } catch (e) {
    return (
      <main style={{ padding: "80px", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        <h1 style={{ marginBottom: "16px" }}>API Response Debug</h1>
        <p style={{ marginBottom: "8px" }}>Status: {response.status}</p>
        <p style={{ marginBottom: "16px" }}>bookingReference: {bookingReference}</p>
        <pre style={{ background: "#f0f0f0", padding: "20px", borderRadius: "4px", whiteSpace: "pre-wrap" }}>
          {text || "(empty response)"}
        </pre>
      </main>
    );
  }

  if (!booking || booking.error) {
    return (
      <main style={{ background: "#f8f7f4", minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>Error</p>
          <h1 style={{ fontSize: "48px", fontWeight: 900, marginBottom: "16px" }}>Booking Not Found</h1>
          <a href="/" style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0a0a0a", textDecoration: "none", borderBottom: "1px solid #0a0a0a", paddingBottom: "2px" }}>
            Return Home
          </a>
        </div>
      </main>
    );
  }

  const departure = new Date(booking.flightId.departureTime);
  const arrival = new Date(booking.flightId.arrivalTime);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-NZ", { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <main style={{ background: "#f8f7f4", minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 40px" }}>

        <div style={{ marginBottom: "60px" }}>
          <div style={{ width: "56px", height: "56px", background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", fontSize: "24px" }}>✓</div>
          <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>Dairy Flat Airways</p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 16px", lineHeight: 1 }}>BOOKING<br />CONFIRMED</h1>
          <p style={{ color: "#666", fontSize: "16px" }}>Your luxury regional flight has been successfully reserved.</p>
        </div>

        <div style={{ background: "#0a0a0a", color: "white", borderRadius: "4px", padding: "48px", marginBottom: "4px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>Booking Reference</p>
          <p style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "0.15em", margin: 0 }}>{booking.bookingReference}</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "12px" }}>Save this reference to manage your booking</p>
        </div>

        <div style={{ background: "white", borderRadius: "4px", padding: "40px 48px", marginBottom: "4px", display: "flex", gap: "48px" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "8px" }}>Passenger</p>
            <p style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>{booking.passengerName}</p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "8px" }}>Email</p>
            <p style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>{booking.email}</p>
          </div>
        </div>

        <div style={{ background: "white", borderRadius: "4px", padding: "40px 48px", marginBottom: "4px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "24px" }}>Flight Details</p>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "40px" }}>
            <div>
              <p style={{ fontSize: "40px", fontWeight: 900, letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>{formatTime(departure)}</p>
              <p style={{ fontSize: "14px", color: "#888", margin: "6px 0 0" }}>{booking.flightId.departureAirport}</p>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: "1px", background: "#d4d0c8", position: "relative" }}>
                <span style={{ position: "absolute", right: 0, top: "-5px", color: "#aaa", fontSize: "10px" }}>▶</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "40px", fontWeight: 900, letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>{formatTime(arrival)}</p>
              <p style={{ fontSize: "14px", color: "#888", margin: "6px 0 0" }}>{booking.flightId.arrivalAirport}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "2px" }}>
            {[
              { label: "Date", value: departure.toLocaleDateString("en-NZ", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
              { label: "Flight", value: booking.flightId.flightNumber },
              { label: "Aircraft", value: booking.flightId.aircraft },
            ].map((item) => (
              <div key={item.label} style={{ flex: 1, background: "#f8f7f4", padding: "20px 24px", borderRadius: "2px" }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>{item.label}</p>
                <p style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "white", borderRadius: "4px", padding: "32px 48px", marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", margin: 0 }}>Total Paid</p>
          <p style={{ fontSize: "40px", fontWeight: 900, letterSpacing: "-0.02em", margin: 0 }}>${booking.totalPrice}</p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <a href="/" style={{ flex: 1, display: "block", textAlign: "center", background: "#0a0a0a", color: "white", padding: "18px", borderRadius: "4px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
            Return Home
          </a>
          <a href="/bookings" style={{ flex: 1, display: "block", textAlign: "center", border: "1px solid #d4d0c8", color: "#0a0a0a", padding: "18px", borderRadius: "4px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", background: "white" }}>
            View My Bookings
          </a>
        </div>

      </div>
    </main>
  );
}