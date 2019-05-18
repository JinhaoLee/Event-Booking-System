import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { UserModel } from '../../models';
import { User, AddUserInput, LoginResponse, RegisterResponse } from '../schemas';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

@Resolver(User)
class UserResolver {
  @Query(returns => RegisterResponse)
  async register(@Arg('userInput') userInput: AddUserInput): Promise<RegisterResponse> {
    try {
      const { email, password } = userInput;
      const existingUser = await UserModel.findOne({ email });
      // if the user exists
      if (existingUser) {
        throw new Error('User exists already');
      }
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        email,
        password: hashedPassword
      });
      // save user to the database
      await user.save();
      return { message: 'success' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(returns => LoginResponse)
  async login(@Arg('userInput') userInput: AddUserInput): Promise<LoginResponse> {
    const { email, password } = userInput;
    const user = await UserModel.findOne({ email });

    // if user email not found
    if (!user) {
      throw new Error('Invalid email');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    // if the password matched
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const token = jsonwebtoken.sign(
      {
        _id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d' // token will expire in 30days
      }
    );
    return { token };
  }
}

export default UserResolver;
