export const startOilFlow = (grid, setGrid, setScore) => {
  let currentPosition = { row: 0, col: 0 }; // Example start position
  let interval = setInterval(() => {
    if (grid[currentPosition.row]?.[currentPosition.col] === "🟫") {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[currentPosition.row][currentPosition.col] = "🛢"; // Oil flowing
        return newGrid;
      });
      setScore((prevScore) => prevScore + 10);
      currentPosition.col++; // Move right for now
    } else {
      clearInterval(interval); // Stop oil flow if blocked
    }
  }, 1000);
};
