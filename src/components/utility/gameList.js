let strategy = "Strategy";
let multiplayer = "2 Player";
let Puzzle = " Puzzle";
let single = "Single Player";
let kids = "Kid Game";
let classic = "Classic";
let leaderboard = "Leaderbord";

export const games = [
  {
    id: 1,
    name: "Oil Cap",
    description: "A strategic game ",
    image: "/hp/oilcap.png",
    tags: [single, strategy, leaderboard],
    link: "/games/oilcap",
  },
  {
    id: 2,
    name: "AcornSweeper",
    description:
      "A different take on Minesweeper. Find hidden acorns without detonating them",
    image: "/hp/squirrels.png",
    tags: [single, classic, leaderboard],
    link: "/games/acornsweeper",
  },
  {
    id: 3,
    name: "Memory Match",
    description: "Test your memory by matching pairs of cards",
    image:
      "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: [kids, single, Puzzle],
    link: "/memory",
  },
  {
    id: 4,
    name: "Coloring Book",
    description:
      "A simple coloring book. Click the number/color and fill in the image with the corresponding number.",
    image: "/hp/sb.png",
    tags: [kids, single],
    link: "/kidgames/coloringbook",
  },
  {
    id: 5,
    name: "Tic Tac Toe",
    description:
      "A different take on tic tac toe. Every player has 3 different sizes of pieces. A bigger piece can cover a smaller piece. ",
    image: "/hp/tik.png",
    tags: [classic, multiplayer],
    link: "/games/tiktaktoe",
  },
  {
    id: 6,
    name: "Pixel Art",
    description:
      "Build Art as a community. Take turns having control and chnaging the pixel colors. Build an abstract piece or make smaller images in the full canvas.",
    image: "/hp/pixel.png",
    tags: [classic, multiplayer],
    link: "/games/pixelArt",
  },
];
