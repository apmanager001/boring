import React from "react";
import { Squirrel, TableProperties, Dices } from "lucide-react";
import GoogleSignin from './headerComps/googleSignin'
import Link from "next/link";

const Header = async () => {

  return (
    <div className="navbar justify-center bg-base-200 z-10">
      <div className="flex flex-col mx-10">
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/squirrel.png"
            alt="Squirrel Logo"
            width="100"
            height="100"
          />
          {/* <Squirrel
            color={"white"}
            fill={"#989082"}
            size={44}
            strokeWidth={0.5}
          /> */}
          <Link href="/" className="btn btn-ghost text-xl ">
            Boring Squirrel
          </Link>
        </div>
        <div className="md:flex hidden">
          <ul className="menu menu-horizontal justify-center text-sm">
            <li>
              <details>
                <summary>
                  <Dices />
                  Games
                </summary>
                <ul className="rounded-t-none p-2 text-center bg-base-200 z-50">
                  <li>
                    <a href="/games/acornsweeper">AcornSweeper</a>
                  </li>
                  <li>
                    <a href="/games/tiktaktoe">Tik Tak Toe</a>
                  </li>
                  <li>
                    <a href="/games/oilcap">OilCap</a>
                  </li>
                  {/* <li>
                    <a href="/games/acornTreeSquirrel">Acorn Tree Squirrel</a>
                  </li> */}
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  <Dices />
                  Kid Games
                </summary>
                <ul className="rounded-t-none p-2 text-center bg-base-200 z-50">
                  <li>
                    <a href="/kidgames/coloringbook">Coloring Book</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/leaderboard">
                <TableProperties /> Leaderboard
              </Link>
            </li>
            <li>
              <GoogleSignin />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;