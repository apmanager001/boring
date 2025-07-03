'use client'
import { useRef } from "react";

export default function Cell({ value, row, col, setBoard, id }) {
  const originalValue = useRef(value); // Lock in the initial prop value

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value) || 0;
    setBoard((prev) => {
      const updated = [...prev];
      updated[row][col] = newValue;
      return updated;
    });
  };

  return (
    <input
      type="text"
      id={id}
      className={`w-7 h-7 md:w-12 md:h-12 m-1 ${
        originalValue.current !== 0 ? "" : "border border-primary"
      } text-center text-black font-extrabold border rounded bg-white`}
      maxLength="1"
      min="0"
      max="9"
      value={value || ""}
      onChange={handleChange}
      disabled={originalValue.current !== 0}
    />
  );
}
