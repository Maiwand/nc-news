import React, { useState } from "react";
import { patchArticleVotes } from "../api";

const VoteButton = ({ article_id, initialVotes }) => {
  const [displayVotes, setDisplayVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(0);
  const [voteError, setVoteError] = useState(null);

  const handleVote = (direction) => {
    setVoteError(null);

    let voteChange = 0;
    let newUserVote = userVote;

    if (userVote === direction) {
      voteChange = -direction;
      newUserVote = 0;
    } else {
      voteChange = direction - userVote;
      newUserVote = direction;
    }

    setDisplayVotes((prev) => prev + voteChange);
    setUserVote(newUserVote);

    patchArticleVotes(article_id, voteChange).catch((err) => {
      setDisplayVotes((prev) => prev - voteChange);
      setUserVote(userVote);
      setVoteError("Failed to update vote. Please try again.");
      console.error("Vote error:", err);
    });
  };

  return (
    <div className="vote-controls">
      <button
        onClick={() => handleVote(1)}
        className={`vote-button upvote-button ${userVote === 1 ? "voted" : ""}`}
      >
        ▲
      </button>
      <button
        onClick={() => handleVote(-1)}
        className={`vote-button downvote-button ${
          userVote === -1 ? "voted" : ""
        }`}
      >
        ▼
      </button>
      <p className="vote-count">{displayVotes}</p>
      {voteError && <p className="vote-error-message">{voteError}</p>}
    </div>
  );
};

export default VoteButton;
