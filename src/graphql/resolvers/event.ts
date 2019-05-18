import { Arg, Query, Resolver, Mutation, Ctx } from "type-graphql";
import { UserModel, EventModel } from "../../models";
import { AddEventInput, Event } from "../schemas";
import { IContext } from "./../../interfaces";
import { ObjectId } from "mongodb";

@Resolver(Event)
class EventResolver {
  @Query(returns => [Event])
  async events(@Ctx() ctx: IContext) {
    const { user } = ctx;
    if (!user) {
      throw new Error("you must be logged in to query this schema");
    }
    try {
      return await EventModel.find().populate("creator", "_id email");
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(returns => Event)
  async createEvent(
    @Arg("eventInput") eventInput: AddEventInput,
    @Ctx() ctx: IContext
  ) {
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
      // create a new event model
      const event = new EventModel({
        title,
        description,
        price,
        date,
        creator
      }).populate("user");
      // add this event to creator's events
      creator.events = [...creator.events, new ObjectId(event._id)];
      // save this event
      createdEvent = await event.save();
      // save this event to creator's events
      await creator.save();
      return createdEvent;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default EventResolver;
