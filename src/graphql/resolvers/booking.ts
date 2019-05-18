import { IContext } from "./../../interfaces";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { BookingModel, EventModel, UserModel } from "../../models";
import { Booking } from "../schemas";

@Resolver(Booking)
class BookingResolver {
  @Query(returns => [Booking])
  async bookings() {
    try {
      return await BookingModel.find()
        .populate("user")
        .populate("event");
    } catch (error) {
      throw new Error();
    }
  }

  @Mutation(returns => Booking)
  async bookEvent(@Arg("eventId") eventId: string, @Ctx() ctx: IContext) {
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
    return booking;
  }

  @Mutation(returns => Booking)
  async cancelBooking(@Arg("bookingId") bookingId: string) {
    try {
      const booking = await BookingModel.findById(bookingId)
        .populate("event")
        .populate("user");
      await BookingModel.deleteOne({ _id: bookingId });
      return booking;
    } catch (error) {
      throw error;
    }
  }
}

export default BookingResolver;
