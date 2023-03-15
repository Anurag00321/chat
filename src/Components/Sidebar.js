import React from 'react'
import Chats from './Chats'
import Search from './Search'

function Sidebar() {
  return (
    <div className='bg-black border-r overflow-y-auto overflow-x-hidden'>
        <Search/>
        <Chats/>
    </div>
  )
}

export default Sidebar