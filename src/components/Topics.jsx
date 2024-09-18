import { getTopics } from "../../api";
import React, { useState, useEffect } from "react";

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

  console.log("!!!!", topics);

  return (
    <div className="topics">
      <ul>
        {topics.map((topic) => {
          return <h2>{topic.slug}</h2>;
        })}
      </ul>
    </div>
  );
};

export default Topics;
