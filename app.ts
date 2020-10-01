const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
import mongoose from "mongoose";
const app = express();

// allow cross-origin requests
app.use(cors());

// Connect to MongoDB via mongoose ORM
const main = async () => {
  await mongoose.connect("mongodb://localhost/another-meme-browser-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(4000, () => {
    console.log("now listening for requests on port 4000");
  });
};

main();
