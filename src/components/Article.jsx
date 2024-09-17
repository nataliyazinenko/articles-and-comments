import { getArticle } from "../../api";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Comments from "./Comments";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    getArticle(article_id)
      .then((data) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("error fetching data");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div>
      <div className="articleContainer">
        <h3 className="articleCardTopic">
          {article.topic[0].toUpperCase() + article.topic.slice(1)}
        </h3>
        <img className="articleImage" src={article.article_img_url}></img>
        <h1>{article.title}</h1>
        <h3>By {article.author}</h3>
        <h4>{moment(article.created_at).startOf("day").fromNow()}</h4>
        <p>{article.body}</p>
      </div>
      <Comments />
    </div>
  );
};

export default Article;
