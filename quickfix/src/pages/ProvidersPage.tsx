import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import PageLayout from '../components/layout/PageLayout'
import ProviderCard from '../components/features/ProviderCard'
import FilterBar from '../components/features/FilterBar'
import SearchBar from '../components/features/SearchBar'
import { ProviderCardSkeleton } from '../components/ui'
import { Badge } from '../components/ui'
import { providers } from '../data/providers'
import type { SearchFilters } from '../types'

export default function ProvidersPage() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') ?? '',
    category: (searchParams.get('category') as SearchFilters['category']) ?? '',
    minRating: 0,
    maxPrice: 2000,
    sortBy: 'rating',
    verified: false,
    available: false,
  })
  const [loading] = useState(false)

  const updateFilter = (partial: Partial<SearchFilters>) =>
    setFilters((f) => ({ ...f, ...partial }))

  const filtered = useMemo(() => {
    let list = [...providers]

    if (filters.category) list = list.filter((p) => p.category === filters.category)
    if (filters.query)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.query.toLowerCase()) ||
          p.skills.some((s) => s.toLowerCase().includes(filters.query.toLowerCase())) ||
          p.tagline.toLowerCase().includes(filters.query.toLowerCase())
      )
    if (filters.minRating > 0) list = list.filter((p) => p.rating >= filters.minRating)
    if (filters.maxPrice < 2000) list = list.filter((p) => p.hourlyRate <= filters.maxPrice)
    if (filters.verified) list = list.filter((p) => p.verified)
    if (filters.available) list = list.filter((p) => p.status === 'available')

    switch (filters.sortBy) {
      case 'rating': return list.sort((a, b) => b.rating - a.rating)
      case 'price-asc': return list.sort((a, b) => a.hourlyRate - b.hourlyRate)
      case 'price-desc': return list.sort((a, b) => b.hourlyRate - a.hourlyRate)
      case 'distance': return list.sort((a, b) => a.distanceKm - b.distanceKm)
      case 'reviews': return list.sort((a, b) => b.reviewCount - a.reviewCount)
      default: return list
    }
  }, [filters])

  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-primary py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Badge variant="accent" className="mb-4">Browse Professionals</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Find Your Perfect Pro
            </h1>
            <p className="text-white/70 mb-7 max-w-lg">
              All verified, rated, and ready to help. Filter by service, rating, price, and availability.
            </p>
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-5">
          <FilterBar
            filters={filters}
            onChange={updateFilter}
            totalResults={filtered.length}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProviderCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((provider, i) => (
              <ProviderCard key={provider.id} provider={provider} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <span className="text-6xl mb-5 block" aria-hidden="true">🔍</span>
            <h3 className="font-heading text-2xl font-bold text-primary mb-2">No professionals found</h3>
            <p className="text-muted mb-6">Try adjusting your filters or searching for something else.</p>
            <button
              onClick={() =>
                setFilters({
                  query: '',
                  category: '',
                  minRating: 0,
                  maxPrice: 2000,
                  sortBy: 'rating',
                  verified: false,
                  available: false,
                })
              }
              className="text-accent underline text-sm hover:no-underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </PageLayout>
  )
}
