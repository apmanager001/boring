'use client'
import React from 'react'
import { LogOut } from 'lucide-react';
import { signOut } from "next-auth/react";

const GoogleSignout = () => {
    

  return (
    <li>
      <button
        className="flex items-center gap-2 hover:text-red-500 transition-all"
        onClick={() => signOut()}
        aria-label="Sign out of your account"
      >
        <LogOut />
        Sign Out
      </button>
    </li>
  );
}

export default GoogleSignout