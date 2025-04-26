'use client'
import React, {useState} from 'react'
import { User, Cog, Fingerprint } from "lucide-react";
import Link from 'next/link';
import GoogleSignout from './googleSignout';
import UserInfo from './userInfo';

const GoogleSignin = () => {
  const [googleUser, setGoogleUser] = useState(true);

  // useEffect(() => {
  //   // Fetch authentication status from backend
  //   const fetchAuthStatus = async () => {
  //     try {
  //       const response = await fetch("/api/auth/status"); // Replace with your actual API endpoint
  //       const data = await response.json();
  //       setGoogleUser(data.user); // Assume the backend sends `{ user: null }` when not authenticated
  //     } catch (error) {
  //       console.error("Error fetching authentication status:", error);
  //       setGoogleUser(null);
  //     }
  //   };

  //   fetchAuthStatus();
  // }, []);
  return googleUser ? (
    <details>
    <summary>
        <User />
        Placeholder
    </summary>
    <ul className="rounded-t-none p-2 text-center bg-base-300 z-50">
        <li>
        <Link href={`/profile/placeholder`} className="text-center flex justify-center">
            <Fingerprint />
            Account
        </Link>
        </li>
        <li>
        <Link
            href={`/settings`}
            className="text-center flex justify-center"
        >
            <Cog />
            Settings
        </Link>
        </li>
        <li>
        <GoogleSignout />
        </li>
    </ul>
    </details>
  ) : (
    <UserInfo />
  );
}

export default GoogleSignin