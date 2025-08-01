import { Metadata } from 'next'
import { Gamepad2, Heart, Users, Trophy, Star, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "About Boring Squirrel - Free Online Games Platform",
  description: "Learn about Boring Squirrel, your destination for free online games. Discover our mission to provide fun, accessible gaming experiences for everyone.",
  keywords: ["about us", "free games", "online gaming", "boring squirrel", "game platform", "casual games"],
  openGraph: {
    title: "About Boring Squirrel - Free Online Games Platform",
    description: "Learn about Boring Squirrel, your destination for free online games. Discover our mission to provide fun, accessible gaming experiences for everyone.",
    url: "https://boringsquirrel.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Boring Squirrel - Free Online Games Platform",
    description: "Learn about Boring Squirrel, your destination for free online games.",
  },
  alternates: {
    canonical: "https://boringsquirrel.com/about",
  },
}

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Gamepad2 className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="text-primary">Boring Squirrel</span>
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Your ultimate destination for free, fun, and accessible online games. 
            We believe gaming should be for everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-base-content/70 mb-6 leading-relaxed">
                At Boring Squirrel, we're passionate about bringing joy through gaming. 
                Our mission is to provide high-quality, free online games that are accessible 
                to everyone, regardless of their device or location.
              </p>
              <p className="text-lg text-base-content/70 leading-relaxed">
                We believe that gaming should be a universal language that brings people together, 
                challenges minds, and creates moments of pure fun and excitement.
              </p>
            </div>
            <div className="bg-base-100 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-3 text-red-500" />
                  <h3 className="font-semibold mb-2">Made with Love</h3>
                  <p className="text-sm text-base-content/60">Every game crafted with care</p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold mb-2">For Everyone</h3>
                  <p className="text-sm text-base-content/60">All ages and skill levels</p>
                </div>
                <div className="text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                  <h3 className="font-semibold mb-2">Quality First</h3>
                  <p className="text-sm text-base-content/60">Premium gaming experience</p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <h3 className="font-semibold mb-2">Safe & Secure</h3>
                  <p className="text-sm text-base-content/60">Family-friendly environment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-4 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              A diverse collection of games designed to entertain, challenge, and bring people together
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Classic Games</h3>
              <p className="text-base-content/70">
                Timeless favorites reimagined with modern twists. From Sudoku to Minesweeper, 
                we put our unique spin on beloved classics.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Competitive Play</h3>
              <p className="text-base-content/70">
                Challenge yourself and others with our leaderboard system. 
                Compete for high scores and bragging rights across all games.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiplayer Fun</h3>
              <p className="text-base-content/70">
                Play with friends and family in real-time multiplayer games. 
                Connect, compete, and create memories together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Boring Squirrel?</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              We're committed to providing the best gaming experience possible
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-base-100 rounded-xl p-6 shadow-lg">
              <Star className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="font-semibold mb-2">100% Free</h3>
              <p className="text-sm text-base-content/60">No hidden costs, no premium features, just pure gaming fun.</p>
            </div>
            
            <div className="bg-base-100 rounded-xl p-6 shadow-lg">
              <Shield className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-semibold mb-2">No Downloads</h3>
              <p className="text-sm text-base-content/60">Play instantly in your browser, no installation required.</p>
            </div>
            
            <div className="bg-base-100 rounded-xl p-6 shadow-lg">
              <Users className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2">No Registration</h3>
              <p className="text-sm text-base-content/60">Jump right into the action without creating accounts.</p>
            </div>
            
            <div className="bg-base-100 rounded-xl p-6 shadow-lg">
              <Trophy className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="font-semibold mb-2">Always Available</h3>
              <p className="text-sm text-base-content/60">24/7 access to all games, anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-primary-content">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Playing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of players enjoying our free games every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/games" className="btn btn-secondary btn-lg">
              <Gamepad2 className="w-5 h-5 mr-2" />
              Explore Games
            </a>
            <a href="/leaderboard" className="btn btn-outline btn-lg">
              <Trophy className="w-5 h-5 mr-2" />
              View Leaderboards
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage