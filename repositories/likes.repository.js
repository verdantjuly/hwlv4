const { Likes } = require("../models");
const { Op } = require("sequelize");

class LikeRepository {
  liker = async (postId, userId) => {
    const target = await Likes.findOne({
      where: { [Op.and]: [{ postId }, { userId }] },
    });
    if (!target) {
      const like = await Likes.create({ postId, userId });
      return like;
    } else {
      const like = await Likes.destroy({
        where: { [Op.and]: [{ postId }, { userId }] },
      });
      return like;
    }
  };
  likeslist = async (userId) => {
    const target = await Likes.findAll(
      { where: { userId } },
      { attributes: ["postId"] }
    );
    console.log(target);
  };
}
module.exports = LikeRepository;
