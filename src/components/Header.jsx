import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import Button from './Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);  // If token exists, user is logged in
  }, []);

  // Sign out function
  const handleSignOut = () => {
    localStorage.removeItem("accessToken"); // Remove token
    setIsLoggedIn(false); // Update state
    navigate("/login"); // Redirect to login
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/assets/logo.png"
              alt="IsIyCkan Design Logo"
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-gray-900">
              IsIyCkan
            </span>
          </Link>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/office-furniture" className="text-secondary-600 hover:text-secondary-900 transition-colors">Office Furniture</Link>
            <Link to="/hotel-furniture" className="text-secondary-600 hover:text-secondary-900 transition-colors">Hotel Furniture</Link>
            <Link to="/home-office" className="text-secondary-600 hover:text-secondary-900 transition-colors">Home Office</Link>
            <Link to="/pubs" className="text-secondary-600 hover:text-secondary-900 transition-colors">Restaurant</Link>
            <Link to="/special-offers" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">Special Offers</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              // If logged in, show Sign Out button
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            ) : (
              // If not logged in, show Login and Register
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </Link>
              </>
            )}
            <Link to="/cart" className="relative p-2 text-secondary-600 hover:text-secondary-900 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-2 p-4 md:hidden"
              >
                <nav className="flex flex-col space-y-4">
                  <button className="text-secondary-600 hover:text-secondary-900 transition-colors" onClick={() => { setIsMenuOpen(false); navigate('/office-furniture'); }}>Office Furniture</button>
                  <button className="text-secondary-600 hover:text-secondary-900 transition-colors" onClick={() => { setIsMenuOpen(false); navigate('/hotel-furniture'); }}>Hotel Furniture</button>
                  <button className="text-secondary-600 hover:text-secondary-900 transition-colors" onClick={() => { setIsMenuOpen(false); navigate('/home-office'); }}>Home Office</button>
                  <button className="text-secondary-600 hover:text-secondary-900 transition-colors" onClick={() => { setIsMenuOpen(false); navigate('/pubs'); }}>Pubs</button>
                  <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors" onClick={() => { setIsMenuOpen(false); navigate('/special-offers'); }}>Special Offers</button>
                  <hr className="my-2" />
                  {isLoggedIn ? (
                    <button className="w-full justify-start text-red-600 hover:text-red-800" onClick={handleSignOut}>
                      <LogOut className="h-5 w-5 mr-2 inline-block" /> Sign Out
                    </button>
                  ) : (
                    <>
                      <button className="w-full justify-start" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>Login</button>
                      <button className="w-full justify-start" onClick={() => { setIsMenuOpen(false); navigate('/register'); }}>Register</button>
                    </>
                  )}
                  <button className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors" onClick={() => { setIsMenuOpen(false); navigate('/cart'); }}>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart (0)</span>
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
