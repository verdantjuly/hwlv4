const PostService = require("../services/posts.service");
const { Posts } = require("../models");

class PostsController {
  postService = new PostService();

  viewpostslist = async (req, res) => {
    const posts = await this.postService.findAllPost();
    if (posts && !posts[0]) {
      return res
        .status(200)
        .json({ message: "게시물이 없습니다. 첫 작성자가 되어 주세요." });
    } else if (posts) {
      return res.status(200).json({ posts });
    } else {
      return res.status(400).json({
        errorMessage: "게시물 조회에 실패하였습니다.",
      });
    }
  };

  viewonepost = async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await this.postService.findOnePost(postId);
      if (postId) {
        return res.status(200).json({ post });
      } else if (postId) {
        return res
          .status(400)
          .json({ errorMessage: "게시물 상세 조회에 실패하였습니다." });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ errorMessage: "게시물 상세 조회에 실패하였습니다." });
    }
  };

  createPost = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = res.locals;
    if (!title || !content) {
      return res.status(400).json({
        errorMessage: "미입력된 항목이 있습니다. 모두 입력하여 주세요.",
      });
    }
    const post = await this.postService.createOnePost(title, content, userId);
    if (post) {
      return res.status(200).json({ message: "게시물 작성에 성공하였습니다." });
    } else {
      return res
        .status(400)
        .json({ errorMessage: "게시물 작성에 실패하였습니다." });
    }
  };

  editPost = async (req, res) => {
    const { title, content } = req.body;
    const { postId } = req.params;
    const { userId } = res.locals;
    if (!title || !content || !postId) {
      return res.status(400).json({
        errorMessage: "미입력된 항목이 있습니다. 모든 항목을 입력해 주세요.",
      });
    }
    const target = await Posts.findOne({ where: { postId } });
    if (!target || target.userId !== userId) {
      return res.status(400).json({
        errorMessage: "게시글 수정에 실패하였습니다.",
      });
    }
    const post = await this.postService.editPost(title, content, postId);
    if (post) {
      return res.status(200).json({ message: "게시물 수정에 성공하였습니다." });
    } else {
      return res
        .status(400)
        .json({ errorMessage: "게시물 수정에 실패하였습니다." });
    }
  };
  deletePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals;
    if (!postId) {
      return res.status(400).json({
        errorMessage: "미입력된 항목이 있습니다. 모든 항목을 입력해 주세요.",
      });
    }
    const target = await Posts.findOne({ where: { postId } });
    if (!target || target.userId !== userId) {
      return res.status(400).json({
        errorMessage: "게시글 삭제에 실패하였습니다.",
      });
    }
    const post = await this.postService.deletePost(postId);
    if (post) {
      return res.status(200).json({ message: "게시물 삭제에 성공하였습니다." });
    } else {
      return res
        .status(400)
        .json({ errorMessage: "게시물 삭제에 실패하였습니다." });
    }
  };
}

module.exports = PostsController;
