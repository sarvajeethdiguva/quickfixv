import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import { categories } from '../../data/categories'

export default function HeroSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category) params.set('category', category)
    navigate(`/providers?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      aria-label="Search for home services"
      className="w-full"
    >
      <div
        className={[
          'flex flex-col sm:flex-row items-stretch bg-white rounded-[18px] overflow-hidden',
          'transition-all duration-300',
          focused
            ? 'shadow-[0_8px_40px_rgba(23,43,77,0.22),0_0_0_2px_rgba(255,107,53,0.3)]'
            : 'shadow-[0_8px_32px_rgba(23,43,77,0.18)]',
        ].join(' ')}
      >
        {/* Service keyword */}
        <label className="sr-only" htmlFor="hero-search-query">What service do you need?</label>
        <div
          className={[
            'flex items-center gap-3 flex-1 px-5 py-4 sm:py-0 min-h-[56px] transition-colors',
            focused === 'query' ? 'bg-accent/[0.03]' : '',
          ].join(' ')}
        >
          <Search
            size={18}
            className={[
              'shrink-0 transition-colors duration-200',
              focused === 'query' ? 'text-accent' : 'text-muted',
            ].join(' ')}
          />
          <input
            id="hero-search-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused('query')}
            onBlur={() => setFocused(null)}
            placeholder="What do you need help with?"
            className="flex-1 bg-transparent text-[15px] font-body text-primary placeholder:text-muted/60 focus:outline-none min-w-0"
            autoComplete="off"
          />
        </div>

        {/* Vertical divider (desktop) */}
        <div className="hidden sm:block w-px bg-border self-stretch my-3" aria-hidden="true" />
        {/* Horizontal divider (mobile) */}
        <div className="sm:hidden h-px bg-border mx-5" aria-hidden="true" />

        {/* Category select */}
        <div
          className={[
            'flex items-center gap-2.5 px-5 py-4 sm:py-0 sm:w-52 transition-colors',
            focused === 'category' ? 'bg-accent/[0.03]' : '',
          ].join(' ')}
        >
          <div className="relative flex-1">
            <label className="sr-only" htmlFor="hero-search-category">Service category</label>
            <select
              id="hero-search-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={() => setFocused('category')}
              onBlur={() => setFocused(null)}
              className="w-full appearance-none bg-transparent text-[15px] font-body text-primary focus:outline-none pr-6 cursor-pointer"
            >
              <option value="">All Services</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
          </div>
        </div>

        {/* Vertical divider (desktop) */}
        <div className="hidden sm:block w-px bg-border self-stretch my-3" aria-hidden="true" />
        {/* Horizontal divider (mobile) */}
        <div className="sm:hidden h-px bg-border mx-5" aria-hidden="true" />

        {/* Location */}
        <div className="flex items-center gap-2.5 px-5 py-4 sm:py-0 sm:w-44">
          <MapPin size={16} className="text-accent shrink-0" />
          <span className="text-[15px] font-body text-primary truncate">Bengaluru</span>
        </div>

        {/* Submit button */}
        <div className="p-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={[
              'w-full sm:w-auto h-full sm:h-12 sm:min-w-[120px] px-7',
              'bg-accent text-white font-body font-semibold text-[15px]',
              'rounded-[14px] flex items-center justify-center gap-2',
              'hover:bg-accent-600 active:bg-accent-700',
              'transition-colors duration-200',
              'shadow-[0_2px_8px_rgba(255,107,53,0.35)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            ].join(' ')}
          >
            <Search size={16} className="shrink-0" />
            Search
          </motion.button>
        </div>
      </div>
    </form>
  )
}
