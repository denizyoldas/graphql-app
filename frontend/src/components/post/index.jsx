import React from "react";
import PostItem from "./post-item";
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
  {
    posts {
      id
      title
      content
      author {
        name
      }
    }
  }
`;

const Index = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="grid grid-cols-1 gap-8">
      {data.posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          userName={post.author.name}
        />
      ))}
    </div>
  );
};

export default Index;
