const PostRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    return allPost.map((post) => {
      return {
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        likesCount: post.likesCount,
      };
    });
  };
  findOnePost = async (postId) => {
    const onePost = await this.postRepository.findOnePost(postId);

    return onePost;
  };
}

module.exports = PostService;
