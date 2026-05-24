export const routes = [

  // ── SYBERJET ──────────────────────────────────────────
    {
    flightNumber: "DF100",
    aircraft: "SyberJet SJ30i",
    departureAirport: "NZNE",
    arrivalAirport: "YSSY",
    capacity: 6,
    price: 1800,
    durationMinutes: 210, // ~3.5hr westbound NZ→SYD
    },
    {
    flightNumber: "DF101",
    aircraft: "SyberJet SJ30i",
    departureAirport: "YSSY",
    arrivalAirport: "NZNE",
    capacity: 6,
    price: 1800,
    durationMinutes: 180, // ~3hr eastbound SYD→NZ
    },

  // ── CIRRUS: ROTORUA ───────────────────────────────────
  {
    flightNumber: "DF200",
    aircraft: "Cirrus SF50",
    departureAirport: "NZNE",
    arrivalAirport: "NZRO",
    capacity: 4,
    price: 350,
    durationMinutes: 55,
  },
  {
    flightNumber: "DF201",
    aircraft: "Cirrus SF50",
    departureAirport: "NZRO",
    arrivalAirport: "NZNE",
    capacity: 4,
    price: 350,
    durationMinutes: 55,
  },
{
  flightNumber: "DF202",
  aircraft: "Cirrus SF50",
  departureAirport: "NZNE",
  arrivalAirport: "NZRO",
  capacity: 4,
  price: 350,
  durationMinutes: 55,
},
{
  flightNumber: "DF203",
  aircraft: "Cirrus SF50",
  departureAirport: "NZRO",
  arrivalAirport: "NZNE",
  capacity: 4,
  price: 350,
  durationMinutes: 55,
},

  // ── CIRRUS: GREAT BARRIER ISLAND ──────────────────────
  {
    flightNumber: "DF300",
    aircraft: "Cirrus SF50",
    departureAirport: "NZNE",
    arrivalAirport: "NZGB",
    capacity: 4,
    price: 280,
    durationMinutes: 35,
  },
  {
    flightNumber: "DF301",
    aircraft: "Cirrus SF50",
    departureAirport: "NZGB",
    arrivalAirport: "NZNE",
    capacity: 4,
    price: 280,
    durationMinutes: 35,
  },

  // ── HONDAJET: CHATHAM ISLANDS ─────────────────────────
  {
    flightNumber: "DF400",
    aircraft: "HondaJet Elite",
    departureAirport: "NZNE",
    arrivalAirport: "NZCI",
    capacity: 5,
    price: 950,
    durationMinutes: 135, // ~2.25hr eastbound
  },
  {
    flightNumber: "DF401",
    aircraft: "HondaJet Elite",
    departureAirport: "NZCI",
    arrivalAirport: "NZNE",
    capacity: 5,
    price: 950,
    durationMinutes: 155, // ~2.6hr westbound
  },

  // ── HONDAJET: LAKE TEKAPO ─────────────────────────────
  {
    flightNumber: "DF500",
    aircraft: "HondaJet Elite",
    departureAirport: "NZNE",
    arrivalAirport: "NZTL",
    capacity: 5,
    price: 620,
    durationMinutes: 100,
  },
  {
    flightNumber: "DF501",
    aircraft: "HondaJet Elite",
    departureAirport: "NZTL",
    arrivalAirport: "NZNE",
    capacity: 5,
    price: 620,
    durationMinutes: 115, // slightly longer westbound
  },
];