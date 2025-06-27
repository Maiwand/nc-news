import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticleById, getUser } from "../api";
import { formatDistanceToNow, format } from "date-fns";
import CommentsList from "./CommentsList";
import VoteButton from "./VoteButton";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

const SingleArticlePage = ({ currentUser }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [authorAvatar, setAuthorAvatar] = useState("");
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);

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
        console.error("Error fetching article or avatar:", err);
        setError(err);
        setIsLoading(false);
        setIsLoadingAvatar(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <Loading message="Loading article..." />;
  }

  if (error) {
    if (error.status === 404) {
      return (
        <ErrorPage
          status={404}
          message="Article not found. Try returning to the articles list."
        />
      );
    }
    return (
      <ErrorPage
        status={error.status}
        message={error.msg || "Failed to load article. Please check the URL."}
      />
    );
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
            <VoteButton article_id={article_id} initialVotes={article.votes} />
            <p>Comments: {article.comment_count}</p>
          </div>
        </div>
        <CommentsList article_id={article_id} currentUser={currentUser} />
      </div>

      <aside className="article-sidebar">
        <p
          className="time-ago"
          title={format(article.created_at, "d MMMM yyyy - p")}
        >
          Posted{" "}
          {formatDistanceToNow(new Date(article.created_at), {
            addSuffix: true,
          })}{" "}
          By
        </p>
        <div className="sidebar-author-card">
          {isLoadingAvatar ? (
            <Loading className="avatar-loading" />
          ) : (
            <img
              src={authorAvatar}
              alt={`${article.author}'s avatar`}
              className="profile-avatar avatar-sidebar"
            />
          )}
          <p>{article.author}</p>
        </div>
        <button className="view-profile-btn" disabled>
          View Profile
        </button>
      </aside>
    </>
  );
};

export default SingleArticlePage;
