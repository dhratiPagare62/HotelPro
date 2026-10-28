import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Key, 
  LogOut, 
  LogIn, 
  Wrench,
  Users,
  Search,
  Filter
} from 'lucide-react';
import { Room, RoomStatus, Booking } from '../types/hotel';

interface FrontDeskMatrixProps {
  rooms: Room[];
  bookings: Booking[];
  onUpdateRoomStatus: (roomId: string, status: RoomStatus) => void;
  onCheckInBooking: (bookingId: string, keyCard: string) => void;
  onCheckOutBooking: (bookingId: string) => void;
}

export const FrontDeskMatrix: React.FC<FrontDeskMatrixProps> = ({
  rooms,
  bookings,
  onUpdateRoomStatus,
  onCheckInBooking,
  onCheckOutBooking,
}) => {
  const [filterFloor, setFilterFloor] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<RoomStatus | 'all'>('all');
  const [selectedRoomForAction, setSelectedRoomForAction] = useState<Room | null>(null);
  const [keyCardInput, setKeyCardInput] = useState('');

  // Status metrics counts
  const countClean = rooms.filter((r) => r.status === 'vacant_clean').length;
  const countOccupied = rooms.filter((r) => r.status === 'occupied').length;
  const countReserved = rooms.filter((r) => r.status === 'reserved').length;
  const countDirty = rooms.filter((r) => r.status === 'vacant_dirty').length;
  const countMaintenance = rooms.filter((r) => r.status === 'maintenance').length;

  const filteredRooms = rooms.filter((r) => {
    if (filterFloor !== 'all' && r.floor !== filterFloor) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'vacant_clean':
        return {
          text: 'Vacant Clean',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: <CheckCircle className="w-3.5 h-3.5" />
        };
      case 'occupied':
        return {
          text: 'Occupied',
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: <Users className="w-3.5 h-3.5" />
        };
      case 'reserved':
        return {
          text: 'Reserved',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: <Clock className="w-3.5 h-3.5" />
        };
      case 'vacant_dirty':
        return {
          text: 'Housekeeping',
          bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          icon: <Sparkles className="w-3.5 h-3.5" />
        };
      case 'maintenance':
        return {
          text: 'Maintenance',
          bg: 'bg-neutral-800 text-neutral-400 border-neutral-700',
          icon: <Wrench className="w-3.5 h-3.5" />
        };
    }
  };

  const getBookingForRoom = (roomNumber: string) => {
    return bookings.find(
      (b) => b.roomNumber === roomNumber && (b.bookingStatus === 'checked_in' || b.bookingStatus === 'confirmed')
    );
  };

  const handleQuickCheckIn = (room: Room) => {
    const booking = getBookingForRoom(room.roomNumber);
    if (booking) {
      const generatedKey = `KEY-${room.roomNumber}-${Date.now().toString().slice(-4)}`;
      onCheckInBooking(booking.id, generatedKey);
      onUpdateRoomStatus(room.id, 'occupied');
    } else {
      // Just mark as occupied
      onUpdateRoomStatus(room.id, 'occupied');
    }
    setSelectedRoomForAction(null);
  };

  const handleQuickCheckOut = (room: Room) => {
    const booking = getBookingForRoom(room.roomNumber);
    if (booking) {
      onCheckOutBooking(booking.id);
    }
    // After checkout room becomes vacant_dirty for housekeeping
    onUpdateRoomStatus(room.id, 'vacant_dirty');
    setSelectedRoomForAction(null);
  };

  return (
    <div className="space-y-6">
      {/* Front Desk Operational Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-neutral-900 border border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400">Front Desk & Housekeeping Console</span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">Real-Time Room Inventory Grid</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Property Room Matrix & Turnover
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Monitor real-time occupancy, expedite keycard check-ins, process departures, and dispatch housekeeping.
        </div>
      </div>

      {/* Status Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setStatusFilter(statusFilter === 'vacant_clean' ? 'all' : 'vacant_clean')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            statusFilter === 'vacant_clean'
              ? 'bg-emerald-500/15 border-emerald-500/50 shadow-sm'
              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-medium">Vacant Clean</span>
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1.5">
            {countClean}
          </div>
          <span className="text-[11px] text-neutral-500">Ready for guest</span>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'occupied' ? 'all' : 'occupied')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            statusFilter === 'occupied'
              ? 'bg-rose-500/15 border-rose-500/50 shadow-sm'
              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-xs font-medium">Occupied</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1.5">
            {countOccupied}
          </div>
          <span className="text-[11px] text-neutral-500">In-house guests</span>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'reserved' ? 'all' : 'reserved')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            statusFilter === 'reserved'
              ? 'bg-amber-500/15 border-amber-500/50 shadow-sm'
              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-medium">Reserved</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1.5">
            {countReserved}
          </div>
          <span className="text-[11px] text-neutral-500">Pending arrivals</span>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'vacant_dirty' ? 'all' : 'vacant_dirty')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            statusFilter === 'vacant_dirty'
              ? 'bg-orange-500/15 border-orange-500/50 shadow-sm'
              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-orange-400">
            <span className="text-xs font-medium">Housekeeping</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1.5">
            {countDirty}
          </div>
          <span className="text-[11px] text-neutral-500">Turnover required</span>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'maintenance' ? 'all' : 'maintenance')}
          className={`p-3.5 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 ${
            statusFilter === 'maintenance'
              ? 'bg-neutral-800 border-neutral-600 shadow-sm'
              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-medium">Maintenance</span>
            <Wrench className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1.5">
            {countMaintenance}
          </div>
          <span className="text-[11px] text-neutral-500">Out of order</span>
        </button>
      </div>

      {/* Matrix Controls & Floor Filter */}
      <div className="flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-500 text-[11px] uppercase tracking-wider mr-1">Floor:</span>
          {[
            { id: 'all', label: 'All Floors' },
            { id: 1, label: 'Floor 1' },
            { id: 2, label: 'Floor 2' },
            { id: 3, label: 'Floor 3' }
          ].map((floorOpt) => (
            <button
              key={floorOpt.id}
              onClick={() => setFilterFloor(floorOpt.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterFloor === floorOpt.id
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {floorOpt.label}
            </button>
          ))}
        </div>

        {statusFilter !== 'all' && (
          <button
            onClick={() => setStatusFilter('all')}
            className="text-amber-400 hover:underline text-xs"
          >
            Clear Status Filter
          </button>
        )}
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => {
          const badge = getStatusBadge(room.status);
          const activeBooking = getBookingForRoom(room.roomNumber);

          return (
            <div
              key={room.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Room Top Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white font-mono">
                      #{room.roomNumber}
                    </span>
                    <span className="text-xs text-neutral-400">· Floor {room.floor}</span>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[11px] font-medium border flex items-center gap-1.5 ${badge.bg}`}>
                    {badge.icon}
                    <span>{badge.text}</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-neutral-300">
                  {room.type}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5 font-mono">
                  ${room.pricePerNight} / night · {room.bedType}
                </div>

                {/* Active Guest Information */}
                {activeBooking && (
                  <div className="mt-3 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs space-y-1">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="text-[10px] uppercase text-neutral-500">In-House Guest:</span>
                      <span className="font-mono text-amber-400">{activeBooking.bookingRef}</span>
                    </div>
                    <div className="font-semibold text-white">
                      {activeBooking.guestName}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Stay: {activeBooking.checkIn} → {activeBooking.checkOut} ({activeBooking.nights} nights)
                    </div>
                    {activeBooking.keyCardAssigned && (
                      <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                        <Key className="w-3 h-3" />
                        <span>Key: {activeBooking.keyCardAssigned}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Front Desk Actions */}
              <div className="pt-2 border-t border-neutral-800/80 flex flex-wrap gap-2 text-xs">
                {room.status === 'reserved' && (
                  <button
                    onClick={() => handleQuickCheckIn(room)}
                    className="flex-1 py-1.5 px-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Check In</span>
                  </button>
                )}

                {room.status === 'occupied' && (
                  <button
                    onClick={() => handleQuickCheckOut(room)}
                    className="flex-1 py-1.5 px-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Check Out</span>
                  </button>
                )}

                {room.status === 'vacant_dirty' && (
                  <button
                    onClick={() => onUpdateRoomStatus(room.id, 'vacant_clean')}
                    className="flex-1 py-1.5 px-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mark Cleaned</span>
                  </button>
                )}

                {room.status === 'vacant_clean' && (
                  <button
                    onClick={() => onUpdateRoomStatus(room.id, 'occupied')}
                    className="flex-1 py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Walk-In Check In</span>
                  </button>
                )}

                <button
                  onClick={() =>
                    onUpdateRoomStatus(
                      room.id,
                      room.status === 'maintenance' ? 'vacant_clean' : 'maintenance'
                    )
                  }
                  className="py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 rounded-lg transition-colors"
                  title="Toggle Maintenance"
                >
                  <Wrench className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
