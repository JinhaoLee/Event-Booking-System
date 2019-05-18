import { ObjectId } from 'mongodb';
import { ObjectType, Field, ID } from 'type-graphql';
import { User, Event } from '.';
import 'reflect-metadata';

@ObjectType()
class Booking {
  @Field(type => ID)
  _id: ObjectId;

  @Field(type => Event)
  event: Event;

  @Field(type => User)
  user: User;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}

export { Booking };
