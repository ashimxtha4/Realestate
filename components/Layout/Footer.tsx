'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';

export default function Footer() {
  const { isDarkMode } = useStore();

  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-home-4-fill text-white"></i>
              </div>
              <span className="text-2xl font-bold" style={{fontFamily: 'Pacifico, serif'}}>
                RealEstate
              </span>
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Find your perfect home with our comprehensive real estate platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors cursor-pointer`}>
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors cursor-pointer`}>
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors cursor-pointer`}>
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors cursor-pointer`}>
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors cursor-pointer`}>Home</Link></li>
              <li><Link href="/properties" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors cursor-pointer`}>Properties</Link></li>
              <li><Link href="/blog" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors cursor-pointer`}>Blog</Link></li>
              <li><Link href="/about" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors cursor-pointer`}>About</Link></li>
              <li><Link href="/contact" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors cursor-pointer`}>Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Buy Property</span></li>
              <li><span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rent Property</span></li>
              <li><span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Property Management</span></li>
              <li><span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Real Estate Investment</span></li>
              <li><span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Property Valuation</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                <i className="ri-mail-line mr-2"></i>
                info@realestate.com
              </p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                <i className="ri-phone-line mr-2"></i>
                +1 (555) 123-4567
              </p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                <i className="ri-map-pin-line mr-2"></i>
                123 Real Estate St, City, State 12345
              </p>
            </div>
          </div>
        </div>

        <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} mt-8 pt-8 text-center`}>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; 2024 RealEstate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}