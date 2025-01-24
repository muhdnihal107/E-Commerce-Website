import React from 'react'
import baby1img from '../assets/home-baby-img.png'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
    
    {/* <div className='home'>
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
    </div> */}



<div className="bg-gray-100 font-sans">
      {/* Header */}
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto flex items-center py-20">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to BabyStore</h1>
            <p className="text-lg mb-6">Get the best deals on baby products today!</p>
            <a
              className="bg-white text-blue-600 px-4 py-2 rounded font-semibold"
            >
              <Link to='/product'>
              Shop Now
              </Link>
            </a>
          </div>
          <img
            src="https://i.pinimg.com/736x/d9/00/62/d9006282b3eae494810f39cdd71a390a.jpg"
            alt="Baby Products"
            className="w-1/4 h-85 ml-auto"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Categories</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-4">
            <img
              src={"https://i.pinimg.com/736x/2c/22/51/2c2251de93edf75669823a3af32f9381.jpg"}
              alt="Category 1"
              className="w-full rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700">Category 1</h3>
          </div>
          <div className="bg-white rounded shadow p-4">
            <img
              src={"https://i.pinimg.com/736x/26/2c/dc/262cdc1876dd3647169a460638c7cb99.jpg"}
              alt="Category 2"
              className="w-full rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700">Category 2</h3>
          </div>
          <div className="bg-white rounded shadow p-4">
            <img
              src={"https://i.pinimg.com/736x/b8/6a/49/b86a496be7cb8f71e0ae42d4b5590b8a.jpg"}
              alt="Category 3"
              className="w-90 rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700">Category 3</h3>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="bg-blue-700 text-white py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Exclusive Offers</h2>
          <div className="flex space-x-4 overflow-x-scroll">
            <img
              src={"https://i.pinimg.com/736x/72/e3/f5/72e3f54aecd54093acca76f3ca99f0f4.jpg"}
              alt="Offer 1"
              className="w-1/3 h-50 rounded shadow"
            />
            <img
              src={"https://i.pinimg.com/736x/a5/88/d2/a588d2d108eda1d58768b86c87316fd2.jpg"}
              alt="Offer 2"
              className="w-1/3 h-50 rounded shadow"
            />
            <img
              src={"https://i.pinimg.com/736x/3e/2a/39/3e2a39c2bfc295d8fc4e29fffc0ef165.jpg"}
              alt="Offer 3"
              className="w-1/3 h-50 rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex justify-between">
          <div>
            <h3 className="text-lg font-bold">BabyStore</h3>
            <p className="text-sm">Your one-stop shop for baby products.</p>
            <p className="text-sm">123 Fifth Ave, New</p>
            <p className="text-sm">York, NY 12004.</p>
            <p className="text-sm">+1 123 456 78 90</p>
            <p className="text-sm">mail@example.com</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#" className="text-gray-400 hover:text-white">About Us</a>
              <a href="#" className="text-gray-400 hover:text-white">FAQs</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </nav>
          </div>
          <div>
            <h4 className="text-lg font-bold">Follow Us</h4>
            <div className="space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>

    <Footer />
    </>
  )
}

export default Home