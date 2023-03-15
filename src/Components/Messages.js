import { onSnapshot } from 'firebase/firestore'
import {doc} from 'firebase/firestore';
import {db} from '../Components/firebase';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import Message from './Message'

function Messages() {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'chats',data.chatId), (doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        })

        return()=>{
            unsub()
        }
    },[data.chatId])

    console.log(messages)
  return (
    <div className='absolute right-0 top-12 px-4 py-2 mt-8 w-full h-4/5 overflow-y-scroll'>
        {messages.map((m)=>(
            <Message message={m} key={m.id}/>
        ))}
        </div>
  )
}

export default Messages