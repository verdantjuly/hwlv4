const express = require("express");
const router = express.Router();

const authmiddleware = require("../middlewares/auth-middleware.js");
const UsersController = require("../controllers/posts.controller.js");
const usersController = new UsersController();

// router.get("/posts/:postId/comments", usersController.loginUser);
// router.post(
//   "/posts/:postId/comments",
//   authmiddleware,
//   usersController.signupUser
// );
// router.patch(
//   "/posts/:postId/comments/:commentId",
//   authmiddleware,
//   usersController.loginUser
// );
// router.delete(
//   "/posts/:postid/comments/:commentId",
//   authmiddleware,
//   usersController.loginUser
// );

module.exports = router;
