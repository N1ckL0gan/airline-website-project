import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import Flight from "@/models/Flight";
import { connectDB } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    void Flight;

    const body = await request.json();
    const { bookingReference } = body;

    if (!bookingReference) {
      return NextResponse.json({ error: "Missing booking reference" }, { status: 400 });
    }

    const booking = await Booking.findOne({ bookingReference });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status === "CANCELLED") {
      return NextResponse.json({ error: "Booking already cancelled" }, { status: 400 });
    }

    booking.status = "CANCELLED";
    await booking.save();

    const flight = await Flight.findById(booking.flightId);
    if (flight && flight.bookedSeats > 0) {
      flight.bookedSeats -= 1;
      await flight.save();
    }

    return NextResponse.json({
      message: "Your booking has been successfully cancelled.",
    });

  } catch (err) {
    console.error("Cancel route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}