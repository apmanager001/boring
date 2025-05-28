// templates/template4.js
export const template4 = {
  gridWidth: 25,
  gridHeight: 25,
  grid: Array.from({ length: 25 }, (_, i) =>
    Array.from({ length: 25 }, (_, j) => {
      // SpongeBob's body (main yellow rectangle)
      const isBody = i >= 5 && i <= 19 && j >= 5 && j <= 19;

      // Eyes (white with black pupils)
      const isLeftEye = i >= 6 && i <= 8 && j >= 7 && j <= 8;
      const isRightEye = i >= 6 && i <= 8 && j >= 15 && j <= 17;
      const isLeftPupil = i === 7 && j === 8;
      const isRightPupil = i === 7 && j === 16;

      // Nose
      const isNose = i >= 8 && i <= 11 && j === 12;

      // Mouth area
      const isMouth = i >= 12 && i <= 15 && j >= 8 && j <= 16;
      const isMouthLine = i === 13 && j >= 8 && j <= 16;
      const isTooth = (i === 14 || i === 15) && (j === 10 || j === 14);

      // Shirt collar
      const isCollar = i === 19 && j >= 8 && j <= 15;

      // Pants (brown rectangle at bottom)
      const isPants = i >= 20 && i <= 22 && j >= 5 && j <= 19;

      // Tie (red)
      const isTie = (i === 18 && j === 12) || (i === 19 && j >= 11 && j <= 13);

      // Arms and legs
      const isLeftArm = i >= 10 && i <= 15 && j === 4;
      const isRightArm = i >= 10 && i <= 15 && j === 20;
      const isLeftLeg = i >= 23 && i <= 24 && j >= 7 && j <= 8;
      const isRightLeg = i >= 23 && i <= 24 && j >= 15 && j <= 17;

      // Pores (sponge holes)
      const isPore =
        isBody &&
        !isLeftEye &&
        !isRightEye &&
        !isNose &&
        !isMouth &&
        !isCollar &&
        !isPants &&
        !isTie &&
        Math.random() < 0.1 && // Random pores
        (i % 2 === 0 || j % 2 === 0); // Grid pattern

      if (isLeftPupil || isRightPupil) return 4; // Black pupils
      if (isLeftEye || isRightEye) return 5; // White eyes
      if (isNose) return 6; // Green nose
      if (isMouthLine) return 4; // Black mouth line
      if (isTooth) return 5; // White teeth
      if (isTie) return 1; // Red tie
      if (isPants) return 7; // Brown pants
      if (isCollar) return 8; // White collar
      if (isPore) return 8; // Gold pores
      if (isBody || isLeftArm || isRightArm || isLeftLeg || isRightLeg)
        return 2; // Yellow body
      if (isMouth) return 3; // Light gray mouth

      return 3; // Blue background
    })
  ),
};