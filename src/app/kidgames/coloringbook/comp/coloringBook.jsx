'use client'
import React, { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";

const gridSize = 25;

// Predefined picture templates (each is a 25x25 grid of numbers)
const pictureTemplates = [
  // Simple smiley face
  Array.from({ length: gridSize }, (_, i) =>
    Array.from({ length: gridSize }, (_, j) => {
      // Create a smiley face pattern
      const isEye = i === 5 && j >= 10 && j <= 14;
      const isNose = i === 7 && (j === 8 || j === 16);
      const isMouth =
        i === 10 &&
        j >= 8 &&
        j <= 16 &&
        (j === 8 || j === 16 || (i + j) % 2 === 0);
      const isBorder =
        i === 0 || i === gridSize - 1 || j === 0 || j === gridSize - 1;

      if (isEye || isNose || isMouth) return 1; // red
      if (isBorder) return 2; // blue border
      return 3; // yellow background
    })
  ),

  // Heart shape
  Array.from({ length: gridSize }, (_, i) =>
    Array.from({ length: gridSize }, (_, j) => {
      const x = j - gridSize / 2;
      const y = i - gridSize / 2;
      const heart =
        (x * x + y * y - 100) * (x * x + y * y - 100) * (x * x + y * y - 100) -
          x * x * y * y * y <
        0;
      return heart ? 1 : 4; // green background
    })
  ),

  // Random abstract pattern
  Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => Math.floor(Math.random() * 5) + 1)
  ),
];

const colorMap = {
  1: "red",
  2: "blue",
  3: "yellow",
  4: "green",
  5: "purple",
};

export default function ColoringGame() {
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  const [numberGrid, setNumberGrid] = useState(null);
  const [colorGrid, setColorGrid] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const solutionTimeoutRef = useRef(null);

  // Load picture when index changes
  useEffect(() => {
    if (pictureTemplates[currentPictureIndex]) {
      setNumberGrid(pictureTemplates[currentPictureIndex]);
      setColorGrid(pictureTemplates[currentPictureIndex].map(row => row.map(() => null)));
      setSelectedNumber(null);
    }
  }, [currentPictureIndex]);

  const handleCellClick = (row, col, cellNumber) => {
    if (!selectedNumber || !numberGrid || !colorGrid) return;
    if (cellNumber !== selectedNumber) return;

    const newColorGrid = colorGrid.map(row => [...row]);
    
    // Color the clicked cell and its immediate neighbors
    for (let i = Math.max(0, row - 1); i <= Math.min(gridSize - 1, row + 1); i++) {
      for (let j = Math.max(0, col - 1); j <= Math.min(gridSize - 1, col + 1); j++) {
        if (numberGrid[i][j] === selectedNumber) {
          newColorGrid[i][j] = colorMap[selectedNumber];
        }
      }
    }

    setColorGrid(newColorGrid);
  };

  const handleMouseDown = () => {
    setShowSolution(true);
    if (solutionTimeoutRef.current) {
      clearTimeout(solutionTimeoutRef.current);
    }
  };

  const handleMouseUp = () => {
    solutionTimeoutRef.current = setTimeout(() => {
      setShowSolution(false);
    }, 100);
  };

  const goToNextPicture = () => {
    setCurrentPictureIndex((prev) => (prev + 1) % pictureTemplates.length);
  };

  const goToPrevPicture = () => {
    setCurrentPictureIndex((prev) => (prev - 1 + pictureTemplates.length) % pictureTemplates.length);
  };

  if (!numberGrid || !colorGrid) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen p-4 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">Coloring Book</h1>
        <div className="relative group">
          <Info />
          <div className="absolute hidden group-hover:block bg-base-200 text-white text-sm p-2 rounded-md w-64 right-0 top-6">
            <ol className="list-decimal pl-4">
              <li>Select a picture using Previous/Next buttons</li>
              <li>Choose a color from the legend</li>
              <li>Click on matching numbers in the grid to color them</li>
              <li>
                Hold <code>Solve</code> to peek at the solution
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Picture Navigation */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={goToPrevPicture}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>
        <span className="font-medium">
          Picture {currentPictureIndex + 1} of {pictureTemplates.length}
        </span>
        <button
          onClick={goToNextPicture}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          Next
        </button>
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
            style={{ backgroundColor: color }}
            onClick={() => setSelectedNumber(parseInt(num))}
          >
            <span className="text-white bg-black bg-opacity-30 rounded-full w-6 h-6 flex items-center justify-center">
              {num}
            </span>
            {color}
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
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            width: "100%",
          }}
        >
          {numberGrid.map((row, i) =>
            row.map((cellNumber, j) => {
              const isColored = colorGrid[i][j] !== null;
              const showNumber = !showSolution && !isColored;

              return (
                <div
                  key={`${i}-${j}`}
                  className="aspect-square flex items-center justify-center cursor-pointer text-xs select-none"
                  style={{
                    border: "1px solid #e5e7eb",
                    backgroundColor: showSolution
                      ? colorMap[cellNumber]
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