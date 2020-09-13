import { Field, ID, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, minlength: 6 })
  password: string;

  @Field(() => String, { nullable: true })
  token?: string;
}

export const UserModel = getModelForClass(User);
