"use client";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import useStore from "../../app/store/store";
import { useProfile, useLogout } from "../../hooks/useAuth";
import { LogOut, Cog, User, UserRound, KeyRound, Shield } from "lucide-react";
import LoadingSpinner from "../utility/LoadingSpinner";

const UserInfo = () => {
  const { user, error, initialized, setUser, clearUser, setError, clearError } =
    useStore();
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
    return <LoadingSpinner size="sm" className="flex gap-2 items-center" />;
  }

  // Show loading spinner only if loading and not initialized
  if (isLoading && !initialized) {
    return <LoadingSpinner size="sm" className="flex gap-2 items-center" />;
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

  if (error) {
    toast.error(error);
  }

  return (
    <>
      {user ? (
        <details className="z-50">
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
            {user.admin ? (
              <li>
                <Link
                  href="/account/admin"
                  className="hover:bg-yellow-300 hover:text-black"
                >
                  <Shield />
                  Admin
                </Link>
              </li>
            ) : (
              ""
            )}
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
};

export default UserInfo;
