import React from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'

function Home() {
  return (
    <div className='flex justify-center items-center'>
        <div className='border flex border-black h-screen w-screen'>
         
        <div className='border-r flex w-1/3  border-black'><Sidebar/></div>
        <div className='w-full max-h-screen bg-violet-500 relative'> <Chat/></div>
        </div>
    </div>
  )
}

export default Home