import { Arg, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User, UserModel } from '../../models';
import { CreateUserInput } from './CreateUserInput';

@Resolver()
export class CreateUserResolver {
  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput) {
    const password = await bcrypt.hash(
      data.password,
      process.env.DB_SECRET || 10
    );

    const user = await UserModel.create({
      ...data,
      password,
    });

    return user;
  }
}
