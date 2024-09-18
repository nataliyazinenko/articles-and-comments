import React, { useState } from "react";
import { postComment } from "../../api";
import { useParams } from "react-router-dom";

const CommentAdder = ({ addNewComment }) => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log("!!! trying to post a comment with:", {
      article_id,
      newComment,
    });

    postComment(article_id, newComment).then((data) => {
      console.log("DATA!!!!", data);
      addNewComment(data.comment);
      setNewComment("");
      setIsLoading(true);
    });
  };

  // useEffect(() => {
  //   setError(null);
  //   getComments(article_id)
  //     .then((data) => {
  //       setComments(data.comments);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError("error fetching data");
  //       setIsLoading(false);
  //     });
  // }, [article_id]);

  // if (isLoading) {
  //   return <p>Loading comments....</p>;
  // }
  // if (error) {
  //   return <p>Something went wrong...</p>;
  // }

  return (
    <section>
      <form onSubmit={handleSubmit} className="commentForm">
        <input
          type="text"
          id="username"
          name="username"
          className="inputName"
          placeholder="Username (required, will be displayed with your comment)"
          maxLength="30"
          required
        ></input>

        <textarea
          onChange={handleChange}
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
          Submit Comment
        </button>
      </form>
    </section>
  );
};

export default CommentAdder;
