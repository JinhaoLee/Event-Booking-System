import { IUser } from "./../interfaces";
import { Schema, Document, model } from "mongoose";

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});

const userModel = model<IUser & Document>("User", userSchema);

export default userModel;
