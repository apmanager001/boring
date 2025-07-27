import React, { useState, useEffect } from "react";
// import { DndContext, useDraggable } from "@dnd-kit/core";

const PIPE_TYPES = {
  "║": "/pipe/verticalStraight.svg",
  "═": "/pipe/horizontalStraight.svg",
  "╔": "/pipe/rightToDown.svg",
  "╗": "/pipe/leftToDown.svg",
  "╚": "/pipe/rightToUp.svg",
  "╝": "/pipe/leftToUp.svg",
  "╬": "/pipe/cross.svg",
};

const Pieces = ({
  setDraggedItem,
  hasDropped,
  setHasDropped,
  startGame,
  isMobile,
  onPieceSelect,
  selectedPiece,
}) => {
  const [pieceStack, setPieceStack] = useState([]);

  useEffect(() => {
    setPieceStack(
      () =>
        Object.keys(PIPE_TYPES)
          .sort(() => 0.5 - Math.random()) // Shuffle the pieces
          .slice(0, 4) // Pick 4 random ones
    );
  }, []);

  const handleDragEnd = (event) => {
    setDraggedItem(null);
    setHasDropped(true);
  };

  const handleDragStart = (event, piece) => {
    event.dataTransfer.setData("text/plain", piece);
    setDraggedItem(piece);
  };

  const handlePieceClick = (piece, index) => {
    if (isMobile && startGame && index === 0) {
      onPieceSelect(piece);
    }
  };

  useEffect(() => {
    const updateStack = async () => {
      if (hasDropped) {
        await new Promise((resolve) => setTimeout(resolve, 200)); // Small delay before updating stack

        setPieceStack((prevStack) => {
          const newStack = [...prevStack.slice(1)]; // Remove first piece
          let newPiece;
          const pipeKeys = Object.keys(PIPE_TYPES);

          // Ensure the new piece is not the same as pieceStack[2]
          do {
            newPiece = pipeKeys[Math.floor(Math.random() * pipeKeys.length)];
          } while (newStack[2] && newPiece === newStack[2]);

          newStack.push(newPiece); // Add valid random piece
          return newStack;
        });

        setHasDropped(false); // Reset drop state
      }
    };

    updateStack();
  }, [hasDropped, setHasDropped]);

  return (
    <div className="flex md:flex-col items-center gap-2 p-4 mb-10 md:mb-0 rounded-lg select-none">
      <h2 className="font-bold text-lg mb-2">
        {isMobile ? "Tap to select:" : "Drag your piece:"}
      </h2>
      {pieceStack.map((piece, index) => (
        <div
          key={index}
          className={`w-12 h-12 flex items-center justify-center border border-black text-black text-xl transition-all duration-200 ${
            index === 0
              ? `${
                  startGame
                    ? isMobile
                      ? "cursor-pointer hover:scale-110"
                      : "cursor-grab"
                    : ""
                } ${
                  isMobile && selectedPiece === piece
                    ? "bg-yellow-300 border-yellow-600 ring-2 ring-yellow-400"
                    : "bg-yellow-400 border-gray-600"
                }`
              : "bg-gray-400/20 border border-gray-600"
          }`}
          onClick={() => handlePieceClick(piece, index)}
        >
          {PIPE_TYPES[piece] ? (
            <img
              src={PIPE_TYPES[piece]}
              alt={piece}
              className="w-full h-full pointer-events-none"
              draggable={startGame && !isMobile ? index === 0 : false}
              onDragStart={(event) => handleDragStart(event, piece)}
            />
          ) : (
            piece
          )}
        </div>
      ))}

      {/* Mobile Instructions */}
      {isMobile && startGame && (
        <div className="text-xs text-gray-600 mt-2 max-w-32 text-center">
          Tap piece → Tap cell to place
        </div>
      )}
    </div>
  );
};

// const DraggablePiece = ({ id, piece, index }) => {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id,
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners} // Enables drag events
//       {...attributes} // Ensures accessibility support
//       className={`w-12 h-12 flex items-center justify-center border border-black cursor-pointer text-black text-xl ${
//         index === 0
//           ? "bg-yellow-400 border-gray-600"
//           : "bg-gray-400 border-gray-600"
//       }`}
//       style={{
//         transform: transform
//           ? `translate(${transform.x}px, ${transform.y}px)`
//           : "none",
//       }}
//     >
//       {PIPE_TYPES[piece] ? (
//         <img
//           src={PIPE_TYPES[piece]}
//           alt={piece}
//           className="w-full h-full"
//           draggable="false"
//         />
//       ) : (
//         piece
//       )}
//     </div>
//   );
// };

export default Pieces;
