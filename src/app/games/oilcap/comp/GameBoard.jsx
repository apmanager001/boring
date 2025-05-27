'use client'
import React from "react";
import Cell from "./Cell";

const GameBoard = ({ grid, handleClick }) => {
  const handleDrop = (event, rowIndex, colIndex) => {
    event.preventDefault();
    const piece = event.dataTransfer.getData("text/plain");
    if (piece) {
      handleClick(rowIndex, colIndex, piece);
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
            className="relative"
          >
            {/* <Cell type={cell.type} flowing={cell.isOilFlowing} /> */}
            <Cell
              type={cell.type}
              flowing={cell.isOilFlowing}
              // onClick={() => handleClick(rowIndex, colIndex)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
