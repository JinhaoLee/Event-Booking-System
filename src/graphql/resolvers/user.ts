import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { UserModel } from "../../models";
import { User, AddUserInput } from "../schemas";

@Resolver(User)
class UserResolver {
  @Query(returns => [User])
  async users(): Promise<User[]> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw new Error();
    }
  }

  @Mutation(returns => User)
  async createUser(@Arg("userInput") userInput: AddUserInput): Promise<User> {
    try {
      const existingUser = await UserModel.findOne({
        email: userInput.email
      });
      if (existingUser) {
        throw new Error("User exists already");
      }
      const user = new UserModel({
        email: userInput.email,
        password: userInput.passowrd
      });
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserResolver;
