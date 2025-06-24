import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import { BrowserRouter as Router, Routes, Route } from "react-router";

const App = () => {
  const currentUser = {
    username: "jessjelly",
    name: "Jess Jelly",
    avatar_url: "./src/assets/user.jpeg",
  };

  return (
    <Router>
      <Header currentUser={currentUser} />
      <main className="main-content container w-6xl grid grid-cols-3">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
