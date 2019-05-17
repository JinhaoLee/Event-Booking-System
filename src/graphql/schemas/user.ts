import { Event } from ".";
import { Field, ObjectType, ID, InputType } from "type-graphql";
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

@InputType({ description: "New user data" })
class AddUserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  token: string;
}

@ObjectType()
class RegisterResponse {
  @Field()
  message: string;
}

export { User, AddUserInput, LoginResponse, RegisterResponse };
