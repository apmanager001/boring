"use client";
import { useEffect } from "react";
import { useSudokuStore } from "../../../store/useSudokuStore";
import { Trophy, RotateCcw, Share2, Star } from "lucide-react";

export default function WinModal() {
  const { isComplete, resetGame, setIsComplete } = useSudokuStore();

  useEffect(() => {
    if (isComplete) {
      const modal = document.getElementById("winModal");
      if (modal instanceof HTMLDialogElement) {
        modal.showModal();
      }
    }
  }, [isComplete]);

  const handleNewGame = () => {
    resetGame();
    setIsComplete(false);
    const modal = document.getElementById("winModal");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "I completed a Sudoku puzzle!",
        text: "Check out this awesome Sudoku game!",
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <dialog id="winModal" className="modal">
      <div className="modal-box relative max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Trophy size={64} className="text-yellow-500" />
            <div className="absolute -top-2 -right-2">
              <Star size={24} className="text-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>

        <h3 className="font-bold text-2xl mb-2 text-success">
          🎉 Congratulations!
        </h3>

        <p className="py-4 text-gray-600">
          You've successfully completed the Sudoku puzzle! You're a logic
          wizard! 🧙‍♂️
        </p>

        <div className="flex flex-col gap-3 mt-6">
          <button onClick={handleNewGame} className="btn btn-primary w-full">
            <RotateCcw size={16} />
            Play Another Puzzle
          </button>

          <button onClick={handleShare} className="btn btn-outline w-full">
            <Share2 size={16} />
            Share Achievement
          </button>
        </div>
      </div>
    </dialog>
  );
}
