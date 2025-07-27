export function generateBoard(minGaps = 51, maxGaps = 55) {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function isSafe(board, row, col, num) {
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 9; i++) {
      if (
        board[row][i] === num ||
        board[i][col] === num ||
        board[boxRow + Math.floor(i / 3)][boxCol + (i % 3)] === num
      ) {
        return false;
      }
    }
    return true;
  }

  function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of nums) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  function generateFullBoard() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    solveSudoku(board);
    return board;
  }

  function createCellBoard(matrix, isGiven) {
    return matrix.map((row) =>
      row.map((val) => ({ value: val, given: isGiven ? val !== 0 : false }))
    );
  }

  const fullBoard = generateFullBoard();
  const puzzleMatrix = fullBoard.map((row) => [...row]);

  // Use difficulty-based gap range
  const totalGaps =
    Math.floor(Math.random() * (maxGaps - minGaps + 1)) + minGaps;
  const used = new Set();
  let gaps = 0;

  while (gaps < totalGaps) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const key = `${row}-${col}`;
    if (!used.has(key)) {
      puzzleMatrix[row][col] = 0;
      used.add(key);
      gaps++;
    }
  }

  const puzzle = createCellBoard(puzzleMatrix, true);
  const solution = createCellBoard(fullBoard, true);

  return {
    puzzle,
    solution,
  };
}
