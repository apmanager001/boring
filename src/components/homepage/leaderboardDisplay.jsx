"use client";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { games } from "../utility/gameList";
import Link from "next/link";

const LeaderboardDisplay = () => {
  const [leaderboards, setLeaderboards] = useState({});

  useEffect(() => {
    // Simulating a GET request for each game
    const fetchLeaderboards = async () => {
      try {
        // Select the first 4 games that have the "Leaderboard" tag
        const selectedGames = games
          .filter((game) => game.tags.includes("Leaderboard"))
          .slice(0, 4);

        // Simulate fetching leaderboard data for each game
        const tempLeaderboards = {};
        selectedGames.forEach((game) => {
          tempLeaderboards[game.id] = [
            { username: "Player1", score: 10200 },
            { username: "Player2", score: 9800 },
            { username: "Player3", score: 9400 },
            { username: "Player4", score: 9200 },
            { username: "Player5", score: 8800 },
            { username: "Player6", score: 8600 },
            { username: "Player7", score: 8400 },
            { username: "Player8", score: 8200 },
            { username: "Player9", score: 8000 },
            { username: "Player10", score: 7800 },
          ];
        });

        setLeaderboards(tempLeaderboards);
      } catch (error) {
        console.error("Error fetching leaderboards:", error);
      }
    };

    fetchLeaderboards();
  }, []);

  return (
    <div className="py-16 px-4 ">
        <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4">Game Leaderboards</h2>
      <p className="text-center text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
        Can you reach the homepage Leaderboard?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {games
          .filter((game) => game.tags.includes("Leaderboard"))
          .slice(0, 4)
          .map((game) => (
            <div
              key={game.id}
              className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group md:max-w-64"
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
              <ul className="mt-2 space-y-2">
                {leaderboards[game.id]?.map((player, index) => (
                  <li
                    key={index}
                    className="flex justify-between px-4 py-1 bg-gray-100 rounded-md"
                  >
                    <span className="font-semibold">
                      {index + 1}. {player.username}
                    </span>
                    <span className="text-gray-500">{player.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <div className="text-center mt-12">
        <Link className="btn btn-outline btn-primary" href="/leaderboard">
          View All Game Leaderboards
          <Heart />
        </Link>
      </div>
      </div>
    </div>
  );
};

export default LeaderboardDisplay;
