
'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { propertySchema } from '@/lib/validationSchemas';

interface PropertyFormData {
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'commercial';
  description: string;
  amenities: string[];
  images: string[];
  virtualTour?: string;
}

export default function AddProperty() {
  const { isDarkMode, user, addProperty } = useStore();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [availableAmenities] = useState([
    'Gym', 'Pool', 'Parking', 'Security', 'Elevator', 'Balcony',
    'Garden', 'Fireplace', 'Air Conditioning', 'Heating', 'Laundry',
    'Storage', 'Pet Friendly', 'Furnished', 'Internet', 'Cable TV'
  ]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger
  } = useForm<PropertyFormData>({
    resolver: joiResolver(propertySchema),
    defaultValues: {
      title: '',
      price: 0,
      location: '',
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      type: 'sale',
      category: 'apartment',
      description: '',
      amenities: [],
      images: ['', '', ''],
      virtualTour: ''
    },
    mode: 'onChange'
  });

  const watchedImages = watch('images');

  // Redirect if not authenticated
  if (!user) {
    router.push('/login');
    return null;
  }

  const createPropertyMutation = useMutation({
    mutationFn: api.createProperty,
    onSuccess: (data) => {
      addProperty(data);
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Failed to create property:', error);
    }
  });

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...watchedImages];
    newImages[index] = value;
    setValue('images', newImages);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];
    
    setSelectedAmenities(newAmenities);
    setValue('amenities', newAmenities);
  };

  const onSubmit = (data: PropertyFormData) => {
    const propertyData = {
      ...data,
      amenities: selectedAmenities,
      ownerId: user.id,
      createdAt: new Date().toISOString(),
      featured: false,
      images: data.images.filter(img => img.trim() !== '')
    };

    createPropertyMutation.mutate(propertyData);
  };

  const steps = [
    { id: 1, title: 'Basic Info', icon: 'ri-home-line' },
    { id: 2, title: 'Details', icon: 'ri-settings-line' },
    { id: 3, title: 'Images', icon: 'ri-image-line' },
    { id: 4, title: 'Amenities', icon: 'ri-star-line' }
  ];

  const nextStep = async () => {
    const fieldsToValidate = getCurrentStepFields();
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentStepFields = (): (keyof PropertyFormData)[] => {
    switch (currentStep) {
      case 1:
        return ['title', 'price', 'location', 'type', 'category', 'area', 'description'];
      case 2:
        return ['bedrooms', 'bathrooms', 'virtualTour'];
      case 3:
        return ['images'];
      case 4:
        return ['amenities'];
      default:
        return [];
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Add New Property
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            List your property for sale or rent
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : `${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`
                }`}>
                  <i className={step.icon}></i>
                </div>
                <div className={`ml-3 ${currentStep >= step.id ? 'text-blue-600' : `${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}`}>
                  <div className="font-medium">{step.title}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id 
                      ? 'bg-blue-600' 
                      : `${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}
        >
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Property Title *
                  </label>
                  <input
                    type="text"
                    {...register('title')}
                    className={`w-full px-4 py-3 border ${
                      errors.title ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter property title"
                  />
                  <ErrorMessage message={errors.title?.message} />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Price *
                  </label>
                  <input
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                    className={`w-full px-4 py-3 border ${
                      errors.price ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter price"
                  />
                  <ErrorMessage message={errors.price?.message} />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Location *
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    className={`w-full px-4 py-3 border ${
                      errors.location ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter location"
                  />
                  <ErrorMessage message={errors.location?.message} />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Property Type *
                  </label>
                  <select
                    {...register('type')}
                    className={`w-full px-4 py-3 border ${
                      errors.type ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                  <ErrorMessage message={errors.type?.message} />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Category *
                  </label>
                  <select
                    {...register('category')}
                    className={`w-full px-4 py-3 border ${
                      errors.category ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="commercial">Commercial</option>
                  </select>
                  <ErrorMessage message={errors.category?.message} />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Area (sqft) *
                  </label>
                  <input
                    type="number"
                    {...register('area', { valueAsNumber: true })}
                    className={`w-full px-4 py-3 border ${
                      errors.area ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter area in square feet"
                  />
                  <ErrorMessage message={errors.area?.message} />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Description *
                </label>
                <textarea
                  rows={4}
                  {...register('description')}
                  maxLength={1000}
                  className={`w-full px-4 py-3 border ${
                    errors.description ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                  } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                  placeholder="Describe your property..."
                />
                <ErrorMessage message={errors.description?.message} />
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Property Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Bedrooms *
                  </label>
                  <select
                    {...register('bedrooms', { valueAsNumber: true })}
                    className={`w-full px-4 py-3 border ${
                      errors.bedrooms ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                  >
                    <option value={1}>1 Bedroom</option>
                    <option value={2}>2 Bedrooms</option>
                    <option value={3}>3 Bedrooms</option>
                    <option value={4}>4 Bedrooms</option>
                    <option value={5}>5+ Bedrooms</option>
                  </select>
                  <ErrorMessage message={errors.bedrooms?.message} />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Bathrooms *
                  </label>
                  <select
                    {...register('bathrooms', { valueAsNumber: true })}
                    className={`w-full px-4 py-3 border ${
                      errors.bathrooms ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                  >
                    <option value={1}>1 Bathroom</option>
                    <option value={2}>2 Bathrooms</option>
                    <option value={3}>3 Bathrooms</option>
                    <option value={4}>4+ Bathrooms</option>
                  </select>
                  <ErrorMessage message={errors.bathrooms?.message} />
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Virtual Tour URL (Optional)
                  </label>
                  <input
                    type="url"
                    {...register('virtualTour')}
                    className={`w-full px-4 py-3 border ${
                      errors.virtualTour ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="https://example.com/virtual-tour"
                  />
                  <ErrorMessage message={errors.virtualTour?.message} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Images */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Property Images
              </h2>
              
              <div className="space-y-4">
                {watchedImages.map((image, index) => (
                  <div key={index}>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Image {index + 1} URL {index === 0 ? '*' : '(Optional)'}
                    </label>
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className={`w-full px-4 py-3 border ${
                        errors.images?.[index] ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                      } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="https://example.com/image.jpg"
                    />
                    <ErrorMessage message={errors.images?.[index]?.message} />
                  </div>
                ))}
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg`}>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-800'}`}>
                  <i className="ri-information-line mr-2"></i>
                  You can use image URLs from any hosting service. Make sure the images are publicly accessible and show your property clearly.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Amenities */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Amenities
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableAmenities.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors cursor-pointer ${
                      selectedAmenities.includes(amenity)
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : `border-gray-300 ${isDarkMode ? 'text-gray-300 hover:border-gray-600' : 'text-gray-700 hover:border-gray-400'}`
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <i className="ri-information-line mr-2"></i>
                  Select all amenities that apply to your property. This helps potential buyers/renters find what they're looking for.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`w-2 h-2 rounded-full ${
                    currentStep === step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={createPropertyMutation.isPending || !isValid}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {createPropertyMutation.isPending ? 'Creating...' : 'Create Property'}
              </button>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  );
}
