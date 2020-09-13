import { ApolloError } from 'apollo-server-express';
import { Document } from 'mongoose';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import { Context } from '../../interfaces';
import { Message, MessageModel, User, UserModel } from '../../models';
import { getUserId } from '../../utils';
import { CreateMessageInput } from './CreateMessageInput';

@Resolver(() => Message)
export class CreateMessageResolver {
  @Mutation(() => Message)
  async createMessage(
    @Arg('data') data: CreateMessageInput,
    @Ctx() { req }: Context
  ): Promise<Document> {
    const userId = getUserId(req);

    const message = await MessageModel.create({
      content: data.content,
      author: userId,
      ...(data.parent && { parent: data.parent }),
    });

    return message;
  }

  @FieldResolver()
  async author(@Root() message: any): Promise<User> {
    return (await UserModel.findById(message.author))!;
  }

  @FieldResolver()
  async parent(@Root() message: any): Promise<Message> {
    return (await MessageModel.findById(message.parent))!;
  }
}
