import { Args, Query, Resolver } from 'type-graphql';
import { Message, MessageModel } from '../../models';
import { FindManyMessagesByUserArgs } from './FindManyMessagesArgs';

@Resolver()
export class FindManyMessagesResolver {
  @Query(() => [Message])
  async findAllMessages() {
    const messages = await MessageModel.find({
      parent: undefined,
    });

    return messages;
  }

  @Query(() => [Message])
  async findMessagesByUser(@Args() { id }: FindManyMessagesByUserArgs) {
    const messages = await MessageModel.find({
      parent: undefined,
      author: id,
    });

    return messages;
  }
}
