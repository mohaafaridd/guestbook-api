import { Arg, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../../models';
import { CreateUserInput } from './CreateUserInput';

@Resolver()
export class CreateUserResolver {
  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const password = await bcrypt.hash(
      data.password,
      process.env.DB_SECRET || 10
    );

    const user = await UserModel.create({
      ...data,
      password,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'hard jwt secret'
    );

    user.token = token;

    return user;
  }
}
