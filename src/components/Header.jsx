const Header = ({ currentUser }) => {
  return (
    <header className="header container">
      <div className="header-left">
        <h1 className="logo">
          <span className="hidden">NC News</span>
          <img src="../src/assets/logo.png" alt="NC News Logo" />
        </h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Topics</a>
          </li>
          <li>
            <a href="#">Articles</a>
          </li>
        </ul>
      </nav>
      <div className="header-right">
        {currentUser && (
          <div className="user-info">
            {" "}
            <span>{currentUser.name}</span>
            <img
              src={currentUser.avatar_url}
              alt={currentUser.name}
              className="user-avatar"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
