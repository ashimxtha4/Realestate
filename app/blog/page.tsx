
'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export default function Blog() {
  const { isDarkMode } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'market-trends', 'investment-tips', 'buying-guide', 'selling-guide', 'legal-advice'];

  const blogPosts = [
    {
      id: 1,
      title: "Real Estate Market Trends 2024: What Buyers and Sellers Need to Know",
      excerpt: "Explore the latest market trends, pricing patterns, and forecasts that will shape the real estate landscape in 2024.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "market-trends",
      readTime: "8 min read",
      image: "https://readdy.ai/api/search-image?query=Real%20estate%20market%20analysis%20with%20charts%20and%20graphs%2C%20modern%20office%20setting%2C%20professional%20real%20estate%20analytics%2C%20market%20data%20visualization&width=600&height=400&seq=blog-market-trends&orientation=landscape",
      featured: true
    },
    {
      id: 2,
      title: "First-Time Home Buyer's Complete Guide: From Search to Closing",
      excerpt: "Everything you need to know about buying your first home, including financing options, inspection tips, and closing processes.",
      author: "Michael Chen",
      date: "March 12, 2024",
      category: "buying-guide",
      readTime: "12 min read",
      image: "https://readdy.ai/api/search-image?query=Happy%20first-time%20home%20buyers%20holding%20keys%20in%20front%20of%20new%20house%2C%20residential%20property%2C%20celebration%20moment%2C%20American%20dream&width=600&height=400&seq=blog-first-time-buyer&orientation=landscape"
    },
    {
      id: 3,
      title: "Real Estate Investment Strategies for Building Wealth",
      excerpt: "Discover proven investment strategies, from rental properties to REITs, that can help you build long-term wealth through real estate.",
      author: "David Rodriguez",
      date: "March 10, 2024",
      category: "investment-tips",
      readTime: "10 min read",
      image: "https://readdy.ai/api/search-image?query=Real%20estate%20investment%20portfolio%20with%20multiple%20properties%2C%20investment%20analytics%2C%20wealth%20building%20concept%2C%20financial%20growth&width=600&height=400&seq=blog-investment-strategy&orientation=landscape"
    },
    {
      id: 4,
      title: "How to Price Your Home Right: A Seller's Guide to Market Value",
      excerpt: "Learn the key factors that determine home value and how to price your property competitively in today's market.",
      author: "Emma Thompson",
      date: "March 8, 2024",
      category: "selling-guide",
      readTime: "7 min read",
      image: "https://readdy.ai/api/search-image?query=Home%20valuation%20process%20with%20real%20estate%20appraiser%2C%20property%20assessment%2C%20market%20value%20determination%2C%20professional%20evaluation&width=600&height=400&seq=blog-home-pricing&orientation=landscape"
    },
    {
      id: 5,
      title: "Understanding Real Estate Contracts: Legal Terms Every Buyer Should Know",
      excerpt: "Navigate the complex world of real estate contracts with confidence. Learn about key terms, clauses, and legal protections.",
      author: "James Wilson",
      date: "March 5, 2024",
      category: "legal-advice",
      readTime: "9 min read",
      image: "https://readdy.ai/api/search-image?query=Real%20estate%20contract%20signing%20with%20legal%20documents%2C%20professional%20meeting%2C%20property%20law%20consultation%2C%20legal%20paperwork&width=600&height=400&seq=blog-legal-contracts&orientation=landscape"
    },
    {
      id: 6,
      title: "Top 10 Home Staging Tips to Sell Your Property Faster",
      excerpt: "Transform your home into a buyer's dream with these professional staging tips that can help you sell faster and for more money.",
      author: "Lisa Parker",
      date: "March 3, 2024",
      category: "selling-guide",
      readTime: "6 min read",
      image: "https://readdy.ai/api/search-image?query=Beautifully%20staged%20home%20interior%20with%20modern%20furniture%2C%20professional%20home%20staging%2C%20attractive%20property%20presentation%2C%20interior%20design&width=600&height=400&seq=blog-home-staging&orientation=landscape"
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Real Estate Insights
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Stay informed with the latest trends, tips, and insights from real estate experts
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className={`ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm capitalize`}>
                      {featuredPost.category.replace('-', ' ')}
                    </span>
                  </div>
                  <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    {featuredPost.title}
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        By {featuredPost.author}
                      </span>
                      <span className={`mx-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {featuredPost.date}
                      </span>
                      <span className={`mx-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Link href={`/blog/${featuredPost.id}`} className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                      Read More →
                    </Link>
                  </div>
                </div>
                <div className="h-64 lg:h-full">
                  <img 
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white' 
                    : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                }`}
              >
                {category === 'all' ? 'All Posts' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(post => !post.featured).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} px-3 py-1 rounded-full text-sm capitalize`}>
                    {post.category.replace('-', ' ')}
                  </span>
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3 line-clamp-2`}>
                  {post.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3`}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>By {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {post.readTime}
                  </span>
                </div>
                <div className="mt-4">
                  <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mt-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-8 text-center`}
        >
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Stay Updated with Real Estate News
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Get the latest market insights, investment tips, and property trends delivered to your inbox
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.section>
      </div>
      
      <Footer />
    </div>
  );
}
