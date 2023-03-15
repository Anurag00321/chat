import React, { useContext, useState } from "react";
import Attach from "../Assets/Attach.png";
import Image from "../Assets/Image.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../Components/firebase";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { async } from "@firebase/util";
import { arrayUnion, serverTimestamp,doc, Timestamp, updateDoc } from "firebase/firestore";
import {v4 as uuid} from 'uuid'

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
          
        }
      );
    }else {
        await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now()
            })
        })
    }
    await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]:{
            text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
          })

    await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
            text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
    })      
    setText("")
    setImg(null)
  };
  return (
    <div className="">
      <div className="bg-white p-2 h-16 bottom-0 border-black inset-x-0 absolute rounded-tl border-t">
        <div className="flex">
          <input
            className="outline-none border border-black rounded w-2/3 p-2"
            type="text"
            placeholder="Say something"
            onChange={(e)=> setText(e.target.value)}
            value={text}
          />
          <div className="flex gap-4 px-4">
            <input type="file" style={{ display: "none" }} id="file" onChange={(e)=> setImg(e.target.files[0])}/>
            <label htmlFor="file" className="hover:bg-blue-600 cursor-pointer">
              <img src={Image} width={40} height={20} alt="" />
            </label>
            <button className="bg-blue-400 hover:bg-blue-200 px-6 border border-black" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
