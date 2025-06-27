import React, { useState } from "react";
import { postComment } from "../../api";

const PostCommentForm = ({ article_id, currentUser, setComments }) => {
  const [newCommentBody, setNewCommentBody] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [postCommentError, setPostCommentError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newCommentBody.trim()) {
      setPostCommentError("Comment cannot be empty.");
      return;
    }

    setIsPostingComment(true);
    setPostCommentError(null);
    setSubmissionSuccess(false);

    const commentToPost = {
      username: currentUser.username,
      body: newCommentBody,
      comment_id: `temp-${Date.now()}`,
      created_at: new Date().toISOString(),
      votes: 0,
      author: currentUser.username,
    };

    setComments((currentComments) => [commentToPost, ...currentComments]);
    setNewCommentBody("");

    postComment(article_id, commentToPost.username, commentToPost.body)
      .then((postedComment) => {
        setIsPostingComment(false);
        setSubmissionSuccess(true);
        setComments((currentComments) =>
          currentComments.map((comment) =>
            comment.comment_id === commentToPost.comment_id
              ? postedComment
              : comment
          )
        );
        setTimeout(() => setSubmissionSuccess(false), 5000);
      })
      .catch((err) => {
        setIsPostingComment(false);
        setComments((currentComments) =>
          currentComments.filter(
            (comment) => comment.comment_id !== commentToPost.comment_id
          )
        );
        setPostCommentError(
          err.message || "Failed to post comment. Please try again."
        );
        console.error("Comment post error:", err);
        setNewCommentBody(commentToPost.body);
      });
  };

  return (
    <div className="add-comment-form-container">
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newCommentBody}
          onChange={(e) => setNewCommentBody(e.target.value)}
          placeholder="Write your comment here..."
          required
          rows={4}
          disabled={isPostingComment}
        ></textarea>
        {postCommentError && (
          <p className="comment-error-message">{postCommentError}</p>
        )}
        {submissionSuccess && (
          <p className="comment-success-message">Comment posted!</p>
        )}
        <button
          type="submit"
          disabled={isPostingComment || !newCommentBody.trim()}
        >
          {isPostingComment ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default PostCommentForm;
