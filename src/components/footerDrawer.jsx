"use client";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { gameLinks, kidLinks } from "../components/headerComps/headerLinks";
import {
  Dices,
  CircleUserRound,
  TableProperties,
  User,
  Cog,
} from "lucide-react";
import useStore from "@/app/store/store";
import { useProfile, useLogout } from "../hooks/useAuth";

const FooterDrawer = () => {
  const { user, error, setUser, clearUser, setError, clearError } = useStore();
  const [mounted, setMounted] = useState(false);

  // Callbacks for TanStack Query
  const handleProfileSuccess = useCallback(
    (data) => {
      setUser(data);
    },
    [setUser]
  );

  const handleProfileError = useCallback(
    (error) => {
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        // User not logged in - this is normal
        clearUser();
      } else {
        // Other errors
        setError(error.message || "Failed to load profile");
      }
    },
    [clearUser, setError]
  );

  // TanStack Query hooks
  const {
    data: profileData,
    isLoading,
    error: profileError,
  } = useProfile(handleProfileSuccess, handleProfileError);
  const logoutMutation = useLogout();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      if (error) {
        clearError();
      }
    };
  }, [error, clearError]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <span className="loading loading-dots text-accent"></span>;
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      clearUser();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error(error.message || "Failed to logout");
    }
  };

  return (
    <div className="drawer-side ">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 min-h-full w-80 p-4  overflow-y-scroll scrollbar-hide">
        {isLoading && (
          <span className="loading loading-dots text-accent"></span>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!isLoading && !error && user ? (
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
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "Signing out..." : "Sign out"}
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
};

export default FooterDrawer;
