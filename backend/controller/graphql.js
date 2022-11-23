const { buildSchema } = require("graphql");
const { getPostsWithAuthor } = require("./post");
const { getUsers } = require("./user");

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

module.exports = { schema, root };
