import { ApolloError } from 'apollo-server-express';
import { Arg, Args, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../interfaces';
import { Message, MessageModel } from '../../models';
import { getUserId } from '../../utils';
import { DeleteMessageArgs } from './DeleteMessageArgs';

@Resolver()
export class DeleteMessageResolver {
  @Mutation(() => Message)
  async deleteMessage(
    @Args() { id }: DeleteMessageArgs,
    @Ctx() { req }: Context
  ): Promise<Message> {
    const userId = getUserId(req);
    const message = await MessageModel.findById(id);
    if (!message) throw new ApolloError('Message was not found');
    const authorId = String(message.author);
    if (authorId !== userId) throw new ApolloError('Authorization required');

    // TODO => Cascade delete
    await MessageModel.remove(message._id);

    return message;
  }
}
