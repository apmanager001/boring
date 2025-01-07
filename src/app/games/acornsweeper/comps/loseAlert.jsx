import React from 'react'

const LoseAlert = () => {
    const playAgain = () => {
        window.location.reload();
    };
    const cancelAlert = () => {
      
    };
  return (
    <div
      role="alert"
      className="alert fixed top-52 left-1/2 transform -translate-x-1/2 mt-4 w-3/4 max-w-md shadow-2xl p-4 rounded-2xl z-50 border border-red-200"
    >
      <span className="font-extrabold text-center">
        Want to play again?
      </span>
      <div className="flex gap-2">
        <button
          className="btn btn-sm border border-gray-600"
          onClick={cancelAlert}
        >
          Cancel
        </button>
        <button className="btn btn-sm btn-success" onClick={playAgain}>
          Play Again?
        </button>
      </div>
    </div>
  );
}

export default LoseAlert