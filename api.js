import axios from "axios";

const articlesandcommentsAPI = axios.create({
  baseURL: "https://project01-wgzu.onrender.com/api",
});

export function getAllArticles() {
  return articlesandcommentsAPI.get("/articles").then(({ data }) => {
    return data;
  });
}
