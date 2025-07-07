'use client'
import { useGameEngine } from "./useGameEngine";
import { Piece } from "./pieces";

export default function Tetris() {
  const { board, currentPiece } = useGameEngine();

  return (
    <div className="bg-base-300 border-4 border-primary shadow-xl w-fit mx-auto">
      <div className="grid grid-rows-20 grid-cols-10 gap-[1px] transform rotate-180">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-6 h-6 sm:w-8 sm:h-8 ${
                cell ? "bg-primary" : "bg-base-100"
              }`}
            />
          ))
        )}
      </div>
      {/* <Piece piece={currentPiece} /> */}
    </div>
  );
}
