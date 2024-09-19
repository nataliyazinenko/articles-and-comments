import { getComments, deleteComment } from "../../api";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CommentAdder from "./CommentAdder";
import { CURRENT_USER } from "../constants";

const Comments = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  const handleDelete = (comment_id) => {
    setIsDeleting(comment_id);
    deleteComment(comment_id)
      .then(() => {
        setComments((oldValue) => {
          const newValue = oldValue.filter(
            (comment) => comment.comment_id !== comment_id
          );
          return newValue;
        });
      })
      .catch((error) => {
        setError("This comment has not been deleted");
      });
    setIsDeleting(null);
  };

  useEffect(() => {
    setError(null);
    getComments(article_id)
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Sorry about that, there was an error loading comments");
        setIsLoading(false);
      });
  }, [article_id]);

  const addNewComment = (newComment) => {
    setComments((oldComments) => [newComment, ...oldComments]);
  };

  if (isLoading) {
    return <p>Loading comments....</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2>Comments ({comments.length})</h2>

      <CommentAdder addNewComment={addNewComment} />

      <div className="commentsContainer">
        {comments.length === 0 ? (
          <h3>No comments yet</h3>
        ) : (
          comments.map((comment) => {
            return (
              <section key={comment.comment_id} className="commentCard">
                {comment.author === CURRENT_USER ? (
                  <button onClick={() => handleDelete(comment.comment_id)}>
                    x
                  </button>
                ) : null}
                <h5>
                  {comment.author}
                  <br />
                  {moment(comment.created_at).startOf("hour").fromNow()}
                </h5>

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
