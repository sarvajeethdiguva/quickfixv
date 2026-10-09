import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, Home, Search, Wrench } from 'lucide-react'
import { Button } from '../components/ui'

const quickLinks = [
  { label: 'Go Home', href: '/', icon: Home },
  { label: 'Browse Services', href: '/services', icon: Search },
  { label: 'Find Providers', href: '/providers', icon: Wrench },
]

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-lg"
      >
        {/* Animated wrench icon */}
        <motion.div
          initial={{ rotate: -20 }}
          animate={{ rotate: [- 20, 20, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl mb-6 inline-block"
          aria-hidden="true"
        >
          🔧
        </motion.div>

        <div className="font-heading text-8xl sm:text-9xl font-extrabold text-primary/10 leading-none select-none mb-2">
          404
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-3">
          Looks like something's broken
        </h1>

        <p className="text-muted mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track — our professionals are standing by!
        </p>

        {/* Quick links */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <Link key={href} to={href}>
              <Button
                variant={href === '/' ? 'accent' : 'outline'}
                size="md"
                leftIcon={<Icon size={15} />}
                fullWidth
              >
                {label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Back link */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors mx-auto"
        >
          <ArrowLeft size={14} />
          Go back to previous page
        </button>
      </motion.div>

      {/* Watermark logo */}
      <div className="absolute bottom-6 flex items-center gap-2">
        <Wrench size={14} className="text-muted/30" />
        <span className="font-heading text-muted/30 font-bold text-sm">QuickFix</span>
      </div>
    </div>
  )
}
