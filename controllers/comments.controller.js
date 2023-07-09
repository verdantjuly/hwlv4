const CommentService = require("../services/comments.service");
const { Comments } = require("../models");

class CommentsController {
  commentService = new CommentService();
  viewcomments = async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({
        errorMessage: "댓글 조회에 실패하였습니다.",
      });
    }
    try {
      const comments = await this.commentService.viewallcomments(postId);
      if (!comments[0].content) {
        return res
          .status(200)
          .json({ message: "댓글이 없습니다. 첫 작성자가 되어 주세요." });
      } else if (comments[0].content) {
        return res.status(200).json({ comments });
      } else {
        return res.status(400).json({
          errorMessage: "댓글 조회에 실패하였습니다.",
        });
      }
    } catch (err) {
      return res.status(400).json({
        errorMessage: "댓글 조회에 실패하였습니다.",
      });
    }
  };
  createcomments = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        errorMessage: "댓글 내용을 입력해주세요",
      });
    }
    const comments = await this.commentService.writecomment(
      postId,
      userId,
      content
    );
    if (comments) {
      return res.status(200).json({ message: "댓글 작성에 성공하였습니다." });
    } else {
      return res.status(400).json({
        errorMessage: "댓글 작성에 실패하였습니다.",
      });
    }
  };
  editcomment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        errorMessage: "댓글 내용을 입력해주세요",
      });
    }
    if (!commentId) {
      return res.status(400).json({
        errorMessage: "댓글 수정에 실패하였습니다.",
      });
    }
    const target = await Comments.findOne({ where: { commentId } });
    if (!target || target.userId !== userId) {
      return res.status(400).json({
        errorMessage: "댓글 수정에 실패하였습니다.",
      });
    }
    const comments = await this.commentService.updatecomment(
      commentId,
      userId,
      content
    );
    if (comments) {
      return res.status(200).json({ message: "댓글 수정에 성공하였습니다." });
    } else {
      return res.status(400).json({
        errorMessage: "댓글 수정에 실패하였습니다.",
      });
    }
  };
  deletecomment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals;
    if (!commentId) {
      return res.status(400).json({
        errorMessage: "댓글 삭제에 실패하였습니다.",
      });
    }
    const target = await Comments.findOne({ where: { commentId } });
    if (!target || target.userId !== userId) {
      return res.status(400).json({
        errorMessage: "댓글 삭제에 실패하였습니다.",
      });
    }

    const comments = await this.commentService.removecomment(commentId, userId);
    if (comments && !comments.content) {
      return res.status(200).json({ message: "댓글 삭제에 성공하였습니다." });
    } else {
      return res.status(400).json({
        errorMessage: "댓글 삭제에 실패하였습니다.",
      });
    }
  };
}

module.exports = CommentsController;
