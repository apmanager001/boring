'use client'
import React from "react";
// import VerticalStraight from "/pipe/verticalStraight.svg";


const Cell = ({ type, onClick }) => {

  let content;
  switch (type) {
    case "║":
      content = (
        <img
          src="/pipe/verticalStraight.svg"
          alt="║"
          className="w-14 h-14"
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

  return (
    <div
      className={`w-12 h-12 border flex items-center justify-center cursor-pointer ${
        type?.includes("START")
          ? "bg-green-500 text-black font-bold"
          : "bg-blue-500 text-black font-extrabold text-3xl"
      }`}
    >
      {content}
    </div>
  );
};


export default Cell;
