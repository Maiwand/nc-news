import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticleById, getUser } from "../api";
import { formatDistanceToNow, format } from "date-fns";
import { Link } from "react-router";
import CommentsList from "./CommentsList";

const SingleArticlePage = ({ currentUser }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [authorAvatar, setAuthorAvatar] = useState("");
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [avatarError, setAvatarError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setIsLoading(false);
        return getUser(fetchedArticle.author);
      })
      .then((user) => {
        setAuthorAvatar(user.avatar_url);
        setIsLoadingAvatar(false);
      })
      .catch((err) => {
        console.log("Error fetching article or author avatar:", err);
        setError(
          err.message || "Failed to load article. Please check the URL."
        );
        setIsLoading(false);
        setIsLoadingAvatar(false);
        setAuthorAvatar("../assets/default-user.jpg");
      });
  }, [article_id]);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy");
  };

  if (isLoading) {
    return <p className="loading-message">Loading article...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!article) {
    return <p className="error-message">Article data not available.</p>;
  }

  return (
    <>
      <div className="article-content-main col-span-2">
        <div className="title-bar">
          <h2 className="article-title">{article.title}</h2>
          <div className="article-topic">
            <p className={article.topic}>{article.topic}</p>
          </div>
        </div>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-full-image"
        />
        <p className="article-body">{article.body}</p>
        <div className="article-stats-container article-buttons">
          <div className="article-stats">
            <p>Votes: 0</p>
            <p>Comments: 11</p>
          </div>
        </div>
        <CommentsList article_id={article_id} currentUser={currentUser} />
      </div>

      <aside className="article-sidebar">
        <p className="time-ago" title={formatFullDate(article.created_at)}>
          Posted {formatTimeAgo(article.created_at)} By
        </p>
        <div className="sidebar-author-card">
          {isLoadingAvatar ? (
            <div className="profile-loading-avatar avatar-sidebar"></div>
          ) : (
            <img
              src={authorAvatar}
              alt={`${article.author}'s avatar`}
              className="profile-avatar avatar-sidebar"
            />
          )}
          <p>{article.author}</p>
        </div>
        <button className="view-profile-btn">View Profile</button>
      </aside>
    </>
  );
};

export default SingleArticlePage;
