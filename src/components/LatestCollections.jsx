import React, {  useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProdcutItem from './ProdcutItem'
import { useGetAllProductsQuery } from '../redux/features/products/productsManagementApi'

const LatestCollections = () => {
    
    const [latestProducts,setLatestProducts] =useState([]);
    const {data:productsData}=useGetAllProductsQuery(undefined)
    useEffect(()=>{
        setLatestProducts(productsData?.data?.slice(0,10))
    },[])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}></Title>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio atque illo eveniet porro natus voluptatum</p>
      </div>
      {/* latest products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts?.map((product)=>(
                <ProdcutItem product={product} key={product._id}></ProdcutItem>
            ))
        }
      </div>
    </div>
  )
}

export default LatestCollections
