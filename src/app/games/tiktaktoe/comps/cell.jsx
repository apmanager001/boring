import React from "react";

const Cell = ({ row, col, cell, handleMove, currentPlayer }) => {
  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop by preventing the default behavior
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const piece = e.dataTransfer.getData("piece");
    if (piece && !cell) {
      handleMove(row, col, piece);
    }
  };

  return (
    <div
      className={`w-20 h-20 border flex items-center justify-center ${
        cell
          ? cell.player === 1
            ? "bg-blue-500"
            : "bg-red-500"
          : "bg-gray-200"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver} // Allow dragging over the cell
    >
      {cell && <div>{cell.piece}</div>}
    </div>
  );
};

export default Cell;
