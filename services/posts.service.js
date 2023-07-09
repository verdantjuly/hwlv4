const PostRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();
    return allPost.map((post) => {
      return {
        nickname: post.User.nickname,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        likesCount: post.likesCount,
      };
    });
  };
  findOnePost = async (postId) => {
    const onePost = await this.postRepository.findOnePost(postId);

    return {
      nickname: onePost.User.nickname,
      title: onePost.title,
      content: onePost.content,
      createdAt: onePost.createdAt,
      likesCount: onePost.likesCount,
    };
  };
  editPost = async (title, content, postId) => {
    const editPost = await this.postRepository.editPost(title, content, postId);

    return {
      title: editPost.title,
      content: editPost.content,
      createdAt: editPost.createdAt,
      updatedAt: editPost.updatedAt,
    };
  };
  deletePost = async (postId) => {
    const editPost = await this.postRepository.deletePost(postId);

    return {
      title: editPost.title,
      content: editPost.content,
      createdAt: editPost.createdAt,
      updatedAt: editPost.updatedAt,
    };
  };
  createOnePost = async (title, content, userId) => {
    const createPost = await this.postRepository.createOnePost(
      title,
      content,
      userId
    );

    return {
      title: createPost.title,
      createdAt: createPost.createdAt,
    };
  };
}

module.exports = PostService;
