import { Arg, Query, Resolver, Mutation, Ctx } from "type-graphql";
import { UserModel, EventModel } from "../../models";
import { AddEventInput, Event } from "../schemas";
import { IContext } from "./../../interfaces";
import { transformEvent } from "./merge";
import { ObjectId } from "mongodb";

@Resolver(Event)
class EventResolver {
  @Query(returns => [Event])
  async events(@Ctx() ctx: IContext): Promise<Event[]> {
    const { user } = ctx;
    if (!user) {
      throw new Error("you must be logged in to query this schema");
    }
    try {
      // @ts-ignore
      return await EventModel.find().populate("creator", "_id email");
    } catch (error) {
      throw new Error();
    }
  }

  @Mutation(returns => Event)
  async createEvent(
    @Arg("eventInput") eventInput: AddEventInput,
    @Ctx() ctx: IContext
  ): Promise<Event> {
    const { user } = ctx;
    if (!user) {
      throw new Error("you must be logged in to query this schema");
    }
    const { title, description, price, date } = eventInput;
    let createdEvent;
    try {
      const creator = await UserModel.findById(user._id);
      if (!creator) {
        throw new Error("User not found");
      }
      const event = new EventModel({
        title,
        description,
        price,
        date,
        creator: new ObjectId(user._id)
      });
      // creator.events.push(new ObjectId(event._id));
      creator.events = [...creator.events, new ObjectId(event._id)];
      createdEvent = await event.save();
      // await creator.save();
      return transformEvent(createdEvent);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default EventResolver;
