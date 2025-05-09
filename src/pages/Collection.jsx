import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProdcutItem from '../components/ProdcutItem'

const Collection = () => {
  const {products,showSearch,search} =useContext(ShopContext)
  const [showFilter,setShowFilter] =useState(false)
  const [fiterProducts,setFilterProducts] =useState([]);
  const [category,setCategory] =useState([])
  const [subCategory,setSubCategory] =useState([])
  const [sortType,setSortType] =useState('relavent')

  // toggel category

const toggleCategory = (e) => {
  if (category.includes(e.target.value)) {
    setCategory(prev => prev.filter(item => item !== e.target.value));
  } else {
    setCategory(prev => [...prev, e.target.value]);
  }
};

// toggleSubCategory 
const toggleSubCategory = (e) => {
  if (subCategory.includes(e.target.value)) {
    setSubCategory(prev => prev.filter(item => item !== e.target.value));
  } else {
    setSubCategory(prev => [...prev, e.target.value]);
  }
};

// filter
  const applyFilter = () => {
    let productCopy = [...products]; 

    if(showSearch && search){
      productCopy =productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
  
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
  
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
  
    setFilterProducts(productCopy);
  };

  // sort product
  const sortProduct=()=>{
    let filterProductCopy = [...fiterProducts]

    switch(sortType){
      case 'low-high':
        setFilterProducts(filterProductCopy.sort((a,b)=>a.price-b.price))
        break
      case 'high-low':
        setFilterProducts(filterProductCopy.sort((a,b)=>b.price-a.price))
        break
      
      default:
          applyFilter();
          break
    }
  }
  
  // Apply filter
  useEffect(() => {
    applyFilter();
    
  }, [products,category, subCategory,search,showSearch]);

  // apply sorting
  useEffect(() => {
    sortProduct()    
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS <img className={`h-3 sm:hidden ${showFilter?"rotate-90":""}`} src={assets.dropdown_icon} alt="" /></p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?"":'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Women'} onChange={toggleCategory}/> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>
      {/* sub category filter */}
      <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter?"":'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* right side ui */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"}></Title>
          {/* products sorting */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
            <option value={'relavant'}>Sort by: Relavant</option>
            <option value={'low-high'}>Sort by: Low to High price</option>
            <option value={'high-low'}>Sort by: High to Low price</option>
          </select>
        </div>
        {/* products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                fiterProducts.map((item)=>(
                  <ProdcutItem product={item} key={item._id}></ProdcutItem>
                ))
              }
        </div>
      </div>
    </div>
  )
}

export default Collection
