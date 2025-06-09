'use client'
const Feature = () => {
  const games = [
    {
      id: 1,
      name: "Tic Tac Toe",
      description: "Classic X and O game with multiplayer support",
      image:
        "https://images.unsplash.com/photo-1605170439002-90845e8c0137?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["2 Players", "Strategy", "Simple"],
      link: "/tictactoe",
    },
    {
      id: 2,
      name: "AcornSweeper",
      description: "Find hidden acorns without detonating them",
      image:
        "/hp/squirrels.png",
      tags: ["Puzzle", "Single Player", "Classic"],
      link: "/games/acornsweeper",
    },
    {
      id: 3,
      name: "Memory Match",
      description: "Test your memory by matching pairs of cards",
      image:
        "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["Memory", "Single Player", "Kids"],
      link: "/memory",
    },
    {
      id: 4,
      name: "Coloring Book",
      description: "A simple coliring book. Click the number/color and fill in the image with the coorisponding number.",
      image:
        "/hp/sb.png",
      tags: ["Arcade", "Single Player", "Retro"],
      link: "/kidgames/coloringbook",
    },
  ];

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
          {games.map((game) => (
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
          <button className="btn btn-outline btn-primary">
            View All Games
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;