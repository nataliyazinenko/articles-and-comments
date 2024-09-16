import "./App.css";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <button type="menuButton">☰</button> <h1>Articles & Comments</h1>
        </div>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<Article />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
