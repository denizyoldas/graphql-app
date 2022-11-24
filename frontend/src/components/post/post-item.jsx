import React from "react";

const PostItem = ({ id, title, content, userName }) => {
  const postContent =
    content.length > 100 ? content.slice(0, 100) + "..." : content;

  const postDelete = () => {
    fetch("http://localhost:3000/posts/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-slate-300 rounded-md py-2 px-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-lg">{postContent}</p>
      <p className="text-lg">{userName}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={postDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default PostItem;
