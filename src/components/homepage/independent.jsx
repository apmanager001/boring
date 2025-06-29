'use client'
import React from 'react'
import { Heart } from "lucide-react";
import Link from 'next/link';
import { independentGames } from '../utility/independentGames';
const Independent = () => {
  return (
    <div className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Independent Games
        </h2>
        <p className="text-center text-lg text-gray-500  max-w-2xl mx-auto">
          Choose from third party games, pick the one that makes sense for you.
        </p>
        <p className="text-center text-md text-gray-600 mb-12 max-w-2xl mx-auto">
          Have a game you want to Submit? <Link href="/independent" className="text-gray-400 underline">Submit here</Link> 
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {independentGames.slice(0, 4).map((game) => (
            <div
              key={game.id}
              className="card card-compact bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
            >
              <figure className="relative overflow-hidden h-48">
                <img
                  src={game.image}
                  alt="image of game"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width="300"
                  height="200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">{game.name}</h3>
                </div>
              </figure>
              <div className="card-body">
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {game.tags.map((tag, index) => (
                    <span key={index} className="badge badge-soft badge-accent">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400">{game.description}</p>
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

        <div className="text-center mt-12">
          <a className="btn btn-outline btn-primary" href="/games">
            View All Games
            <Heart />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Independent;