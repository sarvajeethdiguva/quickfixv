import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, fullWidth = true, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={['flex flex-col gap-1.5', fullWidth ? 'w-full' : ''].join(' ')}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium font-body text-primary">
            {label}
            {props.required && <span className="text-accent ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={[
              'w-full appearance-none font-body text-sm text-primary',
              'bg-white border rounded-button',
              'h-11 px-4 pr-10',
              error
                ? 'border-red-400 focus:ring-red-300'
                : 'border-border focus:border-primary/30 focus:ring-primary/20',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
        </div>

        {(error || hint) && (
          <p className={['text-xs', error ? 'text-red-500' : 'text-muted'].join(' ')}>
            {error ?? hint}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
