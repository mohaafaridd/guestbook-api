import { Field, ID, Int, ObjectType } from 'type-graphql';
import { getModelForClass, pre, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@ObjectType()
@pre<Message>('save', function (next) {
  this.updatedAt = new Date();
  next();
})
export class Message {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true, minlength: 1, trim: true })
  content: string;

  @Field(() => Date)
  @prop({ default: Date.now() })
  createdAt?: Date;

  @Field(() => Int)
  @prop({ default: Date.now() })
  updatedAt?: Date;
}

export const MessageModel = getModelForClass(Message);
