import React, {useContext} from 'react'
import { signOut } from 'firebase/auth'
import {auth} from '../Components/firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function Top() {
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)
  return (
    <div className='h-20 border-b z-10 bg-black relative border-black flex '>
        <img src={data.user?.photoURL} width={60} height={50} className='mx-6 my-1 rounded-full'></img>
        <span className='my-8 text-xl capitalize text-orange-700'>{data.user?.displayName}</span>
        <button onClick={() => signOut(auth)} className='bg-blue-400 py-0.5 px-2 absolute right-16 hover:bg-blue-200 top-6 border border-black '>Logout</button>
    </div>
  )
}

export default Top