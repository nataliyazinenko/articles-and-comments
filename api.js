import axios from "axios";

const articlesandcommentsAPI = axios.create({
  baseURL: "https://project01-wgzu.onrender.com/api",
});

export function getAllArticles() {
  return articlesandcommentsAPI.get("/articles").then(({ data }) => {
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
