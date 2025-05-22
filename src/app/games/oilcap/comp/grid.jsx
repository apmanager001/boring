'use client'
import React, { useState, useEffect } from "react";
import {Link, Share2} from 'lucide-react'
import toast from "react-hot-toast";
import GameBoard from "./GameBoard";
import ScoreBoard from "./scoreboard";
import Pieces from './pieces'
import Timer from "./timer"
import SharedButtons from "../../../../components/gameComps/social";

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

    function copyURL() {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("URL Copied!");
        })
        .catch((err) => {
          toast.error("Failed to copy the URL");
        });
    }

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

  const handleStart = () => {
    setStartGame(true);
    setRunning(true);
  };

  // const startOilFlow = () => {
  //   console.log("Starting oil flow from position:", startPos);
  //   if (!startPos) return;

  //   // Create a queue for BFS (Breadth-First Search)
  //   const queue = [{ row: startPos.row, col: startPos.col }];
  //   const visited = new Set();
  //   const delayBetweenCells = 1000; // 1 second between cells
  //   let cellsFlowed = 0;

  //   const processQueue = (index = 0) => {
  //     if (index >= queue.length) {
  //       console.log("Oil flow complete. Total cells flowed:", cellsFlowed);
  //       // Show end game popup when flow completes
  //       showEndGamePopup(cellsFlowed);
  //       return;
  //     }

  //     const { row, col } = queue[index];
  //     const cellKey = `${row},${col}`;

  //     console.log(
  //       `Processing cell [${row},${col}] - type: ${grid[row]?.[col]?.type}`
  //     );

  //     // Skip if already visited or invalid cell
  //     if (
  //       visited.has(cellKey) ||
  //       row < 0 ||
  //       row >= BOARD_SIZE ||
  //       col < 0 ||
  //       col >= BOARD_SIZE ||
  //       !grid[row]?.[col]?.type
  //     ) {
  //       console.log(`Skipping cell [${row},${col}]`);
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

  //         setScore((prev) => prev + 10); // Add 10 points per connected pipe
  //         cellsFlowed++;

  //         // Get current cell type from the latest state
  //         const cellType = grid[row][col].type;
  //         console.log(`Cell [${row},${col}] type: ${cellType}`);

  //         // Add connected cells to queue based on pipe type
  //         // Down connections
  //         if (
  //           cellType === "START" ||
  //           cellType === "║" ||
  //           cellType === "╬" ||
  //           cellType === "╚" ||
  //           cellType === "╝"
  //         ) {
  //           const newRow = row + 1;
  //           const newCol = col;
  //           if (newRow < BOARD_SIZE && !visited.has(`${newRow},${newCol}`)) {
  //             queue.push({ row: newRow, col: newCol });
  //             console.log(`Adding DOWN connection to [${newRow},${newCol}]`);
  //           }
  //         }

  //         // Up connections
  //         if (
  //           cellType === "START" ||
  //           cellType === "║" ||
  //           cellType === "╬" ||
  //           cellType === "╗" ||
  //           cellType === "╔"
  //         ) {
  //           const newRow = row - 1;
  //           const newCol = col;
  //           if (newRow >= 0 && !visited.has(`${newRow},${newCol}`)) {
  //             queue.push({ row: newRow, col: newCol });
  //             console.log(`Adding UP connection to [${newRow},${newCol}]`);
  //           }
  //         }

  //         // Left connections
  //         if (
  //           cellType === "═" ||
  //           cellType === "╬" ||
  //           cellType === "╗" ||
  //           cellType === "╝"
  //         ) {
  //           const newRow = row;
  //           const newCol = col - 1;
  //           if (newCol >= 0 && !visited.has(`${newRow},${newCol}`)) {
  //             queue.push({ row: newRow, col: newCol });
  //             console.log(`Adding LEFT connection to [${newRow},${newCol}]`);
  //           }
  //         }

  //         // Right connections
  //         if (
  //           cellType === "═" ||
  //           cellType === "╬" ||
  //           cellType === "╔" ||
  //           cellType === "╚"
  //         ) {
  //           const newRow = row;
  //           const newCol = col + 1;
  //           if (newCol < BOARD_SIZE && !visited.has(`${newRow},${newCol}`)) {
  //             queue.push({ row: newRow, col: newCol });
  //             console.log(`Adding RIGHT connection to [${newRow},${newCol}]`);
  //           }
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
    console.log("=== STARTING OIL FLOW ===");
    if (!startPos) return;

    const visited = new Set();
    let cellsFlowed = 0;
    const delayBetweenCells = 1000;
    let activeFlows = 0; // Track how many flows are in progress
    let popupShown = false; // Prevent duplicate popups

    // Direction constants
    const DIRECTIONS = {
      UP: "UP",
      DOWN: "DOWN",
      LEFT: "LEFT",
      RIGHT: "RIGHT",
    };

    // Flow from the start position (initial direction is DOWN from the start)
    activeFlows++;
    flowFromCell(startPos.row, startPos.col, DIRECTIONS.DOWN);

    function flowFromCell(row, col, incomingDirection) {
      const cellKey = `${row},${col}`;

      // Skip if invalid or visited
      if (
        visited.has(cellKey) ||
        row < 0 ||
        row >= BOARD_SIZE ||
        col < 0 ||
        col >= BOARD_SIZE
      ) {
        console.log(`Stopping flow at [${row},${col}] - invalid or visited`);
        activeFlows--;
        checkFlowCompletion();
        return;
      }

      const cell = grid[row]?.[col];
      if (!cell?.type) {
        console.log(`Stopping flow at [${row},${col}] - empty cell`);
        activeFlows--;
        checkFlowCompletion();
        return;
      }

      // Mark as visited and update UI
      visited.add(cellKey);
      cellsFlowed++;
      setGrid((prev) => {
        const newGrid = prev.map((r) => [...r]);
        newGrid[row][col] = { ...newGrid[row][col], isOilFlowing: true };
        return newGrid;
      });
      setScore((prev) => prev + 10);

      console.log(
        `Processing ${cell.type} at [${row},${col}] with flow coming from ${incomingDirection}`
      );

      // Determine outgoing directions based on pipe type and incoming direction
      const outgoingDirections = getOutgoingDirections(
        cell.type,
        incomingDirection
      );

      if (outgoingDirections.length === 0) {
        console.log(
          `Stopping flow at [${row},${col}] - no valid outgoing directions`
        );
        activeFlows--;
        checkFlowCompletion();
        return;
      }

      // Increment active flows for each outgoing direction (minus 1 for current flow)
      activeFlows += outgoingDirections.length - 1;

      // Process each outgoing direction with sequential delays
      outgoingDirections.forEach((direction, index) => {
        setTimeout(() => {
          const [newRow, newCol] = getNextPosition(row, col, direction);
          flowFromCell(newRow, newCol, getOppositeDirection(direction));
        }, delayBetweenCells * (index + 1));
      });
    }

    function getOutgoingDirections(pipeType, incomingDirection) {
      const outgoing = [];

      // START pipe can flow in any direction (initial case)
      if (pipeType === "START") {
        return [
          DIRECTIONS.DOWN,
          DIRECTIONS.UP,
          DIRECTIONS.LEFT,
          DIRECTIONS.RIGHT,
        ];
      }

      // Determine valid outgoing directions based on pipe type and incoming direction
      switch (pipeType) {
        case "║": // Vertical pipe
          if (incomingDirection === DIRECTIONS.DOWN)
            outgoing.push(DIRECTIONS.UP);
          if (incomingDirection === DIRECTIONS.UP)
            outgoing.push(DIRECTIONS.DOWN);
          break;

        case "═": // Horizontal pipe
          if (incomingDirection === DIRECTIONS.LEFT)
            outgoing.push(DIRECTIONS.RIGHT);
          if (incomingDirection === DIRECTIONS.RIGHT)
            outgoing.push(DIRECTIONS.LEFT);
          break;

        case "╬": // Cross pipe
          if (incomingDirection === DIRECTIONS.UP)
            outgoing.push(DIRECTIONS.DOWN);
          if (incomingDirection === DIRECTIONS.DOWN)
            outgoing.push(DIRECTIONS.UP);
          if (incomingDirection === DIRECTIONS.RIGHT)
            outgoing.push(DIRECTIONS.LEFT);
          if (incomingDirection === DIRECTIONS.LEFT)
            outgoing.push(DIRECTIONS.RIGHT);
          break;

        case "╚": // Up-Right elbow
          if (incomingDirection === DIRECTIONS.UP)
            outgoing.push(DIRECTIONS.RIGHT);
          if (incomingDirection === DIRECTIONS.RIGHT)
            outgoing.push(DIRECTIONS.UP);
          break;

        case "╝": // Up-Left elbow
          if (incomingDirection === DIRECTIONS.UP)
            outgoing.push(DIRECTIONS.LEFT);
          if (incomingDirection === DIRECTIONS.LEFT)
            outgoing.push(DIRECTIONS.UP);
          break;

        case "╔": // Down-Right elbow
          if (incomingDirection === DIRECTIONS.DOWN)
            outgoing.push(DIRECTIONS.RIGHT);
          if (incomingDirection === DIRECTIONS.RIGHT)
            outgoing.push(DIRECTIONS.DOWN);
          break;

        case "╗": // Down-Left elbow
          if (incomingDirection === DIRECTIONS.DOWN)
            outgoing.push(DIRECTIONS.LEFT);
          if (incomingDirection === DIRECTIONS.LEFT)
            outgoing.push(DIRECTIONS.DOWN);
          break;
      }

      return outgoing;
    }

    function getNextPosition(row, col, direction) {
      switch (direction) {
        case DIRECTIONS.UP:
          return [row - 1, col];
        case DIRECTIONS.DOWN:
          return [row + 1, col];
        case DIRECTIONS.LEFT:
          return [row, col - 1];
        case DIRECTIONS.RIGHT:
          return [row, col + 1];
        default:
          return [row, col];
      }
    }

    function getOppositeDirection(direction) {
      switch (direction) {
        case DIRECTIONS.UP:
          return DIRECTIONS.DOWN;
        case DIRECTIONS.DOWN:
          return DIRECTIONS.UP;
        case DIRECTIONS.LEFT:
          return DIRECTIONS.RIGHT;
        case DIRECTIONS.RIGHT:
          return DIRECTIONS.LEFT;
        default:
          return direction;
      }
    }

    function checkFlowCompletion() {
      // Only show popup when all flows have completed and we haven't shown it yet
      if (activeFlows === 0 && !popupShown) {
        popupShown = true;
        console.log("=== OIL FLOW COMPLETE ===");
        console.log(`Total cells flowed: ${cellsFlowed}`);
        showEndGamePopup(cellsFlowed);
      }
    }
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

      
      <div className="flex items-center justify-end w-full my-2">
        {/* <Share2 /> */}
        <div
          className="tooltip tooltip-bottom rounded-full h-[35px] w-[35px] hover:bg-base-100 flex justify-center items-center cursor-pointer"
          data-tip="Click to Copy URL"
          onClick={copyURL}
        >
          <Link />
        </div>
        <SharedButtons game={"OilCap"} />
      </div>
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
          draggedItem={draggedItem}
          // setDraggedItem={setDraggedItem}
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
