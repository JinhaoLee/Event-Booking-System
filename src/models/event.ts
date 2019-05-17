import { IEvent } from "./../interfaces";
import { Schema, Document, model } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const eventModel = model<IEvent & Document>("Event", eventSchema);

export default eventModel;
