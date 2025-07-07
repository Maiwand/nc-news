import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getTopics } from "../../api";

const TopicsNav = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic_slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching topics:", err);
        setError("Failed to load topics.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loader-inline"></div>;
  }

  if (error) {
    return <p className="topics-nav-error">{error}</p>;
  }
  return (
    <ul className="topics-list">
      <li>
        <Link
          to="/"
          className={`topic-link ${!topic_slug ? "active-topic-link" : ""}`}
        >
          All Articles
        </Link>
      </li>
      {topics.map((topic) => (
        <li key={topic.slug}>
          <Link
            to={`/topics/${topic.slug}`}
            className={`topic-link ${
              topic_slug === topic.slug ? "active-topic-link" : ""
            }`}
          >
            {topic.slug}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TopicsNav;
