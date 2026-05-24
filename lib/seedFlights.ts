import Flight from "@/models/Flight";
import { routes } from "@/data/routes";
import { schedules } from "@/lib/schedules";

export async function seedFlights() {
  await Flight.deleteMany();

  const flights = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 180; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfWeek = date.getDay();

    // Find schedules that run on this day
    const todaysSchedules = schedules.filter((s) =>
      s.departureDays.includes(dayOfWeek)
    );

    for (const schedule of todaysSchedules) {
      const route = routes.find(
        (r) => r.flightNumber === schedule.flightNumber
      );
      if (!route) continue;

      const [hours, minutes] = schedule.departureTime.split(":").map(Number);

      const departure = new Date(date);
      departure.setHours(hours, minutes, 0, 0);

      const arrival = new Date(departure);
      arrival.setMinutes(arrival.getMinutes() + route.durationMinutes);

      flights.push({
        flightNumber: route.flightNumber,
        aircraft: route.aircraft,
        departureAirport: route.departureAirport,
        arrivalAirport: route.arrivalAirport,
        capacity: route.capacity,
        price: route.price,
        departureTime: departure,
        arrivalTime: arrival,
        bookedSeats: 0,
      });
    }
  }

  await Flight.insertMany(flights);
  return flights.length;
}