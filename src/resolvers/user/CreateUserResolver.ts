import { Arg, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Message, MessageModel, User, UserModel } from '../../models';
import { CreateUserInput } from './CreateUserInput';

@Resolver(User)
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

  @FieldResolver(() => [Message])
  async messages(@Root() author: any): Promise<Message[]> {
    const messages = await MessageModel.find({
      author: author._id,
    });
    return messages;
  }
}
