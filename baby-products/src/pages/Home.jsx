import React from 'react'
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



<div className="bg-gray-100 font-sans min-h-screen">
  {/* Hero Section */}
  <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex items-center">
  <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
    <div className="md:w-1/2">
      <h1 className="text-5xl font-bold mb-6 animate-fade-in">Welcome to BabyStore</h1>
      <p className="text-xl mb-8 animate-fade-in">Get the best deals on baby products today!</p>
      <a
        href="/product"
        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition duration-300 animate-bounce"
      >
        <Link to={'/product'}>
        Shop Now
        </Link>

      </a>
    </div>
    <div className="md:w-1/2 mt-10 md:mt-0">
      <img
        src="https://m.media-amazon.com/images/I/41HYUZuHEwL._SX425_.jpg"
        alt="Baby Products"
        className="w-full h-96 object-cover rounded-lg shadow-2xl transform hover:scale-105 transition duration-300"
      />
    </div>
  </div>
</section>

  {/* Categories Section */}
  <section className="container mx-auto px-6 py-16">
    <h2 className="text-3xl font-bold text-center mb-12">Shop by Categories</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
        <img
          src="https://i.pinimg.com/736x/2c/22/51/2c2251de93edf75669823a3af32f9381.jpg"
          alt="Category 1"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Category 1</h3>
          <p className="text-gray-600">Explore our collection of baby clothes.</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
        <img
          src="https://i.pinimg.com/736x/26/2c/dc/262cdc1876dd3647169a460638c7cb99.jpg"
          alt="Category 2"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Category 2</h3>
          <p className="text-gray-600">Find the best toys for your little ones.</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
        <img
          src="https://i.pinimg.com/736x/b8/6a/49/b86a496be7cb8f71e0ae42d4b5590b8a.jpg"
          alt="Category 3"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Category 3</h3>
          <p className="text-gray-600">Discover essential baby care products.</p>
        </div>
      </div>
    </div>
  </section>

  {/* Offer Section */}
  <section className="bg-blue-700 text-white py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Exclusive Offers</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
          <img
            src="https://i.pinimg.com/736x/72/e3/f5/72e3f54aecd54093acca76f3ca99f0f4.jpg"
            alt="Offer 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Offer 1</h3>
            <p className="text-gray-600">Get 20% off on selected items.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
          <img
            src="https://i.pinimg.com/736x/a5/88/d2/a588d2d108eda1d58768b86c87316fd2.jpg"
            alt="Offer 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Offer 2</h3>
            <p className="text-gray-600">Buy one, get one free!</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
          <img
            src="https://i.pinimg.com/736x/3e/2a/39/3e2a39c2bfc295d8fc4e29fffc0ef165.jpg"
            alt="Offer 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Offer 3</h3>
            <p className="text-gray-600">Free shipping on orders above $50.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-gray-800 text-white py-12">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">BabyStore</h3>
        <p className="text-gray-400">Your one-stop shop for baby products.</p>
        <p className="text-gray-400 mt-2">123 Fifth Ave, New York, NY 12004.</p>
        <p className="text-gray-400">+1 123 456 78 90</p>
        <p className="text-gray-400">mail@example.com</p>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4">Quick Links</h4>
        <nav className="space-y-2">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">FAQs</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
        </nav>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Instagram</a>
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