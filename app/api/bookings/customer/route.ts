import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Flight from "@/models/Flight";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const bookings = await Booking.find({ email }).lean();

    // Manual join for each booking
    const bookingsWithFlights = await Promise.all(
      bookings.map(async (booking) => {
        const flight = await Flight.findById(booking.flightId).lean();
        return { ...booking, flightId: flight };
      })
    );

    return NextResponse.json(bookingsWithFlights);

  } catch (err) {
    console.error("Customer route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}