import { IsMongoId } from 'class-validator';
import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FindOneMessageArgs {
  @Field(() => ID)
  @IsMongoId()
  id: string;
}
