import { NextRequest, NextResponse } from "next/server";
import Flight from "@/models/Flight";
import { connectDB } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  if (!from || !to || !date) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // Parse date as local NZ time (UTC+12) to avoid timezone shift
  const [year, month, day] = date.split("-").map(Number);
  const startDate = new Date(year, month - 1, day, 0, 0, 0);
  const endDate = new Date(year, month - 1, day, 23, 59, 59);

  const flights = await Flight.find({
    departureAirport: from,
    arrivalAirport: to,
    departureTime: { $gte: startDate, $lte: endDate },
  }).lean();

  return NextResponse.json(flights);
}