import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { MapPin, Clock, CheckCircle2, Zap } from 'lucide-react'
import type { Provider } from '../../types'
import { Badge, StarRating, Avatar, Button } from '../ui'

interface ProviderCardProps {
  provider: Provider
  index?: number
}

const statusLabel: Record<Provider['status'], string> = {
  available: 'Available Now',
  busy: 'Currently Busy',
  offline: 'Offline',
}

const statusVariant: Record<Provider['status'], 'secondary' | 'warning' | 'default'> = {
  available: 'secondary',
  busy: 'warning',
  offline: 'default',
}

export default function ProviderCard({ provider, index = 0 }: ProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Featured ribbon */}
      {provider.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="accent" size="sm">⭐ Featured</Badge>
        </div>
      )}

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar
            src={provider.avatar}
            name={provider.name}
            size="lg"
            statusDot={provider.status}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="font-heading text-base font-bold text-primary truncate">
                {provider.name}
              </h3>
              {provider.verified && (
                <CheckCircle2 size={15} className="text-secondary shrink-0" aria-label="Verified provider" />
              )}
            </div>
            <p className="text-xs text-muted line-clamp-2 mb-2">{provider.tagline}</p>

            <div className="flex items-center gap-3 flex-wrap">
              <StarRating
                rating={provider.rating}
                size={12}
                showValue
                reviewCount={provider.reviewCount}
              />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant={statusVariant[provider.status]} size="sm" dot>
            {statusLabel[provider.status]}
          </Badge>
          {provider.badges.slice(0, 2).map((badge) => (
            <Badge key={badge} variant="primary" size="sm">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-muted mb-4">
          <span className="flex items-center gap-1">
            <MapPin size={11} className="shrink-0" />
            {provider.distanceKm} km away
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} className="shrink-0" />
            {provider.responseTimeMin} min response
          </span>
          <span className="flex items-center gap-1">
            <Zap size={11} className="shrink-0 text-amber-400" />
            {provider.completedJobs} jobs
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {provider.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs text-muted bg-background px-2 py-0.5 rounded-full border border-border"
            >
              {skill}
            </span>
          ))}
          {provider.skills.length > 3 && (
            <span className="text-xs text-muted bg-background px-2 py-0.5 rounded-full border border-border">
              +{provider.skills.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="font-heading text-xl font-bold text-primary">
              ₹{provider.hourlyRate}
            </span>
            <span className="text-xs text-muted"> /hr</span>
          </div>
          <Link to={`/provider/${provider.id}`}>
            <Button variant="accent" size="sm">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
