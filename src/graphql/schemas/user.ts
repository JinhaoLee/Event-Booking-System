import { Field, ObjectType, ID } from "type-graphql";
import Event from "./event";
import "reflect-metadata";

@ObjectType()
class User {
  @Field(type => ID)
  _id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field(type => [Event], { nullable: true })
  events: Event[];
}

export default User;
