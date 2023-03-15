import { async } from "@firebase/util";
import { collection, query, where, getDoc,getDocs, setDoc, updateDoc,doc, serverTimestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../Components/firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {dispatch} = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (u) =>{
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
   try{
    const res = await getDoc(doc(db, "chats", combinedId))
    if(!res.exists()){
        await setDoc(doc(db, "chats", combinedId),{messages: []})

        await updateDoc(doc(db, "userChats", currentUser.uid),{
            [combinedId+".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            },
            [combinedId+".date"]:serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", user.uid),{
            [combinedId+".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            },
            [combinedId+".date"]:serverTimestamp()
        })
    }
   }catch(err){}
   setUser(null)
   setUsername("")
  }
  return (
    <div>
      <div>
        <input
          className="p-2.5 md:mx-16 mx-8 my-4 outline-none border border-black rounded"
          type="text" autoComplete="true"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
        {err && <span>User not found</span>}
        {user && 
          <div className="flex p-2 hover:bg-gray-300 text-white" onClick={handleSelect}>
            <img className="rounded-full" width={45} height={45} src={user.photoURL} alt="" />
            <div>
              <span className="mx-4">{user.displayName}</span>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Search;
