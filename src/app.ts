import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { IUser } from "./interfaces";
import { IContext } from "./interfaces";
import { EventResolver, UserResolver, BookingResolver } from "./graphql";
import getUser from "./helpers/getUser";

class App {
  private PORT: string | number;

  constructor() {
    this.config();
    this.connectToTheDatabase();
  }

  private config(): void {
    dotenv.config();
    this.PORT = process.env.PORT || 3000;
  }

  private connectToTheDatabase() {
    const { MONGO_PATH } = process.env;
    mongoose.connect(`${MONGO_PATH}`, {
      useNewUrlParser: true
    });
    console.log("database connected!");
  }

  public async startServer() {
    // Building schema here
    const schema = await buildSchema({
      resolvers: [EventResolver, UserResolver, BookingResolver]
    });
    // Create the GraphQL server
    const server = new ApolloServer({
      schema,
      context: ({ req }): IContext => {
        const tokenWithBearer = req.headers.authorization || "";
        const token = tokenWithBearer.split(" ")[1];
        const user = <IUser>getUser(token);
        return { user };
      },
      playground: true
    });
    // Start the server
    const { url } = await server.listen(this.PORT);
    console.log(`🚀 Server is running, GraphQL Playground available at ${url}`);
  }
}

export default App;
