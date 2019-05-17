import { Field, ObjectType } from "type-graphql";
import User from "./user";

@ObjectType()
class Event {
  @Field()
  _id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  date: Date;

  @Field(type => User)
  creator: User;
}

export default Event;
