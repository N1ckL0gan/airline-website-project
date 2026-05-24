import mongoose, { Schema, models, model, Document, Model } from "mongoose";

export interface IFlight extends Document {
  flightNumber: string;
  aircraft: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  capacity: number;
  bookedSeats: number;
  price: number;
}

const FlightSchema = new Schema<IFlight>({
  flightNumber: String,
  aircraft: String,
  departureAirport: String,
  arrivalAirport: String,
  departureTime: Date,
  arrivalTime: Date,
  capacity: Number,
  bookedSeats: { type: Number, default: 0 },
  price: Number,
});


const Flight: Model<IFlight> =
  (models.Flight as Model<IFlight>) || model<IFlight>("Flight", FlightSchema);

export default Flight;