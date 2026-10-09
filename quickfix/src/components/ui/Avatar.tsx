interface AvatarProps {
  src?: string
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  statusDot?: 'available' | 'busy' | 'offline'
}

const sizeMap = {
  xs: { container: 'w-7 h-7', text: 'text-xs', dot: 'w-2 h-2' },
  sm: { container: 'w-9 h-9', text: 'text-xs', dot: 'w-2.5 h-2.5' },
  md: { container: 'w-12 h-12', text: 'text-sm', dot: 'w-3 h-3' },
  lg: { container: 'w-16 h-16', text: 'text-lg', dot: 'w-3.5 h-3.5' },
  xl: { container: 'w-24 h-24', text: 'text-2xl', dot: 'w-4 h-4' },
}

const statusColors = {
  available: 'bg-secondary',
  busy: 'bg-amber-400',
  offline: 'bg-muted',
}

export default function Avatar({ src, name, size = 'md', className = '', statusDot }: AvatarProps) {
  const { container, text, dot } = sizeMap[size]
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className={['relative shrink-0', className].join(' ')}>
      <div
        className={[
          'rounded-full overflow-hidden bg-primary/10 flex items-center justify-center',
          container,
        ].join(' ')}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className={['font-heading font-bold text-primary', text].join(' ')}>
            {initials}
          </span>
        )}
      </div>

      {statusDot && (
        <span
          aria-label={`Status: ${statusDot}`}
          className={[
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
            dot,
            statusColors[statusDot],
          ].join(' ')}
        />
      )}
    </div>
  )
}
