'use client'
import React from "react";
import OilDrop from "./oilDrip";
import './cell.css'

const Cell = ({ type, onClick, isOilFlowing }) => {

  let content;
  if (type === "START") {
    content = (
      <div className="flex flex-col items-center justify-between w-full h-full relative">
        <span className="text-center font-bold text-sm">Start</span>
        <img
          src="/pipe/start.svg"
          alt="║"
          className="absolute"
          draggable="false"
        />
      </div>
    );
  } else {
  switch (type) {
    case "║":
      content = (
        <img
          src="/pipe/verticalStraight.svg"
          alt="║"
          // className="w-14 h-14"
          draggable="false"
        />
      );
      break;
    case "═":
      content = (
        <img
          src="/pipe/horizontalStraight.svg"
          alt="═"
          // className="scale-125 "
          draggable="false"
        />
      );
      break;
    case "╬":
      content = (
        <img
          src="/pipe/cross.svg"
          alt="╬"
          className="w-full h-full"
          draggable="false"
        />
      );
      break;
    case "╝":
      content = (
        <img
          src="/pipe/leftToUp.svg"
          alt="╝"
          className="w-full h-full"
          draggable="false"
        />
      );
      break;
    case "╚":
      content = (
        <img
          src="/pipe/rightToUp.svg"
          alt="╚"
          className="w-full h-full"
          draggable="false"
        />
      );
      break;
    case "╗":
      content = (
        <img
          src="/pipe/leftToDown.svg"
          alt="╗"
          className="w-full h-full"
          draggable="false"
        />
      );
      break;
    case "╔":
      content = (
        <img
          src="/pipe/rightToDown.svg"
          alt="╔"
          className="w-full h-full"
          draggable="false"
        />
      );
      break;
    default:
      content = type || "";
  }
}

  return (
    <div
      className={`relative min-w-12 min-h-12 border cell ${
        typeof type === "string" && type.includes("START")
          ? "bg-green-500 text-black font-bold"
          : "bg-blue-500 text-black font-extrabold text-3xl"
      }`}
    >
      {content}
      {isOilFlowing && <OilDrop />}
    </div>
  );
};


export default Cell;
