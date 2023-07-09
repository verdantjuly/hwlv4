const { Comments, Users } = require("../models");

class CommentRepository {
  viewallcomments = async (postId) => {
    let comments = await Comments.findAll({
      where: { postId },
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
    });
    return comments;
  };
  writecomment = async (postId, userId, content) => {
    let comments = await Comments.create({ postId, userId, content });
    return comments;
  };
  updatecomment = async (commentId, userId, content) => {
    let comments = await Comments.update(
      { content },
      { where: { userId, commentId } }
    );
    return comments;
  };
}
module.exports = CommentRepository;
