export function generateBookingsReference() {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        let result = "DFA-";

        for (let i = 0; i < 6; i++) {

            const randomIndex =
                Math.floor(Math.random() * chars.length);

            result += chars[randomIndex];
        }

    return result;
}

import { NextRequest, NextResponse } from "next/server";

import  Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";

export async function GET(
    request: NextRequest,
) {

    await connectDB();

    const { searchParams } = new URL(request.url);
    const bookingReference = searchParams.get("bookingReference");

    const booking = (await Booking.findOne({ bookingReference })).populated("flightId");

    if (!booking) {
        return NextResponse.json(
            { error: "Booking not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(booking);
}