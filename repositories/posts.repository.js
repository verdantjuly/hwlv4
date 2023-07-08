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

    const likesCount = await Likes.count({
      where: { postId },
    });
    post.likesCount = likesCount;
    return post;
  };
  createOnePost = async (title, content, userId) => {
    const post = await Posts.create({
      title,
      content,
      userId,
    });
    return post;
  };
  editPost = async (title, content, postId) => {
    const post = await Posts.update(
      {
        title,
        content,
      },
      { where: { postId } }
    );
    return post;
  };
}

module.exports = PostRepository;
