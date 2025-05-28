import React from "react";

const COLORS = [
  { name: "red", value: "#EF4444" },
  { name: "green", value: "#10B981" },
  { name: "blue", value: "#3B82F6" },
  { name: "yellow", value: "#F59E0B" },
  { name: "purple", value: "#8B5CF6" },
  { name: "cyan", value: "#06B6D4" },
  { name: "yellow", value: "#FDDA0D" },
  { name: "brown", value: "	#7B3F00" },
];

const PixelToolbar = ({
  selectedColor,
  timeLeft,
  changesLeft,
  isActiveUser,
  onBecomeActiveUser,
  onColorSelect,
  onButtonClick
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className=" rounded-lg shadow-md p-4 mb-4 flex justify-center flex-wrap items-center gap-4">
      {!isActiveUser ? (
        <button
          onClick={onBecomeActiveUser}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Become Active User
        </button>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Time Left:</span>
            <span
              className={`px-2 py-1 rounded ${
                timeLeft <= 60
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn btn-primary btn-sm font-semibold"
              onClick={onButtonClick}
            >
              All Set
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Changes Left:</span>
            <span className="px-2 py-1 rounded bg-gray-100 text-gray-800">
              {changesLeft}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Selected:</span>
            <div
              className="w-6 h-6 rounded border-2 border-gray-300"
              style={{ backgroundColor: selectedColor || "transparent" }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {COLORS.map((color) => (
              <button
                key={color.value}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.value
                    ? "border-black"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => onColorSelect(color.value)}
                title={color.name}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PixelToolbar;
