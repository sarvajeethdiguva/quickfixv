/**
 * QuickFix – Premium Landing Page
 * All sections designed to production-quality editorial standard.
 */
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'motion/react'
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  CreditCard,
  BadgeCheck,
  Star,
  MapPin,
  Zap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Users,
  Hammer,
  Phone,
  Quote,
} from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import HeroSearch from '../components/features/HeroSearch'
import { serviceIconMap } from '../components/features/ServiceIcons'
import { Button, Badge, StarRating, Avatar } from '../components/ui'
import { categories } from '../data/categories'
import { getFeaturedProviders } from '../data/providers'
import { testimonials, stats } from '../data/testimonials'

/* ─────────────────────────── EASING CONSTANTS ───────────────────────── */
const EASE = [0.4, 0, 0.2, 1] as const
const EASE_OUT = [0, 0, 0.2, 1] as const

/* ─────────────────────────── STATIC DATA ────────────────────────────── */
const featuredProviders = getFeaturedProviders().slice(0, 3)

const howItWorksSteps = [
  {
    n: '01',
    title: 'Describe your need',
    body: 'Tell us the service you need or search by category. Be as brief or detailed as you like.',
    accent: '#E8EDF4',
    icon: MapPin,
  },
  {
    n: '02',
    title: 'Choose a professional',
    body: 'Browse verified, rated professionals in your area. Compare prices, read reviews, and pick the right fit.',
    accent: '#FFF0EB',
    icon: Star,
  },
  {
    n: '03',
    title: 'Book and get it done',
    body: 'Select a time slot that works for you. Your pro arrives, does the job, and you pay only when satisfied.',
    accent: '#E8F5F2',
    icon: CheckCircle2,
  },
]

const trustPillars = [
  {
    icon: ShieldCheck,
    headline: 'Background Checked',
    body: 'Every professional is identity-verified and passes a thorough background screening before joining QuickFix.',
    color: 'text-secondary',
    bg: 'bg-secondary/8',
  },
  {
    icon: BadgeCheck,
    headline: 'Skill Verified',
    body: 'Our experts pass hands-on assessments in their trade. Only the top 15% of applicants are accepted.',
    color: 'text-primary',
    bg: 'bg-primary/8',
  },
  {
    icon: Clock,
    headline: 'On-Time Guarantee',
    body: 'Your pro arrives at the agreed time or we reschedule at no extra cost and refund the platform fee.',
    color: 'text-accent',
    bg: 'bg-accent/8',
  },
  {
    icon: CreditCard,
    headline: 'Pay After Service',
    body: 'You never pay upfront. Funds are released to the professional only after you confirm the job is done well.',
    color: 'text-secondary',
    bg: 'bg-secondary/8',
  },
]

const whyItems = [
  { stat: '15 min', label: 'Average booking time', sub: 'From search to confirmed slot' },
  { stat: '4.8★', label: 'Average pro rating', sub: 'Across 50,000+ completed jobs' },
  { stat: '₹0', label: 'Upfront payment', sub: 'Pay only after the job is done' },
  { stat: '30 day', label: 'Quality guarantee', sub: 'We redo the job if you\'re not happy' },
]

/* ─────────────────────────── MOTION HELPERS ─────────────────────────── */
const fadeUp = (delay = 0, amount = 24) => ({
  initial: { opacity: 0, y: amount },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease: EASE },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: EASE },
})

