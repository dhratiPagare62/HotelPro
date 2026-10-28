export type RoomStatus = 'vacant_clean' | 'vacant_dirty' | 'occupied' | 'reserved' | 'maintenance';

export type RoomType = 
  | 'Deluxe Ocean Suite' 
  | 'Executive Skyline Suite' 
  | 'Presidential Penthouse' 
  | 'Superior Garden Villa' 
  | 'Classic King Room' 
  | 'Grand Family Suite';

export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  type: RoomType;
  pricePerNight: number;
  capacity: {
    adults: number;
    children: number;
  };
  bedType: string;
  sizeSqFt: number;
  status: RoomStatus;
  amenities: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
}

export type PaymentMethod = 'credit_card' | 'upi' | 'cash' | 'corporate_invoice';
export type PaymentStatus = 'paid' | 'pending' | 'partially_paid';
export type BookingStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

export interface FolioCharge {
  id: string;
  item: string;
  amount: number;
  date: string;
  category: 'room' | 'dining' | 'spa' | 'transfer' | 'other';
}

export interface Booking {
  id: string;
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestIdType?: string;
  guestIdNumber?: string;
  roomId: string;
  roomNumber: string;
  roomType: RoomType;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomRateTotal: number;
  extraCharges: FolioCharge[];
  taxAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  specialRequests?: string;
  keyCardAssigned?: string;
  createdAt: string;
}

export interface EpicTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ProjectEpic {
  id: string;
  title: string;
  complexity: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  progress: number;
  tasks: EpicTask[];
}
