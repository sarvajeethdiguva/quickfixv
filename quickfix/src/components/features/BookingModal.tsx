import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, ChevronLeft, Calendar, Clock, User, FileText } from 'lucide-react'
import type { Provider, BookingFormData, BookingStep } from '../../types'
import { Modal, Button, Input, Textarea, Badge, StarRating } from '../ui'

interface BookingModalProps {
  provider: Provider
  open: boolean
  onClose: () => void
}

const STEPS: BookingStep[] = ['service', 'schedule', 'details', 'confirm']
const stepLabels: Record<BookingStep, string> = {
  service: 'Select Service',
  schedule: 'Pick a Slot',
  details: 'Your Details',
  confirm: 'Confirm',
}
const stepIcons: Record<BookingStep, typeof Calendar> = {
  service: FileText,
  schedule: Calendar,
  details: User,
  confirm: CheckCircle2,
}

const defaultForm: BookingFormData = {
  serviceType: '',
  description: '',
  date: '',
  timeSlot: '',
  address: '',
  city: 'Bengaluru',
  customerName: 'Rohan Mehta',
  customerPhone: '+91 98765 43210',
  customerEmail: 'rohan@example.com',
  notes: '',
}

// Next 7 days
const getAvailableDates = () => {
  const dates: Date[] = []
  const today = new Date()
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d)
  }
  return dates
}

