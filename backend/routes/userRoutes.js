// const express = require("express");
// const { registerUser, authUser } = require("../controllers/userControllers");
// const router = express.Router();

// router.use(express.json());
// //must in new version
// // By default, Express doesn’t know how to read that JSON data (say received from post req) — it only receives raw text.
// // So, you must tell it:
// // “Hey Express, whenever you get JSON data, convert it into a JavaScript object that I can use.”

// router.route("/").post(registerUser);
// //this is the path for /api/user/
// //route() for request meth chaining (can use post only also)
// // as while doing signup we send a post req with key val pairs in req.body in json
// router.post("/login", authUser);
// module.exports = router;

const express = require("express");
const { registerUser, authUser, getProfile, updateProfile, deleteAccount } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(express.json());

router.route("/").post(registerUser);
router.post("/login", authUser);

// Dashboard / profile routes
router.get("/profile", protect, getProfile);
router.put("/update", protect, updateProfile);
router.delete("/delete", protect, deleteAccount);

module.exports = router;
