import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='pt-20'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt40 text-sm'>
        <div>
            <img className='mb-5 w-32' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, nobis aliquam molestias quas quod autem iusto voluptates excepturi itaque quae, neque, illo illum laborum vitae adipisci! At rem explicabo voluptate.</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5 uppercase'>company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>48784748949</li>
                <li>myoffit@gmail.com</li>
               
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>  &copy; {new Date().getFullYear()} myoffit.com - All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
