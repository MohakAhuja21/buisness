import React from 'react'
import Navbar from './Navbar'
import Products from './Products'

function Home() {
  return (
    // div here is used to bind these components
    <div>
    <Navbar/>
    <Products/>
    </div>
  )
}

export default Home