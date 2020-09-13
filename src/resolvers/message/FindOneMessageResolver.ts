import { Args, Query, Resolver } from 'type-graphql';
import { Message, MessageModel } from '../../models';
import { FindOneMessageArgs } from './FindOneMessageInputs';

@Resolver()
export class FindOneMessageResolver {
  @Query(() => Message, { nullable: true })
  async findMessageById(@Args() { id }: FindOneMessageArgs) {
    const message = await MessageModel.findById(id);
    return message;
  }
}
