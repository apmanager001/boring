"use client";
import React, { useState, useEffect, useRef } from "react";
import { Link, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import GameBoard from "./GameBoard";
import ScoreBoard from "./scoreboard";
import Pieces from "./pieces";
import Timer from "./timer";
import SharedButtons from "../../../../components/gameComps/social";

const BOARD_SIZE = 10;

const getRandomStartPosition = () => ({
  row: Math.floor(Math.random() * 9), // Ensures it's not the last row
  col: Math.floor(Math.random() * BOARD_SIZE),
});

const OilcapGame = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill({ type: null, isOilFlowing: false })
    )
  );
  const gridRef = useRef(grid);
  const [startPos, setStartPos] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [hasDropped, setHasDropped] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showEndGamePopup = (cellsConnected) => {
    setFinalScore(cellsConnected * 10); // Or calculate score however you want
    setShowPopup(true);
  };

  const closePopup = (reset) => {
    setShowPopup(false);
    // Reset game if desired
    if (reset === "reset") {
      window.location.reload();
    }
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

  const handleClick = (rowIndex, colIndex, piece) => {
    // For mobile: use selected piece if available
    const pieceToPlace = piece || selectedPiece;

    if (!pieceToPlace) {
      if (isMobile) {
        toast.error("Please select a piece first!");
      }
      return;
    }

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[rowIndex][colIndex] = { type: pieceToPlace, isOilFlowing: false };
      return newGrid;
    });

    setHasDropped(true);
    setSelectedPiece(null); // Clear selection after placing
  };

  const handlePieceSelect = (piece) => {
    if (isMobile && startGame) {
      setSelectedPiece(piece);
      toast.success(`Selected: ${piece}`);
    }
  };

  const handleStart = () => {
    setStartGame(true);
    setRunning(true);
  };

  const startOilFlow = () => {
    if (!startPos) return;

    const visited = new Set();
    let cellsFlowed = 0;
    const delayBetweenCells = 1000;
    let activeFlows = 0;
    let popupShown = false;

    const DIRECTIONS = {
      UP: "UP",
      DOWN: "DOWN",
      LEFT: "LEFT",
      RIGHT: "RIGHT",
    };

    activeFlows++;
    flowFromCell(startPos.row, startPos.col, DIRECTIONS.DOWN);

    function flowFromCell(row, col, incomingDirection) {
      const cellKey = `${row},${col}`;

      // Skip if invalid or already visited
      if (
        row < 0 ||
        row >= BOARD_SIZE ||
        col < 0 ||
        col >= BOARD_SIZE ||
        visited.has(cellKey)
      ) {
        activeFlows--;
        checkFlowCompletion();
        return;
      }

      const cell = gridRef.current[row]?.[col];

      if (!cell?.type) {
        activeFlows--;
        checkFlowCompletion();
        return;
      }

      // MARK ONLY THIS CELL AS VISITED
      visited.add(cellKey);
      cellsFlowed++;

      setGrid((prev) => {
        const newGrid = prev.map((r) => [...r]);
        newGrid[row][col] = { ...newGrid[row][col], isOilFlowing: true };
        return newGrid;
      });
      setScore((prev) => prev + 10);

      const outgoingDirections = getOutgoingDirections(
        cell.type,
        incomingDirection
      );

      if (outgoingDirections.length === 0) {
        activeFlows--;
        checkFlowCompletion();
        return;
      }

      // Process each outgoing direction with sequential delays
      outgoingDirections.forEach((direction, index) => {
        setTimeout(() => {
          const [newRow, newCol] = getNextPosition(row, col, direction);
          activeFlows++; // Increment for each new flow we're about to start
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
          // DIRECTIONS.UP,
          // DIRECTIONS.LEFT,
          // DIRECTIONS.RIGHT,
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
      if (activeFlows && !popupShown) {
        const unflowedPieces = gridRef.current
          .flat()
          .filter(
            (cell) => cell.type !== null && cell.isOilFlowing === false
          ).length;

        // Subtract 10 points for each bad piece
        setScore((prevScore) => prevScore - unflowedPieces * 10);
        popupShown = true;
        setStartGame(false);

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
          <div className="bg-white/80 p-6 rounded-lg max-w-md w-full border border-gray-500">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="mb-4">
              Your oil flowed through {finalScore / 10} pipes!
            </p>
            <p className="text-xl font-bold mb-6">Final Score: {score}</p>
            <div className="flex  w-full justify-center gap-4">
              <button
                className="btn btn-soft btn-default"
                onClick={() => closePopup()}
              >
                Cancel
              </button>
              <button
                onClick={() => closePopup("reset")}
                className="btn btn-soft btn-success"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}

      <SharedButtons game={"OilCap"} />
      <h1 className="text-4xl font-bold my-4">Flow</h1>

      {/* Mobile Instructions */}
      {isMobile && startGame && (
        <div className="bg-blue-100 p-3 rounded-lg mb-4 max-w-md mx-auto">
          <p className="text-sm">
            <strong>Mobile Controls:</strong> Tap a piece to select it, then tap
            a cell to place it!
          </p>
          {selectedPiece && (
            <p className="text-sm mt-1 text-green-600">
              Selected: {selectedPiece}
            </p>
          )}
        </div>
      )}

      {!startGame && (
        <>
          <h1>Welcome to Flow! Click Start to begin.</h1>
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
          isMobile={isMobile}
          selectedPiece={selectedPiece}
        />
        <Pieces
          startGame={startGame}
          setDraggedItem={setDraggedItem}
          hasDropped={hasDropped}
          setHasDropped={setHasDropped}
          isMobile={isMobile}
          onPieceSelect={handlePieceSelect}
          selectedPiece={selectedPiece}
        />
      </div>
    </div>
  );
};

export default OilcapGame;
