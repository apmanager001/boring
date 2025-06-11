"use client";
import React, { useState, useEffect } from "react";
import Board from "./board";
import Piece from "./piece";
import { checkForWinner } from "./checkWinner";
import Confetti from "../../acornsweeper/comps/confetti";
import { Squirrel, Nut } from "lucide-react";

const App = () => {
  const [player1Pieces, setPlayer1Pieces] = useState({ sm: 2, md: 2, lg: 2 });
  const [player2Pieces, setPlayer2Pieces] = useState({ sm: 2, md: 2, lg: 2 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleMove = (row, col, piece) => {
    if (winner) return;

    const newBoard = board.map((r, rowIndex) =>
      rowIndex === row ? [...r] : r
    );

    newBoard[row][col] = { player: currentPlayer, piece };
    setBoard(newBoard);

    // Update pieces available for current player
    if (currentPlayer === 1) {
      const newPieces = { ...player1Pieces };
      newPieces[piece]--;
      setPlayer1Pieces(newPieces);
    } else {
      const newPieces = { ...player2Pieces };
      newPieces[piece]--;
      setPlayer2Pieces(newPieces);
    }

    // Switch to the next player
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setSelectedPiece(null);
  };

  useEffect(() => {
    const gameWinner = checkForWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [board]);

  const resetGame = () => {
    setPlayer1Pieces({ sm: 2, md: 2, lg: 2 });
    setPlayer2Pieces({ sm: 2, md: 2, lg: 2 });
    setCurrentPlayer(1);
    setBoard(Array(3).fill(Array(3).fill(null)));
    setWinner(null);
    setSelectedPiece(null);
  };

  return (
    <div className="flex flex-col my-10 items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Acorn Tic-Tac-Toe</h1>
      {showConfetti && <Confetti />}

      {winner && (
        <div className="text-xl font-bold animate-bounce">
          {winner.includes("Player 1")
            ? "🐿️ Squirrel Wins! 🎉"
            : "🌰 Acorn Wins! 🎉"}
          <button
            onClick={resetGame}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="text-lg">
        <span>
          Selected: {selectedPiece ? selectedPiece.toUpperCase() : "None"}
        </span>
      </div>

      <Board
        board={board}
        currentPlayer={currentPlayer}
        handleMove={handleMove}
        selectedPiece={selectedPiece}
      />

      <div className="mt-4 flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">
          {currentPlayer === 1 ? "🐿️ Squirrel's Turn" : "🌰 Nut's Turn"}
        </h2>
        <div className="flex gap-4">
          {["sm", "md", "lg"].map((size) => (
            <Piece
              key={size}
              size={size}
              player={currentPlayer}
              count={
                currentPlayer === 1 ? player1Pieces[size] : player2Pieces[size]
              }
              onClick={() => setSelectedPiece(size)}
              isSelected={selectedPiece === size}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
