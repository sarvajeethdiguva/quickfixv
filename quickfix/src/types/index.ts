/* ─── Service Category ───────────────────────────────────────────────── */
export type ServiceCategoryId =
  | 'plumbing'
  | 'electrical'
  | 'carpentry'
  | 'painting'
  | 'cleaning'
  | 'ac-repair'

export interface ServiceCategory {
  id: ServiceCategoryId
  name: string
  description: string
  icon: string
  color: string
  bgColor: string
  startingPrice: number
  totalProviders: number
  avgRating: number
  popularServices: string[]
}

/* ─── Provider ───────────────────────────────────────────────────────── */
export type ProviderStatus = 'available' | 'busy' | 'offline'

export interface Review {
  id: string
  authorName: string
  authorAvatar: string
  rating: number
  comment: string
  date: string
  serviceType: string
  verified: boolean
}

export interface WorkSample {
  id: string
  imageUrl: string
  caption: string
  category: ServiceCategoryId
}

export interface Provider {
  id: string
  name: string
  avatar: string
  category: ServiceCategoryId
  tagline: string
  bio: string
  rating: number
  reviewCount: number
  completedJobs: number
  yearsExp: number
  hourlyRate: number
  status: ProviderStatus
  location: string
  distanceKm: number
  verified: boolean
  featured: boolean
  badges: string[]
  skills: string[]
  responseTimeMin: number
  reviews: Review[]
  workSamples: WorkSample[]
  availability: WeekAvailability
}

export type TimeSlot = {
  time: string
  available: boolean
}

export type DayAvailability = {
  day: string
  slots: TimeSlot[]
}

export type WeekAvailability = DayAvailability[]

/* ─── Booking ────────────────────────────────────────────────────────── */
export type BookingStep = 'service' | 'schedule' | 'details' | 'confirm'
export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'

export interface BookingFormData {
  serviceType: string
  description: string
  date: string
  timeSlot: string
  address: string
  city: string
  customerName: string
  customerPhone: string
  customerEmail: string
  notes: string
}

export interface Booking {
  id: string
  providerId: string
  providerName: string
  providerAvatar: string
  service: string
  category: ServiceCategoryId
  date: string
  time: string
  address: string
  status: BookingStatus
  price: number
  createdAt: string
}

/* ─── Search / Filter ────────────────────────────────────────────────── */
export interface SearchFilters {
  query: string
  category: ServiceCategoryId | ''
  minRating: number
  maxPrice: number
  sortBy: 'rating' | 'price-asc' | 'price-desc' | 'distance' | 'reviews'
  verified: boolean
  available: boolean
}

/* ─── Navigation ─────────────────────────────────────────────────────── */
export interface NavItem {
  label: string
  href: string
}
