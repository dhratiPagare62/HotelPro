import { Room, Booking, ProjectEpic } from '../types/hotel';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-101',
    roomNumber: '101',
    floor: 1,
    type: 'Deluxe Ocean Suite',
    pricePerNight: 280,
    capacity: { adults: 2, children: 1 },
    bedType: '1 King Bed',
    sizeSqFt: 540,
    status: 'vacant_clean',
    amenities: ['Ocean View', 'Private Balcony', 'High-Speed Wi-Fi', 'Marble Bath', 'Espresso Machine', 'Smart TV'],
    image: '/src/assets/images/hotel_suite_deluxe_1793199694907.jpg',
    rating: 4.9,
    reviewsCount: 142,
    description: 'Breathtaking ocean views with contemporary minimalist luxury furnishings, private glass terrace, and custom rainfall bath.',
    features: ['Panoramic coastline vista', 'Complimentary evening turn-down', 'Soundproof floor-to-ceiling windows']
  },
  {
    id: 'room-102',
    roomNumber: '102',
    floor: 1,
    type: 'Classic King Room',
    pricePerNight: 160,
    capacity: { adults: 2, children: 0 },
    bedType: '1 King Bed',
    sizeSqFt: 380,
    status: 'occupied',
    amenities: ['Garden View', 'High-Speed Wi-Fi', 'Rain Shower', 'Work Desk', 'Mini Bar'],
    image: '/src/assets/images/hotel_suite_deluxe_1793199694907.jpg',
    rating: 4.7,
    reviewsCount: 89,
    description: 'Serene guest sanctuary overlooking landscaped courtyards with plush organic cotton linens and dedicated workstation.',
    features: ['Quiet wing location', 'Ergonomic ergonomic desk', 'Aromatherapy bath amenities']
  },
  {
    id: 'room-201',
    roomNumber: '201',
    floor: 2,
    type: 'Executive Skyline Suite',
    pricePerNight: 390,
    capacity: { adults: 3, children: 1 },
    bedType: '1 California King + 1 Daybed',
    sizeSqFt: 720,
    status: 'reserved',
    amenities: ['Skyline View', 'Separate Lounge', 'Executive Club Access', 'Bespoke Bar', 'Deep Soaking Tub'],
    image: '/src/assets/images/hotel_executive_suite_1793199696383.jpg',
    rating: 4.95,
    reviewsCount: 96,
    description: 'Spacious architectural suite featuring private reception lounge, curated art collection, and skyline panoramas.',
    features: ['VIP lounge check-in', 'Complimentary cocktail hour', 'Butler service on request']
  },
  {
    id: 'room-202',
    roomNumber: '202',
    floor: 2,
    type: 'Superior Garden Villa',
    pricePerNight: 320,
    capacity: { adults: 2, children: 2 },
    bedType: '2 Queen Beds',
    sizeSqFt: 620,
    status: 'vacant_clean',
    amenities: ['Private Garden', 'Sun Terrace', 'Dual Vanity', 'Nespresso Bar', 'Family Dining Nook'],
    image: '/src/assets/images/hotel_resort_exterior_1793199694943.jpg',
    rating: 4.85,
    reviewsCount: 118,
    description: 'Ground-level villa with seamless indoor-outdoor living, secluded tropical patio, and premium bedding for families.',
    features: ['Direct access to reflection pool', 'Private outdoor sun lounger', 'Children welcome amenities']
  },
  {
    id: 'room-301',
    roomNumber: '301',
    floor: 3,
    type: 'Presidential Penthouse',
    pricePerNight: 650,
    capacity: { adults: 4, children: 2 },
    bedType: '2 Master King Beds',
    sizeSqFt: 1150,
    status: 'occupied',
    amenities: ['360° Panoramic View', 'Private Jacuzzi', 'Chef Kitchenette', 'Dining Salon', 'Private Elevator'],
    image: '/src/assets/images/hotel_executive_suite_1793199696383.jpg',
    rating: 5.0,
    reviewsCount: 52,
    description: 'The pinnacle of luxury hospitality. Top-floor penthouse offering wraparound terrace, private whirlpool spa, and dedicated host.',
    features: ['Dedicated 24/7 concierge', 'In-suite sommelier tasting', 'Complimentary luxury airport limousine']
  },
  {
    id: 'room-302',
    roomNumber: '302',
    floor: 3,
    type: 'Grand Family Suite',
    pricePerNight: 340,
    capacity: { adults: 4, children: 2 },
    bedType: '1 King + 2 Twin Beds',
    sizeSqFt: 780,
    status: 'vacant_dirty',
    amenities: ['Connecting Rooms', '2 En-Suite Baths', 'Living Area', 'High-Speed Wi-Fi', 'Mini Refrigerator'],
    image: '/src/assets/images/hotel_suite_deluxe_1793199694907.jpg',
    rating: 4.8,
    reviewsCount: 74,
    description: 'Designed for effortless family stays with multi-room layout, entertainment hub, and double vanity bathrooms.',
    features: ['Childproofing upon request', 'Interactive gaming console', 'Daily fresh fruit basket']
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-1',
    bookingRef: 'HP-84920',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@example.com',
    guestPhone: '+1 (555) 234-8901',
    guestIdType: 'Passport',
    guestIdNumber: 'P78291038',
    roomId: 'room-102',
    roomNumber: '102',
    roomType: 'Classic King Room',
    checkIn: '2026-10-27',
    checkOut: '2026-10-30',
    nights: 3,
    roomRateTotal: 480,
    extraCharges: [
      { id: 'ch-1', item: 'Breakfast Buffet (2 Days)', amount: 56, date: '2026-10-28', category: 'dining' },
      { id: 'ch-2', item: 'Airport Luxury Shuttle', amount: 45, date: '2026-10-27', category: 'transfer' }
    ],
    taxAmount: 69.72,
    totalAmount: 650.72,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    bookingStatus: 'checked_in',
    specialRequests: 'Quiet room away from elevators, feather pillows requested.',
    keyCardAssigned: 'CARD-102-A',
    createdAt: '2026-10-20'
  },
  {
    id: 'bkg-2',
    bookingRef: 'HP-91345',
    guestName: 'Marcus Sterling',
    guestEmail: 'm.sterling@investcorp.com',
    guestPhone: '+1 (555) 891-2309',
    guestIdType: 'Driver License',
    guestIdNumber: 'DL-9938217',
    roomId: 'room-301',
    roomNumber: '301',
    roomType: 'Presidential Penthouse',
    checkIn: '2026-10-26',
    checkOut: '2026-10-31',
    nights: 5,
    roomRateTotal: 3250,
    extraCharges: [
      { id: 'ch-3', item: 'Private Sommelier Dinner', amount: 240, date: '2026-10-27', category: 'dining' },
      { id: 'ch-4', item: 'Deep Tissue Spa (2 Sessions)', amount: 180, date: '2026-10-28', category: 'spa' }
    ],
    taxAmount: 440.40,
    totalAmount: 4110.40,
    paymentMethod: 'corporate_invoice',
    paymentStatus: 'paid',
    bookingStatus: 'checked_in',
    specialRequests: 'Late check-out guaranteed at 3:00 PM.',
    keyCardAssigned: 'VIP-CARD-301',
    createdAt: '2026-10-15'
  },
  {
    id: 'bkg-3',
    bookingRef: 'HP-76210',
    guestName: 'Dr. Sophia Reyes',
    guestEmail: 'sophia.reyes@biotech.org',
    guestPhone: '+1 (555) 432-6789',
    guestIdType: 'National ID',
    guestIdNumber: 'ID-556421',
    roomId: 'room-201',
    roomNumber: '201',
    roomType: 'Executive Skyline Suite',
    checkIn: '2026-10-28',
    checkOut: '2026-11-01',
    nights: 4,
    roomRateTotal: 1560,
    extraCharges: [],
    taxAmount: 187.20,
    totalAmount: 1747.20,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    specialRequests: 'Arriving late evening around 9:30 PM.',
    createdAt: '2026-10-24'
  }
];

