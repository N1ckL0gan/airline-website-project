// Day of week: 0 = Sunday, 1 = Monday, ... 6 = Saturday

export interface ScheduleEntry {
  flightNumber: string;
  departureDays: number[];      // which days of week this flight departs
  departureTime: string;        // local time HH:MM
  departureTZ: string;          // IANA timezone
  arrivalTZ: string;            // IANA timezone
}

export const schedules: ScheduleEntry[] = [

  // ── DF100: NZNE → YSSY — Friday mid-morning ──────────
  {
    flightNumber: "DF100",
    departureDays: [5],         // Friday
    departureTime: "10:30",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Australia/Sydney",
  },

  // ── DF101: YSSY → NZNE — Sunday mid-afternoon ────────
  {
    flightNumber: "DF101",
    departureDays: [0],         // Sunday
    departureTime: "14:00",
    departureTZ: "Australia/Sydney",
    arrivalTZ: "Pacific/Auckland",
  },

  // ── DF200: NZNE → NZRO — Mon–Fri early morning ───────
  {
    flightNumber: "DF200",
    departureDays: [1, 2, 3, 4, 5],
    departureTime: "07:00",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Pacific/Auckland",
  },

  // ── DF202: NZNE → NZRO — Mon–Fri late afternoon ──────
  // Second daily Rotorua departure (same route, different time)
  {
    flightNumber: "DF202",
    departureDays: [1, 2, 3, 4, 5],
    departureTime: "16:30",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Pacific/Auckland",
  },

  // ── DF201: NZRO → NZNE — Mon–Fri morning return ──────
  {
    flightNumber: "DF201",
    departureDays: [1, 2, 3, 4, 5],
    departureTime: "08:10",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Pacific/Auckland",
  },

  // ── DF203: NZRO → NZNE — Mon–Fri evening return ──────
  {
    flightNumber: "DF203",
    departureDays: [1, 2, 3, 4, 5],
    departureTime: "17:45",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Pacific/Auckland",
  },

  // ── DF300: NZNE → NZGB — Mon, Wed, Fri morning ───────
  {
    flightNumber: "DF300",
    departureDays: [1, 3, 5],
    departureTime: "09:00",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Pacific/Auckland",
  },

  // ── DF301: NZGB → NZNE — Tue, Thu, Sat morning ───────
  {
    flightNumber: "DF301",
    departureDays: [2, 4, 6],
    departureTime: "09:00",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Pacific/Auckland",
  },

  // ── DF400: NZNE → NZCI — Tue, Fri ───────────────────
  {
    flightNumber: "DF400",
    departureDays: [2, 5],
    departureTime: "08:00",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Pacific/Chatham",
  },

  // ── DF401: NZCI → NZNE — Wed, Sat ───────────────────
  {
    flightNumber: "DF401",
    departureDays: [3, 6],
    departureTime: "08:00",
    departureTZ: "Pacific/Chatham",
    arrivalTZ: "Pacific/Auckland",
  },

  // ── DF500: NZNE → NZTL — Monday ─────────────────────
  {
    flightNumber: "DF500",
    departureDays: [1],
    departureTime: "09:00",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Pacific/Auckland",
  },

  // ── DF501: NZTL → NZNE — Tuesday ────────────────────
  {
    flightNumber: "DF501",
    departureDays: [2],
    departureTime: "10:00",
    departureTZ: "Pacific/Auckland",
    arrivalTZ: "Pacific/Auckland",
  },
];

// Helper: get valid departure days for a given route
export function getValidDaysForRoute(from: string, to: string): number[] {
  const matching = schedules.filter(
    (s) => {
      const { routes } = require("@/data/routes");
      const route = routes.find((r: any) => r.flightNumber === s.flightNumber);
      return route?.departureAirport === from && route?.arrivalAirport === to;
    }
  );
  const days = new Set(matching.flatMap((s) => s.departureDays));
  return Array.from(days);
}