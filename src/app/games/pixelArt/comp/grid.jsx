import React from "react";

const Grid = ({ grid, onCellChange, isActiveUser }) => {
  return (
    <div className="overflow-auto md:p-4 rounded-lg  shadow-sm flex justify-center">
      <div className="inline-block">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cellColor, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-4 h-4 border border-gray-100 hover:border-gray-300 ${
                  isActiveUser ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                style={{ backgroundColor: cellColor }}
                onClick={() => onCellChange(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