export const SKILLWALLET_EPICS: ProjectEpic[] = [
  {
    id: 'epic-1',
    title: 'PROJECT ARCHITECTURE',
    complexity: 'Medium',
    duration: '1h 0m',
    progress: 100,
    tasks: [
      { id: 't1', title: 'Design RESTful API routing architecture and response formatting', completed: true },
      { id: 't2', title: 'Define data models for Rooms, Bookings, Guests, and Folios', completed: true },
      { id: 't3', title: 'Formulate JWT authentication and role-based access security model', completed: true },
      { id: 't4', title: 'Establish state management patterns and reactive client updates', completed: true },
      { id: 't5', title: 'Draft system entity relationships for room availability matrix', completed: true },
      { id: 't6', title: 'Verify cross-origin resource sharing (CORS) and error handling middleware', completed: true }
    ]
  },
  {
    id: 'epic-2',
    title: 'PROJECT SETUP AND CONFIGURATION',
    complexity: 'Easy',
    duration: '45m',
    progress: 100,
    tasks: [
      { id: 't7', title: 'Initialize Vite React TypeScript environment with Tailwind CSS', completed: true },
      { id: 't8', title: 'Configure environment variables (.env.example) and port settings', completed: true },
      { id: 't9', title: 'Set up Express server structure and modular route handlers', completed: true }
    ]
  },
  {
    id: 'epic-3',
    title: 'BACKEND DEVELOPMENT',
    complexity: 'Medium',
    duration: '1h 30m',
    progress: 100,
    tasks: [
      { id: 't10', title: 'Implement room inventory queries and multi-criterion search filtering', completed: true },
      { id: 't11', title: 'Build booking reservation engine with conflict validation and pricing engine', completed: true },
      { id: 't12', title: 'Implement front-desk guest check-in, keycard assignment, and check-out logic', completed: true },
      { id: 't13', title: 'Develop folio billing calculation with room charges, dining, and tax breakdown', completed: true }
    ]
  },
  {
    id: 'epic-4',
    title: 'DATABASE DEVELOPMENT',
    complexity: 'Medium',
    duration: '1h 15m',
    progress: 100,
    tasks: [
      { id: 't14', title: 'Create Room Mongoose schema with pricing, capacity, and status enums', completed: true },
      { id: 't15', title: 'Create Booking Mongoose schema with unique reference generation', completed: true },
      { id: 't16', title: 'Seed sample hotel rooms across multiple floors and tiers', completed: true }
    ]
  },
  {
    id: 'epic-5',
    title: 'FRONTEND DEVELOPMENT',
    complexity: 'Hard',
    duration: '2h 0m',
    progress: 100,
    tasks: [
      { id: 't17', title: 'Create interactive guest reservation portal with date and price filtering', completed: true },
      { id: 't18', title: 'Build front-desk operational room matrix with 1-click status actions', completed: true }
    ]
  },
  {
    id: 'epic-6',
    title: 'PROJECT EXECUTION & SUBMISSION',
    complexity: 'Easy',
    duration: '30m',
    progress: 100,
    tasks: [
      { id: 't19', title: 'Configure Demo link and GitHub repository submission tools for mentor evaluation', completed: true }
    ]
  }
];
