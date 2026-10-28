import React, { useState } from 'react';
import { Users, Bed, Maximize2, Star, Check } from 'lucide-react';
import { Room } from '../types/hotel';

interface RoomCardProps {
  room: Room;
  onSelect: (room: Room) => void;
  onBook: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect, onBook }) => {
  const [imageError, setImageError] = useState(false);

  const getStatusLabel = (status: Room['status']) => {
    switch (status) {
      case 'vacant_clean':
        return { text: 'Available Now', color: 'text-emerald-400' };
      case 'occupied':
        return { text: 'Currently Occupied', color: 'text-rose-400' };
      case 'reserved':
        return { text: 'Reserved', color: 'text-amber-400' };
      case 'vacant_dirty':
        return { text: 'Housekeeping In-Progress', color: 'text-orange-400' };
      case 'maintenance':
        return { text: 'Maintenance Block', color: 'text-neutral-400' };
    }
  };

  const statusInfo = getStatusLabel(room.status);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col group transition-all duration-200 hover:border-neutral-700">
      {/* Room Image Container */}
      <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
        {!imageError ? (
          <img
            src={room.image}
            alt={room.type}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900 text-neutral-400 p-4">
            <Bed className="w-8 h-8 text-neutral-500 mb-2" />
            <span className="text-xs font-medium text-neutral-300">{room.type}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Room Header Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="text-[11px] font-mono text-amber-400">
              Room #{room.roomNumber} · Floor {room.floor}
            </div>
            <h3 className="text-base font-semibold text-white truncate max-w-[220px]">
              {room.type}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white font-mono tabular-nums">
              ${room.pricePerNight}
            </div>
            <div className="text-[10px] text-neutral-400">per night</div>
          </div>
        </div>

        {/* Status Tag (Unboxed, clean) */}
        <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-medium border border-neutral-800 flex items-center gap-1.5">
          <span className={statusInfo.color}>{statusInfo.text}</span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md px-2 py-1 rounded text-[11px] font-mono text-white border border-neutral-800 flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{room.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Specs Metadata */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-800/80 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span>Up to {room.capacity.adults + room.capacity.children} guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span className="truncate">{room.bedType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span className="font-mono tabular-nums">{room.sizeSqFt} sq ft</span>
          </div>
        </div>

        {/* Amenities Line (Zero-pill discipline) */}
        <div className="text-xs text-neutral-400 truncate">
          {room.amenities.slice(0, 3).map((amenity, idx) => (
            <React.Fragment key={amenity}>
              <span>{amenity}</span>
              {idx < 2 && <span className="mx-1.5 text-neutral-600">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onSelect(room)}
            className="flex-1 py-2 px-3 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Details & Specs
          </button>
          <button
            onClick={() => onBook(room)}
            disabled={room.status === 'occupied' || room.status === 'maintenance'}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
              room.status === 'occupied' || room.status === 'maintenance'
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
            }`}
          >
            {room.status === 'occupied'
              ? 'Unavailable'
              : room.status === 'maintenance'
              ? 'In Service'
              : 'Reserve Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
