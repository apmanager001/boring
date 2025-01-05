'use client'
import React,{useState} from "react";
import Board from "./comps/board";
import Timer from "./comps/topBarComps/timer";
import Marked from "./comps/topBarComps/marked";

const Minesweeper = () => {
    const [marked, setMarked] = useState(0)
    const [start, setStart] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <div className="flex justify-between my-4 w-96">
        <Timer start={start}/>
        <Marked marked={marked} />
      </div>
      <div>
        <Board setMarked={setMarked} setStart={setStart}/>
      </div>
      
    </div>
  );
};

export default Minesweeper;
