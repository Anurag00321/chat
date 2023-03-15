import React, { useState } from "react";
import Image from "../Assets/Image.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../Components/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from "firebase/firestore"
import {db} from '../Components/firebase';
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        
        (error) => {
          setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
             displayName,
             photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid),{
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              })
              await setDoc(doc(db, "userChats", res.user.uid), {})
              navigate("/")
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="flex">
      <div className="border-r w-2/5 bg-blue-200 h-screen"></div>
      <div className="m-auto">
        <div className="w-72 h-96 border border-black rounded">
          <h1 className="text-center text-2xl p-2">Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="displayName"
              className="border p-2 rounded border-black outline-none mx-6 my-2"
            />
            <input
              type="email"
              placeholder="email"
              className="border p-2 rounded border-black outline-none mx-6 my-2"
            />
            <input
              type="password"
              placeholder="password"
              className="border p-2 rounded border-black outline-none mx-6 my-2"
            />
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              className="border p-2 rounded border-black outline-none m-2"
            />
            <label htmlFor="file" className="flex px-4 py-2 cursor-pointer ">
              <img src={Image} width={30} height={30} className="mx-2" alt="" />
              <span>Add profile image</span>
            </label>
            <button className="mt-4 border border-black mx-24 bg-blue-400 px-2 py-1">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center">
            Already have an account?
            <button className="underline font-bold text-lg">
                <Link to='/login'>Log in</Link></button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
