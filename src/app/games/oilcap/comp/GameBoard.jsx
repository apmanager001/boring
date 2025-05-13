'use client'
import React from "react";
import Cell from "./Cell";

const GameBoard = ({ grid, handleClick }) => (
  <div className="grid grid-cols-10 max-w-[480px] justify-center p-2 md:p-0">
    {grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          type={cell}
          onClick={() => handleClick(rowIndex, colIndex)}
        />
      ))
    )}
  </div>
);

export default GameBoard;
