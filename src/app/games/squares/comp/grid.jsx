'use client'
import React, { useState } from "react";

const GridSize = 5;

const DotsAndBoxes = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: GridSize }, () =>
      Array.from({ length: GridSize }, () => ({
        horizontalLine: false,
        verticalLine: false,
        owner: null, // null, 'player1', 'player2'
      }))
    )
  );

  const handleLineClick = (row, col, isHorizontal) => {
    const updatedGrid = [...grid];

    if (isHorizontal) {
      updatedGrid[row][col].horizontalLine = true;
    } else {
      updatedGrid[row][col].verticalLine = true;
    }

    // Check for completed boxes
    checkAndClaimBoxes(updatedGrid);

    setGrid(updatedGrid);
  };

  const checkAndClaimBoxes = (grid) => {
    for (let row = 0; row < GridSize - 1; row++) {
      for (let col = 0; col < GridSize - 1; col++) {
        if (
          grid[row][col].horizontalLine &&
          grid[row][col + 1].horizontalLine &&
          grid[row][col].verticalLine &&
          grid[row + 1][col].verticalLine
        ) {
          // Box is completed
          grid[row][col].owner = "player1"; // Assuming player1 goes first
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-5 w-96">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center justify-center w-16 h-16 border border-gray-600"
            >
              <div className="w-4 h-4 bg-black rounded-full"></div>

              {/* Render horizontal line */}
              {cell.horizontalLine && (
                <div
                  className="absolute top-1/2 w-full h-1 bg-black"
                  style={{ transform: "translateY(-50%)" }}
                />
              )}

              {/* Render vertical line */}
              {cell.verticalLine && (
                <div
                  className="absolute left-1/2 h-full w-1 bg-black"
                  style={{ transform: "translateX(-50%)" }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DotsAndBoxes;
