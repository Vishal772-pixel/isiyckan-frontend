import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Features from './components/Features'
import Button from "./components/Button"
import ProductListing from './Pages/ProductListing'
import ProductDetails from './Pages/ProductDetails'
import ShoppingPage from './Pages/ShoppingPage'
import HeroSection from './components/HeroSection'
// import Payment from './Pages/Payment'
 import Login from "./context/Login";
import Signup from "./context/Signup";
import Dashboard from "./Pages/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout"
import ViewItems from './Pages/ViewItems'
import OfficeFurniture from './Pages/OfficeFurniture'
import Home from './Pages/Home'
import HotelFurniture from './Pages/HotelFurniture'
import Pubs from './Pages/Pubs'
import HomeOffice from './Pages/HomeOffice'



import axios from "axios"

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <Features />
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
              {['ISO Certified', 'Award Winning', 'Eco-Friendly', 'Expert Support', '5-Star Rated'].map((item, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/office-furniture" element={<OfficeFurniture />} />
          <Route path="/hotel-furniture" element={<HotelFurniture/>} />
          <Route path="/home-office" element={<HomeOffice />} />
          <Route path="/pubs" element={<Pubs/>} />
          <Route path="/special-offers" element={<ShoppingPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/collections"element={<ViewItems/>}/>
                    {/* <Route path="" element={<Payment />} /> */}
         <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
  {/*}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />

     */}
      {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />     < */}
          <Route path="/dashboard" element={<Dashboard />} />
         
         
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}