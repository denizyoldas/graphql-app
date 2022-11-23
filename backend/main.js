const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();
const mongoose = require("mongoose");

const { addPost } = require("./controller/post");
const { addUser } = require("./controller/user");
const { schema, root } = require("./controller/graphql");

app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
app.post("/user", addUser);
app.post("/post", addPost);

mongoose
  .connect("mongodb://localhost:27017/graphql", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  });

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