export default function BookingModal({ provider, open, onClose }: BookingModalProps) {
  const [step, setStep] = useState<BookingStep>('service')
  const [form, setForm] = useState<BookingFormData>(defaultForm)
  const [submitted, setSubmitted] = useState(false)
  const dates = getAvailableDates()

  const currentIndex = STEPS.indexOf(step)

  const update = (field: keyof BookingFormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }))

  const next = () => {
    const nextStep = STEPS[currentIndex + 1]
    if (nextStep) setStep(nextStep)
  }

  const back = () => {
    const prevStep = STEPS[currentIndex - 1]
    if (prevStep) setStep(prevStep)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep('service')
      setForm(defaultForm)
      setSubmitted(false)
    }, 300)
  }

  const selectedDay = provider.availability.find(
    (d) => d.day === new Date(form.date).toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3)
  )
  const availableSlots = selectedDay?.slots.filter((s) => s.available) ?? []

  const canProceed = {
    service: !!form.serviceType,
    schedule: !!form.date && !!form.timeSlot,
    details: !!form.address && !!form.customerName && !!form.customerPhone,
    confirm: true,
  }

  const totalCost = provider.hourlyRate * 2 // assume 2h min
  const serviceFee = Math.round(totalCost * 0.05)

  return (
    <Modal open={open} onClose={handleClose} size="md">
      {submitted ? (
        // ─── Success State ───────────────────────────────────────────────
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-5"
          >
            <CheckCircle2 size={40} className="text-secondary" />
          </motion.div>
          <h2 className="font-heading text-2xl font-bold text-primary mb-2">Booking Confirmed!</h2>
          <p className="text-muted mb-1">
            <span className="font-semibold text-primary">{provider.name}</span> will arrive on
          </p>
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
            {form.date} at {form.timeSlot}
          </Badge>
          <p className="text-sm text-muted mb-6 max-w-sm">
            A confirmation has been sent to <span className="text-primary font-medium">{form.customerEmail}</span>. You'll receive a call 30 minutes before the appointment.
          </p>
          <div className="flex gap-3 w-full">
            <Button variant="outline" size="md" fullWidth onClick={handleClose}>
              Done
            </Button>
            <Button variant="accent" size="md" fullWidth onClick={handleClose}>
              View Bookings
            </Button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* ─── Header + Stepper ────────────────────────────────────── */}
          <div className="-mx-6 -mt-6 px-6 pt-5 pb-4 border-b border-border mb-5">
            <div className="flex items-center gap-3 mb-4">
              {currentIndex > 0 && (
                <button
                  onClick={back}
                  className="p-1.5 rounded-lg hover:bg-background text-muted hover:text-primary transition-colors"
                  aria-label="Go back"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
              <div>
                <h2 className="font-heading text-lg font-bold text-primary">Book {provider.name}</h2>
                <p className="text-xs text-muted">Step {currentIndex + 1} of {STEPS.length} — {stepLabels[step]}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1.5">
              {STEPS.map((s, i) => {
                const Icon = stepIcons[s]
                const done = i < currentIndex
                const active = i === currentIndex
                return (
                  <div key={s} className="flex-1 flex flex-col gap-1">
                    <div
                      className={[
                        'h-1.5 rounded-full transition-all duration-300',
                        done ? 'bg-secondary' : active ? 'bg-accent' : 'bg-border',
                      ].join(' ')}
                    />
                    <div className="flex items-center gap-1">
                      <Icon
                        size={10}
                        className={[
                          done ? 'text-secondary' : active ? 'text-accent' : 'text-muted/40',
                        ].join(' ')}
                      />
                      <span className={['text-xs hidden sm:block', done || active ? 'text-primary/70' : 'text-muted/40'].join(' ')}>
                        {stepLabels[s]}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ─── Step Content ────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 'service' && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted">Select the service you need from {provider.name}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {provider.skills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => update('serviceType', skill)}
                        className={[
                          'flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all',
                          form.serviceType === skill
                            ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
                            : 'border-border bg-white hover:border-primary/30',
                        ].join(' ')}
                      >
                        <div
                          className={[
                            'w-4 h-4 rounded-full border-2 shrink-0 transition-colors',
                            form.serviceType === skill
                              ? 'border-accent bg-accent'
                              : 'border-border',
                          ].join(' ')}
                        />
                        <span className={['text-sm font-medium', form.serviceType === skill ? 'text-accent' : 'text-primary'].join(' ')}>
                          {skill}
                        </span>
                      </button>
                    ))}
                  </div>
                  <Textarea
                    label="Describe the issue (optional)"
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    placeholder="E.g. Kitchen tap is leaking near the base..."
                    rows={3}
                  />
                </div>
              )}

              {step === 'schedule' && (
                <div className="flex flex-col gap-4">
                  {/* Date picker */}
                  <div>
                    <p className="text-sm font-medium text-primary mb-2">Select Date</p>
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                      {dates.map((d) => {
                        const dateStr = d.toISOString().split('T')[0]
                        return (
                          <button
                            key={dateStr}
                            onClick={() => { update('date', dateStr); update('timeSlot', '') }}
                            className={[
                              'flex flex-col items-center p-3 rounded-xl border shrink-0 min-w-[72px] transition-all',
                              form.date === dateStr
                                ? 'border-accent bg-accent text-white'
                                : 'border-border bg-white hover:border-primary/30 text-primary',
                            ].join(' ')}
                          >
                            <span className="text-xs font-medium opacity-80">
                              {d.toLocaleDateString('en-IN', { weekday: 'short' })}
                            </span>
                            <span className="text-lg font-bold font-heading leading-none">
                              {d.getDate()}
                            </span>
                            <span className="text-xs opacity-70">
                              {d.toLocaleDateString('en-IN', { month: 'short' })}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  {form.date && (
                    <div>
                      <p className="text-sm font-medium text-primary mb-2">
                        Available Slots
                        {availableSlots.length === 0 && (
                          <span className="text-xs text-muted ml-2">(none available)</span>
                        )}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {provider.availability[0].slots.map((slot) => {
                          const isAvail = availableSlots.some((s) => s.time === slot.time)
                          return (
                            <button
                              key={slot.time}
                              disabled={!isAvail}
                              onClick={() => update('timeSlot', slot.time)}
                              className={[
                                'flex items-center justify-center gap-1.5 h-10 rounded-xl border text-sm transition-all',
                                form.timeSlot === slot.time
                                  ? 'border-accent bg-accent text-white'
                                  : isAvail
                                  ? 'border-border bg-white hover:border-primary/30 text-primary'
                                  : 'border-border bg-background text-muted/40 cursor-not-allowed',
                              ].join(' ')}
                            >
                              <Clock size={12} />
                              {slot.time}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 'details' && (
                <div className="flex flex-col gap-4">
                  <Input
                    label="Your Name"
                    value={form.customerName}
                    onChange={(e) => update('customerName', e.target.value)}
                    required
                    leftIcon={<User size={15} />}
                  />
                  <Input
                    label="Phone Number"
                    value={form.customerPhone}
                    onChange={(e) => update('customerPhone', e.target.value)}
                    required
                    type="tel"
                  />
                  <Input
                    label="Email"
                    value={form.customerEmail}
                    onChange={(e) => update('customerEmail', e.target.value)}
                    type="email"
                  />
                  <Textarea
                    label="Service Address"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    required
                    placeholder="Flat 4B, Brigade Gateway, Rajajinagar..."
                    rows={2}
                  />
                  <Textarea
                    label="Additional Notes (optional)"
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Gate code, parking instructions, pets at home..."
                    rows={2}
                  />
                </div>
              )}

              {step === 'confirm' && (
                <div className="flex flex-col gap-4">
                  {/* Provider summary */}
                  <div className="flex items-center gap-3 p-3 bg-background rounded-xl">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-heading font-bold text-primary text-sm">{provider.name}</p>
                      <StarRating rating={provider.rating} size={12} reviewCount={provider.reviewCount} />
                    </div>
                  </div>

                  {/* Summary rows */}
                  <div className="flex flex-col gap-2 text-sm">
                    {[
                      { label: 'Service', value: form.serviceType },
                      { label: 'Date & Time', value: `${form.date} at ${form.timeSlot}` },
                      { label: 'Address', value: form.address },
                      { label: 'Contact', value: form.customerPhone },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4">
                        <span className="text-muted shrink-0">{label}</span>
                        <span className="text-primary font-medium text-right">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  <div className="border border-border rounded-xl p-4 flex flex-col gap-2 mt-1">
                    <h4 className="font-heading font-semibold text-primary text-sm mb-1">Price Estimate</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Service (2 hrs × ₹{provider.hourlyRate})</span>
                      <span className="text-primary">₹{totalCost}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Platform fee (5%)</span>
                      <span className="text-primary">₹{serviceFee}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-border pt-2 mt-1">
                      <span className="text-primary">Total</span>
                      <span className="text-accent text-lg">₹{totalCost + serviceFee}</span>
                    </div>
                    <p className="text-xs text-muted">Final cost depends on actual time spent. Pay after service.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ─── Actions ─────────────────────────────────────────────── */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            {currentIndex > 0 && (
              <Button variant="outline" size="md" onClick={back} className="w-28">
                Back
              </Button>
            )}
            {step !== 'confirm' ? (
              <Button
                variant="accent"
                size="md"
                fullWidth
                onClick={next}
                disabled={!canProceed[step]}
              >
                Continue
              </Button>
            ) : (
              <Button variant="accent" size="md" fullWidth onClick={handleSubmit}>
                Confirm Booking
              </Button>
            )}
          </div>
        </>
      )}
    </Modal>
  )
}
