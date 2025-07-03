import toast from "react-hot-toast";
import { BadgeCheck, History } from "lucide-react";

export default function Controls({ resetGame, solution, board }) {

  function checkSolution() {
    const isCorrect = board
      .flat()
      .every((cell, index) => cell === solution.flat()[index]);

    if (!isCorrect) {
      toast.error("Sorry, there is something incorrect 😕");
    } else {
      toast.success("Great job! Everything looks correct 🎉");
    }
  }


  return (
    <div className="flex justify-center space-x-4">
      <button className="btn btn-soft btn-info" onClick={resetGame}>
        <History /> Reset
      </button>
      <button className="btn btn-soft btn-success" onClick={checkSolution}>
        <BadgeCheck /> Validate
      </button>
    </div>
  );
}
