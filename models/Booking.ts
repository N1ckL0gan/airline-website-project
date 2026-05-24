import mongoose, { Schema, models, model, Model } from "mongoose";

export interface IBooking {
    bookingReference: string;
    passengerName: string;
    email: string;
    flightId: mongoose.Schema.Types.ObjectId;
    status: "CONFIRMED" | "CANCELLED";
    totalPrice: number;
    createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    bookingReference: {
        type: String,
        required: true,
        unique: true,
    },
    passengerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight", // ← capital F
        required: true,
    },
    status: {
        type: String,
        enum: ["CONFIRMED", "CANCELLED"],
        default: "CONFIRMED",
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking: Model<IBooking> =
    (models.Booking as Model<IBooking>) || model<IBooking>("Booking", BookingSchema);

export default Booking;