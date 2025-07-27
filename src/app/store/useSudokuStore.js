import { create } from "zustand";
import { generateBoard } from "../games/sudoku/utility/boardGenerator";

const DIFFICULTY_SETTINGS = {
  easy: { minGaps: 46, maxGaps: 50, hints: 5 },
  medium: { minGaps: 51, maxGaps: 55, hints: 3 },
  hard: { minGaps: 56, maxGaps: 60, hints: 2 },
  expert: { minGaps: 61, maxGaps: 65, hints: 1 },
};

export const useSudokuStore = create((set, get) => {
  return {
    board: [],
    solution: [],
    setSolution: (solution) => set({ solution }),
    setBoard: (update) =>
      set((state) => ({
        board: typeof update === "function" ? update(state.board) : update,
      })),

    focusedCell: { row: null, col: null },
    setFocusedCell: (cell) => set({ focusedCell: cell }),

    selectedNumber: null,
    setSelectedNumber: (num) => set({ selectedNumber: num }),

    noteMode: false,
    toggleNoteMode: () => set((s) => ({ noteMode: !s.noteMode })),

    notSureMode: false,
    toggleNotSureMode: () => set((s) => ({ notSureMode: !s.notSureMode })),

    eraseMode: false,
    toggleEraseMode: () => set((s) => ({ eraseMode: !s.eraseMode })),

    cellValidity: [],
    validationsLeft: 3,
    gameOver: false,
    isComplete: false,
    setIsComplete: (complete) => set({ isComplete: complete }),

    // Difficulty system
    difficulty: "medium",
    setDifficulty: (difficulty) => set({ difficulty }),

    // Hints system
    hintsLeft: 3,
    useHint: () => {
      const { board, solution, focusedCell, hintsLeft, setBoard } = get();

      if (
        hintsLeft <= 0 ||
        !focusedCell.row !== null ||
        !focusedCell.col !== null
      ) {
        return;
      }

      const { row, col } = focusedCell;
      const cell = board[row][col];

      if (cell.given || cell.value !== 0) {
        return;
      }

      const correctValue = solution[row][col].value;

      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((rowArr) =>
          rowArr.map((cell) => ({ ...cell }))
        );
        newBoard[row][col] = {
          ...newBoard[row][col],
          value: correctValue,
          given: false,
        };
        return newBoard;
      });

      set({ hintsLeft: hintsLeft - 1 });
    },

    validateBoard: () => {
      const { board, solution, validationsLeft, gameOver } = get();
      if (gameOver || validationsLeft < 0) return;

      const validity = board.map((row, i) =>
        row.map((cell, j) => {
          const userVal = cell?.value;
          const isGiven = cell?.given;
          const correctVal = solution?.[i]?.[j]?.value;

          // Only validate if it's a user-inputted value (not given and not 0)
          if (isGiven || userVal === 0 || correctVal == null) return null;

          return userVal === correctVal;
        })
      );

      const remaining = validationsLeft - 1;
      set({
        cellValidity: validity,
        validationsLeft: remaining,
        gameOver: remaining < 0,
      });
    },

    resetGame: () => {
      const { difficulty } = get();
      const settings =
        DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.medium;

      const { puzzle, solution } = generateBoard(
        settings.minGaps,
        settings.maxGaps
      );

      set({
        board: puzzle,
        solution,
        focusedCell: { row: null, col: null },
        selectedNumber: null,
        cellValidity: [],
        validationsLeft: 3,
        gameOver: false,
        isComplete: false,
        noteMode: false,
        notSureMode: false,
        eraseMode: false,
        hintsLeft: settings.hints,
      });
    },

    // Auto-save functionality
    saveGame: () => {
      const state = get();
      const gameState = {
        board: state.board,
        solution: state.solution,
        difficulty: state.difficulty,
        validationsLeft: state.validationsLeft,
        hintsLeft: state.hintsLeft,
        timestamp: Date.now(),
      };

      try {
        localStorage.setItem("sudoku-save", JSON.stringify(gameState));
      } catch (error) {
        console.error("Failed to save game:", error);
      }
    },

    loadGame: () => {
      try {
        const saved = localStorage.getItem("sudoku-save");
        if (saved) {
          const gameState = JSON.parse(saved);
          const isRecent =
            Date.now() - gameState.timestamp < 24 * 60 * 60 * 1000; // 24 hours

          if (isRecent) {
            set({
              board: gameState.board,
              solution: gameState.solution,
              difficulty: gameState.difficulty,
              validationsLeft: gameState.validationsLeft,
              hintsLeft: gameState.hintsLeft,
              focusedCell: { row: null, col: null },
              selectedNumber: null,
              cellValidity: [],
              gameOver: false,
              isComplete: false,
              noteMode: false,
              notSureMode: false,
              eraseMode: false,
            });
            return true;
          }
        }
      } catch (error) {
        console.error("Failed to load game:", error);
      }
      return false;
    },

    // Statistics
    stats: {
      gamesPlayed: 0,
      gamesWon: 0,
      bestTime: null,
      averageTime: 0,
    },

    updateStats: (gameWon, timeSpent) => {
      set((state) => {
        const stats = { ...state.stats };
        stats.gamesPlayed += 1;

        if (gameWon) {
          stats.gamesWon += 1;

          if (!stats.bestTime || timeSpent < stats.bestTime) {
            stats.bestTime = timeSpent;
          }

          // Update average time
          const totalTime =
            stats.averageTime * (stats.gamesWon - 1) + timeSpent;
          stats.averageTime = Math.round(totalTime / stats.gamesWon);
        }

        return { stats };
      });
    },
  };
});
