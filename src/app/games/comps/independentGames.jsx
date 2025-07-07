'use client'
import React, {useState} from 'react'
import{ independentGames} from '../../../components/utility/independentGames'

const IndependentGames = () => {
  const [loading, setLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const shuffleArray = (array) => {
    return array
      .map((game) => ({ game, sort: Math.random() })) // Assign random values
      .sort((a, b) => a.sort - b.sort) // Sort based on random values
      .map(({ game }) => game); // Extract sorted games
  };

  const randomizedGames = shuffleArray(independentGames).slice(0,4);

  // const handleImageLoad = () => {
  //   console.log(imagesLoaded)
  //   setImagesLoaded((prev) => prev + 1);
  //   if (imagesLoaded + 1 === randomizedGames.length) {
  //     setLoading(false); // Hide spinner once all images finish loading
  //   }
  // };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-24">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-3 grid-rows-1 gap-4 my-10">
          {randomizedGames.map((game) => (
            <a
              key={game.id}
              href={game.link}
              className="bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-md overflow-hidden flex"
            >
              <img
                src={game.image}
                alt={game.name}
                className="w-32 h-full object-cover"
              />

              <div className="flex flex-col flex-grow p-3 gap-1">
                <h3 className="text-lg font-bold">{game.name}</h3>

                <p className="text-gray-500 text-sm line-clamp-2">
                  {game.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-auto">
                  {game.tags.map((tag, index) => (
                    <span key={index} className="badge badge-accent badge-soft text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default IndependentGames