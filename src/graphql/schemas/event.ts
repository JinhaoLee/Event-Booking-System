import { Field, ObjectType, InputType, Float, ID } from "type-graphql";
import { User } from ".";
import { Min } from "class-validator";
import "reflect-metadata";

@ObjectType()
class Event {
  @Field(type => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(type => Float)
  @Min(0)
  price: number;

  @Field()
  date: Date;

  @Field(type => User)
  creator: User;
}

@InputType({ description: "New event data" })
class AddEventInput implements Partial<Event> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  date: Date;
}

export { Event, AddEventInput };
