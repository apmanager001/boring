'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import useStore from '../../store/store'

const GameLogged = () => {
    const user = useStore((state) => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }
  return (
    <>
      {user ? (
        // <div className='realtive text-left'>
        //     <div onClick={toggleDropdown} className='text-left flex gap-2 '>
        //         {user.username}
        //         <ChevronDown />
        //     </div>
        //     {dropdownOpen && (
        //         <div className='absolute right-3 md:right-auto mt-2 w-36 bg-base-300 border rounded shadow-md'>
        //             <Link href="/profile" className='block px-4 py-2 hover:bg-base-200'>Profile</Link>
        //             <Link href="/stats" className='block px-4 py-2 hover:bg-base-200'>Settings</Link>
        //             <Link href="/logout" className='block px-4 py-2 hover:bg-base-200'>Logout</Link>
        //         </div>
        //     )}
        // </div>
        <div className="navbar justify-end">
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>{user.username}</summary>
                  <ul className="bg-base-200 rounded-t-none p-4">
                    <li>
                      <Link
                        href={`/profile/${user.username}`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/stats"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                        <Link
                            href="/logout"
                        >
                            Logout
                        </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link href="/login">
          <div className="btn btm-xs">Login</div>
        </Link>
      )}
    </>
  );
}

export default GameLogged