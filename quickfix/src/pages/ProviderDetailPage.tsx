import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  MapPin, Clock, CheckCircle2, Star, Zap, ChevronLeft,
  Share2, Bookmark, BadgeCheck, Calendar, Phone, MessageCircle
} from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import BookingModal from '../components/features/BookingModal'
import { Badge, Button, StarRating, Avatar } from '../components/ui'
import { getProviderById } from '../data/providers'
import { getCategoryById } from '../data/categories'

export default function ProviderDetailPage() {
  const { providerId } = useParams<{ providerId: string }>()
  const provider = providerId ? getProviderById(providerId) : null
  const category = provider ? getCategoryById(provider.category) : null
  const [bookingOpen, setBookingOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'gallery'>('about')

  if (!provider) return <Navigate to="/404" replace />

  const statusColor = {
    available: 'text-secondary',
    busy: 'text-amber-500',
    offline: 'text-muted',
  }[provider.status]

  const statusLabel = {
    available: 'Available Now',
    busy: 'Currently Busy',
    offline: 'Offline',
  }[provider.status]

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
          <Link to="/providers" className="flex items-center gap-1 hover:text-primary transition-colors">
            <ChevronLeft size={14} />
            Back to Providers
          </Link>
          <span>/</span>
          <Link to={`/services/${provider.category}`} className="hover:text-primary transition-colors capitalize">
            {provider.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">{provider.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ─── Main Content ──────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Profile Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-card shadow-card p-6"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative shrink-0">
                  <Avatar src={provider.avatar} name={provider.name} size="xl" />
                  {provider.verified && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-secondary rounded-full flex items-center justify-center ring-2 ring-white">
                      <BadgeCheck size={14} className="text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h1 className="font-heading text-2xl font-extrabold text-primary">{provider.name}</h1>
                      {category && (
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-badge mt-1"
                          style={{ backgroundColor: category.bgColor, color: category.color }}
                        >
                          {category.icon} {category.name} Specialist
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setSaved((v) => !v)}
                        aria-label={saved ? 'Unsave provider' : 'Save provider'}
                        className="p-2 rounded-lg hover:bg-background text-muted transition-colors"
                      >
                        <Bookmark
                          size={18}
                          className={saved ? 'fill-accent text-accent' : ''}
                        />
                      </button>
                      <button
                        aria-label="Share profile"
                        className="p-2 rounded-lg hover:bg-background text-muted transition-colors"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-muted mb-3 leading-relaxed">{provider.tagline}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <StarRating
                      rating={provider.rating}
                      size={15}
                      showValue
                      reviewCount={provider.reviewCount}
                    />
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <Badge variant={provider.status === 'available' ? 'secondary' : provider.status === 'busy' ? 'warning' : 'default'} dot size="sm">
                      <span className={statusColor}>{statusLabel}</span>
                    </Badge>
                    {provider.badges.map((b) => (
                      <Badge key={b} variant="primary" size="sm">{b}</Badge>
                    ))}
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Zap, label: 'Jobs Done', value: provider.completedJobs.toLocaleString() },
                      { icon: Star, label: 'Experience', value: `${provider.yearsExp}y` },
                      { icon: Clock, label: 'Response', value: `~${provider.responseTimeMin}m` },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex flex-col items-center p-3 bg-background rounded-xl">
                        <Icon size={15} className="text-accent mb-1" />
                        <span className="font-heading text-base font-bold text-primary">{value}</span>
                        <span className="text-xs text-muted">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="bg-white rounded-card shadow-card overflow-hidden">
              <div className="flex border-b border-border">
                {(['about', 'reviews', 'gallery'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={[
                      'flex-1 py-3.5 text-sm font-medium font-body capitalize transition-colors',
                      activeTab === tab
                        ? 'text-accent border-b-2 border-accent bg-accent/3'
                        : 'text-muted hover:text-primary',
                    ].join(' ')}
                  >
                    {tab}
                    {tab === 'reviews' && (
                      <span className="ml-1.5 text-xs bg-primary/8 text-primary px-1.5 py-0.5 rounded-full">
                        {provider.reviewCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'about' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Bio */}
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-2">About</h3>
                      <p className="text-sm text-muted leading-relaxed">{provider.bio}</p>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-3">Services Offered</h3>
                      <div className="flex flex-wrap gap-2">
                        {provider.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-sm px-3 py-1.5 bg-background border border-border rounded-button text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-2">
                      <h3 className="font-heading font-bold text-primary mb-1">Location</h3>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <MapPin size={14} className="text-accent shrink-0" />
                        {provider.location}
                        <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                          {provider.distanceKm} km from you
                        </span>
                      </div>
                    </div>

                    {/* Weekly availability preview */}
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-3">
                        <Calendar size={14} className="inline mr-1.5 mb-0.5" />
                        Weekly Availability
                      </h3>
                      <div className="grid grid-cols-7 gap-1">
                        {provider.availability.map((day) => {
                          const avail = day.slots.filter((s) => s.available).length
                          const pct = avail / day.slots.length
                          return (
                            <div key={day.day} className="flex flex-col items-center gap-1">
                              <span className="text-xs text-muted">{day.day}</span>
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                                style={{
                                  backgroundColor: pct > 0.5 ? '#E8F5F2' : pct > 0 ? '#FEF3C7' : '#F4F4F4',
                                  color: pct > 0.5 ? '#16856B' : pct > 0 ? '#B45309' : '#667085',
                                }}
                              >
                                {avail}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <p className="text-xs text-muted mt-2">Numbers show available slots per day</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-5"
                  >
                    {/* Summary */}
                    <div className="flex items-center gap-6 p-4 bg-background rounded-xl">
                      <div className="text-center">
                        <p className="font-heading text-5xl font-extrabold text-primary">{provider.rating}</p>
                        <StarRating rating={provider.rating} size={14} showValue={false} />
                        <p className="text-xs text-muted mt-1">{provider.reviewCount} reviews</p>
                      </div>
                      <div className="flex-1 flex flex-col gap-1.5">
                        {[5, 4, 3, 2, 1].map((n) => {
                          const count = provider.reviews.filter((r) => r.rating === n).length
                          const pct = provider.reviews.length > 0 ? (count / provider.reviews.length) * 100 : 0
                          return (
                            <div key={n} className="flex items-center gap-2">
                              <span className="text-xs text-muted w-3">{n}</span>
                              <Star size={10} className="text-amber-400 fill-amber-400" />
                              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-400 rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted w-4">{count}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Individual reviews */}
                    {provider.reviews.map((review) => (
                      <div key={review.id} className="flex flex-col gap-3 pb-5 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <Avatar src={review.authorAvatar} name={review.authorName} size="sm" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-heading text-sm font-bold text-primary">{review.authorName}</span>
                              {review.verified && (
                                <CheckCircle2 size={13} className="text-secondary" aria-label="Verified purchase" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <StarRating rating={review.rating} size={12} showValue={false} />
                              <span className="text-xs text-muted">{review.date}</span>
                            </div>
                          </div>
                          <Badge variant="outline" size="sm">{review.serviceType}</Badge>
                        </div>
                        <p className="text-sm text-muted leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {provider.workSamples.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {provider.workSamples.map((sample) => (
                          <div key={sample.id} className="group relative rounded-xl overflow-hidden aspect-video bg-background">
                            <img
                              src={sample.imageUrl}
                              alt={sample.caption}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                              <p className="text-white text-xs font-medium">{sample.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted">
                        <span className="text-4xl mb-3 block" aria-hidden="true">📷</span>
                        <p>No work samples uploaded yet.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* ─── Sidebar ──────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Booking card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-card shadow-card p-5 sticky top-20"
            >
              <div className="flex items-end gap-1 mb-1">
                <span className="font-heading text-3xl font-extrabold text-primary">
                  ₹{provider.hourlyRate}
                </span>
                <span className="text-muted text-sm mb-1">/hour</span>
              </div>
              <p className="text-xs text-muted mb-5">
                Minimum 2 hours · Pay after service
              </p>

              <div className="flex flex-col gap-3 mb-5">
                <Button
                  variant="accent"
                  size="lg"
                  fullWidth
                  leftIcon={<Calendar size={16} />}
                  onClick={() => setBookingOpen(true)}
                  disabled={provider.status === 'offline'}
                >
                  {provider.status === 'available' ? 'Book Now' : provider.status === 'busy' ? 'Book for Later' : 'Currently Offline'}
                </Button>
                <Button variant="outline" size="lg" fullWidth leftIcon={<Phone size={16} />}>
                  Request a Call
                </Button>
                <Button variant="ghost" size="md" fullWidth leftIcon={<MessageCircle size={15} />}>
                  Send Message
                </Button>
              </div>

              {/* Guarantees */}
              <div className="border-t border-border pt-4 flex flex-col gap-2">
                {[
                  { icon: CheckCircle2, label: 'Free cancellation up to 2h before' },
                  { icon: CheckCircle2, label: 'Pay only after job completion' },
                  { icon: CheckCircle2, label: '30-day quality guarantee' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-muted">
                    <Icon size={13} className="text-secondary shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact card */}
            <div className="bg-white rounded-card shadow-card p-5">
              <h3 className="font-heading font-bold text-primary mb-3 text-sm">Quick Info</h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Response time</span>
                  <span className="text-primary font-medium">~{provider.responseTimeMin} mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Jobs completed</span>
                  <span className="text-primary font-medium">{provider.completedJobs.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Years experience</span>
                  <span className="text-primary font-medium">{provider.yearsExp} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Service area</span>
                  <span className="text-primary font-medium text-right max-w-[130px] leading-tight">{provider.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        provider={provider}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </PageLayout>
  )
}
