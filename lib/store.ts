import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'rent' | 'sale';
  category: 'apartment' | 'house' | 'commercial';
  images: string[];
  description: string;
  amenities: string[];
  ownerId: string;
  createdAt: string;
  featured: boolean;
  virtualTour?: string;
}

interface Offer {
  id: string;
  propertyId: string;
  buyerId: string;
  amount: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface AppState {
  user: User | null;
  properties: Property[];
  favorites: string[];
  offers: Offer[];
  isDarkMode: boolean;
  searchQuery: string;
  filters: {
    type: 'all' | 'rent' | 'sale';
    category: 'all' | 'apartment' | 'house' | 'commercial';
    minPrice: number;
    maxPrice: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
  };
  
  // Actions
  setUser: (user: User | null) => void;
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  toggleFavorite: (propertyId: string) => void;
  addOffer: (offer: Offer) => void;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  toggleDarkMode: () => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<AppState['filters']>) => void;
  resetFilters: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  properties: [],
  favorites: [],
  offers: [],
  isDarkMode: false,
  searchQuery: '',
  filters: {
    type: 'all',
    category: 'all',
    minPrice: 0,
    maxPrice: 10000000,
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    amenities: [],
  },

  setUser: (user) => set({ user }),
  setProperties: (properties) => set({ properties }),
  addProperty: (property) => set((state) => ({ 
    properties: [...state.properties, property] 
  })),
  updateProperty: (id, updates) => set((state) => ({
    properties: state.properties.map(p => 
      p.id === id ? { ...p, ...updates } : p
    )
  })),
  deleteProperty: (id) => set((state) => ({
    properties: state.properties.filter(p => p.id !== id)
  })),
  toggleFavorite: (propertyId) => set((state) => ({
    favorites: state.favorites.includes(propertyId)
      ? state.favorites.filter(id => id !== propertyId)
      : [...state.favorites, propertyId]
  })),
  addOffer: (offer) => set((state) => ({
    offers: [...state.offers, offer]
  })),
  updateOffer: (id, updates) => set((state) => ({
    offers: state.offers.map(o => 
      o.id === id ? { ...o, ...updates } : o
    )
  })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  resetFilters: () => set({
    filters: {
      type: 'all',
      category: 'all',
      minPrice: 0,
      maxPrice: 10000000,
      location: '',
      bedrooms: 0,
      bathrooms: 0,
      amenities: [],
    }
  }),
}));