/* ─────────────────────────── SECTION LABEL ─────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold tracking-widest uppercase text-accent">
      <span className="w-5 h-px bg-accent/60" aria-hidden="true" />
      {children}
    </span>
  )
}

/* ─────────────────────────── HERO SECTION ───────────────────────────── */
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  // Subtle image parallax — moves slower than the scroll
  const imgY = useTransform(scrollY, [0, 600], [0, 80])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-primary"
      aria-label="Hero"
    >
      {/* ── Subtle texture ── */}
      <div className="absolute inset-0 bg-noise opacity-[0.35] pointer-events-none" aria-hidden="true" />

      {/* ── Grid line decoration ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── Radial glow ── */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(22,133,107,0.10) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center min-h-[100dvh] pt-24 pb-16 lg:pt-0">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                <div className="flex -space-x-1">
                  {['PriyaM', 'KiranR', 'Anjana'].map((seed) => (
                    <img
                      key={seed}
                      src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`}
                      alt=""
                      className="w-5 h-5 rounded-full ring-1 ring-white/30"
                      loading="eager"
                    />
                  ))}
                </div>
                <span className="font-body text-xs font-medium text-white/80">
                  Trusted by <strong className="text-white">50,000+</strong> homeowners
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
              className="font-heading text-[2.8rem] sm:text-[3.6rem] lg:text-[3.8rem] xl:text-[4.2rem] font-extrabold text-white leading-[1.05] mb-5 text-balance"
            >
              Your home deserves{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent">the right hands.</span>
                {/* Underline stroke */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent/40 rounded-full origin-left"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
              className="text-[1.06rem] text-white/65 leading-relaxed mb-9 max-w-[480px] text-pretty"
            >
              Find trusted, background-checked plumbers, electricians, carpenters, painters,
              cleaners, and AC technicians. Book in minutes. Pay after the job is done.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.17, ease: EASE }}
              className="mb-7"
            >
              <HeroSearch />
            </motion.div>

            {/* Popular searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="flex flex-wrap items-center gap-x-2 gap-y-1.5"
            >
              <span className="text-[13px] text-white/40 font-body">Popular:</span>
              {['Pipe leak', 'AC service', 'Deep cleaning', 'Electrician'].map((tag) => (
                <Link
                  key={tag}
                  to={`/providers?q=${encodeURIComponent(tag)}`}
                  className="text-[13px] text-white/60 hover:text-white transition-colors underline underline-offset-2 decoration-white/20 hover:decoration-white/60"
                >
                  {tag}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Photo composition ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[480px] lg:max-w-none lg:w-[90%] xl:w-[95%]">

              {/* Main photo */}
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/4.5] lg:aspect-[4/5]">
                <motion.img
                  style={{ y: imgY }}
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85&auto=format&fit=crop"
                  alt="Professional plumber working on pipes under a sink"
                  className="parallax-img w-full h-[115%] object-cover object-center -mt-4"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Dark gradient overlay at bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(23,43,77,0.55) 0%, rgba(23,43,77,0.12) 40%, transparent 65%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* ── Floating: Rating card ── */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
                className="absolute -left-4 sm:-left-8 top-8 bg-white rounded-[16px] shadow-modal px-4 py-3 flex items-center gap-3 min-w-[168px]"
              >
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <Star size={18} className="text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <p className="font-heading text-lg font-extrabold text-primary leading-none">4.9</p>
                  <p className="text-[11px] text-muted font-body mt-0.5">Average rating</p>
                </div>
              </motion.div>

              {/* ── Floating: Verified count ── */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
                className="absolute -right-4 sm:-right-8 top-24 bg-white rounded-[16px] shadow-modal px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="font-heading text-lg font-extrabold text-primary leading-none">2,500+</p>
                  <p className="text-[11px] text-muted font-body mt-0.5">Verified pros</p>
                </div>
              </motion.div>

              {/* ── Floating: Recent booking ── */}
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
                className="absolute left-4 right-4 bottom-5 bg-white/95 backdrop-blur-sm rounded-[14px] px-4 py-3 flex items-center gap-3"
              >
                <Avatar
                  src="https://api.dicebear.com/8.x/avataaars/svg?seed=Rajesh&backgroundColor=b6e3f4"
                  name="Rajesh K."
                  size="sm"
                  statusDot="available"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-bold text-primary truncate">Rajesh Kumar</p>
                  <p className="text-[11px] text-muted truncate">Plumber · Koramangala</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading text-sm font-bold text-primary">₹450<span className="text-muted font-normal text-xs">/hr</span></p>
                  <div className="flex items-center gap-0.5 justify-end mt-0.5">
                    {[1,2,3,4,5].map(n => (
                      <Star key={n} size={10} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none" className="w-full">
          <path d="M0 64L1440 64L1440 30C1200 64 960 0 720 32C480 64 240 0 0 32L0 64Z" fill="#F8F6F1" />
        </svg>
      </div>
    </section>
  )
}

/* ─────────────────────────── TRUST STRIP ────────────────────────────── */
function TrustStrip() {
  const items = [
    { icon: ShieldCheck, text: 'Background-checked professionals' },
    { icon: BadgeCheck, text: 'Transparent, upfront estimates' },
    { icon: Zap, text: 'Book in under 5 minutes' },
    { icon: Star, text: '4.8★ average customer rating' },
  ]
  return (
    <section
      aria-label="Trust indicators"
      className="bg-white border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4">
          {items.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              {...fadeIn(i * 0.06)}
              className="flex items-center gap-2"
            >
              <Icon size={15} className="text-accent shrink-0" />
              <span className="text-sm font-body text-primary/75 whitespace-nowrap">{text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── STATS ROW ─────────────────────────────── */
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 bg-background" aria-label="Platform statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              className="flex flex-col items-center text-center"
            >
              <span
                className="stat-number font-heading text-[2.6rem] sm:text-[3rem] font-extrabold text-primary leading-none mb-1"
                aria-label={s.value}
              >
                {s.value}
              </span>
              <span className="text-sm text-muted font-body">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── SERVICES SECTION ───────────────────────── */
function ServicesSection() {
  const serviceColors: Record<string, { bg: string; text: string; border: string }> = {
    plumbing:    { bg: '#EBF0F8', text: '#172B4D', border: '#C5D1E3' },
    electrical:  { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
    carpentry:   { bg: '#EDE9FE', text: '#5B21B6', border: '#C4B5FD' },
    painting:    { bg: '#FCE7F3', text: '#9D174D', border: '#F9A8D4' },
    cleaning:    { bg: '#E8F5F2', text: '#065F46', border: '#96D4C8' },
    'ac-repair': { bg: '#E0F2FE', text: '#075985', border: '#7DD3FC' },
  }

  return (
    <section className="py-20 bg-background" aria-label="Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <motion.div {...fadeUp(0)} className="mb-3">
              <SectionLabel>What we offer</SectionLabel>
            </motion.div>
            <motion.h2
              {...fadeUp(0.05)}
              className="font-heading text-3xl sm:text-4xl font-extrabold text-primary text-balance"
            >
              Every home service,<br className="hidden sm:block" /> one trusted platform.
            </motion.h2>
          </div>
          <motion.div {...fadeUp(0.08)} className="shrink-0">
            <Link to="/services">
              <Button variant="outline" size="md" rightIcon={<ArrowRight size={15} />}>
                View all services
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const palette = serviceColors[cat.id] ?? serviceColors.plumbing
            const Icon = serviceIconMap[cat.id]
            return (
              <motion.div
                key={cat.id}
                {...fadeUp(i * 0.06)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className="service-card-hover"
              >
                <Link
                  to={`/services/${cat.id}`}
                  className="group relative flex flex-col bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 h-full overflow-hidden"
                  aria-label={`Browse ${cat.name} services`}
                >
                  {/* Decorative corner gradient */}
                  <div
                    className="absolute top-0 right-0 w-28 h-28 opacity-30 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${palette.bg} 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: palette.bg, color: palette.text }}
                  >
                    {Icon && <Icon size={24} />}
                  </div>

                  {/* Content */}
                  <h3
                    className="font-heading text-[1.05rem] font-bold mb-1.5 group-hover:text-accent transition-colors duration-200"
                    style={{ color: '#172B4D' }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-5 flex-1 line-clamp-2">
                    {cat.description}
                  </p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Users size={11} />
                        {cat.totalProviders} pros
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        {cat.avgRating}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-secondary">
                      from ₹{cat.startingPrice}
                    </span>
                  </div>

                  {/* Hover arrow */}
                  <span className="absolute top-5 right-5 text-muted/30 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── HOW IT WORKS ───────────────────────────── */
function HowItWorksSection() {
  return (
    <section className="py-20 bg-white" aria-label="How it works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Left: photo */}
          <motion.div
            {...fadeUp(0)}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-[24px] overflow-hidden aspect-[3/4] sm:aspect-square lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=780&q=85&auto=format&fit=crop"
                alt="Electrician installing wiring in a home"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(23,43,77,0.08) 0%, transparent 50%)' }}
                aria-hidden="true"
              />
            </div>

            {/* Floating jobs-done pill */}
            <motion.div
              {...fadeUp(0.3)}
              className="absolute -right-4 sm:-right-6 bottom-10 bg-primary text-white rounded-[14px] px-5 py-3.5 shadow-modal"
            >
              <p className="font-heading text-2xl font-extrabold leading-none">50,000+</p>
              <p className="text-[11px] text-white/65 font-body mt-0.5">jobs completed</p>
            </motion.div>

            {/* Floating check pill */}
            <motion.div
              {...fadeUp(0.4)}
              className="absolute -left-4 sm:-left-6 top-10 bg-secondary text-white rounded-[14px] px-4 py-2.5 shadow-modal flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span className="text-xs font-body font-semibold">Quality guaranteed</span>
            </motion.div>
          </motion.div>

          {/* Right: steps */}
          <div className="order-1 lg:order-2">
            <motion.div {...fadeUp(0)} className="mb-3">
              <SectionLabel>Simple process</SectionLabel>
            </motion.div>
            <motion.h2
              {...fadeUp(0.05)}
              className="font-heading text-3xl sm:text-4xl font-extrabold text-primary mb-3 text-balance"
            >
              From search to job done in minutes.
            </motion.h2>
            <motion.p
              {...fadeUp(0.08)}
              className="text-muted mb-10 max-w-sm leading-relaxed"
            >
              Setting up a booking takes less than five minutes.
              No calls, no waiting, no haggling.
            </motion.p>

            <div className="flex flex-col gap-6">
              {howItWorksSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.n}
                    {...fadeUp(0.05 + i * 0.08)}
                    className="flex gap-5"
                  >
                    {/* Step connector */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                        style={{ backgroundColor: step.accent }}
                      >
                        <Icon size={18} className="text-primary" />
                      </div>
                      {i < howItWorksSteps.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-2 mb-0 min-h-[24px]" aria-hidden="true" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="pb-6">
                      <span className="font-heading text-[11px] font-bold text-muted/50 tracking-widest uppercase">
                        Step {step.n}
                      </span>
                      <h3 className="font-heading text-base font-bold text-primary mt-0.5 mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">{step.body}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div {...fadeUp(0.3)} className="mt-6">
              <Link to="/how-it-works">
                <Button variant="outline" size="md" rightIcon={<ArrowRight size={15} />}>
                  Learn more
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── FEATURED PROFESSIONALS ────────────────── */
function FeaturedProsSection() {
  const statusLabel: Record<string, string> = {
    available: 'Available now',
    busy: 'Currently busy',
    offline: 'Offline',
  }
  const statusColor: Record<string, string> = {
    available: 'text-secondary bg-secondary/10',
    busy: 'text-amber-600 bg-amber-50',
    offline: 'text-muted bg-border/60',
  }

  return (
    <section className="py-20 bg-background" aria-label="Featured professionals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <motion.div {...fadeUp(0)} className="mb-3">
              <SectionLabel>Top professionals</SectionLabel>
            </motion.div>
            <motion.h2
              {...fadeUp(0.05)}
              className="font-heading text-3xl sm:text-4xl font-extrabold text-primary text-balance"
            >
              Meet our highest-rated pros.
            </motion.h2>
            <motion.p {...fadeUp(0.08)} className="text-muted mt-2 max-w-sm">
              Handpicked for excellence. Background-checked and loved by thousands of customers.
            </motion.p>
          </div>
          <motion.div {...fadeUp(0.1)} className="shrink-0">
            <Link to="/providers">
              <Button variant="outline" size="md" rightIcon={<ArrowRight size={15} />}>
                View all professionals
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Demo data notice */}
        <motion.div {...fadeIn(0.05)} className="mb-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-body text-muted bg-border/40 border border-border px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-muted rounded-full" aria-hidden="true" />
            Demonstration data — fictional professionals for preview purposes
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProviders.map((pro, i) => (
            <motion.div
              key={pro.id}
              {...fadeUp(i * 0.08)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                to={`/provider/${pro.id}`}
                className="group flex flex-col bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-300 p-5 h-full"
              >
                {/* Top row */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar
                    src={pro.avatar}
                    name={pro.name}
                    size="lg"
                    statusDot={pro.status}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="font-heading text-base font-bold text-primary truncate group-hover:text-accent transition-colors">
                        {pro.name}
                      </h3>
                      {pro.verified && (
                        <CheckCircle2 size={14} className="text-secondary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted capitalize mb-2">
                      {pro.category.replace('-', ' ')} · {pro.yearsExp}y exp
                    </p>
                    <StarRating rating={pro.rating} size={12} reviewCount={pro.reviewCount} />
                  </div>
                </div>

                {/* Status + badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span
                    className={[
                      'inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-badge',
                      statusColor[pro.status],
                    ].join(' ')}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                    {statusLabel[pro.status]}
                  </span>
                  {pro.badges.slice(0, 1).map((b) => (
                    <Badge key={b} variant="primary" size="sm">{b}</Badge>
                  ))}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Jobs', value: pro.completedJobs.toLocaleString() },
                    { label: 'Response', value: `~${pro.responseTimeMin}m` },
                    { label: 'Distance', value: `${pro.distanceKm}km` },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center bg-background rounded-xl py-2.5 px-1"
                    >
                      <span className="font-heading text-sm font-bold text-primary">{value}</span>
                      <span className="text-[10px] text-muted mt-0.5">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <div>
                    <span className="font-heading text-xl font-extrabold text-primary">₹{pro.hourlyRate}</span>
                    <span className="text-xs text-muted"> /hr</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-2 transition-all duration-200">
                    View profile
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── WHY QUICKFIX ───────────────────────────── */
function WhySection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden" aria-label="Why QuickFix">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.div {...fadeUp(0)} className="mb-3">
            <SectionLabel>
              <span className="text-accent/80">Why choose us</span>
            </SectionLabel>
          </motion.div>
          <motion.h2
            {...fadeUp(0.05)}
            className="font-heading text-3xl sm:text-4xl font-extrabold text-white text-balance"
          >
            Built around your trust.
          </motion.h2>
          <motion.p
            {...fadeUp(0.08)}
            className="text-white/55 mt-3 max-w-md mx-auto"
          >
            We built QuickFix because home repairs shouldn't be stressful, expensive, or uncertain.
          </motion.p>
        </div>

        {/* 4 numbered metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {whyItems.map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp(i * 0.07)}
              className="bg-white/7 border border-white/10 rounded-card p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-200"
            >
              <span className="font-heading text-[2.2rem] font-extrabold text-white stat-number leading-none mb-1">
                {item.stat}
              </span>
              <span className="font-heading text-sm font-semibold text-white/80 mb-1">{item.label}</span>
              <span className="text-xs text-white/40 leading-snug">{item.sub}</span>
            </motion.div>
          ))}
        </div>

        {/* Trust pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.headline}
                {...fadeUp(0.05 + i * 0.07)}
                className="bg-white rounded-card p-5 flex flex-col gap-3"
              >
                <div className={['w-10 h-10 rounded-xl flex items-center justify-center', p.bg].join(' ')}>
                  <Icon size={20} className={p.color} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-primary mb-1">{p.headline}</h3>
                  <p className="text-xs text-muted leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── TESTIMONIALS ───────────────────────────── */
function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const pageSize = 3
  const pages = Math.ceil(testimonials.length / pageSize)
  const shown = testimonials.slice(active * pageSize, active * pageSize + pageSize)

  return (
    <section className="py-20 bg-background" aria-label="Customer testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 mb-12">
          <div>
            <motion.div {...fadeUp(0)} className="mb-3">
              <SectionLabel>Customer stories</SectionLabel>
            </motion.div>
            <motion.h2
              {...fadeUp(0.05)}
              className="font-heading text-3xl sm:text-4xl font-extrabold text-primary text-balance"
            >
              Hear it from our customers.
            </motion.h2>
            <motion.div {...fadeUp(0.08)} className="flex items-center gap-2 mt-3">
              <div className="flex -space-x-1.5">
                {testimonials.slice(0, 4).map((t) => (
                  <Avatar key={t.id} src={t.avatar} name={t.name} size="xs" className="ring-2 ring-white" />
                ))}
              </div>
              <StarRating rating={4.9} size={13} showValue reviewCount={undefined} />
              <span className="text-xs text-muted">from 50,000+ reviews</span>
            </motion.div>
          </div>

          {/* Pagination arrows */}
          {pages > 1 && (
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActive((a) => Math.max(a - 1, 0))}
                disabled={active === 0}
                aria-label="Previous testimonials"
                className="w-10 h-10 rounded-button border border-border bg-white flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActive((a) => Math.min(a + 1, pages - 1))}
                disabled={active === pages - 1}
                aria-label="Next testimonials"
                className="w-10 h-10 rounded-button border border-border bg-white flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {shown.map((t, i) => (
            <motion.div
              key={t.id}
              {...fadeUp(i * 0.07)}
              className="bg-white rounded-card shadow-card p-6 flex flex-col"
            >
              {/* Quote mark */}
              <Quote size={28} className="text-accent/20 mb-4 shrink-0" />

              {/* Comment */}
              <p className="text-sm text-primary/75 leading-relaxed mb-5 flex-1 line-clamp-4">
                {t.comment}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Avatar src={t.avatar} name={t.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-bold text-primary">{t.name}</p>
                  <p className="text-xs text-muted truncate">{t.location}</p>
                </div>
                <div className="text-right shrink-0">
                  <StarRating rating={t.rating} size={11} showValue={false} />
                  <Badge variant="secondary" size="sm" className="mt-1">{t.service}</Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        {pages > 1 && (
          <div className="flex justify-center gap-1.5 mt-8">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to page ${i + 1}`}
                className={[
                  'rounded-full transition-all duration-200',
                  active === i ? 'w-5 h-2 bg-accent' : 'w-2 h-2 bg-border hover:bg-muted/40',
                ].join(' ')}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ─────────────────────────── PRO SIGN-UP CTA ────────────────────────── */
function ProCTASection() {
  return (
    <section className="py-20 bg-white border-y border-border" aria-label="Join as a professional">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <motion.div {...fadeUp(0)} className="mb-3">
              <SectionLabel>For professionals</SectionLabel>
            </motion.div>
            <motion.h2
              {...fadeUp(0.05)}
              className="font-heading text-3xl sm:text-4xl font-extrabold text-primary mb-4 text-balance"
            >
              Are you a skilled tradesperson? Grow your business with QuickFix.
            </motion.h2>
            <motion.p {...fadeUp(0.08)} className="text-muted leading-relaxed mb-8 max-w-md">
              Join 2,500+ verified professionals already earning more, working flexibly,
              and building a loyal client base through our platform. No subscription fees —
              you only pay when you win a job.
            </motion.p>

            {/* Benefits list */}
            <motion.ul {...fadeUp(0.1)} className="flex flex-col gap-3 mb-8">
              {[
                'Set your own schedule and hourly rate',
                'Get matched with customers in your area',
                'Build your verified profile and reviews',
                'Free to join — no monthly subscription',
              ].map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-primary/80">
                  <span className="w-5 h-5 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} className="text-secondary" />
                  </span>
                  {b}
                </li>
              ))}
            </motion.ul>

            <motion.div {...fadeUp(0.15)} className="flex flex-wrap gap-3">
              <Link to="/join-pro">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Hammer size={16} />}
                >
                  Join as a Professional
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg">
                  Learn more
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: photo + stats */}
          <motion.div {...fadeUp(0.1)} className="relative">
            <div className="rounded-[24px] overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1542013936693-884638332954?w=780&q=85&auto=format&fit=crop"
                alt="Professional carpenter at work with tools"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* Floating earnings card */}
            <motion.div
              {...fadeUp(0.3)}
              className="absolute -bottom-5 -left-4 sm:-left-8 bg-white rounded-[16px] shadow-modal px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Phone size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="font-heading text-lg font-extrabold text-primary leading-none">₹45,000</p>
                  <p className="text-[11px] text-muted mt-0.5">Avg. monthly earnings</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── BOTTOM CTA ────────────────────────────── */
function BottomCTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden" aria-label="Get started">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.10) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(22,133,107,0.10) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div {...fadeUp(0)} className="mb-5">
          <SectionLabel>
            <span className="text-accent/70">Ready to start?</span>
          </SectionLabel>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white mb-4 text-balance leading-[1.08]"
        >
          Your home deserves the best care.
        </motion.h2>
        <motion.p
          {...fadeUp(0.08)}
          className="text-white/60 text-[1.05rem] leading-relaxed mb-9 max-w-md mx-auto"
        >
          Join 50,000+ homeowners who rely on QuickFix for professional, reliable home services — right when they need them.
        </motion.p>
        <motion.div
          {...fadeUp(0.12)}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to="/services">
            <Button
              variant="accent"
              size="xl"
              rightIcon={<ArrowRight size={18} />}
              className="shadow-[0_4px_20px_rgba(255,107,53,0.4)]"
            >
              Book a Service
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button
              variant="outline"
              size="xl"
              className="border-white/25 text-white hover:bg-white/10 hover:border-white/40"
            >
              How it works
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────── PAGE ENTRY POINT ───────────────────────── */
export default function HomePage() {
  return (
    <PageLayout noTopPad>
      <HeroSection />
      <TrustStrip />
      <StatsSection />
      <ServicesSection />
      <HowItWorksSection />
      <FeaturedProsSection />
      <WhySection />
      <TestimonialsSection />
      <ProCTASection />
      <BottomCTASection />
    </PageLayout>
  )
}
