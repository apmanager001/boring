'use client'
import { useRef, useState } from "react";
import { BadgeQuestionMark } from "lucide-react";


export default function Cell({
  value,
  row,
  col,
  setBoard,
  id,
  isCorrect,
  gameOver,
  focusedCell,
  setFocusedCell,
}) {
  const originalValue = useRef(value);
  const [notSure, setNotSure] = useState(false);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value) || 0;
    setBoard((prev) => {
      const updated = [...prev];
      updated[row][col] = newValue;
      return updated;
    });
  };
  const getBorderClass = () => {
    if (originalValue.current !== 0) {
      return "";
    }
    if (isCorrect === true) {
      return "border-4 border-success";
    } else if (isCorrect === false) {
      return "border-4 border-error";
    } else if (notSure === true) {
      return "border-4 border-warning";
    } else {
      return "input border focus:w-12 focus:h-12 border-primary transition-all duration-150 focus:border-4 focus:border-primary focus:relative focus:z-10 focus:-m-2 md:focus:z-0 md:focus:m-1";
    }
  };

  const handleNotSure = () => {
    setNotSure((prev) => !prev);
  };

  const isHighlighted = () => {
    if (focusedCell.row === null || focusedCell.col === null) return false;
    const sameRow = focusedCell.row === row;
    const sameCol = focusedCell.col === col;
    const sameGrid =
      Math.floor(focusedCell.row / 3) === Math.floor(row / 3) &&
      Math.floor(focusedCell.col / 3) === Math.floor(col / 3);
    return sameRow || sameCol || sameGrid;
  };

  const changeHighlight = `${isHighlighted() ? "bg-blue-100" : "bg-white"}`
  return (
    <div
      className={`indicator w-full flex justify-center
      ${changeHighlight} transition-colors duration-150`}
    >
      {originalValue.current === 0 && (
        <span
          className="indicator-item indicator-start cursor-pointer hover:text-warning hover:bg-gray-800 text-white/0 rounded-full p-0"
          onClick={handleNotSure}
        >
          <BadgeQuestionMark />
        </span>
      )}
      <input
        type="tel"
        id={id}
        className={`w-9 h-9 md:w-12 md:h-12 m-1 ${getBorderClass()} text-center text-black font-extrabold border rounded
        ${changeHighlight}`}
        onFocus={() => setFocusedCell({ row, col })}
        maxLength="1"
        min="0"
        max="9"
        value={value || ""}
        onChange={handleChange}
        disabled={originalValue.current !== 0 || gameOver}
        autoComplete="off"
      />
    </div>
  );
}
