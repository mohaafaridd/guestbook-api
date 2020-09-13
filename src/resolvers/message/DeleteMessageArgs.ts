import { Min, Max, IsMongoId } from 'class-validator';
import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class DeleteMessageArgs {
  @Field(() => ID)
  @IsMongoId()
  id: string;
}
