import React, { useState, useEffect } from "react";

const PIPE_TYPES = [
  "║", // Straight Vertical
  "═", // Straight Horizontal
  "╔", // Left to Curve Up
  "╗", // Right to Curve Up
  "╚", // Left to Curve Down
  "╝", // Right to Curve Down
  "╬", // Cross Piece
];

const Pieces = ({ onSelect }) => {
  const [pieceStack, setPieceStack] = useState([]);

  // Randomly generate 4 pieces
  useEffect(() => {
    const shuffled = PIPE_TYPES.sort(() => 0.5 - Math.random());
    setPieceStack(shuffled.slice(0, 4)); // Pick 4 random pieces
  }, []);

  // Handle placing a piece (only the top one)
  const handleSelect = () => {
    if (pieceStack.length > 0) {
      onSelect(pieceStack[0]); // Send the top piece to the board
      setPieceStack((prev) => prev.slice(1)); // Remove top piece
    }
  };

  return (
    <div className="flex md:flex-col items-center gap-2  p-4 rounded-lg">
      <h2 className="font-bold text-lg mb-2">Drag your piece:</h2>
      {pieceStack.map((piece, index) => (
        <div
          key={index}
          className={`w-12 h-12 flex items-center justify-center border border-black cursor-pointer text-black text-xl ${
            index === 0 ? "bg-yellow-400" : "bg-gray-200 opacity-50"
          }`}
          onClick={index === 0 ? handleSelect : undefined}
        >
          {piece}
        </div>
      ))}
    </div>
  );
};

export default Pieces;
