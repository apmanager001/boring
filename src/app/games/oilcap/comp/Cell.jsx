'use client'
import React from "react";

const Cell = ({ type, onClick }) => (
    
  <div
    className={`w-12 h-12 border flex items-center justify-center cursor-pointer ${
      type?.includes("START")
        ? "bg-green-500 text-white font-bold"
        : "bg-blue-500"
    }`}
    onClick={onClick}
  >
    {/* {type || "⬜"} */}
    {type || ""}
  </div>
);

export default Cell;
