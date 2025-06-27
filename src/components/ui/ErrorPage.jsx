import React from "react";
import { Link } from "react-router";
import img404 from "../../assets/not-found.png";
import imgGeneric from "../../assets/error.png";

const ErrorPage = ({ message, status = 0 }) => {
  const imgSrc = status === 404 ? img404 : imgGeneric;
  const errorClass = status === 404 ? "error404" : "error";

  return (
    <div className={`error-page col-span-3 ${errorClass}`}>
      <div className="error-details">
        <h2 className="text-2xl font-semibold mb-4">Error {status || ""}</h2>
        <p className="mb-6">{message}</p>
        <Link to="/" className="go-home-button">
          Go Home
        </Link>
      </div>
      <img src={imgSrc} alt="Error illustration" className="error-img" />
    </div>
  );
};

export default ErrorPage;
