const express = require("express");
const router = express.Router();

const authmiddleware = require("../middlewares/auth-middleware.js");
const UsersController = require("../controllers/posts.controller.js");
const usersController = new UsersController();

router.get("/likes", authmiddleware, usersController.loginUser);
router.post("/posts/:postid/like", authmiddleware, usersController.signupUser);

module.exports = router;
