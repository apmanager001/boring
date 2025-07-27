"use client";
import React from "react";
import Cell from "./Cell";

const GameBoard = ({ grid, handleClick, isMobile, selectedPiece }) => {
  const handleDrop = (event, rowIndex, colIndex) => {
    event.preventDefault();
    const piece = event.dataTransfer.getData("text/plain");
    if (piece) {
      handleClick(rowIndex, colIndex, piece);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (isMobile) {
      handleClick(rowIndex, colIndex);
    }
  };

  return (
    <div className="grid grid-cols-10 md:max-w-[480px] justify-center md:p-0">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, rowIndex, colIndex)}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            className={`relative ${
              isMobile && selectedPiece && !cell.type
                ? "cursor-pointer hover:bg-blue-100 transition-colors"
                : ""
            }`}
          >
            <Cell
              type={cell.type}
              flowing={cell.isOilFlowing}
              isSelected={isMobile && selectedPiece && !cell.type}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
