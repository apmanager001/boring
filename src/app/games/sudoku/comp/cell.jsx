'use client'
import { useRef } from "react";

export default function Cell({ value, row, col, setBoard, id, isCorrect, gameOver }) {
  const originalValue = useRef(value);

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
    }
      return "input border border-primary focus:border-4 focus:border-primary"
  };
  


  return (
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
    />
  );
}
