// templates/template2.js
export const template2 = {
  gridSize: 25,
  grid: Array.from({ length: 25 }, (_, i) =>
    Array.from({ length: 25 }, (_, j) => {
      const x = j - 12.5;
      const y = i - 12.5;
      const heart =
        (x * x + y * y - 100) * (x * x + y * y - 100) * (x * x + y * y - 100) -
          x * x * y * y * y <
        0;
      return heart ? 1 : 2;
    })
  ),
};