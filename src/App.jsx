import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import SingleArticlePage from "./components/singleArticlePage";
import defaultAvatar from "./assets/user.jpeg";

const App = () => {
  const currentUser = {
    username: "jessjelly",
    name: "Jess Jelly",
    avatar_url: defaultAvatar,
  };

  return (
    <Router>
      <Header currentUser={currentUser} />
      <main className="main-content container w-6xl grid grid-cols-3">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route
            path="/articles/:article_id"
            element={<SingleArticlePage currentUser={currentUser} />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
