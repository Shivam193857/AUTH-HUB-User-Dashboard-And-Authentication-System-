const mongoose = require("mongoose");

// main()
// //   .then(() => {
// //     console.log("connection successful");
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// async function main() {
//   await mongoose.connect(
//     "mongodb+srv://shivam193857_db_user:1234567890@cluster0.4ixuwl9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   );
// }

async function main() {
try {
    await mongoose.connect(
      "mongodb+srv://shivam193857_db_user:1234567890@cluster0.4ixuwl9.mongodb.net/mernChatApp?retryWrites=true&w=majority&appName=Cluster0"
      // note the db name as mernChatApp
    );
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // stop app if connection fails
  }
} 

module.exports = main;

// connectDB is just defined and exported — not executed automatically.

// When you import it in server.js, it doesn’t connect immediately.

// You explicitly call connectDB() at the right time — usually before starting your server (after loading .env variables, etc.).

// This makes it reusable and controlled, and also prevents double connections when importing in other files.