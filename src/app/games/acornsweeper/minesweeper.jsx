'use client'
import React,{useState} from "react";
import { Squirrel, Info } from "lucide-react";
import GameLogged from "../comps/gameLogged";
import Board from "./comps/board";
import Timer from "./comps/topBarComps/timer";
import Marked from "./comps/topBarComps/marked";
import SharedButtons from "../../../components/gameComps/social";

const Minesweeper = () => {
    const [marked, setMarked] = useState(0)
    const [start, setStart] = useState(false)
    const [score, setScore] = useState(0)

    const handleTimeUpdate = (currentTime) => {
      setScore(currentTime);
    };

  return (
    <div className="flex flex-col items-center bg-base-100 mb-20">
      {/* <div className="mt-4 mr-4 flex justify-end w-full md:w-[500px]">
        <GameLogged />
      </div> */}
      <SharedButtons game={"Acornsweeper"} />
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold my-4">Acornsweeper </h1>
        <div
          className="tooltip tooltip-left md:tooltip-bottom"
          data-tip={`There are 10 acorns to avoid. Right-click to flag a square with a Squirrel.`}
        >
          <Info />
        </div>
      </div>
      <div className="flex justify-between my-4 w-96">
        <div className="w-16 flex items-center justify-center">
          <Timer start={start} onTimeUpdate={handleTimeUpdate}/>
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
        <Board setMarked={setMarked} setStart={setStart} score={score}/>
      </div>
    </div>
  );
};

export default Minesweeper;
