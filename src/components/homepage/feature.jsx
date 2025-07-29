'use client'
import { Heart, Play, Star, Clock } from "lucide-react";
import {games} from '../../components/utility/gameList'
import Link from 'next/link'

const Feature = () => {
  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-4">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Featured Games</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Classic Games Reimagined</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-6">
            Experience timeless classics with modern twists and exciting new features. 
            Each game has been carefully crafted for the best gaming experience.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-base-content/60">
            <span>🎯 Strategic Challenges</span>
            <span>🧩 Brain Teasers</span>
            <span>🏆 Competitive Play</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.slice(0, 4).map((game) => (
            <div
              key={game.id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-base-300 overflow-hidden"
            >
              <figure className="relative overflow-hidden h-48">
                <img
                  src={game.image}
                  alt={`${game.name} game`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Game Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="badge badge-primary badge-sm">
                    {game.tags.includes("Leaderboard") ? "Competitive" : "Classic"}
                  </span>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{game.name}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Quick Play</span>
                  </div>
                </div>
              </figure>
              
              <div className="card-body p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {game.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="badge badge-outline badge-sm"
                    >
                      {tag}
                    </span>
                  ))}
                  {game.tags.length > 2 && (
                    <span className="badge badge-ghost badge-sm">
                      +{game.tags.length - 2}
                    </span>
                  )}
                </div>
                
                <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
                  {game.description}
                </p>
                
                <div className="card-actions justify-between items-center">
                  <div className="flex items-center gap-1 text-xs text-base-content/50">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                  <Link 
                    href={game.link} 
                    className="btn btn-primary btn-sm group"
                  >
                    Play Now
                    <Play className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            className="btn btn-outline btn-primary btn-lg" 
            href="/games"
          >
            <Heart className="w-5 h-5 mr-2" />
            Explore All Games
            <Play className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Feature;