import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/features/auth/authApi'
import { useAddUserMutation } from '../redux/features/users/userManagement'
import { toast } from 'sonner'
import { verifyToken } from '../utils/verifyToken'
import { setUser } from '../redux/features/auth/authSlice'
import { useAppDispatch } from '../redux/hooks'

const SignUp = () => {
  const navigate =useNavigate();
  const [showPassword,setShowPassword]=useState('')
  const [name,setName] =useState('')
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [error,setError]=useState('')
  const [login] = useLoginMutation();
  const [addUser]=useAddUserMutation();
  const dispatch = useAppDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    const signupToastId = toast.loading('Signing up...');
   
  
    try {
      // Prepare FormData for signup
      const userInfo = { name, email, password };
      const formData = new FormData();
      formData.append('data', JSON.stringify(userInfo));
  
      // 1. Signup request
      await addUser(formData).unwrap();
      toast.success('Signup successful!', { id: signupToastId, duration: 2000 });
  
      // 2. After signup success, login request
      const loginToastId = toast.loading('Logging in...');
      const loginInfo = { email, password };
      const loginRes = await login(loginInfo).unwrap();
  
      // 3. Process login token
      const user = verifyToken(loginRes.data.accessToken);
      dispatch(setUser({ user, token: loginRes.data.accessToken }));
  
      toast.success('Logged in successfully!', { id: loginToastId, duration: 2000 });
  
      // 4. Navigate depending on role
      if (user?.role === 'superAdmin' || user?.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/collections');
      }
    } catch (error) {
      setError(error.data.errorSources[0].message)
      toast.error('Signup or Login failed. Try again!', { id: signupToastId });
    }
  };
  
  

  return (
    <form onSubmit={handleSignup} className='flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 gap-4 text-gray-800'>
    <div className='inline-flex items-center gap-2 mb-2 mt-10'>
      <p className='prata-regular text-3xl'>Sign Up</p>
      <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
    </div>
    <input onChange={(e)=>setName(e.target.value)} className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Name' required />
    <input onChange={(e)=>setEmail(e.target.value)}  className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' required />
    <div className="relative w-full">
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 rounded"
        type={showPassword ? "text" : "password"} // 👈 Dynamic type
        placeholder="Password"
        required
      />

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
    {error && (
        <div className="w-full text-red-600 text-sm">
          {error}
        </div>
      )}
    <div className='w-full flex justify-between text-sm mt-[-8px]'>
      <p>Have an account? <Link className='text-blue-800 font-bold' to={'/login'}>Log In</Link></p>
    </div>
    <button className='bg-black text-white font-light px-8 py-2 mt4'>Sign Up</button>



 </form>
  )
}

export default SignUp
