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
        console.log(post);
        return {
          ...post._doc,
          id: post._id,
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

function deletePost(req, res) {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
}

module.exports = {
  getPostsWithAuthor,
  getPosts,
  addPost,
  deletePost,
};
