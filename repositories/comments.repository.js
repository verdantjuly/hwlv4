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
    let comment = await Comments.create({ postId, userId, content });
    return comment;
  };

  updatecomment = async (commentId, userId, content) => {
    let comment = await Comments.update(
      { content },
      { where: { userId, commentId } }
    );
    return comment;
  };

  removecomment = async (commentId, userId) => {
    let comment = await Comments.destroy({ where: { userId, commentId } });
    return comment;
  };
}
module.exports = CommentRepository;
