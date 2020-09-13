import { IsMongoId, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateMessageInput {
  @Field(() => String)
  @IsMongoId()
  messageId: string;

  @Field(() => String)
  @MinLength(1)
  content: string;
}
