import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  events: ObjectId[];
}

export interface IEvent extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  price: number;
  date: Date;
  creator: ObjectId;
}

export interface IBooking extends Document {
  _id: ObjectId;
  event: ObjectId;
  user: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContext {
  user: IUser;
}
