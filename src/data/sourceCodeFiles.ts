export interface CodeFile {
  path: string;
  language: string;
  description: string;
  content: string;
}

export const MERN_PROJECT_FILES: CodeFile[] = [
  {
    path: 'README.md',
    language: 'markdown',
    description: 'Project documentation and submission instructions',
    content: `# HotelPro - Complete Hotel Booking and Management Solution

A production-grade full-stack MERN (MongoDB, Express, React, Node.js) web application designed for hospitality booking and automated property management.

## 🚀 Live Demo & Submission Links
- **Live Demo Link**: \`https://ais-dev-r3tov6cleanzq2tjilkjjg-800127191472.asia-northeast1.run.app\`
- **GitHub Repository**: \`https://github.com/en24cs3010362/hotelpro-mern-management-solution\`
- **Author/Student**: \`en24cs3010362@medicaps.ac.in\`
- **Course**: Full Stack Development (MERN Stack)

---

## 🌟 Key Features

1. **Guest Booking Engine**:
   - Real-time room availability search with date picker and guest capacity filters
   - Interactive room detail views with photo galleries and amenity breakdowns
   - Complete booking checkout flow with instant reservation reference generation (\`HP-XXXXX\`)
   - Folio billing summary with transparent tax calculations

2. **Front-Desk Room Operations Matrix**:
   - Interactive floor-by-floor room grid with color-coded status tracking
   - One-click guest check-in with keycard generation
   - Automated checkout workflow with room service charge calculation
   - Instant room status toggling (Clean, Dirty, Reserved, Maintenance)

3. **Reservations & Folio Management**:
   - Searchable guest reservation database
   - In-stay charge additions (dining, spa, airport transfer)
   - Printable guest folio invoice with download capability

4. **Analytics & Performance Metrics**:
   - RevPAR (Revenue Per Available Room)
   - ADR (Average Daily Rate)
   - Occupancy percentage tracking & revenue by room tier

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend**: Node.js, Express.js REST API
- **Database**: MongoDB with Mongoose ODM schemas
- **Auth**: JWT (JSON Web Tokens) & bcrypt password encryption

---

## 💻 Local Setup & Execution

\`\`\`bash
# 1. Clone repository
git clone https://github.com/en24cs3010362/hotelpro-mern-management-solution.git
cd hotelpro-mern-management-solution

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Start the application
npm run dev
\`\`\`
`
  },
  {
    path: 'server/server.js',
    language: 'javascript',
    description: 'Express backend entry point with CORS and route handlers',
    content: `const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', service: 'HotelPro Backend API', timestamp: new Date() });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(\`HotelPro server listening on port \${PORT}\`);
});
`
  },
  {
    path: 'server/models/Room.js',
    language: 'javascript',
    description: 'Mongoose Room model schema',
    content: `const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  floor: { type: Number, required: true },
  type: {
    type: String,
    enum: [
      'Deluxe Ocean Suite',
      'Executive Skyline Suite',
      'Presidential Penthouse',
      'Superior Garden Villa',
      'Classic King Room',
      'Grand Family Suite'
    ],
    required: true
  },
  pricePerNight: { type: Number, required: true },
  capacity: {
    adults: { type: Number, default: 2 },
    children: { type: Number, default: 0 }
  },
  bedType: { type: String, required: true },
  sizeSqFt: { type: Number, required: true },
  status: {
    type: String,
    enum: ['vacant_clean', 'vacant_dirty', 'occupied', 'reserved', 'maintenance'],
    default: 'vacant_clean'
  },
  amenities: [{ type: String }],
  image: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 0 },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
`
  },
  {
    path: 'server/models/Booking.js',
    language: 'javascript',
    description: 'Mongoose Booking reservation model schema',
    content: `const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingRef: { type: String, required: true, unique: true },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
  guestIdType: { type: String },
  guestIdNumber: { type: String },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  nights: { type: Number, required: true },
  roomRateTotal: { type: Number, required: true },
  extraCharges: [{
    item: String,
    amount: Number,
    date: { type: Date, default: Date.now },
    category: { type: String, enum: ['room', 'dining', 'spa', 'transfer', 'other'] }
  }],
  taxAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'upi', 'cash', 'corporate_invoice'],
    default: 'credit_card'
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'partially_paid'],
    default: 'paid'
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'checked_in', 'checked_out', 'cancelled'],
    default: 'confirmed'
  },
  specialRequests: { type: String },
  keyCardAssigned: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
`
  },
  {
    path: 'server/controllers/bookingController.js',
    language: 'javascript',
    description: 'Controller with booking reservation and check-in/out logic',
    content: `const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Create new reservation
exports.createBooking = async (req, res) => {
  try {
    const { guestName, guestEmail, guestPhone, roomId, checkIn, checkOut, paymentMethod, specialRequests } = req.body;
    
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.max(1, Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
    
    const roomRateTotal = nights * room.pricePerNight;
    const taxAmount = +(roomRateTotal * 0.12).toFixed(2);
    const totalAmount = +(roomRateTotal + taxAmount).toFixed(2);
    const bookingRef = 'HP-' + Math.floor(10000 + Math.random() * 90000);

    const booking = new Booking({
      bookingRef,
      guestName,
      guestEmail,
      guestPhone,
      room: room._id,
      roomNumber: room.roomNumber,
      roomType: room.type,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      roomRateTotal,
      taxAmount,
      totalAmount,
      paymentMethod,
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      specialRequests
    });

    await booking.save();
    room.status = 'reserved';
    await room.save();

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check-in guest
exports.checkInGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { keyCardAssigned, guestIdType, guestIdNumber } = req.body;
    
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ error: 'Reservation not found' });

    booking.bookingStatus = 'checked_in';
    booking.keyCardAssigned = keyCardAssigned || \`CARD-\${booking.roomNumber}-1\`;
    if (guestIdType) booking.guestIdType = guestIdType;
    if (guestIdNumber) booking.guestIdNumber = guestIdNumber;
    await booking.save();

    await Room.updateOne({ roomNumber: booking.roomNumber }, { status: 'occupied' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
`
  }
];
