'use client'
import React from 'react'
import { Heart, ExternalLink, Gamepad2, Plus } from "lucide-react";
import Link from 'next/link';
import { independentGames } from '../utility/independentGames';

const Independent = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-base-200 to-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Gamepad2 className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Independent Games</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-4">
            Discover amazing games from talented independent developers. Each game offers a unique experience you won't find anywhere else.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-base-content/60">
            <span>🎮 Curated Selection</span>
            <span>🌟 Unique Experiences</span>
            <span>🚀 Fresh Content</span>
          </div>
        </div>

        {/* Submit Game CTA */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-4">
            <Plus className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Have a game to share?</span>
          </div>
          <p className="text-base-content/70 mb-4">
            Independent developers can submit their games to reach our community
          </p>
          <Link 
            href="/independent" 
            className="btn btn-primary btn-outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Submit Your Game
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {independentGames.slice(0, 4).map((game) => (
            <div
              key={game.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-base-300"
            >
              <figure className="relative overflow-hidden h-48">
                <img
                  src={game.image}
                  alt={`${game.name} game`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <span className="badge badge-primary badge-sm">Independent</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{game.name}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Gamepad2 className="w-4 h-4" />
                    <span>Indie Game</span>
                  </div>
                </div>
              </figure>
              
              <div className="card-body p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {game.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="badge badge-outline badge-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
                  {game.description}
                </p>
                
                <div className="card-actions justify-between items-center">
                  <div className="text-xs text-base-content/50">
                    External Game
                  </div>
                  <a 
                    href={game.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm group"
                  >
                    Play Now
                    <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              className="btn btn-outline btn-primary btn-lg" 
              href="/independent"
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Browse All Independent Games
              <Heart className="w-5 h-5 ml-2" />
            </Link>
            
            <Link 
              className="btn btn-primary btn-lg" 
              href="/independent"
            >
              <Plus className="w-5 h-5 mr-2" />
              Submit Your Game
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Independent;