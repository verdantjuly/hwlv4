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
      res.status(200).json({
        errorMessage: "게시물 조회에 실패하였습니다.",
      });
    }
  };
  viewonepost = async (req, res) => {
    const { postId } = req.params;
    const post = await this.postService.findOnePost(postId);
    if (post.postId) {
      res.status(200).json({ post });
    } else {
      res
        .status(400)
        .json({ errorMessage: "게시물 상세 조회에 실패하였습니다." });
    }
  };
}

module.exports = PostsController;
