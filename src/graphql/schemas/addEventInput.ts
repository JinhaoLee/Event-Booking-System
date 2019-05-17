import { InputType, Field } from "type-graphql";
import Event from "../schemas/event";

@InputType({ description: "New event data" })
class AddEventInput implements Partial<Event> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  date: Date;
}

export default AddEventInput;
