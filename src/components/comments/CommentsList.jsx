import React, { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../api";
import CommentCard from "./CommentCard";
import PostCommentForm from "../comments/PostCommentForm";
import Loading from "../ui/Loading";

const CommentsList = ({ article_id, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getCommentsByArticleId(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching comments:", err);
        setError(err.message || "Failed to load comments.");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <Loading message="Loading comments..." />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section className="comments-section-container">
      <PostCommentForm
        article_id={article_id}
        currentUser={currentUser}
        setComments={setComments}
      />
      <h3>Comments</h3>
      <div className="comments-section">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet.</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                currentUser={currentUser}
                setComments={setComments}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentsList;
