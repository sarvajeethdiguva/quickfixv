import { Link } from 'react-router-dom'
import { Wrench, Twitter, Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react'

const serviceLinks = [
  { label: 'Plumbing', href: '/services/plumbing' },
  { label: 'Electrical', href: '/services/electrical' },
  { label: 'Carpentry', href: '/services/carpentry' },
  { label: 'Painting', href: '/services/painting' },
  { label: 'Cleaning', href: '/services/cleaning' },
  { label: 'AC Repair', href: '/services/ac-repair' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Press', href: '/press' },
]

const supportLinks = [
  { label: 'Help Centre', href: '/help' },
  { label: 'Safety', href: '/safety' },
  { label: 'Trust & Safety', href: '/trust' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
]

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                <Wrench size={18} className="text-accent" />
              </div>
              <span className="font-heading text-2xl font-bold text-white">
                Quick<span className="text-accent">Fix</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Connecting you with trusted, verified home service professionals. Fast booking, fair prices, guaranteed quality.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:hello@quickfix.in" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} className="text-accent shrink-0" />
                hello@quickfix.in
              </a>
              <a href="tel:+918001234567" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} className="text-accent shrink-0" />
                +91 800 123 4567
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-accent shrink-0" />
                Bengaluru, India
              </span>
            </div>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-white/15 hover:text-white transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="flex flex-col gap-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} QuickFix Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Made with ❤️ in Bengaluru, India</p>
        </div>
      </div>
    </footer>
  )
}
