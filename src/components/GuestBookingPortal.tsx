import React, { useState, useMemo } from 'react';
import { Search, Calendar, Users, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { Room, Booking, RoomType } from '../types/hotel';
import { RoomCard } from './RoomCard';
import { RoomDetailModal } from './RoomDetailModal';
import { BookingModal } from './BookingModal';
import { BookingConfirmationModal } from './BookingConfirmationModal';

interface GuestBookingPortalProps {
  rooms: Room[];
  onAddBooking: (booking: Booking) => void;
  onNavigateToReservations: () => void;
}

export const GuestBookingPortal: React.FC<GuestBookingPortalProps> = ({
  rooms,
  onAddBooking,
  onNavigateToReservations,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');
  
  // Dates & Guests
  const [checkIn, setCheckIn] = useState('2026-10-28');
  const [checkOut, setCheckOut] = useState('2026-10-31');
  const [guestCount, setGuestCount] = useState<number>(2);

  // Modals state
  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Room | null>(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const roomTypes: string[] = [
    'all',
    'Deluxe Ocean Suite',
    'Executive Skyline Suite',
    'Presidential Penthouse',
    'Superior Garden Villa',
    'Classic King Room',
    'Grand Family Suite'
  ];

  const amenitiesList = [
    'all',
    'Ocean View',
    'Skyline View',
    'Private Balcony',
    'High-Speed Wi-Fi',
    'Deep Soaking Tub',
    'Private Jacuzzi',
    'Connecting Rooms'
  ];

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Type filter
      if (selectedType !== 'all' && room.type !== selectedType) return false;

      // Price filter
      if (room.pricePerNight > maxPrice) return false;

      // Capacity
      const totalCapacity = room.capacity.adults + room.capacity.children;
      if (totalCapacity < guestCount) return false;

      // Amenity
      if (selectedAmenity !== 'all' && !room.amenities.includes(selectedAmenity)) return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesType = room.type.toLowerCase().includes(query);
        const matchesRoomNo = room.roomNumber.toLowerCase().includes(query);
        const matchesAmenities = room.amenities.some((a) => a.toLowerCase().includes(query));
        const matchesDesc = room.description.toLowerCase().includes(query);
        if (!matchesType && !matchesRoomNo && !matchesAmenities && !matchesDesc) return false;
      }

      return true;
    });
  }, [rooms, selectedType, maxPrice, guestCount, selectedAmenity, searchQuery]);

  const handleBookingSuccess = (booking: Booking) => {
    onAddBooking(booking);
    setSelectedRoomForBooking(null);
    setConfirmedBooking(booking);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
        <div className="relative h-[340px] md:h-[380px] w-full overflow-hidden">
          <img
            src="/src/assets/images/hotel_resort_exterior_1793199694943.jpg"
            alt="HotelPro Luxury Boutique Hotel Resort"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1.5">
              <span>HotelPro Five-Star Hospitality</span>
              <span>·</span>
              <span>MERN Stack Architecture</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Intuitive Hotel Booking & Property Management
            </h1>
            <p className="mt-2 text-xs md:text-sm text-neutral-300 leading-relaxed max-w-xl">
              Real-time room availability, seamless guest reservations, and front-desk folio tracking built for modern hospitality.
            </p>
          </div>
        </div>

        {/* Floating Quick Search Bar */}
        <div className="p-4 md:p-6 bg-neutral-900 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-neutral-400 font-medium block mb-1">Check-in Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 font-mono focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="text-neutral-400 font-medium block mb-1">Check-out Date</label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 font-mono focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="text-neutral-400 font-medium block mb-1">Guests</label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4+ Guests</option>
            </select>
          </div>
          <div>
            <label className="text-neutral-400 font-medium block mb-1">Keywords / Suite</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Ocean, Penthouse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-8 pr-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Controls (Buttons/Segmented Allowed) */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Room Tier Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {roomTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {type === 'all' ? 'All Room Types' : type}
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-3 shrink-0 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-xs">
            <span className="text-neutral-400">Max Nightly Rate:</span>
            <span className="font-mono font-bold text-white tabular-nums">${maxPrice}</span>
            <input
              type="range"
              min={150}
              max={700}
              step={20}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-amber-400 w-28 cursor-pointer"
            />
          </div>
        </div>

        {/* Amenity Quick Filters */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs text-neutral-400">
          <span className="text-neutral-500 text-[11px] uppercase tracking-wider shrink-0">Filter By Amenity:</span>
          {amenitiesList.map((amenity) => (
            <button
              key={amenity}
              onClick={() => setSelectedAmenity(amenity)}
              className={`px-2.5 py-1 rounded text-xs transition-colors shrink-0 ${
                selectedAmenity === amenity
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {amenity === 'all' ? 'Any Amenity' : amenity}
            </button>
          ))}
          {(selectedType !== 'all' || selectedAmenity !== 'all' || maxPrice < 700 || searchQuery) && (
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedAmenity('all');
                setMaxPrice(700);
                setSearchQuery('');
              }}
              className="text-amber-400 hover:underline text-xs ml-auto shrink-0 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Available Rooms Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">
              Available Rooms & Suites
            </h2>
            <p className="text-xs text-neutral-400">
              Showing {filteredRooms.length} luxury configurations
            </p>
          </div>
          <div className="text-xs text-neutral-400">
            Check-in: <strong className="text-neutral-200 font-mono">{checkIn}</strong> · Check-out: <strong className="text-neutral-200 font-mono">{checkOut}</strong>
          </div>
        </div>

        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onSelect={(r) => setSelectedRoomForDetail(r)}
                onBook={(r) => setSelectedRoomForBooking(r)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-neutral-800 text-neutral-400 mx-auto flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-white">No rooms matched your criteria</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Try adjusting your max price slider, selecting all room categories, or clearing search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedAmenity('all');
                setMaxPrice(700);
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium"
            >
              Reset Search Filters
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <RoomDetailModal
        room={selectedRoomForDetail}
        onClose={() => setSelectedRoomForDetail(null)}
        onBook={(r) => {
          setSelectedRoomForDetail(null);
          setSelectedRoomForBooking(r);
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        room={selectedRoomForBooking}
        onClose={() => setSelectedRoomForBooking(null)}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Confirmation Modal */}
      <BookingConfirmationModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
        onViewReservations={onNavigateToReservations}
      />
    </div>
  );
};
