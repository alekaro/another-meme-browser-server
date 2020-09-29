"use strict";
var express = require("express");
var graphqlHTTP = require("express-graphql").graphqlHTTP;
var schema = require("./schema/schema");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();
// allow cross-origin requests
app.use(cors());
// Connect to MongoDB via mongoose ORM
mongoose.connect("mongodb://localhost/another-meme-browser-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once("open", function () {
    console.log("connected to database");
});
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000, function () {
    console.log("now listening for requests on port 4000");
});
