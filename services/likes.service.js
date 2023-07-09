const LikeRepository = require("../repositories/likes.repository");

class LikeService {
  likeRepository = new LikeRepository();
  liker = async (postId, userId) => {
    const liker = await this.likeRepository.liker(postId, userId);
    return {
      postId: liker.postId,
      userId: liker.userId,
    };
  };
}

module.exports = LikeService;
