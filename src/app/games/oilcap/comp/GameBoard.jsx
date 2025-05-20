'use client'
// import React from "react";
// import Cell from "./Cell";

// const GameBoard = ({ grid, handleClick, setDraggedItem }) => {
//   const handleDrop = (event, rowIndex, colIndex) => {
//     event.preventDefault();
//     const piece = event.dataTransfer.getData("text/plain");

//     if (piece) {
//       handleClick(rowIndex, colIndex, piece);
//     }
//   };

//   return (
//     <div className="grid grid-cols-10 md:max-w-[480px] justify-center md:p-0">
//       {grid.map((row, rowIndex) =>
//         row.map((cell, colIndex) => (
//           <div
//             key={`${rowIndex}-${colIndex}`}
//             onDragOver={(event) => event.preventDefault()}
//             onDrop={(event) => handleDrop(event, rowIndex, colIndex)}
//           >
//             <Cell type={cell} onClick={() => handleClick(rowIndex, colIndex)} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default GameBoard;

import React from "react";
import Cell from "./Cell";
import OilDrop from "./oilDrip";

const GameBoard = ({ grid, handleClick, setDraggedItem }) => {
  const handleDrop = (event, rowIndex, colIndex) => {
    event.preventDefault();
    const piece = event.dataTransfer.getData("text/plain");
    if (piece) {
      handleClick(rowIndex, colIndex, piece);
    }
  };

  return (
    <div className="grid grid-cols-10 md:max-w-[480px] justify-center md:p-0">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, rowIndex, colIndex)}
            className="relative"
          >
            {/* <Cell type={cell} isOilFlowing={cell === "OIL"} /> */}
            <Cell type={cell} isOilFlowing={cell === "OIL"} />
            {cell === "OIL" && <OilDrop />}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
