import { NextRequest, NextResponse } from "next/server";
import Flight from "@/models/Flight";
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";
import { generateBookingsReference } from "@/lib/bookingReference";

export async function POST(request: NextRequest) {
  await connectDB();

  const body = await request.json();
  const { passengerName, email, flightId } = body;

  if (!passengerName || !email || !flightId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const flight = await Flight.findById(flightId);

  if (!flight) {
    return NextResponse.json(
      { error: "Flight not found" },
      { status: 404 }
    );
  }

  if (flight.bookedSeats >= flight.capacity) {
    return NextResponse.json(
      { error: "Flight is full" },
      { status: 400 }
    );
  }

  const bookingReference = generateBookingsReference();

  const booking = await Booking.create({
    bookingReference,
    passengerName,
    email,
    flightId,
    totalPrice: flight.price,
    status: "CONFIRMED",
  });

  flight.bookedSeats += 1;
  await flight.save();

  return NextResponse.json({
    message: "Booking confirmed",
    bookingReference: booking.bookingReference,
    bookingId: booking._id,
  });
}

export async function GET() {
  return NextResponse.json({ message: "Bookings API" });
}