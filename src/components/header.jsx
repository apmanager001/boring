import React from 'react'
import { Squirrel } from 'lucide-react';
import { TableProperties, Dices, KeyRound } from 'lucide-react';
import UserInfo from '../components/headerComps/userInfo'
import Link from 'next/link';

const Header = () => {
  return (
    <div className="navbar justify-center bg-base-200">
      <div className="flex flex-col mx-10">
        <div className="flex-1 flex justify-center">
          <Squirrel
            color={"white"}
            fill={"#989082"}
            size={44}
            strokeWidth={0.5}
          />
          <Link href="/" className="btn btn-ghost text-xl ml-4">
            Boring Squirrel
          </Link>
        </div>
        <div className="flex">
          <ul className="menu menu-horizontal justify-center text-sm">
            <li>
              <details>
                <summary>
                  <Dices />
                  Games
                </summary>
                <ul className="rounded-t-none p-2 text-center bg-base-300 z-50">
                  <li>
                    <a href="/games/tiktaktoe">Tik Tak Toe</a>
                  </li>
                  <li>
                    <a href="/games/acornsweeper">AcornSweeper</a>
                  </li>
                  <li>
                    <a href="/games/acornTreeSquirrel">Acorn Tree Squirrel</a>
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
              <UserInfo />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header