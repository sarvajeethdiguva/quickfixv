import { SlidersHorizontal, X, Star, BadgeCheck, Zap } from 'lucide-react'
import type { SearchFilters } from '../../types'
import { Button, Badge } from '../ui'

interface FilterBarProps {
  filters: SearchFilters
  onChange: (filters: Partial<SearchFilters>) => void
  totalResults: number
}

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'distance', label: 'Nearest First' },
  { value: 'reviews', label: 'Most Reviews' },
] as const

export default function FilterBar({ filters, onChange, totalResults }: FilterBarProps) {
  const activeFilterCount = [
    filters.minRating > 0,
    filters.verified,
    filters.available,
    filters.maxPrice < 2000,
  ].filter(Boolean).length

  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Results count */}
        <span className="text-sm text-muted">
          <span className="font-semibold text-primary">{totalResults}</span> professional{totalResults !== 1 ? 's' : ''} found
        </span>

        <div className="flex-1" />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted hidden sm:block">Sort:</span>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ sortBy: e.target.value as SearchFilters['sortBy'] })}
              className="text-sm text-primary border border-border rounded-button h-9 px-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 appearance-none cursor-pointer"
              aria-label="Sort results"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <SlidersHorizontal size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onChange({ minRating: filters.minRating === 4.5 ? 0 : 4.5 })}
            className={[
              'flex items-center gap-1.5 text-xs font-medium h-9 px-3 rounded-button border transition-all',
              filters.minRating >= 4.5
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-white border-border text-muted hover:border-primary/30',
            ].join(' ')}
          >
            <Star size={12} className={filters.minRating >= 4.5 ? 'fill-amber-400 text-amber-400' : ''} />
            4.5+ Stars
          </button>

          <button
            onClick={() => onChange({ verified: !filters.verified })}
            className={[
              'flex items-center gap-1.5 text-xs font-medium h-9 px-3 rounded-button border transition-all',
              filters.verified
                ? 'bg-secondary/10 border-secondary/30 text-secondary'
                : 'bg-white border-border text-muted hover:border-primary/30',
            ].join(' ')}
          >
            <BadgeCheck size={12} />
            Verified
          </button>

          <button
            onClick={() => onChange({ available: !filters.available })}
            className={[
              'flex items-center gap-1.5 text-xs font-medium h-9 px-3 rounded-button border transition-all',
              filters.available
                ? 'bg-secondary/10 border-secondary/30 text-secondary'
                : 'bg-white border-border text-muted hover:border-primary/30',
            ].join(' ')}
          >
            <Zap size={12} />
            Available Now
          </button>

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onChange({ minRating: 0, verified: false, available: false, maxPrice: 2000 })
              }
              leftIcon={<X size={12} />}
              className="text-red-500 hover:bg-red-50"
            >
              Clear ({activeFilterCount})
            </Button>
          )}
        </div>

        {activeFilterCount > 0 && (
          <Badge variant="accent" size="sm">{activeFilterCount} active</Badge>
        )}
      </div>
    </div>
  )
}
