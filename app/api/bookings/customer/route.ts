import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  await connectDB();

  // Explicitly register Flight schema if not already registered
  if (!mongoose.models.Flight) {
    const { default: Flight } = await import("@/models/Flight");
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  const bookings = await Booking.find({ email }).populate("flightId");

  return NextResponse.json(bookings);
}