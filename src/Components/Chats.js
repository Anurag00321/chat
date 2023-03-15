import { onSnapshot, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../Components/firebase";
import { ChatContext } from "../context/ChatContext";

function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="p-4 flex border-t w-96 hover:bg-gray-500 capitalize cursor-pointer border-b border-white"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img
            width={60}
            height={50}
            className="rounded-full"
            src={chat[1].userInfo.photoURL}
          />
          <div className="p-2">
            <h1 className="justify-start flex text-white text-lg">
              {chat[1].userInfo.displayName}
            </h1>
            <p className="justify-start flex text-white">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;
