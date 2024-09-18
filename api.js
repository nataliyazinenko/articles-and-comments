import axios from "axios";

const articlesandcommentsAPI = axios.create({
  baseURL: "https://project01-wgzu.onrender.com/api",
});

export function getAllArticles(query) {
  return articlesandcommentsAPI
    .get("/articles", {
      params: query,
    })
    .then(({ data }) => {
      return data;
    });
}

export function getArticle(article_id) {
  return articlesandcommentsAPI
    .get(`articles/${article_id}`)
    .then(({ data }) => {
      return data;
    });
}

export function getComments(article_id) {
  return articlesandcommentsAPI
    .get(`articles/${article_id}/comments`)
    .then(({ data }) => {
      return data;
    });
}

export function patchArticle(article_id, vote) {
  const patchBody = { inc_votes: vote };
  return articlesandcommentsAPI
    .patch(`articles/${article_id}`, patchBody)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      alert(err);
      throw err;
    });
}

export function postComment(article_id, username, newComment) {
  return articlesandcommentsAPI
    .post(`articles/${article_id}/comments`, {
      username: username,
      body: newComment,
    })
    .then(({ data }) => {
      return data;
    });
}

export function deleteComment(comment_id) {
  return articlesandcommentsAPI
    .delete(`comments/${comment_id}`)
    .then(({ data }) => {
      return data;
    });
}

export function getTopics() {
  return articlesandcommentsAPI.get("/topics").then(({ data }) => {
    return data;
  });
}
