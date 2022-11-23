const User = require("../models/user-schema");

function getUsers() {
  return User.find()
    .then((users) => {
      return users.map((user) => {
        return { ...user._doc };
      });
    })
    .catch((err) => {
      throw err;
    });
}

function addUser(req, res) {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
  });
  user.save().then((createdUser) => {
    res.status(201).json({
      message: "User added successfully",
      userId: createdUser._id,
    });
  });
}

module.exports = {
  getUsers,
  addUser,
};
