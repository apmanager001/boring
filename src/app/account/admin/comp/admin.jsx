"use client";
import React, { useEffect, useState } from "react";
import { formatFullDate } from "../../../../components/utility/monthYear";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../../components/utility/axios";

const Admin = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        const userResponse = await axiosInstance.get("/profile");

        if (!userResponse.data.admin) {
          window.location.href = "/account";
          return;
        }

        const gamesResponse = await axiosInstance.get("/admin/independentgame");
        setGames(gamesResponse.data);
      } catch (error) {
        console.error("Error initializing admin data:", error);
        window.location.href = "/account";
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-10 my-10">
        <div className="flex flex-wrap gap-8">
            <div className="skeleton h-96 w-96"></div>
            <div className="skeleton h-96 w-96"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 my-10">
      <h2 className="">Independent Games</h2>

      <div className="flex flex-wrap gap-8">
        {games.length === 0 ? (
          <p>No games found.</p>
        ) : (
          games.map((game) => (
            <div
              key={game.id}
              className="card card-compact bg-base-200 shadow-xl w-96 hover:shadow-2xl transition-shadow duration-300 group"
            >
              <figure className="relative overflow-hidden h-48">
                <img
                  src={game.imageUrl}
                  alt="image of game"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width="300"
                  height="200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">
                    {game.gameName}
                  </h3>
                </div>
              </figure>
              <div className="card-body">
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  <span className="badge badge-soft badge-accent">
                    {game.tag1}
                  </span>
                  <span className="badge badge-soft badge-accent">
                    {game.tag2}
                  </span>
                  <span className="badge badge-soft badge-accent">
                    {game.tag3}
                  </span>
                </div>
                <p className="text-gray-400">{game.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">
                    {formatFullDate(game.createdAt)}
                  </p>
                  <p className="text-gray-400 text-right">{game.email}</p>
                </div>
                <div className="card-actions items-center justify-between mt-4">
                  <span className="badge badge-soft badge-primary">
                    {game.category}
                  </span>
                  <a
                    href={game.linkUrl}
                    className="btn btn-primary btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
