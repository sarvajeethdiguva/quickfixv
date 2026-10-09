import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown, User, Bookmark, LogOut, Wrench, Hammer } from 'lucide-react'
import { Button, Avatar, Badge } from '../ui'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Become a Professional', href: '/join-pro' },
]

const mockUser = {
  name: 'Rohan Mehta',
  email: 'rohan@example.com',
  avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=RohanM&backgroundColor=b6e3f4',
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Detect if we're on a dark-hero page (home) so we can flip text white
  const isHeroPage = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const navTransparent = isHeroPage && !scrolled

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-40 transition-all duration-300',
        scrolled || !isHeroPage
          ? 'bg-white/97 backdrop-blur-md shadow-[0_1px_0_0_rgba(23,43,77,0.08)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* ── Logo ──────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="QuickFix home">
          <div
            className={[
              'w-8 h-8 rounded-[9px] flex items-center justify-center transition-colors duration-300',
              navTransparent ? 'bg-white/15' : 'bg-primary',
            ].join(' ')}
          >
            <Wrench size={15} className="text-accent" />
          </div>
          <span
            className={[
              'font-heading text-xl font-bold transition-colors duration-300',
              navTransparent ? 'text-white' : 'text-primary',
            ].join(' ')}
          >
            Quick<span className="text-accent">Fix</span>
          </span>
        </Link>

        {/* ── Desktop Nav ────────────────────────────── */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                [
                  'font-body text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap',
                  isActive
                    ? navTransparent
                      ? 'text-accent bg-white/10'
                      : 'text-accent bg-accent/8'
                    : navTransparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-primary/70 hover:text-primary hover:bg-primary/5',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ── Desktop Right ──────────────────────────── */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Login */}
          <Link
            to="/login"
            className={[
              'font-body text-sm font-medium px-4 py-2 rounded-button transition-all duration-200',
              navTransparent
                ? 'text-white/85 hover:text-white hover:bg-white/10'
                : 'text-primary/70 hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            Log in
          </Link>

          {/* Find a Pro CTA */}
          <Link to="/providers">
            <Button
              variant="accent"
              size="sm"
              className="font-semibold shadow-[0_2px_8px_rgba(255,107,53,0.35)] hover:shadow-[0_4px_16px_rgba(255,107,53,0.45)]"
            >
              Find a Pro
            </Button>
          </Link>

          {/* User dropdown (mock) */}
          <div className="relative ml-1">
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className={[
                'flex items-center gap-1.5 p-1 rounded-xl transition-all',
                navTransparent
                  ? 'hover:bg-white/10'
                  : 'hover:bg-primary/5',
              ].join(' ')}
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
              aria-label="Account menu"
            >
              <Avatar src={mockUser.avatar} name={mockUser.name} size="sm" statusDot="available" />
              <ChevronDown
                size={13}
                className={[
                  'transition-transform duration-200',
                  userMenuOpen ? 'rotate-180' : '',
                  navTransparent ? 'text-white/60' : 'text-muted',
                ].join(' ')}
              />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-card shadow-dropdown border border-border py-1.5"
                >
                  <div className="px-4 py-2.5 border-b border-border mb-1">
                    <p className="font-heading text-sm font-semibold text-primary">{mockUser.name}</p>
                    <p className="text-xs text-muted">{mockUser.email}</p>
                  </div>
                  {[
                    { icon: User, label: 'My Profile', href: '/profile' },
                    { icon: Bookmark, label: 'My Bookings', href: '/bookings' },
                  ].map(({ icon: Icon, label, href }) => (
                    <Link
                      key={href}
                      to={href}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-primary hover:bg-background transition-colors"
                    >
                      <Icon size={14} className="text-muted" />
                      {label}
                    </Link>
                  ))}
                  <div className="border-t border-border mt-1 pt-1">
                    <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile menu button ─────────────────────── */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={[
            'md:hidden p-2 rounded-lg transition-colors',
            navTransparent
              ? 'text-white/80 hover:bg-white/10'
              : 'text-primary hover:bg-primary/5',
          ].join(' ')}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden bg-white border-t border-border shadow-dropdown"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    [
                      'font-body text-sm font-medium px-3 py-2.5 rounded-lg transition-colors',
                      isActive ? 'text-accent bg-accent/8' : 'text-primary hover:bg-background',
                    ].join(' ')
                  }
                >
                  {link.label === 'Become a Professional' && (
                    <Hammer size={13} className="inline mr-1.5 mb-0.5 text-muted" />
                  )}
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-3 border-t border-border mt-2 flex flex-col gap-2.5">
                <Link to="/providers">
                  <Button variant="accent" size="md" fullWidth>
                    Find a Pro
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="md" fullWidth leftIcon={<User size={15} />}>
                    Log in
                  </Button>
                </Link>

                <div className="flex items-center gap-3 px-1 py-1 mt-1">
                  <Avatar src={mockUser.avatar} name={mockUser.name} size="sm" statusDot="available" />
                  <div className="flex-1">
                    <p className="font-body text-sm font-medium text-primary">{mockUser.name}</p>
                    <Badge variant="secondary" size="sm" dot>Available</Badge>
                  </div>
                  <Link to="/bookings">
                    <Button variant="ghost" size="xs" leftIcon={<Bookmark size={12} />}>
                      Bookings
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setUserMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
