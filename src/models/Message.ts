import { Field, ID, Int, ObjectType } from 'type-graphql';
import { getModelForClass, pre, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { User } from './User';

@ObjectType()
@pre<Message>('save', function (next) {
  this.updatedAt = new Date();
  next();
})
@pre<Message>('remove', async function (next) {
  await MessageModel.remove({ parent: this._id });
  next();
})
export class Message {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true, minlength: 1, trim: true })
  content: string;

  @Field(() => User)
  @prop({ ref: User, required: true })
  author: Ref<User>;

  @Field(() => Message, { nullable: true })
  @prop({ ref: Message, required: false })
  parent?: Ref<Message>;

  @Field()
  @prop({ default: Date.now() })
  createdAt?: Date;

  @Field()
  @prop({ default: Date.now() })
  updatedAt?: Date;
}

export const MessageModel = getModelForClass(Message);
