import { IContext } from "./../../interfaces";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { BookingModel, EventModel, UserModel } from "../../models";
import { Booking, Event } from "../schemas";

@Resolver(Booking)
class BookingResolver {
  @Query(returns => [Booking])
  async bookings(): Promise<Booking[]> {
    try {
      // @ts-ignore
      return await BookingModel.find()
        .populate("user")
        .populate("event");
    } catch (error) {
      throw new Error();
    }
  }

  @Mutation(returns => Booking)
  async bookEvent(
    @Arg("eventId") eventId: string,
    @Ctx() ctx: IContext
  ): Promise<Booking> {
    const { user } = ctx;
    const fetchedEvent = await EventModel.findById(eventId);
    const fetchedUser = await UserModel.findById(user._id);
    const booking = new BookingModel({
      user: fetchedUser,
      event: fetchedEvent
    })
      .populate("user")
      .populate("event");
    await booking.save();
    // @ts-ignore
    return booking;
  }

  @Mutation(returns => Booking)
  async cancelBooking(@Arg("bookingId") bookingId: string): Promise<Booking> {
    try {
      const booking = await BookingModel.findById(bookingId)
        .populate("event")
        .populate("user");
      await BookingModel.deleteOne({ _id: bookingId });
      // @ts-ignore
      return booking;
    } catch (error) {
      throw error;
    }
  }
}

export default BookingResolver;
