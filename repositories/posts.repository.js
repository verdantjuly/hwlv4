const { Posts, Users } = require("../models");

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
}

module.exports = PostRepository;
