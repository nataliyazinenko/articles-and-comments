import { getAllArticles } from "../../api";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import SortBy from "./SortBy";
import { GrLike } from "react-icons/gr";
import { LiaCommentAltSolid } from "react-icons/lia";

const ArticleList = () => {
  const { topic_name } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSortBy, setSelectedSortBy] = useState("");

  const sortByOptions = [
    {
      label: "Date, new to old",
      column: "created_at",
      order: "DESC",
    },
    {
      label: "Date, old to new",
      column: "created_at",
      order: "ASC",
    },
    {
      label: "Comment count, high to low",
      column: "comment_count",
      order: "DESC",
    },
    {
      label: "Comment count, low to high",
      column: "comment_count",
      order: "ASC",
    },
    {
      label: "Votes count, high to low",
      column: "votes",
      order: "DESC",
    },
    {
      label: "Votes count, low to high",
      column: "votes",
      order: "ASC",
    },
  ];

  let selectedOptionIndex;
  if (selectedSortBy === "") {
    selectedOptionIndex = 0;
  } else {
    selectedOptionIndex = selectedSortBy;
  }

  const selectedOption = sortByOptions[selectedOptionIndex];

  let sort_by;
  let order;
  if (selectedOption) {
    sort_by = selectedOption.column;
    order = selectedOption.order;
  } else {
    sort_by = undefined;
    order = undefined;
  }

  const query = {
    topic: topic_name,
    sort_by: sort_by,
    order: order,
  };

  useEffect(() => {
    setError(null);
    getAllArticles(query)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("No articles found...");
        setIsLoading(false);
      });
  }, [topic_name, sort_by, order]);

  if (isLoading) {
    return <p>Loading articles....</p>;
  }
  if (error) {
    return <h3 className="error">{error}</h3>;
  }

  return (
    <div>
      <SortBy
        sortByOptions={sortByOptions}
        selectedSortBy={selectedSortBy}
        setSelectedSortBy={setSelectedSortBy}
      />
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
                </Link>
                <h4>{moment(article.created_at).startOf("day").fromNow()}</h4>
                {article.votes} <GrLike /> {article.comment_count}{" "}
                <LiaCommentAltSolid />
              </div>
            </section>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
