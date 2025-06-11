"use client";
import React from "react";
import Cell from "./cell";

const Board = ({ board, handleMove, selectedPiece, currentPlayer }) => {
  return (
    <div className="grid grid-cols-3 gap-2 bg-gray-800 p-2 rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            cell={cell}
            handleMove={handleMove}
            currentPlayer={currentPlayer}
            selectedPiece={selectedPiece}
          />
        ))
      )}
    </div>
  );
};

export default Board;
