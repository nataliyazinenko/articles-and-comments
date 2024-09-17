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
  const [myVote, setMyVote] = useState(null);

  const buttonLikeHighlighted = myVote === 1;
  const buttonDislikeHighlighted = myVote === -1;

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

    const savedVotes = localStorage.getItem(`votes_${article_id}`);

    if (savedVotes !== null) {
      setMyVote(JSON.parse(savedVotes));
    }
  }, [article_id]);

  const handleVotePlus = () => {
    if (myVote === 1) {
      setVotes((oldValue) => oldValue - 1);
      setMyVote(null);
      patchArticle(article_id, -1)
        .then((res) => {
          setMyVote(null);
          localStorage.removeItem(`votes_${article_id}`);
        })
        .catch((err) => {
          setMyVote(1);
          setVotes((oldValue) => oldValue + 1);
        });
    } else if (myVote === -1) {
      setVotes((oldValue) => oldValue + 2);
      patchArticle(article_id, 2);
      setMyVote(1);
      localStorage.setItem(`votes_${article_id}`, 1);
    }

    // setMyVote(-1);
    else if (myVote === null) {
      setVotes((oldValue) => oldValue + 1);
      patchArticle(article_id, 1);
      setMyVote(1);
      localStorage.setItem(`votes_${article_id}`, 1);
    }

    // setMyVote(null)
  };

  const handleVoteMinus = () => {
    if (myVote === -1) {
      setVotes((oldValue) => oldValue + 1);
      patchArticle(article_id, 1);
      setMyVote(null);
      localStorage.removeItem(`votes_${article_id}`);
    } else if (myVote === 1) {
      setVotes((oldValue) => oldValue - 2);
      patchArticle(article_id, -2);
      setMyVote(-1);
      localStorage.setItem(`votes_${article_id}`, -1);
    } else if (myVote === null) {
      setVotes((oldValue) => oldValue - 1);
      patchArticle(article_id, -1);
      setMyVote(-1);
      localStorage.setItem(`votes_${article_id}`, -1);
    }
  };

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
        <button
          id="dislike"
          onClick={handleVoteMinus}
          className={
            buttonDislikeHighlighted
              ? "buttonDislikeHighlighted"
              : "buttonNotHighlighted"
          }
        >
          <GrDislike />
        </button>{" "}
        {votes}{" "}
        <button
          id="like"
          onClick={handleVotePlus}
          className={
            buttonLikeHighlighted
              ? "buttonLikeHighlighted"
              : "buttonNotHighlighted"
          }
        >
          <GrLike />
        </button>
        <p>{article.body}</p>
      </div>

      <Comments />
    </div>
  );
};

export default Article;
