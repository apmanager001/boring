// components/GameHeader.js
import { RefreshCcw } from "lucide-react";

export function GameHeader({ score, onRestart }) {
  return (
    <div className="flex justify-between items-center mb-4 px-4 sm:px-0">
      <h1 className="text-2xl font-bold text-base-content">
        Gravity Flip Tetris
      </h1>
      <div className="flex items-center gap-4">
        <p className="text-base-content">
          Score: <span className="font-semibold">{score}</span>
        </p>
        <button
          onClick={onRestart}
          className="btn btn-sm btn-neutral flex items-center gap-1"
        >
          <RefreshCcw size={16} /> Restart
        </button>
      </div>
    </div>
  );
}
