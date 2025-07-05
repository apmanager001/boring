'use client'
import { useRef, useState } from "react";
import { BadgeQuestionMark } from "lucide-react";


export default function Cell({ value, row, col, setBoard, id, isCorrect, gameOver }) {
  const originalValue = useRef(value);
  const [notSure, setNotSure] = useState(false)

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
    if(isCorrect === true){
      return "border-4 border-success";
    } else if(isCorrect === false){
      return "border-4 border-error"
    } else if(notSure === true){
      return "border-4 border-warning"
    } else {
      return "input border border-primary focus:border-4 focus:border-primary"
    }
  };
  
  const handleNotSure = () => {
    setNotSure((prev) => !prev); 
  };

  return (
    <div className="indicator">
      {originalValue.current === 0 && (
        <span className="indicator-item indicator-start cursor-pointer hover:text-warning hover:bg-gray-800 text-white/0 rounded-full p-0" onClick={handleNotSure}>
          <BadgeQuestionMark />
        </span>
      )}
      <input
        type="tel"
        id={id}
        className={`w-8 h-8 md:w-12 md:h-12 m-1 ${getBorderClass()} text-center text-black font-extrabold border rounded bg-white`}
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
