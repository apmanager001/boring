"use client";
import React, { useState } from "react";
import { games } from "../../../components/utility/gameList";

const categories = [
  "All",
  "Strategy",
  "2 Player",
  "Puzzle",
  "Single Player",
  "Kid Game",
  "Classic",
  "Leaderboard",
];

const GamePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter games based on selected category
  const filteredGames =
    selectedCategory === "All"
      ? games
      : games.filter((game) => game.tags.includes(selectedCategory));

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Category Filter */}
      <div className="flex justify-center mb-6">
        <select
          className="select select-primary w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
          >
            <figure className="relative overflow-hidden h-48">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-2xl font-bold text-white">{game.name}</h3>
              </div>
            </figure>
            <div className="card-body">
              <p className="text-gray-600">{game.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {game.tags.map((tag, index) => (
                  <span key={index} className="badge badge-soft badge-accent">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <a href={game.link} className="btn btn-primary btn-sm">
                  Play Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
