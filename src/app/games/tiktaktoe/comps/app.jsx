'use client'
import React, { useState } from "react";
import Board from "./board";
import Piece from "./piece";

const App = () => {
  const [player1Pieces, setPlayer1Pieces] = useState({ sm: 3, md: 1, lg: 1 });
  const [player2Pieces, setPlayer2Pieces] = useState({ sm: 3, md: 1, lg: 1 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  // console.log(board)
  const handleMove = (row, col, piece) => {
    // if (board[row][col] !== null) return; 
    if (board[row][col] !== null) { 
      const currentPiece = board[row][col].piece;
      if (currentPiece === 'lg' || 
          (currentPiece === 'md' && piece === 'sm') || 
          (currentPiece === 'sm' && !['md', 'lg'].includes(piece))) { 
            alert('This square is already occupied with a bigger or equal piece')
        return;
        }
    }
    const newBoard = board.map((r, rowIndex) => 
      rowIndex === row ? [...r] : r
    )

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
  };

  return (
    <div className="flex flex-col my-10 items-center justify-center">
      <h1>Tic-Tac-Toe</h1>
      <Board board={board} handleMove={handleMove} />
      <div className="mt-4">
        <h2>Player {currentPlayer}'s Turn</h2>
        <div className="flex gap-2">
          {["sm", "md", "lg"].map((size) => (
            <Piece
              key={size}
              size={size}
              count={
                currentPlayer === 1 ? player1Pieces[size] : player2Pieces[size]
              }
              onClick={() => handleMove(1, 1, size)} // This is just a placeholder for demonstration
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
