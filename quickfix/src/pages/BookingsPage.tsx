import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Calendar, Clock, MapPin, ArrowRight, Plus } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import { Badge, Button, Avatar } from '../components/ui'
import type { Booking, BookingStatus } from '../types'

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: 'bk-001',
    providerId: 'prv-001',
    providerName: 'Rajesh Kumar',
    providerAvatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Rajesh&backgroundColor=b6e3f4',
    service: 'Pipe Fitting',
    category: 'plumbing',
    date: '2026-10-12',
    time: '10:00',
    address: 'Flat 4B, Brigade Gateway, Rajajinagar, Bengaluru',
    status: 'confirmed',
    price: 900,
    createdAt: '2026-10-09',
  },
  {
    id: 'bk-002',
    providerId: 'prv-007',
    providerName: 'Lakshmi Devi',
    providerAvatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Lakshmi&backgroundColor=c0aede',
    service: 'Deep Clean',
    category: 'cleaning',
    date: '2026-09-28',
    time: '09:00',
    address: 'Flat 4B, Brigade Gateway, Rajajinagar, Bengaluru',
    status: 'completed',
    price: 560,
    createdAt: '2026-09-25',
  },
  {
    id: 'bk-003',
    providerId: 'prv-003',
    providerName: 'Mohan Das',
    providerAvatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Mohan&backgroundColor=c0aede',
    service: 'Switchboard Repair',
    category: 'electrical',
    date: '2026-09-14',
    time: '14:00',
    address: 'Flat 4B, Brigade Gateway, Rajajinagar, Bengaluru',
    status: 'completed',
    price: 500,
    createdAt: '2026-09-12',
  },
  {
    id: 'bk-004',
    providerId: 'prv-009',
    providerName: 'Praveen Nair',
    providerAvatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Praveen&backgroundColor=b6e3f4',
    service: 'AC Service',
    category: 'ac-repair',
    date: '2026-08-22',
    time: '11:00',
    address: 'Flat 4B, Brigade Gateway, Rajajinagar, Bengaluru',
    status: 'completed',
    price: 960,
    createdAt: '2026-08-20',
  },
]

const statusConfig: Record<BookingStatus, { label: string; variant: 'secondary' | 'warning' | 'success' | 'error' | 'primary' }> = {
  pending: { label: 'Pending', variant: 'warning' },
  confirmed: { label: 'Confirmed', variant: 'primary' },
  'in-progress': { label: 'In Progress', variant: 'secondary' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'error' },
}

const categoryIcons: Record<string, string> = {
  plumbing: '🔧',
  electrical: '⚡',
  carpentry: '🪚',
  painting: '🎨',
  cleaning: '🧹',
  'ac-repair': '❄️',
}

type FilterTab = 'all' | 'upcoming' | 'completed'

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  const filtered = mockBookings.filter((b) => {
    if (activeTab === 'upcoming') return ['pending', 'confirmed', 'in-progress'].includes(b.status)
    if (activeTab === 'completed') return ['completed', 'cancelled'].includes(b.status)
    return true
  })

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-primary">My Bookings</h1>
            <p className="text-muted mt-1">{mockBookings.length} total bookings</p>
          </div>
          <Link to="/services">
            <Button variant="accent" size="md" leftIcon={<Plus size={16} />}>
              Book a Service
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-card shadow-card p-1.5 mb-6">
          {(['all', 'upcoming', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                'flex-1 py-2.5 text-sm font-medium rounded-button capitalize transition-all',
                activeTab === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-primary',
              ].join(' ')}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Booking list */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filtered.map((booking, i) => {
              const status = statusConfig[booking.status]
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="bg-white rounded-card shadow-card p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <Avatar src={booking.providerAvatar} name={booking.providerName} size="md" />
                      <span
                        className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                        aria-hidden="true"
                      >
                        {categoryIcons[booking.category]}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-heading font-bold text-primary">{booking.service}</h3>
                          <p className="text-sm text-muted">{booking.providerName}</p>
                        </div>
                        <Badge variant={status.variant} size="sm" dot>
                          {status.label}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-muted mt-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {booking.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          <span className="truncate max-w-[200px]">{booking.address}</span>
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-heading font-bold text-primary">₹{booking.price}</p>
                      <p className="text-xs text-muted">total</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-muted">
                      Booked on {booking.createdAt}
                    </span>
                    <div className="flex gap-2">
                      {booking.status === 'completed' && (
                        <Link to={`/provider/${booking.providerId}`}>
                          <Button variant="outline" size="xs">
                            Book Again
                          </Button>
                        </Link>
                      )}
                      {['confirmed', 'pending'].includes(booking.status) && (
                        <Button variant="ghost" size="xs" className="text-red-500 hover:bg-red-50">
                          Cancel
                        </Button>
                      )}
                      <Link to={`/provider/${booking.providerId}`}>
                        <Button variant="ghost" size="xs" rightIcon={<ArrowRight size={12} />}>
                          View Provider
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <span className="text-6xl mb-5 block" aria-hidden="true">📋</span>
            <h3 className="font-heading text-2xl font-bold text-primary mb-2">No bookings here</h3>
            <p className="text-muted mb-6">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming bookings."
                : "No completed bookings to show."}
            </p>
            <Link to="/services">
              <Button variant="accent" rightIcon={<ArrowRight size={16} />}>
                Browse Services
              </Button>
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
