interface SkeletonProps {
  className?: string
  height?: number | string
  width?: number | string
  rounded?: boolean
  circle?: boolean
}

export function Skeleton({ className = '', height, width, rounded = false, circle = false }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className={['skeleton', circle ? 'rounded-full' : rounded ? 'rounded-full' : 'rounded', className].join(' ')}
      style={{ height, width }}
    />
  )
}

export function ProviderCardSkeleton() {
  return (
    <div className="bg-white rounded-card p-5 shadow-card">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton circle height={56} width={56} />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton height={18} width="60%" />
          <Skeleton height={14} width="80%" />
          <Skeleton height={12} width="40%" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <Skeleton height={24} width={80} rounded />
        <Skeleton height={24} width={96} rounded />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton height={12} />
        <Skeleton height={12} width="90%" />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <Skeleton height={20} width={80} />
        <Skeleton height={40} width={100} rounded />
      </div>
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-card p-6 shadow-card">
      <Skeleton height={48} width={48} circle className="mb-4" />
      <Skeleton height={20} width="60%" className="mb-2" />
      <Skeleton height={14} className="mb-1" />
      <Skeleton height={14} width="80%" className="mb-4" />
      <Skeleton height={14} width="40%" />
    </div>
  )
}

export function ProfileHeaderSkeleton() {
  return (
    <div className="bg-white rounded-card p-6 shadow-card">
      <div className="flex flex-col md:flex-row gap-6">
        <Skeleton circle height={96} width={96} className="shrink-0" />
        <div className="flex-1 flex flex-col gap-3">
          <Skeleton height={28} width="40%" />
          <Skeleton height={16} width="70%" />
          <div className="flex gap-2">
            <Skeleton height={24} width={80} rounded />
            <Skeleton height={24} width={96} rounded />
            <Skeleton height={24} width={72} rounded />
          </div>
          <div className="flex gap-6">
            <Skeleton height={14} width={64} />
            <Skeleton height={14} width={64} />
            <Skeleton height={14} width={64} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton height={44} width={160} rounded />
          <Skeleton height={44} width={160} rounded />
        </div>
      </div>
    </div>
  )
}
