import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import SignUp from "./pages/SignUp"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/collections" element={<Collection></Collection>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/product/:productId" element={<Product></Product>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/place-order" element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path="/orders" element={<Orders></Orders>}></Route>
        
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
