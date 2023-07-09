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
}
module.exports = CommentRepository;
