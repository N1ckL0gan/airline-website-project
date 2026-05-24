import { NextResponse } from "next/server";
import Flight from "@/models/Flight";
import { connectDB } from "@/lib/mongodb";

export async function GET(
  request: Request,
  context: { params: Promise<{ flightId: string }> }
) {
  await connectDB();
  const { flightId } = await context.params;
  const flight = await Flight.findById(flightId);

  if (!flight) {
    return NextResponse.json({ error: "Flight not found" }, { status: 404 });
  }

  return NextResponse.json(flight);
}