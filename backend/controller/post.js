const Post = require("../models/post-schema");

function getPosts() {
  return Post.find()
    .then((posts) => {
      return posts.map((post) => {
        return { ...post._doc };
      });
    })
    .catch((err) => {
      throw err;
    });
}

function getPostsWithAuthor() {
  return Post.find()
    .populate("author")
    .then((posts) => {
      return posts.map((post) => {
        return {
          ...post._doc,
        };
      });
    })
    .catch((err) => {
      throw err;
    });
}

function addPost(req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
}

module.exports = {
  getPostsWithAuthor,
  getPosts,
  addPost,
};
