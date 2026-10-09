import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'primary' | 'accent' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-border/60 text-muted',
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent-600',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  error: 'bg-red-50 text-red-600',
  outline: 'bg-transparent border border-border text-muted',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-muted',
  primary: 'bg-primary',
  accent: 'bg-accent',
  secondary: 'bg-secondary',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  outline: 'bg-muted',
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-body font-medium rounded-badge whitespace-nowrap',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {dot && (
        <span
          className={[
            'rounded-full shrink-0',
            size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
            dotColors[variant],
          ].join(' ')}
        />
      )}
      {children}
    </span>
  )
}
