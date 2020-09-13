import { ApolloError } from 'apollo-server-express';
import { Types } from 'mongoose';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../interfaces';
import { Message, MessageModel } from '../../models';
import { getUserId } from '../../utils';
import { UpdateMessageInput } from './UpdateMessageInput';

@Resolver()
export class UpdateMessageResolver {
  @Mutation(() => Message)
  async updateMessage(
    @Arg('data') data: UpdateMessageInput,
    @Ctx() { req }: Context
  ): Promise<Message> {
    const userId = getUserId(req);
    const message = await MessageModel.findById(data.messageId);

    if (!message) throw new ApolloError('Message was not found');
    const authorId = String(message.author);
    if (authorId !== userId) throw new ApolloError('Authorization required');

    const updated = await MessageModel.findByIdAndUpdate(
      data.messageId,
      { content: data.content },
      { new: true }
    );

    if (!updated) throw new ApolloError('Message was not found');

    return updated;
  }
}
