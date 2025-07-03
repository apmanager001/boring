'use client'
import { useState, useEffect } from "react";
import { Grid3x3 } from "lucide-react";
import SudokuGrid from "./sudokuGrid";
import Controls from "./control";
import { generateBoard } from "../utility/boardGenerator";


const Sudoku= () => {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [cellValidity, setCellValidity] = useState([]);

  const resetGame = () => {
    const { puzzle, solution } = generateBoard();
    setBoard(puzzle);
    setSolution(solution);
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
    const newValidity = board.map((row, rowIdx) =>
      row.map((cell, colIdx) => {
        // Only validate cells with user input (non-zero)
        if (cell !== 0) {
          return cell === solution[rowIdx][colIdx];
        }
        // Skip untouched cells
        return null;
      })
    );

    setCellValidity(newValidity);
  };

  return (
    <div className="p-2 md:p-6 max-w-screen-md mx-auto text-center space-y-6">
      <h1 className="flex items-center gap-2 justify-center text-2xl font-bold">
        <Grid3x3 className="text-primary" size={48} />
        Sudoku Game
      </h1>
      <SudokuGrid
        board={board}
        setBoard={setBoard}
        cellValidity={cellValidity}
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
