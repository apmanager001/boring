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
    setSelectedNumber,
    noteMode,
    eraseMode,
    notSureMode,
    cellValidity,
    gameOver,
    isComplete,
  } = useSudokuStore();

  const { value, given } = board[row][col];
  const [notes, setNotes] = useState([]);
  const [notSure, setNotSure] = useState(false);
  const inputRef = useRef(null);

  // Handle number input from selectedNumber
  useEffect(() => {
    if (
      focusedCell.row === row &&
      focusedCell.col === col &&
      selectedNumber !== null &&
      !given &&
      !gameOver &&
      !isComplete
    ) {
      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((rowArr) =>
          rowArr.map((cell) => ({ ...cell }))
        );
        newBoard[row][col] = {
          ...newBoard[row][col],
          value: eraseMode ? 0 : selectedNumber,
          given: false,
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
      if (eraseMode) {
        setNotes([]);
      }
      setSelectedNumber(null);
    }
  }, [
    selectedNumber,
    eraseMode,
    row,
    col,
    focusedCell,
    given,
    gameOver,
    isComplete,
    noteMode,
    setBoard,
    setSelectedNumber,
  ]);

  // Handle not sure mode toggle
  useEffect(() => {
    if (
      focusedCell.row === row &&
      focusedCell.col === col &&
      !given &&
      notSureMode
    ) {
      setNotSure((prev) => !prev);
    }
  }, [notSureMode, row, col, focusedCell, given]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (focusedCell.row !== row || focusedCell.col !== col) return;

      if (e.key >= "1" && e.key <= "9") {
        setSelectedNumber(parseInt(e.key));
      } else if (e.key === "0" || e.key === "Backspace" || e.key === "Delete") {
        setSelectedNumber(0);
      } else if (e.key === "ArrowUp" && row > 0) {
        setFocusedCell({ row: row - 1, col });
      } else if (e.key === "ArrowDown" && row < 8) {
        setFocusedCell({ row: row + 1, col });
      } else if (e.key === "ArrowLeft" && col > 0) {
        setFocusedCell({ row, col: col - 1 });
      } else if (e.key === "ArrowRight" && col < 8) {
        setFocusedCell({ row, col: col + 1 });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [focusedCell, row, col, setFocusedCell, setSelectedNumber]);

  const getBorderClass = () => {
    const baseFocusClass = "border transition-all duration-150";
    const isFocused = focusedCell.row === row && focusedCell.col === col;

    if (given) return "";
    if (cellValidity?.[row]?.[col] === true) return "border-2 border-success";
    if (cellValidity?.[row]?.[col] === false) return "border-2 border-error";
    if (notSure) return "border-2 border-warning";
    if (isFocused) return `${baseFocusClass} border-2 border-primary`;

    return baseFocusClass;
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

  const background = isHighlighted()
    ? `bg-blue-100 ${given ? "border border-gray-300" : ""}`
    : "bg-white";

  const handleClick = () => {
    if (!given && !gameOver && !isComplete) {
      setFocusedCell({ row, col });
      inputRef.current?.focus();
    }
  };

  const handleTouchStart = (e) => {
    // Prevent double-tap zoom on mobile
    e.preventDefault();
  };

  return (
    <div
      className={`indicator w-full flex justify-center ${background} transition-colors duration-150`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
    >
      {!given && notes.length > 0 ? (
        <div
          ref={inputRef}
          tabIndex={0}
          className={`grid grid-cols-3 gap-y-1 pl-1 gap-x-4 w-9 h-9 md:w-12 md:h-12 m-1 text-xs text-gray-600 font-bold border rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${getBorderClass()} ${background}`}
          onFocus={() => setFocusedCell({ row, col })}
        >
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex items-center justify-center text-info">
              {notes.includes(i + 1) ? i + 1 : ""}
            </div>
          ))}
        </div>
      ) : (
        <input
          ref={inputRef}
          type="tel"
          id={`row/${row}-col/${col}`}
          className={`w-9 h-9 md:w-12 md:h-12 m-1 text-center text-black font-extrabold border rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${getBorderClass()} ${background}`}
          onFocus={() => setFocusedCell({ row, col })}
          value={value || ""}
          disabled={given || gameOver || isComplete}
          readOnly
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label={`Cell ${row + 1}, ${col + 1}`}
        />
      )}
    </div>
  );
}
