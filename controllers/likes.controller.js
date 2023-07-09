const LikeService = require("../services/likes.service");

class LikesController {
  likeService = new LikeService();
  liker = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals;
    const likes = await this.likeService.liker(postId, userId);
    if (likes) {
      res.status(200).json({ message: "좋아요 적용에 성공하였습니다." });
    } else {
      res.status(400).json({ message: "좋아요 적용에 실패하였습니다." });
    }
  };
  likeslist = async (req, res) => {
    const { userId } = res.locals;
    const likes = await this.likeService.likeslist(userId);
    if (likes) {
      res.status(200).json({ message: "좋아요 게시글 조회에 성공하였습니다." });
    } else {
      res.status(400).json({ message: "좋아요 적용에 실패하였습니다." });
    }
  };
}

module.exports = LikesController;
