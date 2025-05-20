'use client'
import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import ScoreBoard from "./scoreboard";
import Pieces from './pieces'
import Timer from "./timer"
import OilDrop from "./oilDrip";
// import { startOilFlow } from "./OilFlow";

const BOARD_SIZE = 10;

const getRandomStartPosition = () => ({
  row: Math.floor(Math.random() * 9), // Ensures it's not the last row
  col: Math.floor(Math.random() * BOARD_SIZE),
});
    
  

const OilcapGame = () => {
    const [grid, setGrid] = useState(
      Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
    );
    const [startPos, setStartPos] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [hasDropped, setHasDropped] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [score, setScore] = useState(0);
    const [running, setRunning] = useState(false);

    // Generate random start position **only on the client**
    useEffect(() => {
      const newStart = getRandomStartPosition();
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            rowIndex === newStart.row && colIndex === newStart.col ? (
              "START"
            ) : (
              // "START ║"
              cell
            )
          )
        );
        return newGrid;
      });
      setStartPos(newStart);
    }, []);
    
console.log(grid)
  // const handleClick = (rowIndex, colIndex) => {
  //   setGrid((prevGrid) => {
  //     const newGrid = [...prevGrid];
  //     newGrid[rowIndex][colIndex] = "🟫"; // Example pipe
  //     return newGrid;
  //   });
  // };
  const handleClick = (rowIndex, colIndex, piece = "🟫") => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[rowIndex][colIndex] = piece; // Place the dropped piece
      return newGrid;
    });
    setHasDropped(true);
  };
// console.log(grid)
  const handleStart = () => {
    setStartGame(true);
    setRunning(true);
    // startOilFlow(grid, setGrid, setScore);
  };

  const getNextOilPosition = (row, col, grid) => {
    const nextPositions = [];
    const currentPiece = grid[row][col];

    if (currentPiece === "║") {
      if (grid[row + 1]?.[col] && grid[row + 1][col] !== "OIL")
        nextPositions.push({ row: row + 1, col });
      if (grid[row - 1]?.[col] && grid[row - 1][col] !== "OIL")
        nextPositions.push({ row: row - 1, col });
    } else if (currentPiece === "═") {
      if (grid[row]?.[col + 1] && grid[row][col + 1] !== "OIL")
        nextPositions.push({ row, col: col + 1 });
      if (grid[row]?.[col - 1] && grid[row][col - 1] !== "OIL")
        nextPositions.push({ row, col: col - 1 });
    } else if (currentPiece === "╔") {
      if (grid[row + 1]?.[col] && grid[row + 1][col] !== "OIL")
        nextPositions.push({ row: row + 1, col });
      if (grid[row]?.[col + 1] && grid[row][col + 1] !== "OIL")
        nextPositions.push({ row, col: col + 1 });
    } else if (currentPiece === "╗") {
      if (grid[row + 1]?.[col] && grid[row + 1][col] !== "OIL")
        nextPositions.push({ row: row + 1, col });
      if (grid[row]?.[col - 1] && grid[row][col - 1] !== "OIL")
        nextPositions.push({ row, col: col - 1 });
    } else if (currentPiece === "╚") {
      if (grid[row - 1]?.[col] && grid[row - 1][col] !== "OIL")
        nextPositions.push({ row: row - 1, col });
      if (grid[row]?.[col + 1] && grid[row][col + 1] !== "OIL")
        nextPositions.push({ row, col: col + 1 });
    } else if (currentPiece === "╝") {
      if (grid[row - 1]?.[col] && grid[row - 1][col] !== "OIL")
        nextPositions.push({ row: row - 1, col });
      if (grid[row]?.[col - 1] && grid[row][col - 1] !== "OIL")
        nextPositions.push({ row, col: col - 1 });
    } else if (currentPiece === "╬") {
      if (grid[row + 1]?.[col] && grid[row + 1][col] !== "OIL")
        nextPositions.push({ row: row + 1, col });
      if (grid[row - 1]?.[col] && grid[row - 1][col] !== "OIL")
        nextPositions.push({ row: row - 1, col });
      if (grid[row]?.[col + 1] && grid[row][col + 1] !== "OIL")
        nextPositions.push({ row, col: col + 1 });
      if (grid[row]?.[col - 1] && grid[row][col - 1] !== "OIL")
        nextPositions.push({ row, col: col - 1 });
    }

    return nextPositions;
  };
  
  const startOilFlow = () => {
    let oilPath = [];
    let foundStart = false;

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === "START") {
          oilPath.push({ row, col });
          foundStart = true;
          break;
        }
      }
      if (foundStart) break;
    }

    if (!foundStart) return;

    let interval = setInterval(() => {
      if (oilPath.length === 0) {
        clearInterval(interval);
        return;
      }

      const { row, col } = oilPath.shift();

      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((r) => [...r]);
        newGrid[row][col] = "OIL";
        return newGrid;
      });

      const nextPositions = getNextOilPosition(row, col, grid);
      oilPath.push(...nextPositions);
    }, 500);
  };

  return (
    <div className="game-container text-center">
      <h1 className="text-4xl font-bold my-4">Oilcap Game</h1>
      {!startGame && (
        <>
          <h1>Welcome to Oilcap Game! Click Start to begin.</h1>
          <button className="btn btn-secondary my-4" onClick={handleStart}>
            Start Game
          </button>
        </>
      )}

      <div className="flex justify-center items-center gap-4">
        <ScoreBoard score={score} />
        <Timer running={running} startOilFlow={startOilFlow} />
      </div>
      <div className="flex flex-col md:flex-row justify-center mb-10">
        <GameBoard
          grid={grid}
          handleClick={handleClick}
          setDraggedItem={setDraggedItem}
        />
        <Pieces
          startGame={startGame}
          setDraggedItem={setDraggedItem}
          hasDropped={hasDropped}
          setHasDropped={setHasDropped}
        />
      </div>
      {/* <button
        className="btn btn-primary my-4"
        onClick={handleStart}
        disabled={running}
      >
        Start Oil Flow
      </button> */}
    </div>
  );
};

export default OilcapGame;
