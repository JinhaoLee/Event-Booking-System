import { ObjectType, Field, ID } from "type-graphql";
import { Event, User } from ".";

@ObjectType()
class Booking {
  @Field(type => ID)
  _id: string;

  @Field(type => Event)
  event: Event;

  @Field(type => User)
  user: User;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}

export default Booking;
