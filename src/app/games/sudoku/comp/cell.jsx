"use client";
import { useState, useRef, useEffect } from "react";
import { useSudokuStore } from "../../../store/useSudokuStore";
import { BadgeQuestionMark } from "lucide-react";

export default function Cell({ row, col }) {
  const {
    board,
    setBoard,
    focusedCell,
    setFocusedCell,
    selectedNumber,
    noteMode,
    eraseMode,
    notSureMode,
    cellValidity,
    gameOver,
  } = useSudokuStore();
  const { value, given } = board[row][col];
  const [notes, setNotes] = useState([]);
  const [notSure, setNotSure] = useState(false);
  // console.log(selectedNumber)
  useEffect(() => {
    if (
      focusedCell.row === row &&
      focusedCell.col === col &&
      selectedNumber !== null &&
      !given &&
      !gameOver
    ) { 
      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((rowArr) =>
          rowArr.map((cell) => ({ ...cell }))
        );
        newBoard[row][col] = {
          ...newBoard[row][col],
          value: eraseMode ? 0 : selectedNumber,
          given:false
        };
        return newBoard;
      });

      if (noteMode && !eraseMode) {
        setNotes((prev) =>
          Array.from(new Set([...prev, selectedNumber])).sort()
        );
      } else {
        setNotes([]);
      }
    }
  }, [selectedNumber]);

  useEffect(() => {
    if (
      focusedCell.row === row &&
      focusedCell.col === col &&
      !given &&
      notSureMode
    ) {
      setNotSure((prev) => !prev);
    }
  }, [notSureMode]);

  const getBorderClass = () => {
    if (given) return "";
    if (cellValidity?.[row]?.[col] === true) return "border-4 border-success";
    if (cellValidity?.[row]?.[col] === false) return "border-4 border-error";
    if (notSure) return "border-4 border-warning";
    return "input border focus:w-12 focus:h-12 border-primary transition-all duration-150 focus:border-4 focus:border-primary focus:relative focus:z-10 focus:-m-2 md:focus:z-0 md:focus:m-1";
  };

  const isHighlighted = () => {
    if (focusedCell.row === null || focusedCell.col === null) return false;
    return (
      focusedCell.row === row ||
      focusedCell.col === col ||
      (Math.floor(focusedCell.row / 3) === Math.floor(row / 3) &&
        Math.floor(focusedCell.col / 3) === Math.floor(col / 3))
    );
  };

  const background = isHighlighted() ? `bg-blue-100 ${given? 'border border-gray-300' : ''}` : "bg-white";

  return (
    <div
      className={`indicator w-full flex justify-center ${background} transition-colors duration-150`}
    >
      {!given && notes.length > 0 ? (
        <div
          onClick={() => setFocusedCell({ row, col })}
          className={`grid grid-cols-3 gap-0.5 w-9 h-9 md:w-12 md:h-12 m-1 text-xs text-gray-600 font-bold border rounded ${getBorderClass()} ${background}`}
        >
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              {notes.includes(i + 1) ? i + 1 : ""}
            </div>
          ))}
        </div>
      ) : (
        <input
          type="tel"
          id={`row/${row}-col/${col}`}
          className={`w-9 h-9 md:w-12 md:h-12 m-1 text-center text-black font-extrabold border rounded ${getBorderClass()} ${background}`}
          onFocus={() => setFocusedCell({ row, col })}
          value={value || ""}
          disabled={given || gameOver}
          readOnly
        />
      )}
    </div>
  );
}
