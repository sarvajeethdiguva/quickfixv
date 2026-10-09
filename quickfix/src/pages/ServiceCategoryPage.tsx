import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Users, Star, TrendingUp } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import ProviderCard from '../components/features/ProviderCard'
import SearchBar from '../components/features/SearchBar'
import { Badge } from '../components/ui'
import { getCategoryById } from '../data/categories'
import { getProvidersByCategory } from '../data/providers'

export default function ServiceCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = categoryId ? getCategoryById(categoryId) : null
  const categoryProviders = categoryId ? getProvidersByCategory(categoryId) : []

  if (!category) return <Navigate to="/404" replace />

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ backgroundColor: category.bgColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-card"
                style={{ backgroundColor: 'white' }}
                aria-hidden="true"
              >
                {category.icon}
              </span>
              <div>
                <Badge variant="primary" size="sm" className="mb-1">Service Category</Badge>
                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary">
                  {category.name}
                </h1>
              </div>
            </div>
            <p className="text-muted max-w-xl mb-6">{category.description}</p>

            <div className="flex flex-wrap gap-5 mb-8 text-sm">
              <span className="flex items-center gap-1.5 text-primary font-medium">
                <Users size={15} className="text-muted" />
                {category.totalProviders} verified professionals
              </span>
              <span className="flex items-center gap-1.5 text-primary font-medium">
                <Star size={15} className="text-amber-400 fill-amber-400" />
                {category.avgRating.toFixed(1)} average rating
              </span>
              <span className="flex items-center gap-1.5 text-primary font-medium">
                <TrendingUp size={15} className="text-secondary" />
                Starting from ₹{category.startingPrice}
              </span>
            </div>

            <SearchBar compact />
          </motion.div>
        </div>
      </section>

      {/* Popular services */}
      <section className="py-6 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-muted font-medium">Popular:</span>
            {category.popularServices.map((svc) => (
              <Badge key={svc} variant="primary" size="sm" className="cursor-pointer hover:bg-primary/15 transition-colors">
                {svc}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-bold text-primary">
              {categoryProviders.length} Professionals Available
            </h2>
          </div>

          {categoryProviders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryProviders.map((provider, i) => (
                <ProviderCard key={provider.id} provider={provider} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block" aria-hidden="true">{category.icon}</span>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">
                No providers yet
              </h3>
              <p className="text-muted">
                We're growing fast. Check back soon or{' '}
                <a href="mailto:hello@quickfix.in" className="text-accent underline">
                  request a pro
                </a>.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
