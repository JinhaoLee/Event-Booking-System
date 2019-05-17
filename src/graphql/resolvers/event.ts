import { Arg, Query, Resolver, Mutation, Ctx } from "type-graphql";
import { UserModel, EventModel } from "../../models";
import { AddEventInput, Event } from "../schemas";
import { IContext } from "./../../interfaces";

@Resolver(Event)
class EventResolver {
  @Query(returns => [Event])
  async events(): Promise<Event[]> {
    try {
      const events = await EventModel.find();
      return events;
    } catch (error) {
      throw new Error();
    }
  }

  @Mutation(returns => Event)
  async createEvent(
    @Arg("eventInput") eventInput: AddEventInput,
    @Ctx() ctx: IContext
  ): Promise<Event> {
    const { title, description, price, date } = eventInput;
    let createdEvent;
    try {
      const creator = await UserModel.findById(ctx.userId);
      if (!creator) {
        throw new Error("User not found");
      }
      const event = new EventModel({
        title,
        description,
        price,
        date,
        creator
      });
      creator.events.push(event);
      createdEvent = await event.save();
      await creator.save();
      return createdEvent;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default EventResolver;
