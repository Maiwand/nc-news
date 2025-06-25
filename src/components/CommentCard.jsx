import React, { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { getUser } from "../api";
import defaultAvatar from "../assets/default-user.jpg";

const CommentCard = ({ comment, currentUser }) => {
  const { comment_id, votes, created_at, author, body } = comment;

  const commentDate = new Date(created_at);

  const formatTimeAgo = (date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formatFullDate = (date) => {
    return format(date, "d MMMM yyyy - p");
  };

  const [authorAvatar, setAuthorAvatar] = useState("");
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [avatarError, setAvatarError] = useState(null);

  useEffect(() => {
    setIsLoadingAvatar(true);
    setAvatarError(null);

    getUser(author)
      .then((user) => {
        setAuthorAvatar(user.avatar_url);
        setIsLoadingAvatar(false);
      })
      .catch((err) => {
        console.log(`Error fetching avatar for comment author ${author}:`, err);
        setAvatarError("Could not load avatar");
        setIsLoadingAvatar(false);
        setAuthorAvatar(defaultAvatar);
      });
  }, [author]);

  const canDelete = currentUser && currentUser.username === author;

  return (
    <div className="comment-card">
      <div className="comment-meta-container">
        <div className="comment-meta">
          {isLoadingAvatar ? (
            <div className="profile-loading-avatar">...</div>
          ) : avatarError ? (
            <img
              src={authorAvatar}
              alt="Default Avatar"
              className="profile-avatar comment-avatar-small"
            />
          ) : (
            <img
              src={authorAvatar}
              alt={`${author}'s avatar`}
              className="profile-avatar comment-avatar-small"
            />
          )}
          <div className="comment-author-date">
            <div className="comment-author">{author}</div>
            <div className="comment-date" title={formatFullDate(commentDate)}>
              {formatTimeAgo(commentDate)}
            </div>
          </div>
        </div>
        {canDelete && (
          <button className="delete-comment-btn" disabled>
            Delete
          </button>
        )}
      </div>

      <p className="comment-body">{body}</p>
      <div className="comment-stats">
        <p>Votes: {votes}</p>
      </div>
    </div>
  );
};

export default CommentCard;
