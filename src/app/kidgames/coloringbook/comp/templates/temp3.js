// templates/template3.js
export const template3 = {
  gridWidth: 25,
  gridHeight: 25,
  grid: Array.from({ length: 25 }, () =>
    Array.from({ length: 25 }, () => Math.floor(Math.random() * 5) + 1)
  ),
};