import React from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestCollections></LatestCollections>
      <BestSeller></BestSeller>
      <Policy></Policy>
      <NewsLetterBox></NewsLetterBox>
    </div>
  )
}

export default Home
