import { Arg, Mutation, Resolver } from 'type-graphql';
import { Message, MessageModel } from '../../models';
import { CreateMessageInput } from './CreateMessageInput';

@Resolver()
export class CreateMessageResolver {
  @Mutation(() => Message)
  async createMessage(@Arg('data') data: CreateMessageInput): Promise<Message> {
    const message = await MessageModel.create({
      content: data.content,
    });

    console.log('message', message);

    return message;
  }
}
