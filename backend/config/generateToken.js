// JWT (JSON Web Token) is a string token (like a long random-looking text) that contains some encoded data — usually the user’s ID and other information.
// It’s made up of three parts(Header,payload,signature), separated by dots:
// xxxxx.yyyyy.zzzzz
// Header → tells which algorithm and type of token it is,Payload → contains user information (e.g., user ID, email in form of json),Signature → ensures the token wasn’t changed. It’s created using a secret key on the server.

//2. How JWT authentication works

// Here’s the flow
//i. User logs in
// → User sends their email & password to the server.
// ii. Server verifies credentials
// → If valid, server creates a JWT containing the user’s ID and signs it using a secret key.
// iii.Server sends JWT to client
// → The frontend (React app) stores this token (usually in localStorage or cookies).
// iv. Client uses JWT for requests
// → When making API requests to protected routes, the client sends the token in the Authorization header:

// 3. Why use JWT?
// Stateless — server doesn’t need to store sessions in memory.
// Secure — data is signed, so it can’t be tampered with.
// Portable — works across different servers and platforms.
// Fast — only requires decoding and verification, no DB lookup for session.

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "MY_SECRET_KEY", { expiresIn: "30d" });
  //sign() expect first and third arg to be object
  //we can store the key in envirnoment variable for security
  // the secret key is a simple string, not an object.
};

module.exports = generateToken;
