import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, fullWidth = true, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={['flex flex-col gap-1.5', fullWidth ? 'w-full' : ''].join(' ')}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium font-body text-primary">
            {label}
            {props.required && <span className="text-accent ml-0.5">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={[
            'w-full font-body text-sm text-primary placeholder:text-muted/70',
            'bg-white border rounded-button',
            'px-4 py-3 resize-y min-h-[100px]',
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
        />

        {(error || hint) && (
          <p className={['text-xs', error ? 'text-red-500' : 'text-muted'].join(' ')}>
            {error ?? hint}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
