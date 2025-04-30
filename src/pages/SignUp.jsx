import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <form className='flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 gap-4 text-gray-800'>
    <div className='inline-flex items-center gap-2 mb-2 mt-10'>
      <p className='prata-regular text-3xl'>Sign Up</p>
      <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
    </div>
    <input className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Name' required />
    <input className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' required />
    <input className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='Password' required/>

    <div className='w-full flex justify-between text-sm mt-[-8px]'>
      <p>Have an account? <Link className='text-blue-800 font-bold' to={'/login'}>Log In</Link></p>
    </div>
    <button className='bg-black text-white font-light px-8 py-2 mt4'>Sign Up</button>



 </form>
  )
}

export default SignUp
