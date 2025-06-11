'use client'
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';
import {gameLinks, kidLinks } from '../components/headerComps/headerLinks'
import { Dices, CircleUserRound, TableProperties, User, Cog } from "lucide-react";
import useStore from '@/app/store/store';

const FooterDrawer = () => {
    const { user, loading, error, validateSession, logout } = useStore();

    useEffect(() => {
      if (typeof window !== "undefined") {
        validateSession();
      }
    }, [validateSession]);

    // if (loading)
    //   return <span className="loading loading-dots text-accent"></span>;
    // if (error) return <p>Error: {error}</p>;


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

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 min-h-full w-80 p-4 mt-16 overflow-y-scroll scrollbar-hide">
        {loading && <span className="loading loading-dots text-accent"></span>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && user ? (
          <div className="flex flex-col min-h-60">
            <div className="flex justify-center">
              <CircleUserRound size={150} />
            </div>
            <div className="flex flex-col gap-2">
              {user.username ? (
                <div className="flex flex-col items-center ">
                  <span className=" font-bold">{user.username}</span>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col items-center gap-2">
                <span className="font-bold">{user?.email}</span>
                <button
                  className="btn btn-primary btn-sm block "
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-60">
            <Link className="btn btn-primary" href="/login">
              Login
            </Link>
          </div>
        )}
        <li>
          <details open>
            <summary>
              <Dices />
              Games
            </summary>
            <ul>
              <li>
                <details>
                  <summary>Games</summary>
                  <ul>
                    {gameLinks
                      .filter((link) => link.type === "game")
                      .map((link) => (
                        <li key={link.name}>
                          <Link href={link.link}>{link.name}</Link>
                        </li>
                      ))}
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Kid Games</summary>
                  <ul>
                    {kidLinks
                      .filter((link) => link.type === "kid")
                      .map((link) => (
                        <li key={link.name}>
                          <Link href={link.link}>{link.name}</Link>
                        </li>
                      ))}
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link href="/leaderboard">
            <TableProperties /> Leaderboard
          </Link>
        </li>
        {user ? (
          <>
            <li className="ml-2 text-gray-700">Your account</li>
            <li>
              <Link href={`/profile/${user.username}`}>
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
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default FooterDrawer