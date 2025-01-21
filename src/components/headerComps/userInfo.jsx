'use client'
import React from 'react'
import Link from 'next/link'
import useStore from '../../app/store/store'
import { KeyRound, UserRound } from 'lucide-react'

const UserInfo = () => {
    const user = useStore((state) => state.user);

    return (
      <div>
        {user ? (
          <Link href="/account" className="flex gap-2 items-center">
            <UserRound />
            {user.username}
          </Link>
        ) : (
          <Link href="/login" className="flex gap-2 items-center">
            <KeyRound />
            Login
          </Link>
        )}
      </div>
    );
}

export default UserInfo