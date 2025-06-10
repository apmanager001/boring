"use client";
import Link from "next/link";
import { Puzzle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white text-center px-6">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">
        You've stumbled into The Lost Puzzle Piece!
      </p>

      <Puzzle className="w-64 h-64" color="#32CD32" fill="#32CD32" />

      <p className="mt-4 text-lg">
        It seems this page is missing a crucial piece...
      </p>
      <p className="mt-2">
        <span className="text-yellow-400 font-bold">Hint:</span> Try rearranging
        the puzzle by going back to **Home Base**.
      </p>

      <Link href="/">
        <button className="btn btn-warning mt-6 px-6 py-3 text-lg shadow-lg">
          Find Missing Pieces (Go Home)
        </button>
      </Link>

      <p className="mt-6 text-sm opacity-70">
        Or maybe the solution is hidden somewhere in your inventory... Have
        you checked your bookmarks?
      </p>
    </div>
  );
};

export default NotFound;
