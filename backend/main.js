const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
const mongoose = require("mongoose");

const { getPostsWithAuthor, getPosts, addPost } = require("./controller/post");
const { getUsers, addUser } = require("./controller/user");

mongoose
  .connect("mongodb://localhost:27017/graphql", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  });

const schema = buildSchema(`
	type Query {
		users: [User!]!
		posts: [Post!]!
	}

	type User {
		id: ID!
		name: String!
		age: Int!
	}

	type Post {
		id: ID!
		title: String!
		content: String!
		author: User!
	}
`);

const root = {
  users: () => {
    return getUsers();
  },
  posts: () => {
    return getPostsWithAuthor();
  },
};

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

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
