import React, { useState } from "react";
import { postComment } from "../../api";
import { useParams } from "react-router-dom";

const CommentAdder = ({ addNewComment }) => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    postComment(article_id, username, newComment)
      .then((data) => {
        addNewComment(data.comment);
        setNewComment("");
        setUsername("");
        setIsLoading(false);
      })
      .catch((err) => {
        setError("oops, posting failed");
        setIsLoading(false);
      });
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="commentForm">
        <input
          onChange={handleUsernameChange}
          value={username}
          type="text"
          id="username"
          name="username"
          className="inputName"
          placeholder="Username (required, will be displayed with your comment)"
          maxLength="30"
          required
        ></input>

        <textarea
          onChange={handleCommentChange}
          value={newComment}
          id="comment"
          name="comment"
          placeholder="What do you think?"
          type="text"
          className="inputComment"
          maxLength="1000"
          required
        ></textarea>

        <button type="submit" className="submit">
          {isLoading ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
      {error ? <p className="error">{error}</p> : null}
    </section>
  );
};

export default CommentAdder;
