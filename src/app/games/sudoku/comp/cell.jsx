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
  } = useSudokuStore();
  const { value, given } = board[row][col];
  const [notes, setNotes] = useState([]);
  const [notSure, setNotSure] = useState(false);
  // if (selectedNumber) {
  //   console.log(`Selected number is: ${selectedNumber}`);
  // }
  console.log(notes)
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
      if(eraseMode){
        setNotes([])
      }
      setSelectedNumber(null);

    }
  }, [selectedNumber, eraseMode]);

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
    const baseFocusClass =
      "input border focus:w-12 focus:h-12 border-primary transition-all duration-150 focus:relative focus:z-10 focus:-m-2 md:focus:z-0 md:focus:m-1";
    const isFocused = focusedCell.row === row && focusedCell.col === col;
    if (given) return "";
    if (cellValidity?.[row]?.[col] === true) return "border-4 border-success";
    if (cellValidity?.[row]?.[col] === false) return "border-4 border-error";
    if (notSure) return "border-4 border-warning";
    return `${baseFocusClass}${isFocused ? " border-4" : ""}`;

    // "input border focus:w-12 focus:h-12 border-primary transition-all duration-150 focus:border-4 focus:border-primary focus:relative focus:z-10 focus:-m-2 md:focus:z-0 md:focus:m-1";
           ;
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

    useEffect(() => {
      if (!cellValidity) return;

      const allTrue = cellValidity.every((row) =>
        row.every((cell) => cell === true)
      );

      if (allTrue) {
        showWinModal(); // 🎉 Trigger your win logic here
      }
    }, [cellValidity]);

    const showWinModal = () => {
      const modal = document.getElementById("winModal");
      /** @type {HTMLDialogElement | null} */
      if (modal instanceof HTMLDialogElement) {
        modal.showModal();
      }

    };
  return (
    <div
      className={`indicator w-full flex justify-center ${background} transition-colors duration-150`}
    >
      {/* <dialog id="winModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-success">
            🎉 Congratulations!
          </h3>
          <p className="py-4">
            You’ve successfully completed the puzzle. You’re a logic wizard 🧙
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-success">Celebrate and Close</button>
            </form>
          </div>
        </div>
      </dialog> */}
      {!given && notes.length > 0 ? (
        // <div
        //   onClick={() => setFocusedCell({ row, col })}
        //   className={`flex w-9 h-9 md:h-12 md:w-12 m-1 border text-xs rounded ${getBorderClass()} ${background}`}
        // >

        //   {[...Array(8)].map((_, i) => {
        //     const positions = [
        //       "top-0 left-0", // top-left
        //       "top-0 right-0", // top-right
        //       "bottom-0 left-0", // bottom-left
        //       "bottom-0 right-0", // bottom-right
        //       "top-0 left-1/2 -translate-x-1/2", // top-center
        //       "top-1/2 right-0 -translate-y-1/2", // right-center
        //       "bottom-0 left-1/2 -translate-x-1/2", // bottom-center
        //       "top-1/2 left-0 -translate-y-1/2", // left-center
        //     ];

        //     return (
        //       <input
        //         key={i}
        //         className={`absolute w-9 h-9 md:w-12 md:h-12 bg-white border rounded ${positions[i]} ${background}`}
        //         type="text"

        //       />
        //     );
        //   })}
        // </div>
        <div
          onClick={() => setFocusedCell({ row, col })}
          className={`grid grid-cols-3 gap-y-1 pl-1 gap-x-4 w-9 h-9 md:w-12 md:h-12 m-1 text-xs text-gray-600 font-bold border rounded ${getBorderClass()} ${background}`}
        >
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex items-center justify-center text-info">
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
