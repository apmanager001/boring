'use client'
import React, { useState, useEffect } from "react";
import Cell from "./cell";
import LoseAlert from "./loseAlert";
import Confetti from "./confetti";

const gridSize = 9

const BOARD_SIZE = gridSize
const NUM_BOMBS = 10;

const totalCells = gridSize * gridSize;
const nonBombCells = totalCells - NUM_BOMBS; 

const generateBoard = () => {
  // Initialize an empty board
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
      revealed: false,
      flagged: false,
      isBomb: false,
      adjacentBombs: 0,
    }))
  );

  // Place bombs randomly
  let bombsPlaced = 0;
  while (bombsPlaced < NUM_BOMBS) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);
    if (!board[row][col].isBomb) {
      board[row][col].isBomb = true;
      bombsPlaced++;
    }
  }

  // Calculate numbers (adjacent bombs) for each cell
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col].isBomb) continue;
      let adjacentBombs = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const r = row + i;
          const c = col + j;
          if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
            if (board[r][c].isBomb) adjacentBombs++;
          }
        }
      }
      board[row][col].adjacentBombs = adjacentBombs;
    }
  }

  return board;
};

const Board = ({setMarked, setStart}) => {
  const [board, setBoard] = useState(generateBoard());
  const [gameOver, setGameOver] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [lose, setLose] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [revealedCells, setRevealedCells] = useState(0);

  useEffect(() => {
    const flaggedCount = board.flat().filter((cell) => cell.flagged).length;
    setMarked(flaggedCount);
  }, [board, setMarked]);

  useEffect(() => {
    if (revealedCells === nonBombCells) {
      Confetti()
      setGameOver(true);
      setShowAlert(true)
      setStart(false);
    }
  }, [revealedCells]);

  const revealCell = (row, col) => {
    if (gameOver || board[row][col].revealed || board[row][col].flagged) return;

    if (isFirstClick) {
      setStart(true);
      setIsFirstClick(false);
    }

    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.isBomb) {
      setGameOver(true);
      setStart(false);
      setLose(true);
      setShowAlert(true);
      return;
    }

    const revealRecursive = (r, c) => {
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return;
      const currentCell = newBoard[r][c];
      if (currentCell.revealed || currentCell.flagged) return;
      currentCell.revealed = true;
      setRevealedCells((prev) => prev + 1);
      if (currentCell.adjacentBombs === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            revealRecursive(r + i, c + j);
          }
        }
      }
    };
    revealRecursive(row, col);
    setBoard(newBoard);
  };

  const toggleFlag = (row, col) => {
    if (gameOver || board[row][col].revealed) return;
    const newBoard = [...board];
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);
  };

  return (
    <div className={`grid grid-cols-${gridSize} gap-1`}>
      {showAlert ? <LoseAlert /> : " "}
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            lose={lose}
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => revealCell(rowIndex, colIndex)}
            onRightClick={(e) => {
              e.preventDefault();
              toggleFlag(rowIndex, colIndex);
            }}
          />
        ))
      )}
    </div>
  );
};

export default Board;