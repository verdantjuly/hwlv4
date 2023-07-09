const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  viewallcomments = async (postId) => {
    const allcomments = await this.commentRepository.viewallcomments(postId);
    allcomments.sort((prev, next) => {
      return next.createdAt - prev.createdAt;
    });
    return allcomments.map((comment) => {
      return {
        nickname: comment.User.nickname,
        content: comment.content,
        createdAt: comment.createdAt,
      };
    });
  };
}

module.exports = CommentService;
