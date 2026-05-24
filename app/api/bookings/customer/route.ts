import { NextRequest, NextResponse }
  from "next/server";

import Booking from "@/models/Booking";

import Flight from "@/models/Flight";

import { connectDB } from "@/lib/mongodb";

export async function GET(request: NextRequest) {

  await connectDB();

  void Flight;

  const { searchParams } =
    new URL(request.url);

  const email = searchParams.get("email");

  const bookings = await Booking.find({
    email,
  }).populate("flightId");

  return NextResponse.json(bookings);
}