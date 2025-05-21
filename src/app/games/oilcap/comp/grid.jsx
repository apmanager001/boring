'use client'
import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import ScoreBoard from "./scoreboard";
import Pieces from './pieces'
import Timer from "./timer"

const BOARD_SIZE = 10;

const getRandomStartPosition = () => ({
  row: Math.floor(Math.random() * 9), // Ensures it's not the last row
  col: Math.floor(Math.random() * BOARD_SIZE),
});
    
const OilcapGame = () => {
    // const [grid, setGrid] = useState(
    //   Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
    // );
    const [grid, setGrid] = useState(
      Array.from({ length: BOARD_SIZE }, () =>
        Array(BOARD_SIZE).fill({ type: null, isOilFlowing: false })
      )
    );
    const [startPos, setStartPos] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [hasDropped, setHasDropped] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [score, setScore] = useState(0);
    const [running, setRunning] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    const showEndGamePopup = (cellsConnected) => {
      setFinalScore(cellsConnected * 10); // Or calculate score however you want
      setShowPopup(true);
    };

    const closePopup = () => {
      setShowPopup(false);
      // Reset game if desired
      // resetGame();
    };
    
    useEffect(() => {
      const newStart = getRandomStartPosition();
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            rowIndex === newStart.row && colIndex === newStart.col
              ? { type: "START", isOilFlowing: false }
              : cell
          )
        );
        return newGrid;
      });
      setStartPos(newStart);
    }, []);
    
// console.log(grid)

  const handleClick = (rowIndex, colIndex, piece) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[rowIndex][colIndex] = { type: piece, isOilFlowing: false };
      return newGrid;
    });
    setHasDropped(true);
  };
  // const handleClick = (rowIndex, colIndex, piece = "🟫") => {
  //   setGrid((prevGrid) => {
  //     const newGrid = [...prevGrid];
  //     newGrid[rowIndex][colIndex] = piece; // Place the dropped piece
  //     return newGrid;
  //   });
  //   setHasDropped(true);
  // };
