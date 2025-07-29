"use client";
import React, { useEffect, useState } from "react";
import { Heart, Trophy, TrendingUp, Users } from "lucide-react";
import { games } from "../utility/gameList";
import Link from "next/link";

const LeaderboardDisplay = () => {
  const [leaderboards, setLeaderboards] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        setIsLoading(true);
        // Select games that have the "Leaderboard" tag
        const selectedGames = games.filter((game) => 
          game.tags.includes("Leaderboard")
        );

        // Simulate fetching leaderboard data for each game
        const tempLeaderboards = {};
        selectedGames.forEach((game) => {
          // Generate more realistic and varied scores
          const baseScores = [12500, 11800, 11200, 10800, 10400, 9900, 9600, 9300, 9000, 8700];
          tempLeaderboards[game.id] = baseScores.map((score, index) => ({
            username: `Player${index + 1}`,
            score: score + Math.floor(Math.random() * 500),
            rank: index + 1,
            isTop3: index < 3
          }));
        });

        // Simulate loading delay for better UX
        setTimeout(() => {
          setLeaderboards(tempLeaderboards);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching leaderboards:", error);
        setIsLoading(false);
      }
    };

    fetchLeaderboards();
  }, []);

  const leaderboardGames = games
    .filter((game) => game.tags.includes("Leaderboard"))
    .slice(0, 3);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Game Leaderboards</h2>
            <p className="text-lg text-base-content/70">Loading top players...</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card bg-base-200 shadow-lg">
                <div className="skeleton h-48 w-full rounded-t-lg" />
                <div className="card-body p-4">
                  <div className="space-y-2">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="skeleton h-8 w-full rounded" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Game Leaderboards</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-6">
            Compete with players worldwide and climb the ranks! Can you reach the top?
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-8 text-sm text-base-content/60">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>1000+ Players</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Live Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Daily Rankings</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaderboardGames.map((game) => (
            <div
              key={game.id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <Link href={`${game.link}`}>
                <figure className="relative overflow-hidden h-48">
                  <img
                    src={game.image}
                    alt={`${game.name} game`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{game.name}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Trophy className="w-4 h-4" />
                      <span>Top Players</span>
                    </div>
                  </div>
                </figure>
              </Link>
              
              <div className="card-body p-4">
                <div className="space-y-2">
                  {leaderboards[game.id]?.slice(0, 5).map((player, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-2 rounded-lg transition-colors ${
                        player.isTop3 
                          ? 'bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20' 
                          : 'bg-base-100 hover:bg-base-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          player.rank === 1 ? 'bg-yellow-500 text-white' :
                          player.rank === 2 ? 'bg-gray-400 text-white' :
                          player.rank === 3 ? 'bg-amber-600 text-white' :
                          'bg-base-300 text-base-content/60'
                        }`}>
                          {player.rank}
                        </div>
                        <span className={`font-medium ${
                          player.isTop3 ? 'text-primary' : 'text-base-content'
                        }`}>
                          {player.username}
                        </span>
                      </div>
                      <span className={`font-mono text-sm ${
                        player.isTop3 ? 'text-primary font-bold' : 'text-base-content/70'
                      }`}>
                        {player.score.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-base-300">
                  <Link 
                    href={`${game.link}`}
                    className="btn btn-primary btn-sm w-full group"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Play & Compete
                    <Heart className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            className="btn btn-outline btn-primary btn-lg" 
            href="/leaderboard"
          >
            <Trophy className="w-5 h-5 mr-2" />
            View All Leaderboards
            <Heart className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardDisplay;
