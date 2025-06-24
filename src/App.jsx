import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  const currentUser = {
    username: "jessjelly",
    name: "Jess Jelly",
    avatar_url: "./src/assets/user.jpeg",
  };

  return (
    <>
      <Header currentUser={currentUser} />
      <Footer />
    </>
  );
};

export default App;
