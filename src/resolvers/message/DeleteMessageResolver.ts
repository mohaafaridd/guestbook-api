import { ApolloError } from 'apollo-server-express';
import { Arg, Args, Mutation, Resolver } from 'type-graphql';
import { Message, MessageModel } from '../../models';
import { DeleteMessageArgs } from './DeleteMessageArgs';

@Resolver()
export class DeleteMessageResolver {
  @Mutation(() => Message)
  async deleteMessage(@Args() { id }: DeleteMessageArgs): Promise<Message> {
    // TODO => Authorization here
    // TODO => Cascade delete

    const message = await MessageModel.findByIdAndDelete(id);

    if (!message) throw new ApolloError("Couldn't find message");

    return message;
  }
}
