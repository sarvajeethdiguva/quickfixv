import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: number
  showValue?: boolean
  reviewCount?: number
  className?: string
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 14,
  showValue = true,
  reviewCount,
  className = '',
}: StarRatingProps) {
  return (
    <div className={['flex items-center gap-1.5', className].join(' ')}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => {
          const filled = i + 1 <= Math.floor(rating)
          const partial = !filled && i < rating

          return (
            <div key={i} className="relative" style={{ width: size, height: size }}>
              {/* Empty star */}
              <Star
                size={size}
                className="text-border absolute inset-0"
                fill="currentColor"
              />
              {/* Filled portion */}
              {(filled || partial) && (
                <div
                  className="overflow-hidden absolute inset-0"
                  style={{ width: partial ? `${(rating % 1) * 100}%` : '100%' }}
                >
                  <Star size={size} className="text-amber-400" fill="currentColor" />
                </div>
              )}
            </div>
          )
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold font-body text-primary">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-muted font-body">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  )
}
