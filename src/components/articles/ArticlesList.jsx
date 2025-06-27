import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import ErrorPage from "../ui/ErrorPage";
import Loading from "../ui/Loading";
import { useParams, useSearchParams } from "react-router";

const ArticlesList = () => {
  const { topic_slug } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getArticles(topic_slug, sortBy, order)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [topic_slug, sortBy, order]);

  if (isLoading) {
    return <Loading message="Loading articles..." />;
  }

  if (error) {
    if (error.status === 404) {
      return (
        <ErrorPage
          status={404}
          message="Topic not found. Try viewing all articles."
        />
      );
    }
    return (
      <ErrorPage
        status={error.status}
        message={error.msg || "Failed to load articles."}
      />
    );
  }

  return (
    <section className="articles-list-container col-span-2">
      <h2 className="hidden">All Articles</h2>
      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesList;
