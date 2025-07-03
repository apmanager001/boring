'use client'
import { useState, useEffect } from "react";
import { Grid3x3 } from "lucide-react";
import SudokuGrid from "./sudokuGrid";
import Controls from "./control";
import { generateBoard } from "../utility/boardGenerator";


const Sudoku= () => {
    // const [board, setBoard] = useState(generateBoard());
    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);

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

    return (
      <div className="p-6 max-w-screen-md mx-auto text-center space-y-6">
        <h1 className="flex items-center gap-2 justify-center text-2xl font-bold">
          <Grid3x3 className="text-primary" />
            Sudoku Game
        </h1>
        <SudokuGrid board={board} setBoard={setBoard} />
        <Controls resetGame={resetGame} board={board} solution={solution}/>
      </div>
    );
}

export default Sudoku
