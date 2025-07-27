// Mock API functions for demonstration
export const api = {
  // Properties
  getProperties: async (filters?: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProperties;
  },
  
  getProperty: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProperties.find(p => p.id === id);
  },
  
  createProperty: async (property: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { ...property, id: Date.now().toString() };
  },
  
  updateProperty: async (id: string, updates: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id, ...updates };
  },
  
  deleteProperty: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },
  
  // Authentication
  login: async (credentials: { email: string; password: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      user: {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20business%20person%20portrait%2C%20friendly%20real%20estate%20agent%2C%20modern%20office%20background&width=100&height=100&seq=user-avatar&orientation=squarish'
      },
      token: 'mock-jwt-token'
    };
  },
  
  register: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      user: {
        id: '1',
        name: userData.name,
        email: userData.email,
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20business%20person%20portrait%2C%20friendly%20real%20estate%20agent%2C%20modern%20office%20background&width=100&height=100&seq=user-avatar&orientation=squarish'
      },
      token: 'mock-jwt-token'
    };
  },
  
  // Offers
  createOffer: async (offer: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { ...offer, id: Date.now().toString() };
  },
  
  getOffers: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [];
  },
};

// Mock data
const mockProperties = [
  {
    id: '1',
    title: 'Luxury Downtown Apartment',
    price: 2500000,
    location: 'Downtown, NYC',
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    type: 'sale',
    category: 'apartment',
    images: [
      'https://readdy.ai/api/search-image?query=Luxury%20modern%20apartment%20interior%20with%20city%20view%2C%20high-end%20finishes%2C%20contemporary%20design%2C%20spacious%20living%20room&width=800&height=600&seq=apt1-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Modern%20apartment%20bedroom%20with%20large%20windows%2C%20minimalist%20design%2C%20luxury%20bedding%2C%20city%20skyline%20view&width=800&height=600&seq=apt1-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Contemporary%20apartment%20kitchen%20with%20marble%20countertops%2C%20stainless%20steel%20appliances%2C%20modern%20cabinetry&width=800&height=600&seq=apt1-3&orientation=landscape'
    ],
    description: 'Stunning luxury apartment in the heart of downtown with panoramic city views. Features high-end finishes, floor-to-ceiling windows, and premium amenities.',
    amenities: ['Gym', 'Pool', 'Concierge', 'Parking', 'Security'],
    ownerId: '2',
    createdAt: '2024-01-15',
    featured: true,
    virtualTour: 'https://example.com/virtual-tour-1'
  },
  {
    id: '2',
    title: 'Modern Family House',
    price: 4500,
    location: 'Suburbs, CA',
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    type: 'rent',
    category: 'house',
    images: [
      'https://readdy.ai/api/search-image?query=Modern%20family%20house%20exterior%20with%20large%20front%20yard%2C%20contemporary%20architecture%2C%20two-story%20design&width=800&height=600&seq=house1-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Spacious%20family%20living%20room%20with%20modern%20furniture%2C%20large%20windows%2C%20comfortable%20seating%20area&width=800&height=600&seq=house1-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Modern%20house%20kitchen%20with%20island%2C%20granite%20countertops%2C%20stainless%20appliances%2C%20breakfast%20nook&width=800&height=600&seq=house1-3&orientation=landscape'
    ],
    description: 'Beautiful modern family home in quiet suburban neighborhood. Perfect for families with spacious rooms and a large backyard.',
    amenities: ['Garden', 'Garage', 'Fireplace', 'Deck'],
    ownerId: '3',
    createdAt: '2024-01-20',
    featured: false
  },
  {
    id: '3',
    title: 'Commercial Office Space',
    price: 8500,
    location: 'Business District, NY',
    bedrooms: 0,
    bathrooms: 2,
    area: 1800,
    type: 'rent',
    category: 'commercial',
    images: [
      'https://readdy.ai/api/search-image?query=Modern%20commercial%20office%20space%20with%20open%20floor%20plan%2C%20glass%20walls%2C%20professional%20lighting&width=800&height=600&seq=office1-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Business%20office%20reception%20area%20with%20modern%20furniture%2C%20corporate%20design%2C%20professional%20atmosphere&width=800&height=600&seq=office1-2&orientation=landscape'
    ],
    description: 'Prime commercial office space in the heart of the business district. Ideal for growing companies and startups.',
    amenities: ['Elevator', 'Parking', 'Security', 'Reception'],
    ownerId: '4',
    createdAt: '2024-01-25',
    featured: true
  }
];