"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import useStore from "../../app/store/store";
import { LogOut, Cog, User, UserRound, KeyRound, Shield } from "lucide-react";
import LoadingSpinner from "../utility/LoadingSpinner";

const UserInfo = () => {
  const {
    user,
    loading,
    error,
    initialized,
    validateSession,
    logout,
    clearError,
  } = useStore();
  const [mounted, setMounted] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Always validate session when component mounts to pick up login state
    if (mounted) {
      console.log("UserInfo: Component mounted, validating session");
      validateSession();

      // Set a timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        console.log("UserInfo: Timeout reached, forcing initialization");
        setTimeoutReached(true);
      }, 10000); // 10 seconds timeout

      return () => clearTimeout(timeout);
    }
  }, [validateSession, mounted]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      if (error) {
        clearError();
      }
    };
  }, [error, clearError]);

  // Debug logging
  useEffect(() => {
    console.log("UserInfo state:", {
      user,
      loading,
      initialized,
      mounted,
      timeoutReached,
    });
  }, [user, loading, initialized, mounted, timeoutReached]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    console.log("UserInfo: Not mounted yet, showing loading spinner");
    return <LoadingSpinner size="sm" className="flex gap-2 items-center" />;
  }

  // Show loading spinner only if loading and timeout not reached
  if (loading && !timeoutReached) {
    console.log("UserInfo: Loading, showing loading spinner");
    return <LoadingSpinner size="sm" className="flex gap-2 items-center" />;
  }

  // If timeout reached, show login button as fallback
  if (timeoutReached && !initialized) {
    console.log("UserInfo: Timeout reached, showing login button as fallback");
    return (
      <Link href="/login" className="flex gap-2 items-center">
        <KeyRound />
        Login
      </Link>
    );
  }

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

  console.log(
    "UserInfo: Rendering with user:",
    user ? "logged in" : "not logged in"
  );

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
