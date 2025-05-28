'use client'
import React, { useState, useEffect } from "react";
import PixelToolbar from "./pixelToolbar";
import Grid from "./grid";

const PixelArtMain = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [changesLeft, setChangesLeft] = useState(20);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [grid, setGrid] = useState(
    Array(85)
      .fill()
      .map(() => Array(65).fill("#FFFFFF"))
  );

  // Timer countdown effect
  useEffect(() => {
    if (!isActiveUser || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActiveUser, timeLeft]);

  // Reset when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      setIsActiveUser(false);
    }
  }, [timeLeft]);

  const handleBecomeActiveUser = () => {
    if (!isActiveUser) {
      setIsActiveUser(true);
      setTimeLeft(300);
      setChangesLeft(20);
    }
  };

  const handleColorSelect = (color) => {
    if (isActiveUser) {
      setSelectedColor(color);
    }
  };

  const buttonClicked = () => {
    setTimeLeft(0)
  }

  const handleCellChange = (row, col) => {
    if (isActiveUser && changesLeft > 0 && selectedColor) {
      const newGrid = [...grid];
      if (newGrid[row][col] !== selectedColor) {
        newGrid[row][col] = selectedColor;
        setGrid(newGrid);
        setChangesLeft((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="min-h-screen p-4">
      <PixelToolbar
        selectedColor={selectedColor}
        timeLeft={timeLeft}
        changesLeft={changesLeft}
        isActiveUser={isActiveUser}
        onBecomeActiveUser={handleBecomeActiveUser}
        onColorSelect={handleColorSelect}
        onButtonClick={buttonClicked}
      />
      <Grid
        grid={grid}
        onCellChange={handleCellChange}
        isActiveUser={isActiveUser}
      />
    </div>
  );
};

export default PixelArtMain;
