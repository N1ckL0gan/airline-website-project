import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Flight from "@/models/Flight";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const bookingReference = searchParams.get("bookingReference");

    if (!bookingReference) {
      return NextResponse.json({ error: "Missing booking reference" }, { status: 400 });
    }

    const booking = await Booking.findOne({ bookingReference }).lean();

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Manual join instead of populate
    const flight = await Flight.findById(booking.flightId).lean();

    const result = {
      ...booking,
      flightId: flight,
    };

    return NextResponse.json(result);

  } catch (err) {
    console.error("Reference route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}