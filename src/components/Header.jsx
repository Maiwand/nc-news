import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const Header = ({ currentUser }) => (
  <header className="header container w-6xl">
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
    </div>
  </header>
);

export default Header;
