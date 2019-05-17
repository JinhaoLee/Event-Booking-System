import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { UserModel } from "../../models";
import { User, AddUserInput, LoginResponse } from "../schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/user";

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
  async register(@Arg("userInput") userInput: AddUserInput): Promise<User> {
    try {
      const { email, password } = userInput;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error("User exists already");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        email,
        password: hashedPassword
      });
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(returens => LoginResponse)
  async login(
    @Arg("userInput") userInput: AddUserInput
  ): Promise<LoginResponse> {
    const { email, password } = userInput;
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid email");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d" // token will expire in 30days
      }
    );
    return {
      token,
      user
    };
  }
}

export default UserResolver;
