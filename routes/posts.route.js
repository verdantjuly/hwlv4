const express = require("express");
const router = express.Router();

const authmiddleware = require("../middlewares/auth-middleware.js");
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/posts", postsController.viewpostslist);
router.get("/posts/:postId", postsController.viewonepost);
router.post("/posts", authmiddleware, postsController.createpost);
router.patch("/posts/:postId", authmiddleware, postsController.editpost);
router.delete("/posts/:postId", authmiddleware, postsController.deletepost);

module.exports = router;
