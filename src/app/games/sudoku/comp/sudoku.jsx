"use client";
import { useState, useEffect } from "react";
import {
  Grid3x3,
  OctagonX,
  CircleQuestionMark,
  CircleX,
  BadgeCheck,
  BadgeQuestionMark,
  Clock,
  Trophy,
  RotateCcw,
  Lightbulb,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import SudokuGrid from "./sudokuGrid";
import Controls from "./control";
import { useSudokuStore } from "../../../store/useSudokuStore";
import Timer from "./timer";
import DifficultySelector from "./difficultySelector";
import WinModal from "./winModal";

export default function Sudoku() {
  const {
    validationsLeft,
    gameOver,
    board,
    solution,
    resetGame,
    difficulty,
    setDifficulty,
    hintsLeft,
    useHint,
    isComplete,
    setIsComplete,
  } = useSudokuStore();

  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  // Check for win condition
  useEffect(() => {
    if (board.length === 0) return;

    const isBoardComplete = board.every((row) =>
      row.every((cell) => cell.value !== 0)
    );

    if (isBoardComplete) {
      setIsComplete(true);
    }
  }, [board, setIsComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleHint = () => {
    if (hintsLeft > 0) {
      useHint();
      if (soundEnabled) {
        // Play hint sound
        const audio = new Audio("/sounds/hint.mp3");
        audio.play().catch(() => {}); // Ignore errors if sound fails
      }
    }
  };

  const handleNewGame = () => {
    resetGame();
    if (soundEnabled) {
      const audio = new Audio("/sounds/new-game.mp3");
      audio.play().catch(() => {});
    }
  };

  return (
    <div className="p-2 md:p-6 max-w-screen-lg mx-auto text-center space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold">
          <Grid3x3 className="text-primary" size={32} />
          Sudoku
          <button
            onClick={() => document.getElementById("SudokuRules").showModal()}
            className="btn btn-ghost btn-sm"
            aria-label="Game rules"
          >
            <CircleQuestionMark size={20} />
          </button>
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn btn-ghost btn-sm"
            aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="btn btn-ghost btn-sm"
            aria-label="Game settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-base-200 p-4 rounded-lg mb-4">
          <h3 className="font-bold mb-2">Game Settings</h3>
          <DifficultySelector />
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={handleNewGame} className="btn btn-primary btn-sm">
              <RotateCcw size={16} />
              New Game
            </button>
          </div>
        </div>
      )}

      {/* Game Stats */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-1 bg-base-200 px-3 py-1 rounded-full">
          <Clock size={16} />
          <Timer />
        </div>

        {!gameOver && (
          <div className="flex items-center gap-1 bg-base-200 px-3 py-1 rounded-full">
            <BadgeCheck color="#4BB543" size={16} />
            <span>Validations: {validationsLeft}</span>
          </div>
        )}

        <div className="flex items-center gap-1 bg-base-200 px-3 py-1 rounded-full">
          <Lightbulb size={16} />
          <span>Hints: {hintsLeft}</span>
        </div>
      </div>

      {/* Game Status */}
      {gameOver && (
        <div className="flex justify-center items-center gap-2 text-red-600 font-semibold text-lg bg-red-100 p-3 rounded-lg">
          <OctagonX />
          Game Over! Try Again!
        </div>
      )}

      {isComplete && (
        <div className="flex justify-center items-center gap-2 text-green-600 font-semibold text-lg bg-green-100 p-3 rounded-lg">
          <Trophy />
          Congratulations! Puzzle Complete!
        </div>
      )}

      {/* Mobile Instructions */}
      {isMobile && (
        <div className="bg-blue-100 p-3 rounded-lg max-w-md mx-auto">
          <p className="text-sm">
            <strong>Mobile Controls:</strong> Tap cells to select, use number
            buttons below to fill!
          </p>
        </div>
      )}

      {/* Game Grid */}
      <div className="flex justify-center">
        <SudokuGrid />
      </div>

      {/* Controls */}
      <Controls />

      {/* Rules Modal */}
      <dialog id="SudokuRules" className="modal">
        <div className="modal-box relative max-w-md">
          <form method="dialog">
            <button className="absolute right-4 top-4 text-gray-500 hover:text-red-500">
              <CircleX size={24} />
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">How to Play Sudoku</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary">1.</span>
              <p>
                Fill each row, column, and 3×3 box with numbers 1-9 without
                repetition.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary">2.</span>
              <p>Use logic and deduction - no guessing required!</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary">3.</span>
              <p>Use notes to mark possible numbers in cells.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-warning">💡</span>
              <p>Use hints when stuck (limited uses available).</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-success">✓</span>
              <p>Validate your progress to check for mistakes.</p>
            </div>
          </div>
        </div>
      </dialog>

      {/* Win Modal */}
      <WinModal />
    </div>
  );
}
