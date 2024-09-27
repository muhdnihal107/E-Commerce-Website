import { Route, Routes, useLocation} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductList from "./pages/ProductList"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductProvider from "./context/ProductContext"


function App() {
  const location = useLocation();
   const noHeaderFooterPaths = ['/register','/login'];

  return (
    <>
    <ProductProvider>
    {!noHeaderFooterPaths.includes(location.pathname) && <Header />}
    <Routes>
      
      <Route exact path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/product" element={<ProductList />}/>
      <Route path="/product/:id" element={<ProductDetails />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/checkout" element={<Checkout />}/>
    
    </Routes>
    {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
    </ProductProvider>
    
      
    </>
  )
}

export default App
