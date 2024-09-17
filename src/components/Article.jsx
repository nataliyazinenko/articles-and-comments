import { getArticle, patchArticle } from "../../api";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Comments from "./Comments";
import { GrLike, GrDislike } from "react-icons/gr";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);

  const handleVotePlus = () => {
    setVotes((oldValue) => oldValue + 1);
    patchArticle(article_id, 1);
    setVotes(oldValue);
  };

  const handleVoteMinus = () => {
    setVotes(() => -1);
    patchArticle(article_id, -1);
  };

  useEffect(() => {
    setError(null);
    getArticle(article_id)
      .then((data) => {
        setArticle(data.article);
        setVotes(data.article.votes);
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
        <button id="dislike" onClick={handleVoteMinus}>
          <GrDislike />
        </button>{" "}
        {votes}{" "}
        <button id="like" onClick={handleVotePlus}>
          <GrLike />
        </button>
        <p>{article.body}</p>
      </div>

      <Comments />
    </div>
  );
};

export default Article;
