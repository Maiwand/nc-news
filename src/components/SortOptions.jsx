import React, { useState } from "react";
import { useSearchParams } from "react-router";

import iconUp from "../assets/up.svg";
import iconDown from "../assets/down.svg";

const sortOptions = [
  { value: "created_at", label: "Date" },
  { value: "comment_count", label: "Comments" },
  { value: "votes", label: "Votes" },
];

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sort_by") || "created_at";
  const currentOrder = searchParams.get("order") || "desc";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSortBy)?.label || "Sort by";

  const handleSortSelect = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort_by", value);
    setSearchParams(newSearchParams);
    setIsDropdownOpen(false);
  };

  const toggleOrder = () => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("order", newOrder);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="sort-options-wrapper">
      <div className="sort-dropdown">
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="sort-button"
        >
          {currentLabel}
          <img
            src={isDropdownOpen ? iconUp : iconDown}
            alt=""
            className="sort-icon"
          />
        </button>
        {isDropdownOpen && (
          <ul className="sort-menu">
            {sortOptions.map(({ value, label }) => (
              <li
                key={value}
                onClick={() => handleSortSelect(value)}
                className="sort-option"
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={toggleOrder}
        className="sort-button"
        aria-label="Toggle sort order"
      >
        <img
          src={currentOrder === "asc" ? iconUp : iconDown}
          alt={currentOrder === "asc" ? "Ascending" : "Descending"}
          className="sort-icon"
        />
      </button>
    </div>
  );
};

export default SortOptions;
