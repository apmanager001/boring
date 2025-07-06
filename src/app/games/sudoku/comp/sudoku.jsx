'use client'
import { useState, useEffect } from "react";
import {
  Grid3x3,
  BadgeCheck,
  OctagonX,
  CircleQuestionMark,
  CircleX,
  BadgeQuestionMark,
} from "lucide-react";
import SudokuGrid from "./sudokuGrid";
import Controls from "./control";
import { generateBoard } from "../utility/boardGenerator";


const Sudoku= () => {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [cellValidity, setCellValidity] = useState([]);
  const [validationsLeft, setValidationsLeft] = useState(3);
  const [gameOver, setGameOver] = useState(false);


  const resetGame = () => {
    // const { puzzle, solution } = generateBoard();
    // setBoard(puzzle);
    // setSolution(solution);
    window.location.reload();
  };

  useEffect(() => {
    const { puzzle, solution } = generateBoard();
    setBoard(puzzle);
    setSolution(solution);
  }, []);

  // const handleValidationResult = () => {
  //   const newValidity = board.map((row, rowIdx) =>
  //     row.map((cell, colIdx) => cell === solution[rowIdx][colIdx])
  //   );
  //   setCellValidity(newValidity);

  // };
  const handleValidationResult = () => {
    if (validationsLeft < 0 || gameOver) return;

    const newValidity = board.map((row, rowIdx) =>
      row.map((cell, colIdx) => {
        if (cell !== 0) {
          return cell === solution[rowIdx][colIdx];
        }
        return null;
      })
    );

    setCellValidity(newValidity);
    const remaining = validationsLeft - 1;
    setValidationsLeft(remaining);

    if (remaining < 0) {
      setGameOver(true);
    }
  };

  return (
    <div className="p-.5 md:p-6 max-w-screen-md mx-auto text-center space-y-6">
      <h1 className="flex items-center gap-2 justify-center text-2xl font-bold">
        <Grid3x3 className="text-primary" size={48} />
        Sudoku Game
        <button
          className=""
          onClick={() => document.getElementById("SudokuRules").showModal()}
        >
          <CircleQuestionMark />
        </button>
        <dialog id="SudokuRules" className="modal">
          <div className="modal-box relative">
            {/* Close icon in top right */}
            <form method="dialog">
              <button
                className="absolute right-4 top-4 text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Close"
              >
                <CircleX size={24} />
              </button>
            </form>

            <h3 className="font-bold text-lg mb-2">Sudoku Rules</h3>

            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-500">
              <li>
                Each row must contain the numbers 1–9 without any repetitions.
              </li>
              <li>
                Each column must also contain the numbers 1–9 without repeating
                values.
              </li>
              <li>
                Each of the nine 3×3 subgrids must include all numbers from 1 to
                9.
              </li>
              <li>
                Only one number is allowed per cell—no duplicates or
                placeholders.
              </li>
              <li>
                Use logic and the process of elimination to determine valid
                entries.
              </li>
              <li>
                Every number placed should be backed by reasoning—guessing isn't
                Ideal.
              </li>
              <li className="flex items-center gap-2 pt-10">
                  <BadgeQuestionMark className="mt-1 text-warning bg-gray-800 rounded-full p-1 shrink-0" />
                  <span>
                    If you're unsure, click this icon (found in the top corner
                    of the box) to mark a cell for review later.
                  </span>
              </li>
            </ol>
          </div>
        </dialog>
      </h1>
      {!gameOver ? (
        <p className="flex justify-center items-center gap-2 text-sm text-gray-600">
          <BadgeCheck color="#4BB543" /> Validations left:
          <span className="text-gray-300 font-semibold">{validationsLeft}</span>
        </p>
      ) : (
        <p className="flex justify-center items-center gap-2 text-red-600 font-semibold text-lg">
          <OctagonX /> Game Over, Try Again!
        </p>
      )}
      <SudokuGrid
        board={board}
        setBoard={setBoard}
        cellValidity={cellValidity}
        gameOver={gameOver}
      />
      <Controls
        resetGame={resetGame}
        board={board}
        solution={solution}
        onValidate={handleValidationResult}
      />
    </div>
  );
}

export default Sudoku
