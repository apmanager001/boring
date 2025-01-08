'use client'
import React, { useState } from "react";

const choices = ["rock", "paper", "scissors"];

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const getComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return "It's a tie!";
    }

    if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  };

  const handleChoice = (choice) => {
    setUserChoice(choice);
    getComputerChoice();
    const gameResult = determineWinner(choice, computerChoice);
    setResult(gameResult);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-8">Rock, Paper, Scissors</h1>
      <div className="flex space-x-4 mb-8">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            className={`px-6 py-3 rounded-lg text-xl cursor-pointer transition-all duration-200 
              ${choice === "rock" ? "bg-red-500 hover:bg-red-600" : ""}
              ${choice === "paper" ? "bg-blue-500 hover:bg-blue-600" : ""}
              ${
                choice === "scissors" ? "bg-green-500 hover:bg-green-600" : ""
              }`}
          >
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>
      <div className="text-lg">
        {userChoice && <p>You chose: {userChoice}</p>}
        {computerChoice && <p>Computer chose: {computerChoice}</p>}
        {result && <h2 className="mt-4 text-2xl font-semibold">{result}</h2>}
      </div>
    </div>
  );
};

export default Game;
