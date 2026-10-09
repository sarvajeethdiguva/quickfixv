import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, ShieldCheck, Clock, CreditCard, Star, Phone } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import { Button, Badge } from '../components/ui'

const steps = [
  {
    step: '01',
    icon: '🔍',
    title: 'Describe What You Need',
    description:
      'Tell us the service you need — plumbing, electrical, cleaning, AC repair, carpentry, or painting. Search by keyword or browse by category. Be as specific or brief as you like.',
    tip: 'Include a photo of the problem for faster matching.',
  },
  {
    step: '02',
    icon: '✅',
    title: 'Browse Verified Professionals',
    description:
      'See a curated list of background-checked, skill-verified professionals in your area. Read real reviews, check ratings, compare hourly rates, and view availability before choosing.',
    tip: 'Look for the "Top Rated" or "Verified" badge for extra confidence.',
  },
  {
    step: '03',
    icon: '📅',
    title: 'Book at Your Convenience',
    description:
      'Pick a date and time from the professional\'s real-time availability calendar. Instant confirmation — no phone tag, no waiting. You\'ll get an SMS & email confirmation.',
    tip: 'Book at least 2 hours in advance for same-day service.',
  },
  {
    step: '04',
    icon: '🏠',
    title: 'The Pro Comes to You',
    description:
      'Your professional arrives at your door at the scheduled time, fully equipped. They\'ll assess the job, confirm the scope of work, and get it done to the highest standard.',
    tip: 'You\'ll get a 30-minute heads-up call before arrival.',
  },
  {
    step: '05',
    icon: '💳',
    title: 'Pay After, Not Before',
    description:
      'Review the completed work at your own pace. Only pay once you\'re completely satisfied. Multiple payment options — UPI, card, net banking, or cash.',
    tip: 'Receipt and warranty certificate sent automatically.',
  },
]

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'Background Verified',
    description: 'Every professional is identity-verified, skill-tested, and background-checked before joining.',
  },
  {
    icon: Clock,
    title: 'On-Time or We Reimburse',
    description: 'If your pro is more than 30 minutes late without notice, we offer a full platform fee refund.',
  },
  {
    icon: CreditCard,
    title: 'Pay After Satisfaction',
    description: 'You never pay upfront. Funds are only released to the professional once you confirm the job is done.',
  },
  {
    icon: Star,
    title: '30-Day Quality Guarantee',
    description: 'Not happy with the work? We\'ll send another professional to re-do it free of charge within 30 days.',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description: 'Our support team is available around the clock for any issues, concerns, or emergencies.',
  },
]

const faqs = [
  {
    q: 'How are professionals vetted?',
    a: 'Every professional undergoes government ID verification, a police background check, skill assessment tests, and an in-person interview before they can list on QuickFix.',
  },
  {
    q: 'What if I\'m not satisfied with the service?',
    a: 'Contact us within 30 days and we\'ll send another verified professional to redo the work at no extra charge. We also offer partial or full refunds in cases of serious quality failures.',
  },
  {
    q: 'Can I reschedule or cancel a booking?',
    a: 'Yes — cancel or reschedule for free up to 2 hours before the appointment. Late cancellations (under 2 hours) may incur a small convenience fee.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'UPI, all major debit/credit cards, net banking, and cash. Payment is processed only after you confirm the job is complete.',
  },
  {
    q: 'Are prices fixed or negotiable?',
    a: 'Professionals set their own hourly rates, which are shown upfront. The final cost depends on actual time spent, and the pro will confirm the scope before starting.',
  },
]

export default function HowItWorksPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="accent" className="mb-4">Simple & Transparent</Badge>
            <h1 className="font-heading text-5xl font-extrabold text-white mb-4">
              How QuickFix Works
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Five simple steps from problem to fix. No hidden charges, no unpleasant surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="flex gap-6 bg-white rounded-card shadow-card p-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center text-2xl shrink-0 mb-3">
                    <span aria-hidden="true">{step.icon}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 w-0.5 bg-border mt-2" aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading text-xs font-bold text-muted/50 tracking-widest">{step.step}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-3">{step.description}</p>
                  <div className="flex items-start gap-2 text-xs text-secondary bg-secondary/8 px-3 py-2 rounded-lg">
                    <span>💡</span>
                    <span>{step.tip}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">Our Promises</Badge>
            <h2 className="font-heading text-3xl font-bold text-primary">
              The QuickFix Guarantee
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guarantees.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="bg-background rounded-card p-5 flex flex-col gap-3"
              >
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Icon size={20} className="text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-primary">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="primary" className="mb-3">FAQ</Badge>
            <h2 className="font-heading text-3xl font-bold text-primary">Common Questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group bg-white rounded-card shadow-card p-5 cursor-pointer"
              >
                <summary className="font-heading font-bold text-primary flex items-center justify-between list-none">
                  {faq.q}
                  <ArrowRight size={16} className="text-muted group-open:rotate-90 transition-transform duration-200 shrink-0 ml-2" />
                </summary>
                <p className="text-sm text-muted mt-3 leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-extrabold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/70 mb-7">
            Join thousands of happy homeowners who trust QuickFix every day.
          </p>
          <Link to="/services">
            <Button variant="accent" size="xl" rightIcon={<ArrowRight size={18} />}>
              Book a Service Now
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
