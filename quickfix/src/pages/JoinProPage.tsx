import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  CheckCircle2, ArrowRight, Hammer, Star, Shield, TrendingUp, Calendar,
} from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import { Button, Badge, Input } from '../components/ui'

const benefits = [
  { icon: TrendingUp, title: 'Earn more', body: 'Set your own rate. Top pros earn ₹45,000+ per month on our platform.' },
  { icon: Calendar, title: 'Work flexibly', body: "Choose your hours and service area. You're in control of your schedule." },
  { icon: Star, title: 'Build your reputation', body: 'Get genuine, verified customer reviews that help you grow faster.' },
  { icon: Shield, title: "We've got your back", body: 'Dedicated professional support, job dispute resolution, and payment protection.' },
]

export default function JoinProPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <Badge variant="accent" className="mb-4">For Professionals</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Grow your trade business with QuickFix.
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Join 2,500+ verified professionals already earning more and working on their own terms.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#apply">
                <Button variant="accent" size="lg" leftIcon={<Hammer size={16} />}>
                  Apply to Join
                </Button>
              </a>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  How it works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-8 text-center">
            Everything you need to succeed
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="bg-white rounded-card shadow-card p-5"
              >
                <div className="w-10 h-10 bg-accent/8 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={18} className="text-accent" />
                </div>
                <h3 className="font-heading font-bold text-primary mb-1">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="py-16 bg-white border-t border-border">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">Apply to join QuickFix</h2>
            <p className="text-muted text-sm">Fill in your details and our team will be in touch within 48 hours.</p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white rounded-card shadow-card p-6 flex flex-col gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full name" placeholder="Rajesh Kumar" required />
              <Input label="Phone" type="tel" placeholder="+91 98765 43210" required />
            </div>
            <Input label="Email" type="email" placeholder="rajesh@example.com" required />
            <div>
              <label className="text-sm font-medium font-body text-primary block mb-1.5">
                Trade / Skill <span className="text-accent">*</span>
              </label>
              <select className="w-full h-11 px-4 text-sm font-body text-primary border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/30 bg-white">
                <option value="">Select your trade</option>
                {['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'AC Repair'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <Input label="Years of experience" type="number" placeholder="5" required />

            <div className="pt-2">
              {['I confirm all my details are accurate', 'I agree to QuickFix Terms of Service'].map((label) => (
                <label key={label} className="flex items-start gap-2.5 text-sm text-muted mb-3 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 accent-accent" />
                  {label}
                </label>
              ))}
            </div>

            <Button type="submit" variant="accent" size="lg" fullWidth rightIcon={<ArrowRight size={16} />}>
              Submit Application
            </Button>
            <p className="text-xs text-muted text-center">
              We review every application within 48 hours.
              <br />Only the top 15% of applicants are accepted.
            </p>
          </form>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-14 bg-background">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-primary mb-6">What we look for</h2>
          <div className="flex flex-col gap-3 text-left">
            {[
              'Valid government-issued ID (Aadhaar, PAN, or passport)',
              'Minimum 2 years of professional experience in your trade',
              'Clean background check (we conduct this during onboarding)',
              'Smartphone with internet access for managing bookings',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl shadow-card px-4 py-3">
                <CheckCircle2 size={16} className="text-secondary mt-0.5 shrink-0" />
                <span className="text-sm text-primary/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
