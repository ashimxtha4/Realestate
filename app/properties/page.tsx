'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function Properties() {
  const { isDarkMode, searchQuery, filters, setFilters, toggleFavorite, favorites } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties', filters, searchQuery],
    queryFn: () => api.getProperties({ ...filters, search: searchQuery })
  });

  const filteredProperties = properties.filter(property => {
    const matchesSearch = !searchQuery || 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filters.type === 'all' || property.type === filters.type;
    const matchesCategory = filters.category === 'all' || property.category === filters.category;
    const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice;
    const matchesBedrooms = filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms;
    const matchesBathrooms = filters.bathrooms === 0 || property.bathrooms >= filters.bathrooms;
    
    return matchesSearch && matchesType && matchesCategory && matchesPrice && matchesBedrooms && matchesBathrooms;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'area':
        return b.area - a.area;
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Properties
              </h1>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {sortedProperties.length} properties found
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-700'} rounded-lg hover:opacity-80 transition-opacity cursor-pointer`}
              >
                <i className="ri-filter-line"></i>
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area">Largest Area</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showFilters ? 1 : 0, x: showFilters ? 0 : -20 }}
            className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-6 rounded-lg space-y-6`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Filters
              </h3>
              
              {/* Property Type */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Property Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ type: e.target.value as any })}
                  className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                >
                  <option value="all">All Types</option>
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ category: e.target.value as any })}
                  className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                >
                  <option value="all">All Categories</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice || ''}
                    onChange={(e) => setFilters({ minPrice: Number(e.target.value) || 0 })}
                    className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice === 10000000 ? '' : filters.maxPrice}
                    onChange={(e) => setFilters({ maxPrice: Number(e.target.value) || 10000000 })}
                    className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Min Bedrooms
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ bedrooms: Number(e.target.value) })}
                  className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Min Bathrooms
                </label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => setFilters({ bathrooms: Number(e.target.value) })}
                  className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                </select>
              </div>

              <button
                onClick={() => setFilters({
                  type: 'all',
                  category: 'all',
                  minPrice: 0,
                  maxPrice: 10000000,
                  location: '',
                  bedrooms: 0,
                  bathrooms: 0,
                  amenities: []
                })}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>

          {/* Properties Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg h-96 animate-pulse`} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => toggleFavorite(property.id)}
                          className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all cursor-pointer"
                        >
                          <i className={`ri-heart-${favorites.includes(property.id) ? 'fill text-red-500' : 'line text-gray-700'}`}></i>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                        {property.title}
                      </h3>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 flex items-center`}>
                        <i className="ri-map-pin-line mr-2"></i>
                        {property.location}
                      </p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-2xl font-bold text-blue-600">
                          ${property.price.toLocaleString()}
                          {property.type === 'rent' && <span className="text-sm text-gray-500">/month</span>}
                        </div>
                      </div>
                      
                      <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                        <span className="flex items-center">
                          <i className="ri-hotel-bed-line mr-1"></i>
                          {property.bedrooms} Beds
                        </span>
                        <span className="flex items-center">
                          <i className="ri-drop-line mr-1"></i>
                          {property.bathrooms} Baths
                        </span>
                        <span className="flex items-center">
                          <i className="ri-expand-diagonal-line mr-1"></i>
                          {property.area} sqft
                        </span>
                      </div>
                      
                      <Link href={`/properties/${property.id}`} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap text-center block">
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {!isLoading && sortedProperties.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-search-line text-3xl text-gray-400"></i>
                </div>
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  No properties found
                </h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}