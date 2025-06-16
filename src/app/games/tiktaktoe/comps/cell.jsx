import React from "react";
import toast from "react-hot-toast";
import { Squirrel, Nut } from "lucide-react";

const Cell = ({ row, col, cell, handleMove, currentPlayer, selectedPiece }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const piece = e.dataTransfer.getData("piece");
    if (!piece) return;

    if (cell) {
      if (currentPlayer === cell.player) {
        toast.error("You can't replace your own piece");
        return;
      }
      if (
        cell.piece === "lg" ||
        (cell.piece === "md" && (piece === "sm" || piece === "md")) ||
        (cell.piece === "sm" && !["md", "lg"].includes(piece))
      ) {
        toast.error("This square is already occupied with a bigger or equal piece");
        return;
      }
    }

    handleMove(row, col, piece);
  };

  const handleClick = () => {
    if (!selectedPiece) return;
    if (cell) {
      if (currentPlayer === cell.player) {
        toast.error("You can't replace your own piece");
        return;
      }
      if (
        cell.piece === "lg" ||
        (cell.piece === "md" &&
          (selectedPiece === "sm" || selectedPiece === "md")) ||
        (cell.piece === "sm" && !["md", "lg"].includes(selectedPiece))
      ) {
        toast.error(
          "This square is already occupied with a bigger or equal piece"
        );
        return;
      }
    }
    handleMove(row, col, selectedPiece);
  };

  const getIconSize = (size) => {
    switch (size) {
      case "sm":
        return 24;
      case "md":
        return 32;
      case "lg":
        return 40;
      default:
        return 32;
    }
  };

  return (
    <div
      className={`w-20 h-20 flex flex-col items-center justify-center rounded-md transition-all duration-200 ${
        cell
          ? cell.player === 1
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-amber-600 hover:bg-amber-700"
          : "bg-gray-200 hover:bg-gray-300"
      } ${selectedPiece ? "cursor-pointer" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      {cell && (
        <div className="flex flex-col items-center">
          <div className={`animate-[bounce_0.5s_ease-in-out]`}>
            {cell.player === 1 ? (
              <Squirrel size={getIconSize(cell.piece)} className="text-white" />
            ) : (
              <Nut size={getIconSize(cell.piece)} className="text-white" />
            )}
          </div>
          <span className="text-xs font-bold text-white mt-1 bg-black bg-opacity-30 px-2 py-1 rounded-full">
            {cell.piece.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Cell;
