import React from 'react'
import {
  Squirrel,
  UserCheck,
  Puzzle,
  Rocket,
  Smile,
  Gamepad2,
  Dices,
  List,
  Gamepad,
  Newspaper
} from "lucide-react";


const Hero = () => {
  return (
    <section className="bg-base-100 py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        {/* Logo Icon */}
        {/* <div className="flex justify-center mb-4">
          <Squirrel className="w-10 h-10 text-primary" />
        </div> */}

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
          Welcome to Boring Squirrel
        </h1>

        {/* Subheading */}
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
          Fun, free, and frictionless gaming—no downloads, no signups. Just
          click, play, and enjoy a wide variety of games for all ages.
        </p>

        {/* Feature Badges */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
          <div className="flex items-center gap-3 bg-base-100 shadow-md px-4 py-3 rounded-lg w-full max-w-xs">
            <Gamepad2 className="text-success" />
            <span className="text-sm font-medium">Always Free to Play</span>
          </div>
          <div className="flex items-center gap-3 bg-base-100 shadow-md px-4 py-3 rounded-lg w-full max-w-xs">
            <Rocket className="text-accent" />
            <span className="text-sm font-medium">No Install Needed</span>
          </div>
          <div className="flex items-center gap-3 bg-base-100 shadow-md px-4 py-3 rounded-lg w-full max-w-xs">
            <UserCheck className="text-warning" />
            <span className="text-sm font-medium">No Signup Required</span>
          </div>
          <div className="flex items-center gap-3 bg-base-100 shadow-md px-4 py-3 rounded-lg w-full max-w-xs">
            <Smile className="text-primary" />
            <span className="text-sm font-medium">All Ages Welcome</span>
          </div>
          <div className="flex items-center gap-3 bg-base-100 shadow-md px-4 py-3 rounded-lg w-full max-w-xs">
            <Puzzle className="text-secondary" />
            <span className="text-sm font-medium">Challenging Gameplay</span>
          </div>
          <div className="flex items-center gap-3 bg-base-100 shadow-md px-4 py-3 rounded-lg w-full max-w-xs">
            <Dices className="text-success" />
            <span className="text-sm font-medium">Tons of Game Types</span>
          </div>
          <div className="flex items-center gap-3 bg-base-100 shadow-md px-4 py-3 rounded-lg w-full max-w-xs">
            <List className="text-accent" />
            <span className="text-sm font-medium">
              Compare scores on Leaderboard
            </span>
          </div>
          <div className="flex items-center gap-3 bg-base-100 shadow-md px-4 py-3 rounded-lg w-full max-w-xs">
            <Gamepad className="text-warning" />
            <span className="text-sm font-medium">
              Find other Independent Games
            </span>
          </div>
          <div className="flex items-center gap-3 bg-base-100 shadow-md px-4 py-3 rounded-lg w-full max-w-xs">
            <Newspaper className="text-primary" />
            <span className="text-sm font-medium">
              Find News About Games
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero