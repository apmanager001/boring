'use client'
// hooks/useGameEngine.js
import { useState, useEffect } from "react";

export function useGameEngine() {
  const [board, setBoard] = useState(generateEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(generateRandomPiece());

  useEffect(() => {
    const tick = setInterval(() => {
      setCurrentPiece((prev) => ({
        ...prev,
        position: { x: prev.position.x, y: prev.position.y - 1 }, // Move upward
      }));
    }, 500);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        move(-1, 0);
      } else if (e.key === "ArrowRight") {
        move(1, 0);
      } else if (e.key === "ArrowDown") {
        move(0, -1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPiece]);

  function move(dx, dy) {
    setCurrentPiece((prev) => ({
      ...prev,
      position: {
        x: prev.position.x + dx,
        y: prev.position.y + dy,
      },
    }));
  }

  return { board, currentPiece };
}

function generateEmptyBoard() {
  return Array.from({ length: 20 }, () => Array(10).fill(0));
}

function generateRandomPiece() {
  return {
    shape: [
      [1, 1],
      [1, 1],
    ],
    position: { x: 4, y: 19 }, // Spawn at bottom
  };
}
