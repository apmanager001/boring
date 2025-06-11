import React from "react";
import { Squirrel, Nut } from "lucide-react";

const Piece = ({ size, count, onClick, player, isSelected }) => {
  const sizeClasses = {
    sm: "w-12 h-12 text-sm",
    md: "w-16 h-16 text-md",
    lg: "w-20 h-20 text-lg",
  };

  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  if (count <= 0) return null;

  const handleDragStart = (e) => {
    e.dataTransfer.setData("piece", size);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 rounded-lg p-2 cursor-grab transition-all duration-200 ${
        player === 1
          ? "bg-blue-500 border-blue-600 hover:bg-blue-600"
          : "bg-amber-600 border-amber-700 hover:bg-amber-700"
      } ${sizeClasses[size]} ${
        isSelected ? "ring-4 ring-yellow-400 scale-110" : ""
      }`}
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
    >
      {player === 1 ? (
        <Squirrel size={iconSizes[size]} className="text-white mb-1" />
      ) : (
        <Nut size={iconSizes[size]} className="text-white mb-1" />
      )}
      <span className="text-white font-bold">
        {size.toUpperCase()} x{count}
      </span>
    </div>
  );
};

export default Piece;
