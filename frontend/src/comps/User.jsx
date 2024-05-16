/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Avatar from 'react-avatar'

const User = ({userName,id,firstName}) => {
    
  return (
    <div className='p-2 flex items-center justify-between relative'>
        <div className='flex gap-3 items-center'>
            <Avatar
            name={userName}
            round={true}
            size='50px'
            className='bg-slate-200 cursor-pointer'
            />

            <p className='font-semibold'>{userName.toUpperCase()}</p>
        </div>

        <button className='py-2 px-4 bg-stone-600 rounded-sm'>Send Money</button>
    </div>
  )
}

export default User
