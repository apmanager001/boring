// coloringGame.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";
// import ImageProcessor from "./image";
// import ImageProcessor from "./image1";

export default function ColoringGame({ colorMap, template, gridWidth, gridHeight }) {
  
  const [numberGrid, setNumberGrid] = useState(null);
  const [colorGrid, setColorGrid] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const solutionTimeoutRef = useRef(null);
  // Load picture when template changes
  useEffect(() => {
    if (template) {
      setNumberGrid(template.grid); // Access the grid property
      setColorGrid(template.grid.map((row) => row.map(() => null)));
      setSelectedNumber(null);
    }
  }, [template]);

  const handleCellClick = (row, col, cellNumber) => {
    if (!selectedNumber || !numberGrid || !colorGrid) return;
    if (cellNumber !== selectedNumber) return;

    const newColorGrid = colorGrid.map((row) => [...row]);

    // Use both gridWidth and gridHeight
    for (
      let i = Math.max(0, row - 1);
      i <= Math.min(gridHeight - 1, row + 1);
      i++
      
    ) {
      for (
        let j = Math.max(0, col - 1);
        j <= Math.min(gridWidth - 1, col + 1);
        j++
      ) {
        if (numberGrid[i][j] === selectedNumber) {
          newColorGrid[i][j] = colorMap[selectedNumber][0];
        }
      }
    }

    setColorGrid(newColorGrid);
  };

  const handleMouseDown = () => {
    // Clear any pending timeouts
    if (solutionTimeoutRef.current) {
      clearTimeout(solutionTimeoutRef.current);
    }
    setShowSolution(true);
  };

  const handleMouseUp = () => {
    // Set a timeout to hide the solution after a short delay
    solutionTimeoutRef.current = setTimeout(() => {
      setShowSolution(false);
    }, 100);
  };

  if (!numberGrid || !colorGrid) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen p-4 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">Coloring Book</h1>
        <div className="relative group">
          <Info />
          <div className="absolute hidden group-hover:block bg-base-200 text-white text-sm p-2 rounded-md w-64 right-0 top-6">
            <ol className="list-decimal pl-4">
              <li>Choose a color from the legend</li>
              <li>Click on matching numbers in the grid to color them</li>
              <li>
                Hold <code>Solve</code> to peek at the solution
              </li>
            </ol>
          </div>
        </div>
      </div>
      {/* Color Legend */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {Object.entries(colorMap).map(([num, color]) => (
          <button
            key={num}
            className={`px-4 py-2 rounded text-white font-medium flex items-center gap-2 select-none ${
              selectedNumber === parseInt(num)
                ? "ring-2 ring-black ring-offset-2"
                : ""
            }`}
            style={{ backgroundColor: color[0] }}
            onClick={() => setSelectedNumber(parseInt(num))}
          >
            <span className="text-white bg-black bg-opacity-30 rounded-full w-6 h-6 flex items-center justify-center">
              {num}
            </span>
            <span className="bg-black bg-opacity-30 py-2 p-4 rounded-full">
              {color[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Solve Button */}
      <button
        className="px-6 py-3 mb-4 bg-gray-800 text-white rounded-lg font-medium shadow hover:bg-gray-700 transition-colors"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        Hold to Solve
      </button>

      {/* Game Grid */}
      <div className="w-full max-w-4xl overflow-auto shadow-lg bg-white p-1 rounded">
        <div
          style={{
            display: "grid",
            // gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
            width: "100%",
          }}
        >

          {numberGrid.map((row, i) =>
            row.map((cellNumber , j) => {
              const isColored = colorGrid[i][j] !== null;
              const showNumber = !showSolution && !isColored;
              return (
                <div
                  key={`${i}-${j}`}
                  className="aspect-square flex flex-row items-center justify-center cursor-pointer text-xs select-none"
                  style={{
                    border: "1px solid #e5e7eb",
                    backgroundColor: showSolution
                      ? colorMap[cellNumber][0]
                      : isColored
                      ? colorGrid[i][j]
                      : "#f3f4f6",
                    transition: "background-color 0.1s ease",
                  }}
                  onClick={() => handleCellClick(i, j, cellNumber)}
                >
                  {showNumber && cellNumber}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
