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
  writecomment = async (postId, userId, content) => {
    const comment = await this.commentRepository.writecomment(
      postId,
      userId,
      content
    );
    return {
      content: comment.content,
      createdAt: comment.createdAt,
    };
  };
  updatecomment = async (commentId, userId, content) => {
    const comment = await this.commentRepository.updatecomment(
      commentId,
      userId,
      content
    );
    return {
      content: comment.content,
      createdAt: comment.createdAt,
    };
  };
  removecomment = async (commentId, userId) => {
    const comment = await this.commentRepository.removecomment(
      commentId,
      userId
    );
    return {
      content: comment.content,
      createdAt: comment.createdAt,
    };
  };
}

module.exports = CommentService;
