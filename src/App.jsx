import "./App.css";
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
    </>
  );
};

export default App;
