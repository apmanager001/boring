'use client'
import React from "react";

const Cell = ({ cell, onClick, onRightClick }) => {
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-950 font-extrabold cursor-pointer ${
        cell.revealed
          ? cell.isBomb
            ? "bg-red-600"
            : "bg-gray-200"
          : "bg-gray-500"
      } ${cell.flagged ? "bg-yellow-300" : ""}`}
      onClick={onClick}
      onContextMenu={onRightClick} // Right-click for flagging
    >
      {cell.revealed && !cell.isBomb
        ? cell.adjacentBombs > 0
          ? cell.adjacentBombs
          : ""
        : ""}
    </div>
  );
};

export default Cell;
