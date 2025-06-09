'use client'
import { useEffect, useState } from "react";

const Splash = () => {
  const [activeGame, setActiveGame] = useState(0);
  const games = [
    {
      name: "Tic Tac Toe",
      color: "from-pink-500 to-purple-600",
      animation: (
        <div className="grid grid-cols-3 gap-2 w-40 h-40 mx-auto">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-white/20 rounded-md flex items-center justify-center"
            >
              {i === 4 && <span className="text-3xl animate-pulse">❌</span>}
              {i === 0 || i === 8 ? <span className="text-3xl">⭘</span> : null}
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "AcornSweeper",
      color: "from-amber-500 to-orange-600",
      animation: (
        <div className="grid grid-cols-5 gap-1 w-48 h-48 mx-auto p-2 bg-white/10 rounded">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`h-8 w-8 rounded-sm flex items-center justify-center text-white font-bold text-sm
                ${i === 12 ? "bg-red-500" : "bg-white/20"}`}
            >
              {[3, 8, 17, 22].includes(i) ? "💣" : null}
              {i === 12 ? "💥" : null}
            </div>
          ))}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGame((prev) => (prev + 1) % games.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`hero min-h-screen bg-gradient-to-br ${games[activeGame].color}`}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="max-w-2xl">
          {/* Animated game elements */}
          <div className="mb-8 h-48 transition-all duration-1000">
            {games[activeGame].animation}
          </div>

          {/* Headline with animated game name */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Play{" "}
            <span className="text-white underline decoration-wavy">
              {games[activeGame].name}
            </span>
          </h1>

          {/* Dynamic tagline */}
          <p className="text-xl mb-8">
            {activeGame === 0
              ? "Challenge your friends to the ultimate X and O showdown!"
              : "Test your logic and avoid hidden dangers!"}
          </p>

          {/* Animated CTA button */}
          <button className="btn btn-lg glass hover:glass text-white animate-pulse hover:animate-none">
            Start Playing Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </button>

          {/* Game selector indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {games.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveGame(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeGame ? "bg-white w-6" : "bg-white/50"
                }`}
                aria-label={`Show ${games[index].name}`}
              />
            ))}
          </div>

          {/* Floating game icons */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-8 opacity-70">
            <div className="animate-float" style={{ animationDelay: "0s" }}>
              🎮
            </div>
            <div className="animate-float" style={{ animationDelay: "0.5s" }}>
              🧩
            </div>
            <div className="animate-float" style={{ animationDelay: "1s" }}>
              🎲
            </div>
            <div className="animate-float" style={{ animationDelay: "1.5s" }}>
              🏆
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;