// templates/template1.js
export const template1 = {
  gridSize: 25,
  grid: Array.from({ length: 25 }, (_, i) =>
    Array.from({ length: 25 }, (_, j) => {
      const isEye = i === 5 && j >= 10 && j <= 14;
      const isNose = i === 7 && (j === 8 || j === 16);
      const isMouth =
        i === 10 &&
        j >= 8 &&
        j <= 16 &&
        (j === 8 || j === 16 || (i + j) % 2 === 0);
      const isBorder = i === 0 || i === 24 || j === 0 || j === 24;

      if (isEye || isNose || isMouth) return 1;
      if (isBorder) return 2;
      return 3;
    })
  ),
};