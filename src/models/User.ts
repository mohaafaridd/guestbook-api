import { Field, ID, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
export class User {
  @Field(() => ID)
  @prop()
  id: string;

  @Field(() => ID)
  @prop({ required: true })
  name: string;

  @Field(() => ID)
  @prop({ unique: true, required: true })
  email: string;

  @Field(() => ID)
  @prop({ required: true, minlength: 6 })
  password: string;
}

export const UserModel = getModelForClass(User);
