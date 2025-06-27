import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router";
import SingleArticlePage from "./components/SingleArticlePage";
import TopicsNav from "./components/TopicsNav";
import defaultAvatar from "./assets/user.jpeg";

const Layout = ({ currentUser }) => {
  const location = useLocation();
  const showTopicsNav =
    location.pathname === "/" || location.pathname.startsWith("/topics/");

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <main className="main-content container w-6xl grid grid-cols-3">
        {showTopicsNav && (
          <div className="topic-controller col-span-2">
            <TopicsNav />
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const currentUser = {
    username: "jessjelly",
    name: "Jess Jelly",
    avatar_url: defaultAvatar,
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout currentUser={currentUser} />}>
          <Route index element={<ArticlesList />} />
          <Route path="topics/:topic_slug" element={<ArticlesList />} />
          <Route
            path="articles/:article_id"
            element={<SingleArticlePage currentUser={currentUser} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
