import React from "react";
import Link from "next/link";

const CategoryTiles = () => {
  // These could also be fetched from an API
  const categories = [
    {
      id: 1,
      name: "Action",
      slug: "action",
      image:
        "https://media.istockphoto.com/id/1006291908/photo/red-boxing-glove.jpg?s=2048x2048&w=is&k=20&c=N7CN6Gr4RWczPRZ0xmoU3N4bhM6b7uk324TDV6UvvMQ=",
    },
    {
      id: 2,
      name: "Adventure",
      slug: "adventure",
      image:
        "https://media.istockphoto.com/id/1370511515/vector/the-next-planet-to-explore.jpg?s=2048x2048&w=is&k=20&c=1orsAdajYTXOvOqi7CKjlIIGHZ9pdOLEGSS51kSfrAQ=",
    },
    {
      id: 3,
      name: "RPG",
      slug: "rpg",
      image:
        "https://media.istockphoto.com/id/1181398275/photo/tabletop-roleplaying-flat-lay-with-colorful-rpg-and-game-dices-character-sheet-rule-book-and.jpg?s=2048x2048&w=is&k=20&c=1S2KlnBbpI7CZUwpjI__QTw9Mk7sKP_OudLxdxGKfTw=",
    },
    {
      id: 4,
      name: "Strategy",
      slug: "strategy",
      image:
        "https://media.istockphoto.com/id/1368913370/vector/soccer-strategy-football-game-tactic-drawing-on-chalkboard-hand-drawn-soccer-game-scheme.jpg?s=2048x2048&w=is&k=20&c=UrJBI1Yxbmy4yh7RoMOIkOGLHFuapC-kmtNzjUCtkBY=",
    },
    {
      id: 5,
      name: "Indie",
      slug: "indie",
      image:
        "https://media.istockphoto.com/id/1141514587/vector/pixel-art-landscape-summer-ocean-beach-8-bit-city-park-pixel-cityscape-and-highlands.jpg?s=2048x2048&w=is&k=20&c=MiK-QBt3saCxXVMf70yuANtA5li6EW9SCFXOlew1sgs=",
    },
    {
      id: 6,
      name: "Esports",
      slug: "esports",
      image:
        "https://media.istockphoto.com/id/1354761874/photo/team-of-professional-cybersport-gamers-celebrating-success-in-gaming-club.jpg?s=2048x2048&w=is&k=20&c=sNogk3t5SXJIFEG8rGev9-b7KFk8KnoySUXw0wsYaSk=",
    },
    {
      id: 7,
      name: "Xbox",
      slug: "xbox",
      image:
        "https://media.istockphoto.com/id/1141514587/vector/pixel-art-landscape-summer-ocean-beach-8-bit-city-park-pixel-cityscape-and-highlands.jpg?s=2048x2048&w=is&k=20&c=MiK-QBt3saCxXVMf70yuANtA5li6EW9SCFXOlew1sgs=",
    },
    {
      id: 8,
      name: "Playstation",
      slug: "playstation",
      image:
        "https://media.istockphoto.com/id/1141514587/vector/pixel-art-landscape-summer-ocean-beach-8-bit-city-park-pixel-cityscape-and-highlands.jpg?s=2048x2048&w=is&k=20&c=MiK-QBt3saCxXVMf70yuANtA5li6EW9SCFXOlew1sgs=",
    },
    {
      id: 9,
      name: "Nintendo",
      slug: "nintendo",
      image:
        "https://media.istockphoto.com/id/1141514587/vector/pixel-art-landscape-summer-ocean-beach-8-bit-city-park-pixel-cityscape-and-highlands.jpg?s=2048x2048&w=is&k=20&c=MiK-QBt3saCxXVMf70yuANtA5li6EW9SCFXOlew1sgs=",
    },
    {
      id: 10,
      name: "PC",
      slug: "pc",
      image:
        "https://media.istockphoto.com/id/1141514587/vector/pixel-art-landscape-summer-ocean-beach-8-bit-city-park-pixel-cityscape-and-highlands.jpg?s=2048x2048&w=is&k=20&c=MiK-QBt3saCxXVMf70yuANtA5li6EW9SCFXOlew1sgs=",
    },
    {
      id: 11,
      name: "Console",
      slug: "console",
      image:
        "https://media.istockphoto.com/id/1141514587/vector/pixel-art-landscape-summer-ocean-beach-8-bit-city-park-pixel-cityscape-and-highlands.jpg?s=2048x2048&w=is&k=20&c=MiK-QBt3saCxXVMf70yuANtA5li6EW9SCFXOlew1sgs=",
    },
    {
      id: 12,
      name: "Puzzle",
      slug: "puzzle",
      image:
        "https://media.istockphoto.com/id/1141514587/vector/pixel-art-landscape-summer-ocean-beach-8-bit-city-park-pixel-cityscape-and-highlands.jpg?s=2048x2048&w=is&k=20&c=MiK-QBt3saCxXVMf70yuANtA5li6EW9SCFXOlew1sgs=",
    },
  ];
// const background =
//   "bg-gradient-to-br from-emerald-400 via-pink-200 to-purple-500";

const background = "bg-gradient-to-br from-green-500 via-green-300 to-pink-200";
  return (
    <div className={`${background} p-1 rounded-lg`}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-base-200 p-2">
        {categories.map((category) => (
          <Link key={category.id} href={`/news/${category.slug}`} passHref className={`${background}`}>
            <div className="card image-full h-40 hover:scale-105 transition-transform cursor-pointer">
              <div className="card-body justify-end p-4 bg-gradient-to-t from-black/30 to-transparent">
                <h3 className="card-title text-white text-center">
                  <div className="bg-black/20 p-2 rounded-xl">
                  {category.name}
                  </div>
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTiles;
