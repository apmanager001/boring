export const checkForWinner = (board) => {
  const numRows = board.length;
  const numCols = board[0].length;

  // Check horizontal rows
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols - 2; col++) {
      const piece1 = board[row][col];
      const piece2 = board[row][col + 1];
      const piece3 = board[row][col + 2];

      if (
        piece1 &&
        piece2 &&
        piece3 &&
        piece1.player === piece2.player &&
        piece2.player === piece3.player
      ) {
        return `Player ${piece1.player} wins horizontally`;
      }
    }
  }

  // Check vertical columns
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows - 2; row++) {
      const piece1 = board[row][col];
      const piece2 = board[row + 1][col];
      const piece3 = board[row + 2][col];

      if (
        piece1 &&
        piece2 &&
        piece3 &&
        piece1.player === piece2.player &&
        piece2.player === piece3.player
      ) {
        return `Player ${piece1.player} wins vertically`;
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let row = 0; row < numRows - 2; row++) {
    for (let col = 0; col < numCols - 2; col++) {
      const piece1 = board[row][col];
      const piece2 = board[row + 1][col + 1];
      const piece3 = board[row + 2][col + 2];

      if (
        piece1 &&
        piece2 &&
        piece3 &&
        piece1.player === piece2.player &&
        piece2.player === piece3.player
      ) {
        return `Player ${piece1.player} wins diagonally (top-left to bottom-right)`;
      }
    }
  }

  // Check diagonal (top-right to bottom-left)
  for (let row = 0; row < numRows - 2; row++) {
    for (let col = 2; col < numCols; col++) {
      const piece1 = board[row][col];
      const piece2 = board[row + 1][col - 1];
      const piece3 = board[row + 2][col - 2];

      if (
        piece1 &&
        piece2 &&
        piece3 &&
        piece1.player === piece2.player &&
        piece2.player === piece3.player
      ) {
        return `Player ${piece1.player} wins diagonally (top-right to bottom-left)`;
      }
    }
  }

  return null; // No winner yet
};
