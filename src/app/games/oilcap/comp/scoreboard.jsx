import React from "react";

const ScoreBoard = ({ score }) => (
  <div className="score-container text-lg font-semibold my-2">
    Score: {score}
  </div>
);

export default ScoreBoard;
