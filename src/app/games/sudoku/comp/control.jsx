'use client'
import { useSudokuStore } from "../../../store/useSudokuStore";
import {
  Eraser,
  NotepadText,
  BadgeQuestionMark,
  History,
  BadgeCheck,
} from "lucide-react";

export default function Controls() {
  const {
    resetGame,
    validateBoard,
    setSelectedNumber,
    toggleNoteMode,
    toggleEraseMode,
    toggleNotSureMode,
    noteMode,
    eraseMode,
    notSureMode,
  } = useSudokuStore();

  const buttonPush =
    "h-24 w-24 rounded-lg text-xl flex flex-col justify-center items-center cursor-pointer transform transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none";
  return (
    <div className="pb-24">
      <div className="flex justify-center gap-10">
        {/* <div
          className={`bg-error ${buttonPush} ${
            eraseMode ? "ring-4 ring-white scale-105" : ""
          }`}
          onClick={toggleEraseMode}
        >
          <Eraser size={40} />
          <p>Eraser</p>
        </div> */}
        <button
          className={`bg-error ${buttonPush} ${
            eraseMode ? "ring-4 ring-white scale-105" : ""
          }`}
          onClick={() => setSelectedNumber(0)}
        >
          <Eraser size={40} />
          <p>Eraser</p>
        </button>
        <div
          className={`bg-info ${buttonPush} ${
            noteMode ? "ring-4 ring-white scale-105" : ""
          }`}
          onClick={toggleNoteMode}
        >
          <NotepadText size={40} />
          <p>Notes</p>
        </div>
        <div
          className={`bg-warning ${buttonPush} ${
            notSureMode ? "ring-4 ring-white scale-105" : ""
          }`}
          onClick={toggleNotSureMode}
        >
          <BadgeQuestionMark size={40} />
          <p>Unsure</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {[...Array(9)].map((_, i) => (
          <button
            key={i + 1}
            className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center hover:bg-blue-700"
            onClick={() => setSelectedNumber(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="flex justify-center space-x-4 my-4">
        <button className="btn btn-soft btn-info" onClick={resetGame}>
          <History /> Reset
        </button>
        <button className="btn btn-soft btn-success" onClick={validateBoard}>
          <BadgeCheck /> Validate
        </button>
      </div>
    </div>
  );
}
