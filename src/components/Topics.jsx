import { getTopics, getAllArticles } from "../../api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    getTopics()
      .then((data) => {
        setTopics(data.topics);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("error fetching topics");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading topics....</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="topics">
      <ul>
        {topics.map((topic) => {
          return (
            <section key={topic.slug} className="topic">
              <Link to={`/topic_articles/${topic.slug}`} className="topicLink">
                <h2 className="topics">{topic.slug.toUpperCase()}</h2>
              </Link>
            </section>
          );
        })}
      </ul>
    </div>
  );
};

export default Topics;
