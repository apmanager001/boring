"use client";
import { useState, useEffect } from "react";
import { useSudokuStore } from "../../../store/useSudokuStore";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const { gameOver, isComplete, resetGame } = useSudokuStore();

  useEffect(() => {
    let interval = null;

    if (!gameOver && !isComplete) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameOver, isComplete]);

  // Reset timer when game resets
  useEffect(() => {
    const unsubscribe = useSudokuStore.subscribe(
      (state) => state.gameOver,
      (gameOver) => {
        if (!gameOver) {
          setSeconds(0);
        }
      }
    );

    return unsubscribe;
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return <span className="font-mono font-bold">{formatTime(seconds)}</span>;
}
