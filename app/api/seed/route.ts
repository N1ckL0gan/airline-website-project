import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb"; 
import { seedFlights } from "@/lib/seedFlights";

export async function GET() {
  try {
    console.log("Step 1: connecting DB");
    await connectDB();

    console.log("Step 2: seeding flights");
    const count = await seedFlights();

    console.log("Step 3: done");

    return NextResponse.json({
      message: `${count} flights seeded`,
    });

  } catch (err) {
    console.error("❌ Seed route crashed:", err);
    return NextResponse.json(
      { error: "Seed failed" },
      { status: 500 }
    );
  }
}