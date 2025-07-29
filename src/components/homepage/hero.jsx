import React from 'react'
import Link from 'next/link'
import {
  Gamepad2,
  Rocket,
  UserCheck,
  Smile,
  ArrowRight,
  Play
} from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-base-100 to-base-200 py-20 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-base-content mb-6 leading-tight">
          Play <span className="text-primary">Free Games</span><br />
          <span className="text-2xl md:text-3xl lg:text-4xl font-normal text-base-content/70">
            No Downloads • No Signups • Instant Fun
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-10 leading-relaxed">
          Dive into our collection of classic and modern games. From brain-teasing puzzles 
          to strategic challenges, there's something for everyone. Start playing in seconds!
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link 
            href="/games" 
            className="btn btn-primary btn-lg text-lg px-8 py-4 hover:scale-105 transition-transform"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Playing Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link 
            href="/leaderboard" 
            className="btn btn-outline btn-lg text-lg px-8 py-4"
          >
            View Leaderboards
          </Link>
        </div>

        {/* Feature Badges - Reduced to 4 key features */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-base-100 shadow-lg px-6 py-4 rounded-xl w-full max-w-xs hover:shadow-xl transition-shadow">
            <div className="p-2 bg-success/20 rounded-lg">
              <Gamepad2 className="text-success w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-base-content">Always Free</div>
              <div className="text-sm text-base-content/60">No hidden costs</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-base-100 shadow-lg px-6 py-4 rounded-xl w-full max-w-xs hover:shadow-xl transition-shadow">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Rocket className="text-accent w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-base-content">Instant Play</div>
              <div className="text-sm text-base-content/60">No downloads needed</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-base-100 shadow-lg px-6 py-4 rounded-xl w-full max-w-xs hover:shadow-xl transition-shadow">
            <div className="p-2 bg-warning/20 rounded-lg">
              <UserCheck className="text-warning w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-base-content">No Signup</div>
              <div className="text-sm text-base-content/60">Jump right in</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-base-100 shadow-lg px-6 py-4 rounded-xl w-full max-w-xs hover:shadow-xl transition-shadow">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Smile className="text-primary w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-base-content">All Ages</div>
              <div className="text-sm text-base-content/60">Family friendly</div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-base-content/60 text-lg mb-4">
            Join thousands of players enjoying our games daily
          </p>
          <div className="flex justify-center items-center gap-8 text-sm text-base-content/50">
            <span>🎮 8+ Classic Games</span>
            <span>🏆 Live Leaderboards</span>
            <span>📱 Mobile Friendly</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero