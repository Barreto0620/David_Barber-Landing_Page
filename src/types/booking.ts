// TypeScript interfaces for the BarberShop Pro application
// These interfaces define the data models for Azure Cosmos DB and API responses

export interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  staffId: string;
  dateTime: Date;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  price: number;
  duration: number; // minutes
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: 'cut' | 'beard' | 'styling' | 'treatment';
  isActive: boolean;
  imageUrl?: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialties: string[];
  experience: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  profileImageUrl?: string;
  workingHours: {
    [day: string]: { start: string; end: string; } | null;
  };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  lastVisit?: Date;
  totalBookings: number;
  preferences?: {
    preferredStaff?: string;
    notes?: string;
  };
}

export interface TimeSlot {
  time: string;
  available: boolean;
  staffId: string;
}

export interface BookingRequest {
  serviceId: string;
  staffId: string;
  dateTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
  booking?: Booking;
}

export interface AvailabilityRequest {
  staffId?: string;
  date: string;
  serviceId: string;
}

export interface AvailabilityResponse {
  date: string;
  slots: TimeSlot[];
}