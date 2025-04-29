// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // Navigation items - customize this list as needed
  const navItems = [
    { name: "Converter", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: "Create", path: "/create" },
    // Add more navigation items here as needed
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md z-10 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
        <Link to="/" className="text-emerald-400 font-bold text-xl">
          Text Code Converter
        </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 text-gray-200">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav>
              <ul className="flex flex-col space-y-3 text-gray-200">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path} 
                      className="block py-2 px-2 hover:bg-emerald-800/20 hover:text-emerald-400 rounded transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;