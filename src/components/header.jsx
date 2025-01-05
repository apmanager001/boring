import React from 'react'
import { Dices } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex flex-col md:navbar bg-base-200">
      <div className="flex-1 mx-10">
        <Dices className='w-12 h-12'/>
        <Link href='/' className="btn btn-ghost text-xl">Boring Games For Boring Times</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          
          <li>
            <details className='mx-10'>
              <summary>Games</summary>
              <ul className="bg-base-100 rounded-t-none p-2 text-center">
                <li>
                  <a href='/games/tiktaktoe'>Tick Tack Toe</a>
                </li>
                <li>
                  <a href='/games/minesweeper'>MineSweeper</a>
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