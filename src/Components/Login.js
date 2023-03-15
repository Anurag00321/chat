import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../Components/firebase'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [err, setErr] = useState(false);
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      setErr(true);
    }}
  return (
    <div className="flex">
    <div className="border-r w-2/5 bg-blue-200 h-screen"></div>
    <div className="m-auto">
      <div className="w-80 h-96 border border-black rounded">
        <h1 className="text-center text-2xl p-2">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            className="border p-2 rounded border-black outline-none my-2 mx-6"
          />
          <input
            type="password"
            placeholder="password"
            className="border p-2 rounded border-black outline-none my-2 mx-6"
          />
        <button className='bg-blue-400 px-2 mt-4 mx-24 border border-black'>Login</button>
          
        </form>
        <p className="mt-6 text-center">
          Don't have an account?
          <button className="underline font-bold text-lg">
            <Link to='/register'>Register here</Link></button>
        </p>
      </div>
    </div>
  </div>
  )
}

export default Login