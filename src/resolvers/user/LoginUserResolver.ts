import { Arg, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../../models';
import { LoginUserInput } from './LoginUserInput';
import { ApolloError } from 'apollo-server-express';

@Resolver()
export class LoginUserResolver {
  @Mutation(() => User)
  async loginUser(@Arg('data') data: LoginUserInput): Promise<User> {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new ApolloError("Couldn't find user");

    const correctPassword = await bcrypt.compare(data.password, user.password);
    if (!correctPassword) throw new ApolloError("Couldn't find user");

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'hard jwt secret'
    );

    user.token = token;

    return user;
  }
}
