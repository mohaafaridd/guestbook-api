import { MinLength, IsMongoId } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  @MinLength(1)
  content: string;

  @Field(() => String, { nullable: true })
  @IsMongoId()
  parent?: string;
}
