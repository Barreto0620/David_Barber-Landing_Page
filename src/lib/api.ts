// API client for David Barber
// Placeholder functions for Azure Functions integration

import type { 
  BookingRequest, 
  BookingResponse, 
  AvailabilityRequest, 
  AvailabilityResponse,
  Service,
  Staff 
} from '@/types/booking';

// Azure Functions base URL (set in environment variables)
const API_BASE_URL = import.meta.env.VITE_AZURE_FUNCTIONS_URL || '/api';

// Generic API request wrapper
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Booking API functions
export const bookingApi = {
  // Create a new booking
  async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
    return apiRequest<BookingResponse>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Get booking by ID
  async getBooking(bookingId: string) {
    return apiRequest(`/bookings/${bookingId}`);
  },

  // Update booking
  async updateBooking(bookingId: string, updates: Partial<BookingRequest>) {
    return apiRequest(`/bookings/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Cancel booking
  async cancelBooking(bookingId: string) {
    return apiRequest(`/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  },

  // Get customer bookings
  async getCustomerBookings(customerId: string) {
    return apiRequest(`/customers/${customerId}/bookings`);
  },
};

// Services API functions
export const servicesApi = {
  // Get all active services
  async getServices(): Promise<Service[]> {
    return apiRequest<Service[]>('/services');
  },

  // Get service by ID
  async getService(serviceId: string): Promise<Service> {
    return apiRequest<Service>(`/services/${serviceId}`);
  },
};

// Staff API functions
export const staffApi = {
  // Get all active staff members
  async getStaff(): Promise<Staff[]> {
    return apiRequest<Staff[]>('/staff');
  },

  // Get staff member by ID
  async getStaffMember(staffId: string): Promise<Staff> {
    return apiRequest<Staff>(`/staff/${staffId}`);
  },

  // Get staff availability for a specific date
  async getAvailability(params: AvailabilityRequest): Promise<AvailabilityResponse> {
    const queryParams = new URLSearchParams({
      date: params.date,
      serviceId: params.serviceId,
      ...(params.staffId && { staffId: params.staffId }),
    });
    
    return apiRequest<AvailabilityResponse>(`/availability?${queryParams}`);
  },
};

// Mock data for development (remove in production)
export const mockData = {
  services: [
    {
      id: '1',
      name: 'Corte Clássico',
      description: 'Corte tradicional com acabamento impecável',
      price: 45,
      duration: 30,
      category: 'cut' as const,
      isActive: true,
    },
    {
      id: '2',
      name: 'Corte + Barba',
      description: 'Combo completo com design personalizado',
      price: 85,
      duration: 50,
      category: 'cut' as const,
      isActive: true,
    },
  ],
  
  staff: [
    {
      id: '1',
      name: 'Carlos Silva',
      email: 'carlos@barbershoppro.com',
      phone: '(11) 99999-9999',
      role: 'Barbeiro Master',
      specialties: ['Cortes clássicos', 'Barbas elaboradas'],
      experience: '8 anos',
      rating: 4.9,
      reviewCount: 234,
      isActive: true,
      workingHours: {
        monday: { start: '09:00', end: '18:00' },
        tuesday: { start: '09:00', end: '18:00' },
        wednesday: { start: '09:00', end: '18:00' },
        thursday: { start: '09:00', end: '18:00' },
        friday: { start: '09:00', end: '18:00' },
        saturday: { start: '08:00', end: '17:00' },
        sunday: null,
      },
    },
  ],
};

// Authentication helpers (Azure AD B2C placeholders)
export const authApi = {
  // Initialize MSAL instance
  async initAuth() {
    // Placeholder for MSAL initialization
    console.log('Initializing Azure AD B2C authentication...');
  },

  // Login user
  async login() {
    // Placeholder for B2C login flow
    console.log('Redirecting to Azure AD B2C login...');
  },

  // Logout user
  async logout() {
    // Placeholder for logout
    console.log('Logging out user...');
  },

  // Get current user token
  async getToken(): Promise<string | null> {
    // Placeholder for token retrieval
    return localStorage.getItem('authToken');
  },
};

// Real-time updates (Azure Web PubSub placeholders)
export const realtimeApi = {
  // Connect to real-time updates
  async connect(userId: string) {
    // Placeholder for Web PubSub connection
    console.log(`Connecting to real-time updates for user ${userId}...`);
  },

  // Subscribe to booking updates
  async subscribeToBookings(callback: (data: any) => void) {
    // Placeholder for booking subscription
    console.log('Subscribing to booking updates...');
  },

  // Send booking update
  async sendBookingUpdate(bookingId: string, data: any) {
    // Placeholder for sending updates
    console.log(`Sending update for booking ${bookingId}:`, data);
  },
};