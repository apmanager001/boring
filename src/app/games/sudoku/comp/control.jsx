"use client";
import { useSudokuStore } from "../../../store/useSudokuStore";
import {
  Eraser,
  NotepadText,
  BadgeQuestionMark,
  History,
  BadgeCheck,
  Lightbulb,
  RotateCcw,
} from "lucide-react";

export default function Controls() {
  const {
    resetGame,
    validateBoard,
    setSelectedNumber,
    toggleNoteMode,
    toggleEraseMode,
    toggleNotSureMode,
    noteMode,
    eraseMode,
    notSureMode,
    hintsLeft,
    useHint,
    focusedCell,
    gameOver,
    isComplete,
  } = useSudokuStore();

  const buttonPush =
    "h-16 w-16 md:h-20 md:w-20 rounded-lg text-sm md:text-base flex flex-col justify-center items-center cursor-pointer transform transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none";

  const handleHint = () => {
    if (hintsLeft > 0 && focusedCell.row !== null && focusedCell.col !== null) {
      useHint();
    }
  };

  return (
    <div className="pb-8 md:pb-12 space-y-4">
      {/* Tool Buttons */}
      <div className="flex justify-center gap-4 md:gap-6">
        <button
          className={`bg-error ${buttonPush} ${
            eraseMode ? "ring-4 ring-white scale-105" : ""
          }`}
          onClick={() => setSelectedNumber(0)}
          disabled={gameOver || isComplete}
          title="Erase cell"
        >
          <Eraser size={24} className="md:w-6 md:h-6" />
          <p className="text-xs">Erase</p>
        </button>

        <button
          className={`bg-info ${buttonPush} ${
            noteMode ? "ring-4 ring-white scale-105" : ""
          }`}
          onClick={toggleNoteMode}
          disabled={gameOver || isComplete}
          title="Toggle note mode"
        >
          <NotepadText size={24} className="md:w-6 md:h-6" />
          <p className="text-xs">Notes</p>
        </button>

        <button
          className={`bg-warning ${buttonPush} ${
            notSureMode ? "ring-4 ring-white scale-105" : ""
          }`}
          onClick={toggleNotSureMode}
          disabled={gameOver || isComplete}
          title="Mark as unsure"
        >
          <BadgeQuestionMark size={24} className="md:w-6 md:h-6" />
          <p className="text-xs">Unsure</p>
        </button>

        <button
          className={`bg-success ${buttonPush} ${
            hintsLeft === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleHint}
          disabled={hintsLeft === 0 || gameOver || isComplete}
          title={`Use hint (${hintsLeft} left)`}
        >
          <Lightbulb size={24} className="md:w-6 md:h-6" />
          <p className="text-xs">Hint</p>
        </button>
      </div>

      {/* Number Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[...Array(9)].map((_, i) => (
          <button
            key={i + 1}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setSelectedNumber(i + 1)}
            disabled={gameOver || isComplete}
            title={`Place number ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          className="btn btn-soft btn-info btn-sm md:btn-md"
          onClick={resetGame}
          title="Start new game"
        >
          <RotateCcw size={16} className="md:w-5 md:h-5" />
          <span className="hidden md:inline">New Game</span>
          <span className="md:hidden">New</span>
        </button>

        <button
          className="btn btn-soft btn-success btn-sm md:btn-md"
          onClick={validateBoard}
          disabled={gameOver || isComplete}
          title="Validate current progress"
        >
          <BadgeCheck size={16} className="md:w-5 md:h-5" />
          <span className="hidden md:inline">Validate</span>
          <span className="md:hidden">Check</span>
        </button>
      </div>

      {/* Mobile Instructions */}
      <div className="text-center text-xs text-gray-500 max-w-md mx-auto">
        <p className="mb-2">
          <strong>Controls:</strong> Tap cells to select, use number buttons to
          fill
        </p>
        <p>
          <strong>Keyboard:</strong> Arrow keys to navigate, 1-9 to fill, 0 to
          erase
        </p>
      </div>
    </div>
  );
}
