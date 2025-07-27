
import Joi from 'joi';

// Property validation schema
export const propertySchema = Joi.object({
  title: Joi.string().required().min(3).max(100).messages({
    'string.empty': 'Property title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 100 characters'
  }),
  price: Joi.number().required().min(1).messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be greater than 0',
    'any.required': 'Price is required'
  }),
  location: Joi.string().required().min(3).max(200).messages({
    'string.empty': 'Location is required',
    'string.min': 'Location must be at least 3 characters',
    'string.max': 'Location cannot exceed 200 characters'
  }),
  bedrooms: Joi.number().required().min(0).max(20).messages({
    'number.base': 'Bedrooms must be a number',
    'number.min': 'Bedrooms cannot be negative',
    'number.max': 'Bedrooms cannot exceed 20',
    'any.required': 'Number of bedrooms is required'
  }),
  bathrooms: Joi.number().required().min(0).max(20).messages({
    'number.base': 'Bathrooms must be a number',
    'number.min': 'Bathrooms cannot be negative',
    'number.max': 'Bathrooms cannot exceed 20',
    'any.required': 'Number of bathrooms is required'
  }),
  area: Joi.number().required().min(1).max(50000).messages({
    'number.base': 'Area must be a number',
    'number.min': 'Area must be greater than 0',
    'number.max': 'Area cannot exceed 50,000 sqft',
    'any.required': 'Area is required'
  }),
  type: Joi.string().valid('sale', 'rent').required().messages({
    'any.only': 'Type must be either sale or rent',
    'any.required': 'Property type is required'
  }),
  category: Joi.string().valid('apartment', 'house', 'commercial').required().messages({
    'any.only': 'Category must be apartment, house, or commercial',
    'any.required': 'Property category is required'
  }),
  description: Joi.string().required().min(20).max(1000).messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 20 characters',
    'string.max': 'Description cannot exceed 1000 characters'
  }),
  amenities: Joi.array().items(Joi.string()).optional(),
  images: Joi.array().items(
    Joi.string().uri().allow('').optional()
  ).min(1).messages({
    'array.min': 'At least one image is required'
  }),
  virtualTour: Joi.string().uri().allow('').optional().messages({
    'string.uri': 'Virtual tour must be a valid URL'
  })
});

// User registration schema
export const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50).messages({
    'string.empty': 'Full name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  phone: Joi.string().pattern(/^[+]?[\d\s\-()]+$/).min(10).max(15).optional().messages({
    'string.pattern.base': 'Please enter a valid phone number',
    'string.min': 'Phone number must be at least 10 digits',
    'string.max': 'Phone number cannot exceed 15 digits'
  }),
  password: Joi.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Please confirm your password'
  })
});

// User login schema
export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});

// Contact form schema
export const contactSchema = Joi.object({
  name: Joi.string().required().min(2).max(50).messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  message: Joi.string().required().min(10).max(1000).messages({
    'string.empty': 'Message is required',
    'string.min': 'Message must be at least 10 characters',
    'string.max': 'Message cannot exceed 1000 characters'
  })
});

// Offer form schema
export const offerSchema = Joi.object({
  amount: Joi.number().required().min(1).messages({
    'number.base': 'Offer amount must be a number',
    'number.min': 'Offer amount must be greater than 0',
    'any.required': 'Offer amount is required'
  }),
  message: Joi.string().max(500).optional().messages({
    'string.max': 'Message cannot exceed 500 characters'
  })
});
