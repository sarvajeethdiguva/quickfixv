import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface PageLayoutProps {
  children: ReactNode
  className?: string
  noTopPad?: boolean
}

export default function PageLayout({ children, className = '', noTopPad = false }: PageLayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Navbar />
      <main
        className={[
          'flex-1',
          noTopPad ? '' : 'pt-16',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
