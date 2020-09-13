import { ApolloError } from 'apollo-server-express';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { Message, MessageModel } from '../../models';
import { UpdateMessageInput } from './UpdateMessageInput';

@Resolver()
export class UpdateMessageResolver {
  @Mutation(() => Message)
  async updateMessage(@Arg('data') data: UpdateMessageInput): Promise<Message> {
    // TODO => Authorization Here
    const message = await MessageModel.findByIdAndUpdate(data.messageId, {
      content: data.content,
    });

    if (!message) throw new ApolloError("Couldn't find message");

    await message.save();

    return message;
  }
}
