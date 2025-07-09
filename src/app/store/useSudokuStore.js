import { create } from "zustand";
import { generateBoard } from "../games/sudoku/utility/boardGenerator";

export const useSudokuStore = create((set, get) => {

  return {
    board: [],
    solution: [],
    setSolution: (solution) => set({ solution }),
    // setBoard: (newBoard) => set({ board: newBoard }),
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

    // validateBoard: () => {
    //   const { board, solution, validationsLeft, gameOver } = get();
    //   if (gameOver || validationsLeft < 0) return;

    //   const validity = board.map((row, i) =>
    //     row.map((cell, j) =>
    //       cell.value !== 0 ? cell.value === solution[i][j].value : null
    //     )
    //   );

    //   const remaining = validationsLeft - 1;
    //   set({
    //     cellValidity: validity,
    //     validationsLeft: remaining,
    //     gameOver: remaining < 0,
    //   });
    // },

    validateBoard: () => {
      const { board, solution, validationsLeft, gameOver } = get();
      if (gameOver || validationsLeft < 0) return;

      // const validity = board.map((row, i) =>
      //   row.map((val, j) => (val !== 0 ? val === solution[i][j] : null))
      // );
      
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
      const { puzzle, solution } = generateBoard();
      set({
        board: puzzle,
        solution,
        focusedCell: { row: null, col: null },
        selectedNumber: null,
        cellValidity: [],
        validationsLeft: 3,
        gameOver: false,
        noteMode: false,
        notSureMode: false,
        eraseMode: false,
      });
    },
  };
});
