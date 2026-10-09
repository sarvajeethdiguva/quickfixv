import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightElement?: ReactNode
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightElement, fullWidth = true, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={['flex flex-col gap-1.5', fullWidth ? 'w-full' : ''].join(' ')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium font-body text-primary"
          >
            {label}
            {props.required && <span className="text-accent ml-0.5" aria-label="required">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-muted pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full font-body text-sm text-primary placeholder:text-muted/70',
              'bg-white border rounded-button',
              'h-11 px-4',
              leftIcon ? 'pl-10' : '',
              rightElement ? 'pr-10' : '',
              error
                ? 'border-red-400 focus:ring-red-300'
                : 'border-border focus:border-primary/30 focus:ring-primary/20',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {rightElement && (
            <span className="absolute right-3.5 flex items-center">
              {rightElement}
            </span>
          )}
        </div>

        {(error || hint) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-hint`}
            className={['text-xs', error ? 'text-red-500' : 'text-muted'].join(' ')}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
