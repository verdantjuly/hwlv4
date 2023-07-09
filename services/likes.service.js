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
  likeslist = async (userId) => {
    const likeslist = await this.likeRepository.likeslist(userId);
    likeslist.sort((a, b) => {
      return b.likesCount - a.likesCount;
    });
    return likeslist.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        likesCount: post.likesCount,
      };
    });
  };
}

module.exports = LikeService;
