const { Posts, Users, Likes } = require("../models");

class PostRepository {
  findAllPost = async () => {
    const posts = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    await posts.map((post) => {
      const likesCount = Likes.count({
        where: {
          postId: Number(post.postId),
        },
      });
      return { ...post, likesCount };
    });

    return posts;
  };
  findOnePost = async (postId) => {
    let post = await Posts.findOne({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      order: [["createdAt", "DESC"]],
      where: { postId },
    });

    const likesCount = Likes.count({
      where: { postId },
    });
    post = { ...post, likesCount };

    return post;
  };
}

module.exports = PostRepository;
