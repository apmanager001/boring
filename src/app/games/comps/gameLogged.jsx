'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import axiosInstance from '../../../components/utility/axios'
import { LogOut, Settings, User, KeyRound } from 'lucide-react'
import useStore from '../../store/store'

const GameLogged = () => {
    const user = useStore((state) => state.user);

    const handleLogout = async () => {
      try {
        await axiosInstance.post("/logout");
        window.location.href = "/login";
      } catch (error) {
        toast.error(error);
      }
    };
  return (
    <>
      {user ? (
        <div className="navbar justify-end">
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>
                    {user.username}
                  </summary>
                  <ul className="bg-base-200 rounded-t-none p-4">
                    <li>
                      <Link href={`/profile/${user.username}`}>
                        <User />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/stats">
                        <Settings />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:bg-red-600 hover:text-white"
                        onClick={handleLogout}
                        data-name="logout"
                        aria-label="This link will log you out of your account. "
                      >
                        <LogOut />
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
          <div className="flex gap-2 items-center">
            <KeyRound />
            Login
          </div>
        </Link>
      )}
    </>
  );
}

export default GameLogged