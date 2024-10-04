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
import CartProvider from "./context/CartContext"
import Profile from "./pages/Profile"
import Dashboard from "./admin/pages/Dashboard"
import ProductManagement from "./admin/pages/ProductManagement"
import OrderMangement from "./admin/pages/OrderMangement"
import Users from "./admin/pages/Users"
import Settings from "./admin/pages/Settings"
import AdminLayout from "./admin/AdminLayout"


function App() {
  const location = useLocation();
   const noHeaderFooterPaths = ['/register','/login','/admin','/admin/dashboard','/admin/productmanage','/admin/ordermanage','/admin/users','/admin/settings',];

  return (
    <>
    <ProductProvider>
      <CartProvider>
         {!noHeaderFooterPaths.includes(location.pathname) && <Header />}
    <Routes>
      
      <Route exact path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/product" element={<ProductList />}/>
      <Route path="/product/:id" element={<ProductDetails />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/checkout" element={<Checkout />}/>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="productmanage" element={<ProductManagement />}/>
        <Route path="ordermanage" element={<OrderMangement />}/>
        <Route path="users" element={<Users />}/>
        <Route path="settings" element={<Settings />}/>
      </Route>
    </Routes>
    {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
      </CartProvider>
   
    </ProductProvider>
    
      
    </>
  )
}

export default App
