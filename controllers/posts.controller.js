const PostService = require("../services/posts.service");

class PostsController {
  postService = new PostService();

  viewpostslist = async (req, res) => {
    const posts = await this.postService.findAllPost();
    if (posts.length == 0) {
      res
        .status(200)
        .json({ message: "게시물이 없습니다. 첫 작성자가 되어 주세요." });
    } else if (posts.length > 1) {
      res.status(200).json({ posts });
    } else {
      res.status(400).json({
        errorMessage: "게시물 조회에 실패하였습니다.",
      });
    }
  };

  viewonepost = async (req, res) => {
    const { postId } = req.params;
    const post = await this.postService.findOnePost(postId);
    try {
      if (postId) {
        res.status(200).json({ post });
      } else if (postId) {
        res
          .status(400)
          .json({ errorMessage: "게시물 상세 조회에 실패하였습니다." });
      }
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "게시물 상세 조회에 실패하였습니다." });
    }
  };

  createPost = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = res.locals;
    if (!title || !content) {
      res.status(400).json({
        errorMessage: "미입력된 항목이 있습니다. 모두 입력하여 주세요.",
      });
    }
    const post = await this.postService.createOnePost(title, content, userId);
    if (post) {
      res.status(200).json({ message: "게시물 작성에 성공하였습니다." });
    } else {
      res.status(400).json({ errorMessage: "게시물 작성에 실패하였습니다." });
    }
  };

  editPost = async (req, res) => {
    const { title, content } = req.body;
    const { postId } = req.params;
    if (!title || !content || !postId) {
      res.status(400).json({
        errorMessage: "미입력된 항목이 있습니다. 모든 항목을 입력해 주세요.",
      });
    }
    const post = await this.postService.editPost(title, content, postId);
    if (post) {
      res.status(200).json({ message: "게시물 수정에 성공하였습니다." });
    } else {
      res.status(400).json({ errorMessage: "게시물 수정에 실패하였습니다." });
    }
  };
  deletePost = async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
      res.status(400).json({
        errorMessage: "미입력된 항목이 있습니다. 모든 항목을 입력해 주세요.",
      });
    }
    const post = await this.postService.deletePost(postId);
    if (post) {
      res.status(200).json({ message: "게시물 삭제에 성공하였습니다." });
    } else {
      res.status(400).json({ errorMessage: "게시물 삭제에 실패하였습니다." });
    }
  };
}

module.exports = PostsController;
