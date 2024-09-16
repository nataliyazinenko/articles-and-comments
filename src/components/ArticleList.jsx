import { getAllArticles } from "../../api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import SortBy from "./SortBy";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    getAllArticles()
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("error fetching data");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading items....</p>;
  }
  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div>
      <SortBy />
      <ul>
        {articles.map((article) => {
          return (
            <section key={article.article_id} className="articleCard">
              <div className="clickArticleContainer">
                <h3 className="articleCardTopic">
                  {article.topic[0].toUpperCase() + article.topic.slice(1)}
                </h3>
                <Link
                  to={`/articles/${article.article_id}`}
                  className="titleLink"
                >
                  <img
                    className="articleListImage"
                    src={article.article_img_url}
                  ></img>

                  <h2>{article.title}</h2>

                  <h4>BY {article.author.toUpperCase()}</h4>
                  <h4>{moment(article.created_at).startOf("day").fromNow()}</h4>
                </Link>
              </div>

              <div>
                <button type="voteButton" className="vote">
                  <p>-</p>
                </button>{" "}
                {article.votes} votes{" "}
                <button type="voteButton" className="vote">
                  <p>+</p>
                </button>{" "}
              </div>

              <a>{article.comment_count} Comments</a>
            </section>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
