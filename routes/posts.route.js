const express = require("express");
const router = express.Router();

const authmiddleware = require("../middlewares/auth-middleware.js");
const UsersController = require("../controllers/posts.controller.js");
const usersController = new UsersController();

router.get("/posts", usersController.loginUser);
router.get("/posts/:postId", usersController.loginUser);
router.post("/posts", authmiddleware, usersController.signupUser);
router.patch("/posts/:postId", authmiddleware, usersController.loginUser);
router.delete("/posts/:postId", authmiddleware, usersController.loginUser);

module.exports = router;
