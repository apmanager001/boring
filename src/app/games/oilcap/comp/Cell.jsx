'use client'
import React from "react";
import Cross from './svg/cross'
import HorizontalStraight from "./svg/horizontalStraight";
import VerticalStraight from "./svg/verticalStraight";
import LeftToDown from "./svg/leftToDown";
import LeftToUp from "./svg/leftToUp";
import RightToUp from "./svg/rightToUp";
import RightToDown from "./svg/righttoDown";
import Start from "./svg/start";

const Cell = ({ type, onClick, flowing }) => {
  // let flowing = false
  let content;
  
  if (type === "START") {
    // console.log(type)
    content = (
      <div className="flex flex-col items-center justify-between w-12 h-11 relative">
        <span className="text-center font-bold text-sm">Start</span>
        <div className="absolute overflow-hidden">
          <Start className="w-full h-full " isOilFlowing={flowing}/>
        </div>
      </div>
    );
  } else {
  switch (type) {
    case "║":
      content = (
        <VerticalStraight className="w-12 h-12" isOilFlowing={flowing}/>
      );
      break;
    case "═":
      content = (
        <HorizontalStraight className="w-12 h-12" isOilFlowing={flowing} />
      );
      break;
    case "╬":
      content = <Cross className="w-12 h-12" isOilFlowing={flowing} />;
      break;
    case "╝":
      content = <LeftToUp isOilFlowing={flowing} />;
      break;
    case "╚":
      content = <RightToUp className="h-12 w-12" isOilFlowing={flowing} />;
      break;
    case "╗":
      content = <LeftToDown className="w-12 h-12" isOilFlowing={flowing} />;
      break;
    case "╔":
      content = <RightToDown isOilFlowing={flowing} />;
      break;
    default:
      content = type || "";
  }
}

  return (
    <div
      className={` min-w-12 min-h-12 border ${
        typeof type === "string" && type.includes("START")
          ? "bg-green-500 text-black font-bold"
          : "bg-blue-500 text-black font-extrabold text-3xl"
      }`}
      // onClick={onClick}
    >
      {content}
    </div>
  );
};


export default Cell;
