const CommentService = require("../services/comments.service");

class CommentsController {
  commentService = new CommentService();
  viewcomments = async (req, res) => {
    const { postId } = req.params;
    const comments = await this.commentService.viewallcomments(postId);
    if (!comments[0]) {
      return res
        .status(200)
        .json({ message: "댓글이 없습니다. 첫 작성자가 되어 주세요." });
    } else if (comments) {
      return res.status(200).json({ comments });
    } else {
      return res.status(400).json({
        errorMessage: "댓글 조회에 실패하였습니다.",
      });
    }
  };
}

module.exports = CommentsController;
