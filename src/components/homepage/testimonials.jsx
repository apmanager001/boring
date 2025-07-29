'use client'
import React from 'react'
import { Star, Quote, Heart, ThumbsUp } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Puzzle Enthusiast",
      avatar: "🎮",
      rating: 5,
      text: "The Sudoku game is absolutely fantastic! The interface is clean, the hints are helpful, and I love the different difficulty levels. Perfect for my daily brain workout.",
      game: "Sudoku"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Parent",
      avatar: "👩‍👧‍👦",
      rating: 5,
      text: "My kids love the Memory Match game! It's educational, fun, and keeps them engaged. The fact that it's free and works on any device is amazing.",
      game: "Memory Match"
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      role: "Strategy Gamer",
      avatar: "🎯",
      rating: 5,
      text: "Flow is such a clever puzzle game! The oil flow mechanics are unique and challenging. I've spent hours trying to beat my high scores.",
      game: "Flow"
    },
    {
      id: 4,
      name: "Emma Thompson",
      role: "Casual Gamer",
      avatar: "🌟",
      rating: 5,
      text: "I love how all the games are free and work instantly. No downloads, no ads, just pure gaming fun. The leaderboards add a nice competitive element!",
      game: "All Games"
    },
    {
      id: 5,
      name: "David Kim",
      role: "Retro Gamer",
      avatar: "🎲",
      rating: 5,
      text: "AcornSweeper is a brilliant twist on the classic Minesweeper! The squirrel theme is adorable and the gameplay is just as addictive as the original.",
      game: "AcornSweeper"
    },
    {
      id: 6,
      name: "Lisa Wang",
      role: "Multiplayer Fan",
      avatar: "🏆",
      rating: 5,
      text: "The Tic Tac Toe with different piece sizes is genius! It adds so much strategy to a simple game. Perfect for playing with friends online.",
      game: "Tic Tac Toe"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-base-200 to-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Player Reviews</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">What Players Say</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-6">
            Join thousands of satisfied players who love our free online games
          </p>
          
          {/* Overall Stats */}
          <div className="flex justify-center items-center gap-8 text-sm text-base-content/60 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-green-500" />
              <span>98% Would Recommend</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>10,000+ Happy Players</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300"
            >
              <div className="card-body p-6">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <p className="text-base-content/80 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                
                {/* Game Badge */}
                <div className="mb-4">
                  <span className="badge badge-primary badge-outline badge-sm">
                    {testimonial.game}
                  </span>
                </div>
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-base-content">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-base-content/60">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Ready to Join the Fun?</h3>
            <p className="text-base-content/70 mb-6">
              Start playing our free games today and see why thousands of players love Boring Squirrel!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/games" className="btn btn-primary">
                <Heart className="w-4 h-4 mr-2" />
                Start Playing Now
              </a>
              <a href="/leaderboard" className="btn btn-outline">
                <ThumbsUp className="w-4 h-4 mr-2" />
                View Leaderboards
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 