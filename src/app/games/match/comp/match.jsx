"use client";
import React, { useState } from "react";
import { icons, Squirrel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const allIcons = [
  "Heart",
  "Star",
  "Camera",
  "Gamepad2",
  "Music",
  "Smile",
  "Paintbrush",
  "Zap",
  "Gift",
  "Rocket",
  "Sun",
  "Moon",
];

const Match = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const startGame = () => {
    const shuffledIcons = [...allIcons, ...allIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        flipped: false,
        matched: false,
      }));

    setTiles(shuffledIcons);
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
    setGameStarted(true);
  };

  const handleClick = (index) => {
    if (
      !gameStarted ||
      flipped.length === 2 ||
      tiles[index].matched ||
      tiles[index].flipped
    )
      return;

    const newTiles = [...tiles];
    newTiles[index].flipped = true;
    setTiles(newTiles);

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);

      setTimeout(() => {
        const [first, second] = newFlipped;

        if (tiles[first].icon === tiles[second].icon) {
          const matchedTiles = [...tiles];
          matchedTiles[first].matched = true;
          matchedTiles[second].matched = true;
          setTiles(matchedTiles);
          setMatches(matches + 1);

          if (matches + 1 === allIcons.length) {
            setGameComplete(true);
          }
        } else {
          const resetTiles = [...tiles];
          resetTiles[first].flipped = false;
          resetTiles[second].flipped = false;
          setTiles(resetTiles);
        }

        setFlipped([]);
      }, 1000); // Increased timeout for better animation visibility
    }
  };

  // Animation variants
  const tileVariants = {
    hidden: {
      rotateY: 180,
      scale: 0.9,
      opacity: 0.8,
    },
    visible: {
      rotateY: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    matched: {
      scale: [1, 1.1, 1],
      opacity: 0.7,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
        <motion.h2
          className="text-3xl font-bold mb-4 text-center "
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Memory Match
        </motion.h2>

        {!gameStarted ? (
          <motion.div
            className="py-8 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Match all pairs of icons in the fewest moves!
            </motion.p>
            <motion.button
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-lg font-medium shadow-md"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </motion.div>
        ) : gameComplete ? (
          <motion.div
            className="py-8 text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <motion.div
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="text-2xl font-bold text-green-500">
                🎉 You Won! 🎉
              </p>
              <p className="text-lg mt-2">Completed in {moves} moves!</p>
            </motion.div>
            <motion.button
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg text-lg font-medium shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="mb-6 flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="font-medium text-gray-700">Moves: </span>
                <span className="font-bold text-blue-600">{moves}</span>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="font-medium text-gray-700">Matches: </span>
                <span className="font-bold text-green-600">
                  {matches}/{allIcons.length}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-4 gap-3">
              <AnimatePresence>
                {tiles.map((tile, index) => {
                  const Icon = icons[tile.icon];
                  return (
                    <motion.div
                      key={tile.id}
                      layout
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        onClick={() => handleClick(index)}
                        className={`w-full h-16 flex items-center justify-center rounded-lg shadow-md ${
                          tile.matched
                            ? "bg-green-100 cursor-default"
                            : tile.flipped
                            ? "bg-blue-100"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        disabled={tile.matched}
                        variants={tileVariants}
                        initial="hidden"
                        animate={
                          tile.flipped || tile.matched ? "visible" : "hidden"
                        }
                        whileHover={
                          !tile.matched && !tile.flipped ? { scale: 1.05 } : {}
                        }
                        whileTap={
                          !tile.matched && !tile.flipped ? { scale: 0.95 } : {}
                        }
                      >
                        {tile.flipped || tile.matched ? (
                          <motion.div
                            animate={tile.matched ? "matched" : {}}
                            variants={{
                              matched: {
                                scale: [1, 1.2, 1],
                                transition: { duration: 0.5 },
                              },
                            }}
                          >
                            <Icon
                              size={28}
                              className={
                                tile.matched
                                  ? "text-green-600"
                                  : "text-blue-600"
                              }
                            />
                          </motion.div>
                        ) : (
                          <motion.span
                            className="text-gray-500 text-xl"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Squirrel
                              color={"black"}
                              fill={"#989082"}
                              size={44}
                              strokeWidth={0.5}
                            />
                          </motion.span>
                        )}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Match;
