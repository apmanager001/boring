import React from "react";
import Board from "./comps/board";

const Minesweeper = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <Board />
    </div>
  );
};

export default Minesweeper;
