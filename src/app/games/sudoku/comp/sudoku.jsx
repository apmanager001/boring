"use client";
import {
  Grid3x3,
  OctagonX,
  CircleQuestionMark,
  CircleX,
  BadgeCheck,
  BadgeQuestionMark,
} from "lucide-react";
import SudokuGrid from "./sudokuGrid";
import Controls from "./control";
import { useSudokuStore } from "../../../store/useSudokuStore";

export default function Sudoku() {
  const { validationsLeft, gameOver } = useSudokuStore();

  return (
    <div className="p-.5 md:p-6 max-w-screen-md mx-auto text-center space-y-6">
      <h1 className="flex items-center gap-2 justify-center text-2xl font-bold">
        <Grid3x3 className="text-primary" size={48} />
        Sudoku Game
        <button
          onClick={() => document.getElementById("SudokuRules").showModal()}
        >
          <CircleQuestionMark />
        </button>
        <dialog id="SudokuRules" className="modal">
          <div className="modal-box relative">
            <form method="dialog">
              <button className="absolute right-4 top-4 text-gray-500 hover:text-red-500">
                <CircleX size={24} />
              </button>
            </form>
            <h3 className="font-bold text-lg mb-2">Sudoku Rules</h3>
            <ol className="list-decimal list-inside text-sm text-gray-500 space-y-2">
              <li>Each row must contain numbers 1–9 without repetition.</li>
              <li>Same goes for columns and 3×3 subgrids.</li>
              <li>Use logic and deduction — not guessing!</li>
              <li className="pt-10 flex items-center gap-2">
                <BadgeQuestionMark className="mt-1 text-warning bg-gray-800 rounded-full p-1" />
                Mark cells as unsure with the icon.
              </li>
            </ol>
          </div>
        </dialog>
      </h1>

      {!gameOver ? (
        <p className="flex justify-center gap-2 text-sm text-gray-600">
          <BadgeCheck color="#4BB543" /> Validations left:{" "}
          <span className="text-gray-300 font-semibold">{validationsLeft}</span>
        </p>
      ) : (
        <p className="flex justify-center items-center gap-2 text-red-600 font-semibold text-lg">
          <OctagonX /> Game Over, Try Again!
        </p>
      )}

      <SudokuGrid />
      <Controls />
    </div>
  );
}
