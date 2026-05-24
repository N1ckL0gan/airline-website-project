import FlightSearchForm from "@/components/flights/FlightSearchForm";
import FlightCard from "@/components/flights/FlightCard";
import { connectDB } from "@/lib/mongodb";
import Flight from "@/models/Flight";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; date?: string }>;
}) {
  const params = await searchParams;
  const { from, to, date } = params;

  let flights: any[] = [];

  if (from && to && date) {
    await connectDB();

    const [year, month, day] = date.split("-").map(Number);
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59);

    flights = await Flight.find({
      departureAirport: from,
      arrivalAirport: to,
      departureTime: { $gte: startDate, $lte: endDate },
    }).lean();
  }

  return (
    <main style={{ background: "#f8f7f4", minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px" }}>

        <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>Dairy Flat Airways</p>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 16px", lineHeight: 1 }}>SEARCH<br />FLIGHTS</h1>
        <p style={{ color: "#666", fontSize: "16px", marginBottom: "60px" }}>Search luxury regional flights across New Zealand and Australia.</p>

        <div style={{ background: "white", padding: "40px", borderRadius: "4px", marginBottom: "60px" }}>
          <FlightSearchForm />
        </div>

        {from && to && date && flights.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 40px", border: "1px solid #e5e2d9", borderRadius: "4px", background: "white" }}>
            <p style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>No flights found</p>
            <p style={{ color: "#888", fontSize: "15px" }}>Try adjusting your airports or travel date.</p>
          </div>
        )}

        {flights.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #d4d0c8", paddingBottom: "16px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {flights.length} Flight{flights.length > 1 ? "s" : ""} Available
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {flights.map((flight: any) => (
                <FlightCard key={flight._id} flight={flight} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}