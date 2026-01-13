import React from 'react'

function Nav() {
  return (
    <div>
        <div className='h-10 bg-blue-400 grid grid-cols-4'>
            <div></div>
            <div className='grid col-span-3 bg-red-400'></div>
        </div>
    </div>
  )
}

export default Nav