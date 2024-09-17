import { getComments } from "../../api";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

const Comments = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    getComments(article_id)
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("error fetching data");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading comments....</p>;
  }
  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <>
      <h2>Comments ({comments.length})</h2>
      <div className="toCommentContainer">
        <form className="commentForm">
          <input placeholder="What do you think?" type="text"></input>

          <button type="button" className="signUpToComment">
            <p>Sign up to post</p>
          </button>
        </form>
      </div>
      <div className="commentsContainer">
        {comments.length === 0 ? (
          <h3>No comments yet</h3>
        ) : (
          comments.map((comment) => {
            return (
              <section key={comment.comment_id} className="commentCard">
                <h5>{comment.author}</h5>
                <h5>{moment(comment.created_at).startOf("hour").fromNow()}</h5>
                <p className="comment">{comment.body}</p>
              </section>
            );
          })
        )}
      </div>
    </>
  );
};

export default Comments;
