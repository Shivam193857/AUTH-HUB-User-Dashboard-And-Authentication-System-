//this controller creates a new user in the db on sign up

// a controller is a JavaScript file (or function) that handles the logic for each route in your backend.

// A controller:
// 1. Receives requests from the client (via Express routes),
// 2. Interacts with the database (using Models),
// 3. Processes the data (validates, modifies, etc.),
// 4. Sends a response (JSON, message, status, etc.) back to the client.

// we need to install express-async-handler pkg
// what it does, say
// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// OR
// const asyncHandler = require("express-async-handler");
// const getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find();   // if this throws an error
//   res.json(users);                   // express-async-handler catches it automatically
// });

// req.body (short for request body) is the data sent by the client (like frontend or Postman) in the body of an HTTP request — usually for methods like POST, PUT, or PATCH. (when we do sign up, post req send the data in key val pair in json form in req.body obj to the backend)

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400); //bad request 404, setting status inside 400 and paired with .send or .json or can throw error
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email: email });
  // if both key and val are same then we can write only key inside{} in findOne
  // see in the .create() below

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const newUser = await User.create({ name, email, password, pic });
  //newUser is the document created for User collection(very imp to add await)

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic, //see password is not sent
      token: generateToken(newUser._id),
    });
    //controller sending json or res
    //201 for resource created successfully
  } else {
    res.status(400);
    throw new Error("Failed to create the new user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const currUser = await User.findOne({ email });

  if (currUser && (await currUser.matchPassword(password))) {
    res.json({
      _id: currUser._id,
      name: currUser.name,
      email: currUser.email,
      pic: currUser.pic, //see password is not sent
      token: generateToken(currUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});

// backend/controllers/userControllers.js
const getProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.pic) user.pic = req.body.pic;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get full doc

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne(); // use deleteOne() instead of remove()
  res.json({ message: "User deleted successfully" });
});


module.exports = { registerUser, authUser, getProfile, updateProfile, deleteAccount };


// module.exports = { registerUser, authUser };
