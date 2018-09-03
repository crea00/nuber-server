// In alphabet sequence & module -> library
import { Options } from "graphql-yoga";
import { createConnection } from 'typeorm';
import app from "./app";
import ConnectionOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(ConnectionOptions).then(() => {
  app.start(appOptions, handleAppStart);
});
