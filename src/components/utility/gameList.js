let strategy = "Strategy";
let multiplayer = "2 Player";
let Puzzle = " Puzzle";
let single = "Single Player";
let kids = "Kid Game";
let classic = "Classic";
let leaderboard = "Leaderboard";

export const games = [
  {
    id: 1,
    name: "Flow",
    description:
      "A strategic puzzle game where players must carefully manage oil flow to maximize efficiency. Plan your moves, control the flow, and compete for the top spot on the leaderboard! Can you be the best?",
    image: "/hp/oilcap.png",
    tags: [single, strategy, leaderboard],
    link: "/games/oilcap",
  },
  {
    id: 2,
    name: "AcornSweeper",
    description:
      "A fresh twist on the classic Minesweeper! Search for hidden acorns while avoiding explosive surprises. Use logic and strategy to uncover safe spots and climb the leaderboard. How fast can you complete the board?",
    image: "/hp/squirrels.png",
    tags: [single, classic, leaderboard],
    link: "/games/acornsweeper",
  },
  {
    id: 3,
    name: "Memory Match",
    description:
      "Sharpen your memory skills by matching pairs of cards! A fun and engaging puzzle game perfect for kids and adults alike. Challenge yourself and improve your recall with every round. How few moves can you match them all?",
    image: "/hp/match.png",
    tags: [kids, single, Puzzle],
    link: "/games/match",
  },
  {
    id: 4,
    name: "Coloring Book",
    description:
      "Unleash your creativity with this interactive coloring book! Select colors, match numbers, and bring beautiful images to life. A relaxing and fun experience for kids and art lovers.",
    image: "/hp/sb.png",
    tags: [kids, single],
    link: "/kidgames/coloringbook",
  },
  {
    id: 5,
    name: "Tic Tac Toe",
    description:
      "A strategic upgrade to the classic game! Players have three different-sized pieces, and larger pieces can cover smaller ones. Outsmart your opponent in this dynamic multiplayer challenge.",
    image: "/hp/tik.png",
    tags: [classic, multiplayer, leaderboard],
    link: "/games/tiktaktoe",
  },
  {
    id: 6,
    name: "Pixel Art",
    description:
      "Collaborate with the community to create stunning pixel masterpieces! Take turns controlling the canvas, change pixel colors, and build unique artwork together.",
    image: "/hp/pixel.png",
    tags: [classic, multiplayer],
    link: "/games/pixelArt",
  },
  {
    id: 7,
    name: "Dots and Boxes",
    description:
      "Challenge your opponent in this turn-based classic! Take turns drawing lines between dots to complete boxes. Claim a square to earn points—and an extra turn! Strategy and timing are key in this deceptively simple game of wit and precision.",
    image: "/hp/dots.png",
    tags: [classic, multiplayer, leaderboard],
    link: "/games/squares",
  },
  {
    id: 8,
    name: "Sudoku",
    description:
      "Put your logic to the test in this timeless puzzle classic! Fill the grid so every row, column, and 3x3 box contains the digits 1 to 9—without repeating. Whether you're sharpening your skills or chasing the perfect solve, Sudoku offers endless brain-teasing fun for all ages.",
    image: "/hp/sudoku.webp",
    tags: ["classic", "single", "strategy"],
    link: "/games/sudoku",
  },
];
