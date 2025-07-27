'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const { user, isDarkMode, toggleDarkMode, setUser } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="ri-home-4-fill text-white"></i>
            </div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{fontFamily: 'Pacifico, serif'}}>
              RealEstate
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors cursor-pointer`}>
              Home
            </Link>
            <Link href="/properties" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors cursor-pointer`}>
              Properties
            </Link>
            <Link href="/blog" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors cursor-pointer`}>
              Blog
            </Link>
            <div className="relative group">
              <button className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors cursor-pointer flex items-center`}>
                Tools
                <i className="ri-arrow-down-s-line ml-1"></i>
              </button>
              <div className={`absolute top-full left-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}>
                <Link href="/tools/unit-converter" className={`block px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors cursor-pointer`}>
                  Unit Converter
                </Link>
                <Link href="/tools/emi-calculator" className={`block px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors cursor-pointer`}>
                  EMI Calculator
                </Link>
              </div>
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-yellow-500' : 'bg-gray-100 text-gray-700'} hover:opacity-80 transition-opacity cursor-pointer`}
            >
              <i className={`ri-${isDarkMode ? 'sun' : 'moon'}-line`}></i>
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className={`hidden md:block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.name}
                  </span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg`}
                  >
                    <Link href="/dashboard" className={`block px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors cursor-pointer`}>
                      Dashboard
                    </Link>
                    <Link href="/favorites" className={`block px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors cursor-pointer`}>
                      Favorites
                    </Link>
                    <Link href="/profile" className={`block px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors cursor-pointer`}>
                      Profile
                    </Link>
                    <hr className={`my-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                    <button
                      onClick={handleLogout}
                      className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-50'} transition-colors cursor-pointer`}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className={`px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors cursor-pointer whitespace-nowrap`}>
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}