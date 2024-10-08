import "./App.css";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import Topics from "./components/Topics";
import NotFound from "./components/NotFound";
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
          <Route path="/topic_articles" element={<ArticleList />} />
          <Route path="/topic_articles/:topic_name" element={<ArticleList />} />

          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
