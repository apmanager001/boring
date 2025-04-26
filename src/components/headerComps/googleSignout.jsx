'use client'
import React from 'react'
import { LogOut } from 'lucide-react';
// import { signOut } from "next-auth/react";

const GoogleSignout = () => {
    

  return (
    <button
      className="flex justify-between gap-2 hover:bg-red-500 hover:text-white transition-all"
      onClick={() => signOut()}
      aria-label="Sign out of your account"
    >
      <LogOut />
      Signout
    </button>
  );
}

export default GoogleSignout