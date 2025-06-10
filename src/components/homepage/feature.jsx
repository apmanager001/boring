'use client'
import { Heart } from "lucide-react";
import {games} from '../../components/utility/gameList'
const Feature = () => {

  return (
    <div className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our Game Collection
        </h2>
        <p className="text-center text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Choose from our selection of classic games, each with a modern twist
          and exciting features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.slice(0,4).map((game) => (
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
                    <span key={index} className="badge badge-outline">
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

        <div className="text-center mt-12">
          <a className="btn btn-outline btn-primary" href="/games">
            View All Games
            <Heart />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Feature;