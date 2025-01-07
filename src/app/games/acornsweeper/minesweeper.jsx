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
    <div className="flex flex-col items-center bg-base-100 mb-10">
      <div className="mt-4 text-sm text-center">
        <span>There are 10 acorns to avoid. <br />Right click to flag a square with a Squirrel.</span>
      </div>
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
