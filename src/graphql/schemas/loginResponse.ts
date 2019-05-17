import { ObjectType, Field } from "type-graphql";
import { User } from ".";

@ObjectType()
class LoginResponse {
  @Field()
  token: string;

  @Field()
  user: User;
}

export default LoginResponse;
