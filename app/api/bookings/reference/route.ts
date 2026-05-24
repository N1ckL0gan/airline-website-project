import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    if (!mongoose.models.Flight) {
      await import("@/models/Flight");
    }

    const { searchParams } = new URL(request.url);
    const bookingReference = searchParams.get("bookingReference");

    if (!bookingReference) {
      return NextResponse.json({ error: "Missing booking reference" }, { status: 400 });
    }

    const booking = await Booking.findOne({ bookingReference }).populate("flightId");

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);

  } catch (err) {
    console.error("Reference route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}