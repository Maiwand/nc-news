import React, { useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import burgerMenu from "../../assets/menu-burger.svg";
const Header = ({ currentUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((open) => !open);

  return (
    <div className="container w-full xl:w-6xl mx-auto px-4">
      <header className="header">
        <div className="header-left">
          <h1 className="logo">
            <span className="hidden">NC News</span>
            <img src={logo} alt="NC News Logo" />
          </h1>
        </div>

        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Topics</Link>
            </li>
            <li>
              <Link to="/">Articles</Link>
            </li>
          </ul>
        </nav>

        <div className="header-right">
          {currentUser && (
            <div className="user-info">
              <span>{currentUser.name}</span>
              <img
                src={currentUser.avatar_url}
                alt={currentUser.name}
                className="user-avatar"
              />
            </div>
          )}

          <button
            onClick={handleToggle}
            aria-expanded={menuOpen}
            className="menu-btn"
          >
            <img src={burgerMenu} alt="Burger Menu" />
          </button>
        </div>
      </header>

      <nav
        className={`header phone-navbar md:!hidden ${menuOpen ? "open" : ""}`}
      >
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Topics</Link>
          </li>
          <li>
            <Link to="/">Articles</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
