const express = require("express");
const app = express();
const main = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

const connectDB = async () => {
  console.log("Connecting to MongoDB....")
  await main(); //connecting to mongoose atlas server
  app.listen(5000, console.log("Server has started on port 5000"));
};
connectDB(); // i made this function as async because i wanted to connect to db before the server gets started at port 5000

app.use(express.json());  // <— important! parse JSON body

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/api/user", userRoutes); //every req starting with this path are defined in userRoutes file (that is every route for this path is defined in this file)

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   const { id } = req.params; //const id = req.params.id; equivalent
//   const singleChat = chats.find((c) => c._id === id);
//   res.send(singleChat);
// });

//.find() is an array method.
// It returns the first element in the array that satisfies a given condition.
// If no element satisfies the condition, it returns undefined.
// Different from .filter():
// .filter() returns all elements that match as an array.
// .find() stops at the first match.

app.use(notFound);
//if route like say /api/user/lo then it will handled in this notFound middleware and then in this errorHandler middleware
app.use(errorHandler);
