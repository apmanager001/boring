'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import useStore from '../../app/store/store'
import axiosInstance from '../utility/axios'
import { LogOut, Cog, User, UserRound, KeyRound } from "lucide-react";

const UserInfo = () => {
   const { user, loading, error, validateSession, logout } = useStore();

    useEffect(() => {
      if (typeof window !== "undefined") {
        validateSession();
      }
    }, [validateSession]);

   if (loading) return (
     <span className="loading loading-dots text-accent"></span>
   );
   if (error) return <p>Error: {error}</p>;


  const handleLogout = async () => {
    try {
      await logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (error) {
    toast.error(error);
  }
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
              <Link href={`/profile/${user.id}`}>
                <User />
                Profile
              </Link>
            </li>
            <li>
              <Link href="/account">
                <Cog />
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