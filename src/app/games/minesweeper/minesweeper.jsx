'use client'
import React,{useState} from "react";
import { Squirrel } from "lucide-react";
import Board from "./comps/board";
import Timer from "./comps/topBarComps/timer";
import Marked from "./comps/topBarComps/marked";

const Minesweeper = () => {
    const [marked, setMarked] = useState(0)
    const [start, setStart] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <div className="flex justify-between my-4 w-96">
        <div className="w-16 flex items-center justify-center">
          <Timer start={start} />
        </div>
        <div className="w-16 flex items-center justify-center">
          <Squirrel
            color={"white"}
            fill={"#989082"}
            size={44}
            strokeWidth={0.5}
          />
        </div>
        <div className="w-16 flex items-center justify-center">
          <Marked marked={marked} />
        </div>
      </div>
      <div>
        <Board setMarked={setMarked} setStart={setStart} />
      </div>
    </div>
  );
};

export default Minesweeper;
