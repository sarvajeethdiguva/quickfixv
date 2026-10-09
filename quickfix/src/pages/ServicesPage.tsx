import { motion } from 'motion/react'
import PageLayout from '../components/layout/PageLayout'
import CategoryCard from '../components/features/CategoryCard'
import SearchBar from '../components/features/SearchBar'
import { Badge } from '../components/ui'
import { categories } from '../data/categories'
import { providers } from '../data/providers'

export default function ServicesPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <Badge variant="accent" className="mb-4">All Services</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Professional Home Services
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Browse all service categories and connect with verified professionals in your area.
            </p>
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-primary mb-1">
              Browse by Category
            </h2>
            <p className="text-muted text-sm">
              {categories.length} service categories · {providers.length} professionals across all services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular services detail */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-8">
            Popular Services by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ backgroundColor: cat.bgColor }}
                  >
                    {cat.icon}
                  </span>
                  <h3 className="font-heading font-bold text-primary">{cat.name}</h3>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {cat.popularServices.map((svc) => (
                    <li key={svc} className="flex items-center gap-2 text-sm text-muted">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                      {svc}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-secondary font-medium mt-1">
                  Starting from ₹{cat.startingPrice}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
