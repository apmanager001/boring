import React from 'react'
import useStore from '../../store/store'
const Account = () => {
  const user = useStore((state) => state.user);
  console.log(user)
  return (
    <div>
        Account
    </div>
  )
}

export default Account