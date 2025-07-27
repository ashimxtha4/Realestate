
'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { offerSchema, contactSchema } from '@/lib/validationSchemas';

interface PropertyDetailProps {
  propertyId: string;
}

interface OfferFormData {
  amount: number;
  message?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function PropertyDetail({ propertyId }: PropertyDetailProps) {
  const { isDarkMode, user, toggleFavorite, favorites } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const router = useRouter();

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => api.getProperty(propertyId)
  });

  const {
    register: registerOffer,
    handleSubmit: handleOfferSubmit,
    formState: { errors: offerErrors, isValid: isOfferValid },
    reset: resetOffer
  } = useForm<OfferFormData>({
    resolver: joiResolver(offerSchema),
    mode: 'onChange'
  });

  const {
    register: registerContact,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactErrors, isValid: isContactValid },
    reset: resetContact
  } = useForm<ContactFormData>({
    resolver: joiResolver(contactSchema),
    mode: 'onChange'
  });

  const onOfferSubmit = async (data: OfferFormData) => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    try {
      await api.createOffer({
        propertyId: propertyId,
        buyerId: user.id,
        amount: data.amount,
        message: data.message || ''
      });
      setShowOfferModal(false);
      resetOffer();
    } catch (error) {
      console.error('Failed to submit offer:', error);
    }
  };

  const onContactSubmit = async (data: ContactFormData) => {
    try {
      console.log('Contact form submitted:', data);
      resetContact();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <i className="ri-error-warning-line mr-1"></i>
        {message}
      </p>
    );
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Property not found
          </h1>
          <Link href="/properties" className="text-blue-600 hover:text-blue-700 cursor-pointer">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors cursor-pointer`}>
                Home
              </Link>
            </li>
            <li>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </li>
            <li>
              <Link href="/properties" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors cursor-pointer`}>
                Properties
              </Link>
            </li>
            <li>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </li>
            <li className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {property.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={property.images[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
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
              
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden cursor-pointer ${
                      selectedImage === index ? 'ring-2 ring-blue-600' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Property ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}
            >
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {property.title}
              </h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 flex items-center`}>
                <i className="ri-map-pin-line mr-2"></i>
                {property.location}
              </p>
              
              <div className="text-3xl font-bold text-blue-600 mb-6">
                ${property.price.toLocaleString()}
                {property.type === 'rent' && <span className="text-lg text-gray-500">/month</span>}
              </div>
              
              <div className={`grid grid-cols-3 gap-4 mb-6 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div>
                  <i className="ri-hotel-bed-line text-2xl mb-2 block"></i>
                  <div className="text-sm">Bedrooms</div>
                  <div className="font-semibold">{property.bedrooms}</div>
                </div>
                <div>
                  <i className="ri-drop-line text-2xl mb-2 block"></i>
                  <div className="text-sm">Bathrooms</div>
                  <div className="font-semibold">{property.bathrooms}</div>
                </div>
                <div>
                  <i className="ri-expand-diagonal-line text-2xl mb-2 block"></i>
                  <div className="text-sm">Area</div>
                  <div className="font-semibold">{property.area} sqft</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowOfferModal(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  Make an Offer
                </button>
                
                <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium cursor-pointer whitespace-nowrap">
                  Contact Agent
                </button>
                
                {property.virtualTour && (
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap">
                    Virtual Tour
                  </button>
                )}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}
            >
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Contact Agent
              </h3>
              <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...registerContact('name')}
                    className={`w-full px-4 py-3 border ${
                      contactErrors.name ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <ErrorMessage message={contactErrors.name?.message} />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    {...registerContact('email')}
                    className={`w-full px-4 py-3 border ${
                      contactErrors.email ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <ErrorMessage message={contactErrors.email?.message} />
                </div>
                
                <div>
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    maxLength={1000}
                    {...registerContact('message')}
                    className={`w-full px-4 py-3 border ${
                      contactErrors.message ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                  />
                  <ErrorMessage message={contactErrors.message?.message} />
                </div>
                
                <button
                  type="submit"
                  disabled={!isContactValid}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Property Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}
        >
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Description
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-6`}>
            {property.description}
          </p>
          
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {property.amenities.map((amenity, index) => (
              <div key={index} className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <i className="ri-check-line text-green-500 mr-2"></i>
                {amenity}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full mx-4`}
          >
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Make an Offer
            </h3>
            <form onSubmit={handleOfferSubmit(onOfferSubmit)} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Offer Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter your offer amount"
                  {...registerOffer('amount', { valueAsNumber: true })}
                  className={`w-full px-4 py-3 border ${
                    offerErrors.amount ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                  } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <ErrorMessage message={offerErrors.amount?.message} />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Add a message to your offer..."
                  maxLength={500}
                  {...registerOffer('message')}
                  className={`w-full px-4 py-3 border ${
                    offerErrors.message ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                  } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                />
                <ErrorMessage message={offerErrors.message?.message} />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isOfferValid}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Submit Offer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
