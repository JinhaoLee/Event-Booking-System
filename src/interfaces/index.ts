import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  events: ObjectId[];
}

export interface IEvent extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: Date;
  creator: ObjectId;
}

export interface IBooking extends Document {
  _id: string;
  event: ObjectId;
  user: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContext {
  user: IUser;
}
