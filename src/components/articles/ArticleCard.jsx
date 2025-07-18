import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { formatDistanceToNow, format } from "date-fns";
import { getUser } from "../../api";
import defaultAvatar from "../../assets/default-user.jpg";
import VoteButton from "../ui/VoteButton";
import Loading from "../ui/Loading";

const ArticleCard = ({ article }) => {
  const {
    article_id,
    title,
    author,
    topic,
    created_at,
    votes,
    comment_count,
    article_img_url,
  } = article;

  const articleDate = new Date(created_at);

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
        console.log(`Error fetching avatar for ${author}:`, err);
        setAvatarError("Could not load avatar");
        setIsLoadingAvatar(false);
        setAuthorAvatar(defaultAvatar);
      });
  }, [author]);

  return (
    <div className="article-card">
      <div className="article-card-meta">
        {isLoadingAvatar ? (
          <Loading variant="inline-loader" />
        ) : avatarError ? (
          <img
            src={authorAvatar}
            alt="Default Avatar"
            className="profile-avatar"
          />
        ) : (
          <img
            src={authorAvatar}
            alt={`${author}'s avatar`}
            className="profile-avatar"
          />
        )}
        <div className="author-name">{author}</div>
        <span>·</span>

        <div className="time-ago" title={formatFullDate(articleDate)}>
          {formatTimeAgo(articleDate)}
        </div>
      </div>
      <Link to={`/articles/${article_id}`}>
        <div className="article-title">
          <h3>{title}</h3>
        </div>
      </Link>
      <Link className="w-fit" to={`/topics/${topic}`}>
        <div className="article-topic">
          <p className={topic}>{topic}</p>
        </div>
      </Link>
      <Link to={`/articles/${article_id}`}>
        <img src={article_img_url} alt={title} className="article-card-image" />
      </Link>
      <div className="article-buttons">
        <div className="article-stats">
          <VoteButton article_id={article_id} initialVotes={votes} />
          <p>Comments: {comment_count}</p>
        </div>
        <Link className="article-link" to={`/articles/${article_id}`}>
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
