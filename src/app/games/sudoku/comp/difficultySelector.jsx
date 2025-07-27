"use client";
import { useSudokuStore } from "../../../store/useSudokuStore";

const difficulties = [
  {
    id: "easy",
    name: "Easy",
    description: "46-50 empty cells",
    color: "success",
  },
  {
    id: "medium",
    name: "Medium",
    description: "51-55 empty cells",
    color: "warning",
  },
  {
    id: "hard",
    name: "Hard",
    description: "56-60 empty cells",
    color: "error",
  },
  {
    id: "expert",
    name: "Expert",
    description: "61-65 empty cells",
    color: "secondary",
  },
];

export default function DifficultySelector() {
  const { difficulty, setDifficulty } = useSudokuStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">Difficulty Level:</label>
      <div className="flex flex-wrap gap-2 justify-center">
        {difficulties.map((diff) => (
          <button
            key={diff.id}
            onClick={() => setDifficulty(diff.id)}
            className={`btn btn-sm ${
              difficulty === diff.id ? `btn-${diff.color}` : "btn-outline"
            }`}
            title={diff.description}
          >
            {diff.name}
          </button>
        ))}
      </div>
    </div>
  );
}
