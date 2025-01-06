import React from 'react'
import { Squirrel } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1 mx-10">
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
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details className="mx-10">
              <summary>Games</summary>
              <ul className="bg-base-100 rounded-t-none p-2 text-center">
                <li>
                  <a href="/games/tiktaktoe">Tick Tack Toe</a>
                </li>
                <li>
                  <a href="/games/minesweeper">AcornSweeper</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>SignUp/SignIn</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header