"use client";
import React, { useState } from "react";
import Head from "next/head";

const DotsAndBoxes = () => {
  // Game configuration
  const rows = 5;
  const cols = 5;

  // Game state
  const [gameState, setGameState] = useState({
    players: ["Player 1", "Player 2"],
    currentPlayer: 0,
    scores: [0, 0],
    horizontalLines: Array(rows + 1)
      .fill()
      .map(() => Array(cols).fill(false)),
    verticalLines: Array(rows)
      .fill()
      .map(() => Array(cols + 1).fill(false)),
    boxes: Array(rows)
      .fill()
      .map(() => Array(cols).fill(null)),
    gameOver: false,
  });

  // Improved box completion check
  const checkBoxCompletion = (row, col, newState) => {
    // Check if this is a valid box coordinate
    if (row < 0 || row >= rows || col < 0 || col >= cols) return false;

    return (
      newState.horizontalLines[row][col] && // top line
      newState.horizontalLines[row + 1][col] && // bottom line
      newState.verticalLines[row][col] && // left line
      newState.verticalLines[row][col + 1] // right line
    );
  };

  // Handle line click
  const handleLineClick = (isHorizontal, row, col) => {
    if (gameState.gameOver) return;

    // Make a deep copy of the state
    const newState = JSON.parse(JSON.stringify(gameState));

    // Update the line
    if (isHorizontal) {
      if (newState.horizontalLines[row][col]) return; // Line already drawn
      newState.horizontalLines[row][col] = true;
    } else {
      if (newState.verticalLines[row][col]) return; // Line already drawn
      newState.verticalLines[row][col] = true;
    }

    let boxesCompleted = false;
    const boxesToCheck = [];

    // Determine which boxes might be affected by this line
    if (isHorizontal) {
      // For horizontal lines, check the box above and below
      if (row > 0) boxesToCheck.push({ row: row - 1, col });
      if (row < rows) boxesToCheck.push({ row, col });
    } else {
      // For vertical lines, check the box to the left and right
      if (col > 0) boxesToCheck.push({ row, col: col - 1 });
      if (col < cols) boxesToCheck.push({ row, col });
    }

    // Check all potentially affected boxes
    boxesToCheck.forEach(({ row: boxRow, col: boxCol }) => {
      if (
        checkBoxCompletion(boxRow, boxCol, newState) &&
        newState.boxes[boxRow][boxCol] === null
      ) {
        newState.boxes[boxRow][boxCol] = newState.currentPlayer;
        newState.scores[newState.currentPlayer]++;
        boxesCompleted = true;
      }
    });

    // Switch player if no boxes were completed
    if (!boxesCompleted) {
      newState.currentPlayer = newState.currentPlayer === 0 ? 1 : 0;
    }

    // Check if game is over (all possible boxes are claimed)
    const allBoxesClaimed = newState.boxes.flat().every((box) => box !== null);
    newState.gameOver = allBoxesClaimed;

    setGameState(newState);
  };

  // Render the game board
  return (
    <>
    <Head>
      
    </Head>
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-xl mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-6">Dots and Boxes</h1>

        {/* Game status */}
        <div className="flex justify-between items-center mb-6">
          <div
            className={`text-lg font-semibold ${
              gameState.currentPlayer === 0 ? "text-primary" : "text-gray-500"
            }`}
          >
            Player 1: {gameState.scores[0]}
          </div>
          <div
            className={`text-lg font-semibold ${
              gameState.currentPlayer === 1 ? "text-secondary" : "text-gray-500"
            }`}
          >
            Player 2: {gameState.scores[1]}
          </div>
        </div>

        {gameState.gameOver && (
          <div className="alert alert-success shadow-lg mb-6">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Game Over!{" "}
                {gameState.scores[0] > gameState.scores[1]
                  ? "Player 1"
                  : gameState.scores[1] > gameState.scores[0]
                  ? "Player 2"
                  : "It's a tie!"}{" "}
                wins!
              </span>
            </div>
          </div>
        )}

        {/* Game board */}
        <div className="flex justify-center">
          <div
            className="relative "
            style={{
              width: `${cols * 60 + 20}px`,
              height: `${rows * 60 + 20}px`,
            }}
          >
            {/* Render dots */}
            {Array(rows + 1)
              .fill()
              .map((_, dotRow) =>
                Array(cols + 1)
                  .fill()
                  .map((_, dotCol) => (
                    <div
                      key={`dot-${dotRow}-${dotCol}`}
                      className="absolute w-4 h-4 bg-red-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{
                        left: `${dotCol * 60}px`,
                        top: `${dotRow * 60}px`,
                      }}
                    />
                  ))
              )}

            {/* Render horizontal lines */}
            {Array(rows + 1)
              .fill()
              .map((_, lineRow) =>
                Array(cols)
                  .fill()
                  .map((_, lineCol) => (
                    <div
                      key={`h-line-${lineRow}-${lineCol}`}
                      className={`absolute h-1 cursor-pointer hover:bg-opacity-50 ${
                        gameState.horizontalLines[lineRow][lineCol]
                          ? gameState.boxes[lineRow]?.[lineCol] === 0
                            ? "bg-primary"
                            : gameState.boxes[lineRow]?.[lineCol] === 1
                            ? "bg-secondary"
                            : "bg-yellow-300"
                          : "bg-gray-400"
                      }`}
                      style={{
                        width: "58px",
                        left: `${lineCol * 60 + 8}px`,
                        top: `${lineRow * 60 - 2}px`,
                      }}
                      onClick={() => handleLineClick(true, lineRow, lineCol)}
                    />
                  ))
              )}

            {/* Render vertical lines */}
            {Array(rows)
              .fill()
              .map((_, lineRow) =>
                Array(cols + 1)
                  .fill()
                  .map((_, lineCol) => (
                    <div
                      key={`v-line-${lineRow}-${lineCol}`}
                      className={`absolute w-1 cursor-pointer hover:bg-opacity-50 ${
                        gameState.verticalLines[lineRow][lineCol]
                          ? gameState.boxes[lineRow]?.[lineCol] === 0
                            ? "bg-primary"
                            : gameState.boxes[lineRow]?.[lineCol] === 1
                            ? "bg-secondary"
                            : "bg-yellow-300"
                          : "bg-gray-400"
                      }`}
                      style={{
                        height: "58px",
                        left: `${lineCol * 60 - 2}px`,
                        top: `${lineRow * 60 + 6}px`,
                      }}
                      onClick={() => handleLineClick(false, lineRow, lineCol)}
                    />
                  ))
              )}

            {/* Render boxes */}
            {Array(rows)
              .fill()
              .map((_, boxRow) =>
                Array(cols)
                  .fill()
                  .map(
                    (_, boxCol) =>
                      gameState.boxes[boxRow][boxCol] !== null && (
                        <div
                          key={`box-${boxRow}-${boxCol}`}
                          className={`absolute opacity-30 ${
                            gameState.boxes[boxRow][boxCol] === 0
                              ? "bg-primary"
                              : "bg-secondary"
                          }`}
                          style={{
                            width: "55px",
                            height: "55px",
                            left: `${boxCol * 60 + 2}px`,
                            top: `${boxRow * 60 + 2}px`,
                          }}
                        />
                      )
                  )
              )}
          </div>
        </div>

        {/* Reset button */}
        <div className="text-center mt-6">
          <button
            className="btn btn-soft btn-primary"
            onClick={() => {
              setGameState({
                players: ["Player 1", "Player 2"],
                currentPlayer: 0,
                scores: [0, 0],
                horizontalLines: Array(rows + 1)
                  .fill()
                  .map(() => Array(cols).fill(false)),
                verticalLines: Array(rows)
                  .fill()
                  .map(() => Array(cols + 1).fill(false)),
                boxes: Array(rows)
                  .fill()
                  .map(() => Array(cols).fill(null)),
                gameOver: false,
              });
            }}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DotsAndBoxes;
