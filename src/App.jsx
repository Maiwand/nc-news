import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router";
import Footer from "./components/navigation/Footer";
import Header from "./components/navigation/Header";
import ArticlesList from "./components/articles/ArticlesList";
import SingleArticlePage from "./components/articles/SingleArticlePage";
import TopicsNav from "./components/navigation/TopicsNav";
import SortOptions from "./components/SortOptions";
import defaultAvatar from "./assets/user.jpeg";
import ErrorPage from "./components/ui/ErrorPage";

const Layout = ({ currentUser }) => {
  const location = useLocation();
  const showTopicsNav =
    location.pathname === "/" || location.pathname.startsWith("/topics/");

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <main className="main-content container w-full px-4 mx-auto grid grid-cols-1 xl:grid-cols-3 xl:w-6xl">
        {showTopicsNav && (
          <div className="topic-controller col-span-2">
            <TopicsNav />
            <SortOptions />
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
          <Route
            path="*"
            element={
              <ErrorPage
                status={404}
                message="Whoops—this page doesn’t exist. Try returning home."
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
