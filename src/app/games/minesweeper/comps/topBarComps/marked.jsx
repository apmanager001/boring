import React from 'react'

const Marked = ({marked}) => {
  return (
    <div className='flex items-center'>
      Flagged Squares: <div className='font-extrabold ml-4'>{marked}</div>
    </div>
  )
}

export default Marked