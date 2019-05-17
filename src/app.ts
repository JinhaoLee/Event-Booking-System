import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import {
  EventResolver,
  UserResolver,
  BookingResolver
} from "./graphql/resolvers";
import { IContext } from "./interfaces";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.connectToTheDatabase();
  }

  private config(): void {
    // initialize configuration
    dotenv.config();
    // support application/json type post data
    this.app.use(bodyParser.json());
    // config graphql with schema and resolvers
  }

  private connectToTheDatabase() {
    const { MONGO_PATH } = process.env;
    mongoose.connect(`${MONGO_PATH}`, {
      useNewUrlParser: true
    });
  }

  // public listen() {
  //   this.app.listen(process.env.PORT || 3000, () => {
  //     console.log(`App listening on the port ${process.env.PORT}`);
  //   });
  // }

  public async listen() {
    // ... Building schema here
    const schema = await buildSchema({
      resolvers: [EventResolver, UserResolver, BookingResolver]
    });
    // Create the GraphQL server
    const server = new ApolloServer({
      schema,
      context: (): IContext => {
        // TODO: example user Id
        return {
          userId: "5cdd9cc405d8e4567d8bb226"
        };
      },
      playground: true
    });
    // Start the server
    const { url } = await server.listen(process.env.PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  }
}

export default App;
