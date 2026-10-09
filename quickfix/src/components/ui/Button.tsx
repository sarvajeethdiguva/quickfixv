import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-700 active:bg-primary-900 shadow-sm hover:shadow-md',
  secondary:
    'bg-secondary text-white hover:bg-secondary-700 active:bg-secondary-800 shadow-sm hover:shadow-md',
  accent:
    'bg-accent text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm hover:shadow-md',
  outline:
    'border border-border bg-white text-primary hover:border-primary hover:bg-primary/5 active:bg-primary/10',
  ghost:
    'bg-transparent text-primary hover:bg-primary/5 active:bg-primary/10',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow-md',
}

const sizeClasses: Record<Size, string> = {
  xs: 'h-7 px-3 text-xs gap-1',
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
  xl: 'h-14 px-8 text-base gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        whileHover={!isDisabled ? { scale: 1.01 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-body font-medium',
          'rounded-button transition-all duration-200 select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...(props as object)}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
