import { IContext } from "./../../interfaces";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { BookingModel, EventModel } from "../../models";
import { Booking, Event } from "../schemas";

@Resolver(Booking)
class BookingResolver {
  @Query(returns => [Booking])
  async bookings(): Promise<Booking[]> {
    try {
      return await BookingModel.find();
    } catch (error) {
      throw new Error();
    }
  }

  @Mutation(returns => Booking)
  async bookEvent(
    @Arg("eventId") eventId: string,
    @Ctx() ctx: IContext
  ): Promise<Booking> {
    const fetchedEvent = await EventModel.findById(eventId);
    const booking = new BookingModel({
      user: ctx.user._id,
      event: fetchedEvent
    });
    await booking.save();
    return booking;
  }

  @Mutation(returns => Event)
  async cancelBooking(@Arg("bookingId") bookingId: string): Promise<Event> {
    try {
      const booking = await BookingModel.findById(bookingId).populate("event");
      await BookingModel.deleteOne({ _id: bookingId });
      return booking.event;
    } catch (error) {
      throw error;
    }
  }
}

export default BookingResolver;
