import { InputType, Field } from "type-graphql";
import User from "./user";

@InputType({ description: "New user data" })
class AddUserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  passowrd: string;
}

export default AddUserInput;
