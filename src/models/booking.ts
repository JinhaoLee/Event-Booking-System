import { IBooking } from "./../interfaces";
import { Schema, Document, model } from "mongoose";

const bookingSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false
  }
});

const bookingModel = model<IBooking & Document>("Booking", bookingSchema);

export default bookingModel;
