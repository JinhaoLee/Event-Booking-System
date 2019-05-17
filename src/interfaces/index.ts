import { Request } from "apollo-env";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  events: IEvent[];
}

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: Date;
  creator: IUser;
}

export interface IBooking {
  _id: string;
  event: IEvent;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContext {
  user: IUser;
}