// console.log(grid)
  const handleStart = () => {
    setStartGame(true);
    setRunning(true);
  };

  // const startOilFlow = () => {
  //   console.log("test");
  //   if (!startPos) return;
  //   console.log("test2");
  //   // Create a queue for BFS (Breadth-First Search)
  //   const queue = [{ row: startPos.row, col: startPos.col }];
  //   const visited = new Set();
  //   const delayBetweenCells = 2000; // 2 seconds between cells

  //   const processQueue = (index = 0) => {
  //     if (index >= queue.length) return;

  //     const { row, col } = queue[index];
  //     const cellKey = `${row},${col}`;

  //     // Skip if already visited or invalid cell
  //     if (
  //       visited.has(cellKey) ||
  //       row < 0 ||
  //       row >= BOARD_SIZE ||
  //       col < 0 ||
  //       col >= BOARD_SIZE ||
  //       !grid[row][col]?.type
  //     ) {
  //       return processQueue(index + 1);
  //     }

  //     visited.add(cellKey);

  //     // Update this cell's flowing state with a delay
  //     setTimeout(
  //       () => {
  //         setGrid((prev) => {
  //           const newGrid = prev.map((r) => [...r]);
  //           newGrid[row][col] = { ...newGrid[row][col], isOilFlowing: true };
  //           return newGrid;
  //         });

  //         // Get current cell type (use the latest grid state)
  //         const cellType = grid[row][col].type;

  //         // Add connected cells to queue based on pipe type
  //         if (
  //           cellType === "START" ||
  //           cellType === "║" ||
  //           cellType === "╬" ||
  //           cellType === "╚" ||
  //           cellType === "╝"
  //         ) {
  //           queue.push({ row: row + 1, col }); // Down
  //         }
  //         if (
  //           cellType === "START" ||
  //           cellType === "║" ||
  //           cellType === "╬" ||
  //           cellType === "╗" ||
  //           cellType === "╔"
  //         ) {
  //           queue.push({ row: row - 1, col }); // Up
  //         }
  //         if (
  //           cellType === "═" ||
  //           cellType === "╬" ||
  //           cellType === "╗" ||
  //           cellType === "╝"
  //         ) {
  //           queue.push({ row, col: col - 1 }); // Left
  //         }
  //         if (
  //           cellType === "═" ||
  //           cellType === "╬" ||
  //           cellType === "╔" ||
  //           cellType === "╚"
  //         ) {
  //           queue.push({ row, col: col + 1 }); // Right
  //         }

  //         // Process next cell
  //         processQueue(index + 1);
  //       },
  //       index === 0 ? 0 : delayBetweenCells
  //     ); // No delay for first cell
  //   };

  //   processQueue();
  // };

  const startOilFlow = () => {
    console.log("Starting oil flow from position:", startPos);
    if (!startPos) return;

    // Create a queue for BFS (Breadth-First Search)
    const queue = [{ row: startPos.row, col: startPos.col }];
    const visited = new Set();
    const delayBetweenCells = 1000; // 1 second between cells
    let cellsFlowed = 0;

    const processQueue = (index = 0) => {
      if (index >= queue.length) {
        console.log("Oil flow complete. Total cells flowed:", cellsFlowed);
        // Show end game popup when flow completes
        showEndGamePopup(cellsFlowed);
        return;
      }

      const { row, col } = queue[index];
      const cellKey = `${row},${col}`;

      console.log(
        `Processing cell [${row},${col}] - type: ${grid[row]?.[col]?.type}`
      );

      // Skip if already visited or invalid cell
      if (
        visited.has(cellKey) ||
        row < 0 ||
        row >= BOARD_SIZE ||
        col < 0 ||
        col >= BOARD_SIZE ||
        !grid[row]?.[col]?.type
      ) {
        console.log(`Skipping cell [${row},${col}]`);
        return processQueue(index + 1);
      }

      visited.add(cellKey);

      // Update this cell's flowing state with a delay
      setTimeout(
        () => {
          setGrid((prev) => {
            const newGrid = prev.map((r) => [...r]);
            newGrid[row][col] = { ...newGrid[row][col], isOilFlowing: true };
            return newGrid;
          });

          setScore((prev) => prev + 10); // Add 10 points per connected pipe
          cellsFlowed++;

          // Get current cell type from the latest state
          const cellType = grid[row][col].type;
          console.log(`Cell [${row},${col}] type: ${cellType}`);

          // Add connected cells to queue based on pipe type
          // Down connections
          if (
            cellType === "START" ||
            cellType === "║" ||
            cellType === "╬" ||
            cellType === "╚" ||
            cellType === "╝"
          ) {
            const newRow = row + 1;
            const newCol = col;
            if (newRow < BOARD_SIZE && !visited.has(`${newRow},${newCol}`)) {
              queue.push({ row: newRow, col: newCol });
              console.log(`Adding DOWN connection to [${newRow},${newCol}]`);
            }
          }

          // Up connections
          if (
            cellType === "START" ||
            cellType === "║" ||
            cellType === "╬" ||
            cellType === "╗" ||
            cellType === "╔"
          ) {
            const newRow = row - 1;
            const newCol = col;
            if (newRow >= 0 && !visited.has(`${newRow},${newCol}`)) {
              queue.push({ row: newRow, col: newCol });
              console.log(`Adding UP connection to [${newRow},${newCol}]`);
            }
          }

          // Left connections
          if (
            cellType === "═" ||
            cellType === "╬" ||
            cellType === "╗" ||
            cellType === "╝"
          ) {
            const newRow = row;
            const newCol = col - 1;
            if (newCol >= 0 && !visited.has(`${newRow},${newCol}`)) {
              queue.push({ row: newRow, col: newCol });
              console.log(`Adding LEFT connection to [${newRow},${newCol}]`);
            }
          }

          // Right connections
          if (
            cellType === "═" ||
            cellType === "╬" ||
            cellType === "╔" ||
            cellType === "╚"
          ) {
            const newRow = row;
            const newCol = col + 1;
            if (newCol < BOARD_SIZE && !visited.has(`${newRow},${newCol}`)) {
              queue.push({ row: newRow, col: newCol });
              console.log(`Adding RIGHT connection to [${newRow},${newCol}]`);
            }
          }

          // Process next cell
          processQueue(index + 1);
        },
        index === 0 ? 0 : delayBetweenCells
      ); // No delay for first cell
    };

    processQueue();
  };

  const handleTimeUp = () => {
    setRunning(false);
    startOilFlow();
  };

  return (
    <div className="game-container text-center">
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="mb-4">
              Your oil flowed through {finalScore / 10} pipes!
            </p>
            <p className="text-xl font-bold mb-6">Final Score: {finalScore}</p>
            <button
              onClick={closePopup}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
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
        <Timer running={running} onTimeUp={handleTimeUp} />
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
    </div>
  );
};

export default OilcapGame;
