import "./App.css";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import Topics from "./components/Topics";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <Topics />
          <Link to={`/articles/`} className="headingLink">
            <h1>Articles & Comments</h1>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="/articles/:article_id/comments" element={<Article />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
