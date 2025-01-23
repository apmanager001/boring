import React from "react";

const Piece = ({ size, count, onClick, player }) => {
  const pieceTypes = {
    sm: "Small",
    md: "Medium",
    lg: "Large",
  };

  if (count <= 0) return null; // Don't display if no pieces left.

  const handleDragStart = (e) => {
    e.dataTransfer.setData("piece", size); // Store the piece type in the drag data
  };

  return (
    <div
      className={`w-12 h-12 border flex items-center justify-center ${
        player === 2 ? "bg-red-500" : "bg-blue-500"
      } cursor-pointer`}
      onClick={onClick}
      draggable
      onDragStart={handleDragStart} // Start dragging the piece
    >
      {pieceTypes[size]} x{count}
    </div>
  );
};

export default Piece;
