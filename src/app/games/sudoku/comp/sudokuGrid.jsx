import Cell from "./cell";

export default function SudokuGrid({ board, setBoard }) {
  return (
    <div className="grid grid-cols-9 gap-px bg-gray-800 p-px rounded shadow border-2 border-gray-800">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => {

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
            relative bg-white
                 
            ${
              (colIndex === 0 && rowIndex === 0,
              1 ? "border-l-1 border-gray-800" : "")
            }
            ${colIndex === 2 ? "border-r-4 border-gray-800" : ""}
            ${colIndex === 5 ? "border-r-4 border-gray-800" : ""}
            ${rowIndex === 2 ? "border-b-4 border-gray-800" : ""}
            ${rowIndex === 5 ? "border-b-4 border-gray-800" : ""}
          `}
            >
              <Cell
                value={value}
                id={`cell-${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                setBoard={setBoard}
              />
            </div>
          );
        })
      )}
    </div>
  );
}