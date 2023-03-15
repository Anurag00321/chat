import { Firestore, serverTimestamp } from "firebase/firestore";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message( {message} ) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])
  return (
    <>
      <div ref={ref} className=" m-4 py-2 px-3">
        <div className={`${message.senderId === currentUser.uid? 'flex flex-row-reverse items-end text-violet-100 font-sans text-end ' : 'items-start text-black'}`}>
        <div className="flex flex-col">
        {message.img && <img src={message.img} width={200} height={60} className="mx-4" alt="" />}
        <div className= "border border-violet-100 px-2 py-1 font-sans m-1 w-fit rounded-tr-lg">{message.text}</div>
        <span className="my-1">{message.date.toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
        </div>
        </div>
        </div>
    </>
  );
}

export default Message;
