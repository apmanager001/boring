// export const startOilFlow = (grid, setGrid, setScore) => {
//   let currentPosition = { row: 0, col: 0 }; // Example start position
//   let interval = setInterval(() => {
//     if (grid[currentPosition.row]?.[currentPosition.col] === "🟫") {
//       setGrid((prevGrid) => {
//         const newGrid = [...prevGrid];
//         newGrid[currentPosition.row][currentPosition.col] = "🛢"; // Oil flowing
//         return newGrid;
//       });
//       setScore((prevScore) => prevScore + 10);
//       currentPosition.col++; // Move right for now
//     } else {
//       clearInterval(interval); // Stop oil flow if blocked
//     }
//   }, 1000);
// };
const startOilFlow = (grid, setGrid) => {
  let oilPath = [];
  let foundStart = false;

  // Find the start position in the grid
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "START") {
        oilPath.push({ row, col });
        foundStart = true;
        break;
      }
    }
    if (foundStart) break;
  }

  if (!foundStart) return;

  let interval = setInterval(() => {
    if (oilPath.length === 0) {
      clearInterval(interval);
      return;
    }

    const { row, col } = oilPath.shift();

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      newGrid[row][col] = "OIL"; // Visually mark oil-filled cells
      return newGrid;
    });

    // Determine where the oil flows next
    const nextPositions = getNextOilPosition(row, col, grid);
    oilPath.push(...nextPositions);
  }, 500); // Adjust speed of oil flow
};

const getNextOilPosition = (row, col, grid) => {
  const nextPositions = [];
  const currentPiece = grid[row][col];

  if (currentPiece === "║") {
    if (grid[row + 1]?.[col] && grid[row + 1][col] !== "OIL")
      nextPositions.push({ row: row + 1, col });
    if (grid[row - 1]?.[col] && grid[row - 1][col] !== "OIL")
      nextPositions.push({ row: row - 1, col });
  } else if (currentPiece === "═") {
    if (grid[row]?.[col + 1] && grid[row][col + 1] !== "OIL")
      nextPositions.push({ row, col: col + 1 });
    if (grid[row]?.[col - 1] && grid[row][col - 1] !== "OIL")
      nextPositions.push({ row, col: col - 1 });
  } else if (currentPiece === "╔") {
    if (grid[row + 1]?.[col] && grid[row + 1][col] !== "OIL")
      nextPositions.push({ row: row + 1, col });
    if (grid[row]?.[col + 1] && grid[row][col + 1] !== "OIL")
      nextPositions.push({ row, col: col + 1 });
  } else if (currentPiece === "╗") {
    if (grid[row + 1]?.[col] && grid[row + 1][col] !== "OIL")
      nextPositions.push({ row: row + 1, col });
    if (grid[row]?.[col - 1] && grid[row][col - 1] !== "OIL")
      nextPositions.push({ row, col: col - 1 });
  } else if (currentPiece === "╚") {
    if (grid[row - 1]?.[col] && grid[row - 1][col] !== "OIL")
      nextPositions.push({ row: row - 1, col });
    if (grid[row]?.[col + 1] && grid[row][col + 1] !== "OIL")
      nextPositions.push({ row, col: col + 1 });
  } else if (currentPiece === "╝") {
    if (grid[row - 1]?.[col] && grid[row - 1][col] !== "OIL")
      nextPositions.push({ row: row - 1, col });
    if (grid[row]?.[col - 1] && grid[row][col - 1] !== "OIL")
      nextPositions.push({ row, col: col - 1 });
  } else if (currentPiece === "╬") {
    if (grid[row + 1]?.[col] && grid[row + 1][col] !== "OIL")
      nextPositions.push({ row: row + 1, col });
    if (grid[row - 1]?.[col] && grid[row - 1][col] !== "OIL")
      nextPositions.push({ row: row - 1, col });
    if (grid[row]?.[col + 1] && grid[row][col + 1] !== "OIL")
      nextPositions.push({ row, col: col + 1 });
    if (grid[row]?.[col - 1] && grid[row][col - 1] !== "OIL")
      nextPositions.push({ row, col: col - 1 });
  }

  return nextPositions;
};
