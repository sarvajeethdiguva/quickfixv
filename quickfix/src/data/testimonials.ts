export interface Testimonial {
  id: string
  name: string
  avatar: string
  location: string
  rating: number
  comment: string
  service: string
  date: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't-001',
    name: 'Priya Malhotra',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=PriyaM&backgroundColor=b6e3f4',
    location: 'Koramangala, Bengaluru',
    rating: 5,
    comment: 'I was sceptical about booking a plumber online, but QuickFix was incredible. The plumber arrived within 45 minutes, fixed our leaking pipe, and the pricing was exactly what was shown. Zero surprises.',
    service: 'Plumbing',
    date: 'Sep 28, 2026',
  },
  {
    id: 't-002',
    name: 'Kiran Reddy',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=KiranR&backgroundColor=d1d4f9',
    location: 'Indiranagar, Bengaluru',
    rating: 5,
    comment: 'The electrician rewired our kitchen safely and efficiently. He explained everything he was doing, which I really appreciated. The scheduling was so easy — booked in under 2 minutes.',
    service: 'Electrical',
    date: 'Sep 20, 2026',
  },
  {
    id: 't-003',
    name: 'Anjana Krishnaswamy',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Anjana&backgroundColor=ffd5dc',
    location: 'Whitefield, Bengaluru',
    rating: 5,
    comment: 'Booked a deep cleaning session and the team was phenomenal! Used eco-friendly products, moved all furniture, and left everything spotless. Already rebooked for next month.',
    service: 'Cleaning',
    date: 'Oct 1, 2026',
  },
  {
    id: 't-004',
    name: 'Sunil Varma',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=SunilV&backgroundColor=c0aede',
    location: 'HSR Layout, Bengaluru',
    rating: 5,
    comment: 'Had my AC serviced before summer and it was the best decision. The technician was thorough, honest about what needed fixing, and didn\'t upsell unnecessarily. Rare quality.',
    service: 'AC Repair',
    date: 'Sep 12, 2026',
  },
  {
    id: 't-005',
    name: 'Meera Iyer',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=MeeraI&backgroundColor=b6e3f4',
    location: 'JP Nagar, Bengaluru',
    rating: 5,
    comment: 'The carpenter built exactly what I described for my home office. Arrived on time, cleaned up after himself, and the craftsmanship is excellent. Couldn\'t be happier.',
    service: 'Carpentry',
    date: 'Sep 30, 2026',
  },
  {
    id: 't-006',
    name: 'Rahul Nambiar',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=RahulN&backgroundColor=ffd5dc',
    location: 'Sarjapur Road, Bengaluru',
    rating: 5,
    comment: 'Got the entire 2BHK painted in two days. The painter was meticulous — covered every piece of furniture, no drips anywhere. The whole process from booking to completion was seamless.',
    service: 'Painting',
    date: 'Oct 3, 2026',
  },
]

export const stats = [
  { label: 'Verified Professionals', value: '2,500+' },
  { label: 'Bookings Completed', value: '50,000+' },
  { label: 'Average Rating', value: '4.8★' },
  { label: 'Cities Covered', value: '15+' },
]
