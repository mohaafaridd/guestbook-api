import { IsMongoId } from 'class-validator';
import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FindManyMessagesByUserArgs {
  @Field(() => ID)
  @IsMongoId()
  id: string;
}
