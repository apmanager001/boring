"use client";
import { useEffect } from 'react';
import { generateBoard } from '../utility/boardGenerator';
import { useSudokuStore} from '../../../store/useSudokuStore'
import Cell from "./cell";

export default function SudokuGrid() {
  const { board, setBoard, setFocusedCell, solution, setSolution } =
    useSudokuStore();
  useEffect(() => {
    const { puzzle, solution } = generateBoard();
    setBoard(puzzle);
    setSolution(solution);
    setFocusedCell({ row: null, col: null });
  }, []);

  if (board.length === 0) return null;
  return (
    <div className="grid grid-cols-9 gap-px bg-gray-800 p-px rounded shadow border-2 border-gray-800">
      {board.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`relative ${
              colIndex === 2 || colIndex === 5 ? "border-r-4" : ""
            } ${
              rowIndex === 2 || rowIndex === 5 ? "border-b-4" : ""
            } border-gray-800`}
          >
            <Cell row={rowIndex} col={colIndex} />
          </div>
        ))
      )}
    </div>
  );
}
