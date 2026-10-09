// Custom SVG icons for each service category — more polished than emojis
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

export function PlumbingIcon({ size = 32, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 6h4v8H8V6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 10h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M20 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 14v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="20" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )
}

export function ElectricalIcon({ size = 32, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19 4l-7 12h6l-1 12 8-14h-6l1-10h-1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function CarpentryIcon({ size = 32, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="5" y="14" width="22" height="4" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M10 14V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M10 18v6M22 18v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 18v3M18 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

export function PaintingIcon({ size = 32, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 8h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M22 12h2a2 2 0 1 1 0 4h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M13 20v4a2 2 0 1 0 4 0v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M9 12v4M13 11v6M17 12v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

export function CleaningIcon({ size = 32, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14 6c0 0-6 4-6 10s4 10 4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M18 6c0 0 6 4 6 10s-4 10-4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <ellipse cx="16" cy="16" rx="4" ry="6" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M16 10v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

export function AcRepairIcon({ size = 32, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4" y="7" width="24" height="10" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M10 17v5M22 17v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M13 22h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M8 12h4M12 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="22" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M19.8 9.8L20.5 9M22 7v1.5M24.2 9.8L23.5 9M25 12h-1.5M24.2 14.2L23.5 15M22 17v-1.5M19.8 14.2L20.5 15M17 12h1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

export const serviceIconMap: Record<string, typeof PlumbingIcon> = {
  plumbing:   PlumbingIcon,
  electrical: ElectricalIcon,
  carpentry:  CarpentryIcon,
  painting:   PaintingIcon,
  cleaning:   CleaningIcon,
  'ac-repair': AcRepairIcon,
}
