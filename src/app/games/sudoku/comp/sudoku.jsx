'use client'
import { useState, useEffect } from "react";
import { Grid3x3, BadgeCheck, OctagonX } from "lucide-react";
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
