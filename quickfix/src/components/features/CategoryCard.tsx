import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Star, Users } from 'lucide-react'
import type { ServiceCategory } from '../../types'

interface CategoryCardProps {
  category: ServiceCategory
  index?: number
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link
        to={`/services/${category.id}`}
        className="block bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 p-6 h-full"
        aria-label={`Browse ${category.name} services`}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110 duration-300"
          style={{ backgroundColor: category.bgColor }}
          aria-hidden="true"
        >
          {category.icon}
        </div>

        {/* Name + description */}
        <h3 className="font-heading text-base font-bold text-primary mb-1.5 group-hover:text-accent transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-4 leading-relaxed">
          {category.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-muted mb-4">
          <span className="flex items-center gap-1">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            {category.avgRating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            {category.totalProviders} pros
          </span>
          <span className="font-medium text-secondary">
            from ₹{category.startingPrice}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-accent group-hover:underline">
            Browse {category.name}
          </span>
          <ArrowRight
            size={16}
            className="text-accent transition-transform group-hover:translate-x-1 duration-200"
          />
        </div>
      </Link>
    </motion.div>
  )
}
