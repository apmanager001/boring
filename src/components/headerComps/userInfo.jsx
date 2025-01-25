'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import useStore from '../../app/store/store'
import axiosInstance from '../utility/axios'
import { LogOut, Settings, User, UserRound, KeyRound } from "lucide-react";

const UserInfo = () => {
  const user = useStore((state) => state.user);
  const validateSession = useStore((state) => state.validateSession);
    
  useEffect(() => {
    if(!user){
      validateSession();
    }
  }, [validateSession]);

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
        <details className='z-50'>
          <summary>
            <UserRound />
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
      ) : (
        <Link href="/login" className="flex gap-2 items-center">
          <KeyRound />
          Login
        </Link>
      )}
    </>
  );
}

export default UserInfo