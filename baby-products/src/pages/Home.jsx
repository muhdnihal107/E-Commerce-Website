import React from 'react'
import baby1img from '../assets/home-baby-img.png'

const Home = () => {
  return (
    <div className='home'>
      <div className='home-head-con'>
        <div className='home-text1'><p>Flat 30% Off + Cashback!</p></div>
        <div className='home-text2'>
          <h1>Baby Essential</h1>
          <h1>Fashion and Nursery</h1>
          </div>
        <div className='home-text3'><p>Fermentum, cursus ultrices porttitor tincidunt suscipit quam facilisis sit massa pellentesque mi quis elit elementum tristique urna.

* Enim cras quam et nullam risus nec tincidunt mattis nunc.</p></div>
        <div className='home-btn'><button>Shop Now</button></div>
      </div>
      <div className='home-img-con'>
        <img src={baby1img} alt="" />
      </div>
    </div>
  )
}

export default Home