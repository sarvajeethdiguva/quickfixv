import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { Button } from '../ui'
import { categories } from '../../data/categories'

interface SearchBarProps {
  className?: string
  compact?: boolean
}

export default function SearchBar({ className = '', compact = false }: SearchBarProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [location] = useState('Bengaluru')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category) params.set('category', category)
    navigate(`/providers?${params.toString()}`)
  }

  if (compact) {
    return (
      <form onSubmit={handleSearch} className={['flex gap-2', className].join(' ')}>
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services or providers..."
            className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
          />
        </div>
        <Button type="submit" variant="accent" size="sm">
          Search
        </Button>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSearch}
      className={[
        'bg-white rounded-[16px] shadow-modal p-2 flex flex-col sm:flex-row gap-2',
        className,
      ].join(' ')}
      role="search"
      aria-label="Search for home services"
    >
      {/* Service search */}
      <div className="flex items-center gap-3 flex-1 px-3 py-1 bg-background rounded-xl">
        <Search size={18} className="text-muted shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What service do you need?"
          className="flex-1 bg-transparent text-sm text-primary placeholder:text-muted focus:outline-none min-w-0"
          aria-label="Service search"
        />
      </div>

      {/* Category picker */}
      <div className="relative flex items-center gap-2 px-3 py-1 bg-background rounded-xl sm:w-48">
        <div className="relative flex-1">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full appearance-none bg-transparent text-sm text-primary focus:outline-none pr-5 cursor-pointer"
            aria-label="Service category"
          >
            <option value="">All Services</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        </div>
      </div>

      {/* Location (display only) */}
      <div className="flex items-center gap-2 px-3 py-1 bg-background rounded-xl sm:w-44">
        <MapPin size={15} className="text-accent shrink-0" />
        <span className="text-sm text-primary truncate">{location}</span>
      </div>

      {/* Submit */}
      <Button type="submit" variant="accent" size="md" className="shrink-0 sm:px-8">
        <Search size={16} />
        Search
      </Button>
    </form>
  )
}
