import React, { useState } from 'react';
import { X, Users, Bed, Maximize2, Star, CheckCircle, ShieldCheck, Coffee, Wifi, Tv } from 'lucide-react';
import { Room } from '../types/hotel';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBook,
}) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Media */}
        <div className="relative aspect-[16/9] w-full bg-neutral-950 overflow-hidden">
          <img
            src={room.image}
            alt={room.type}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-full backdrop-blur-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400">
                Floor {room.floor} · Suite #{room.roomNumber}
              </div>
              <h2 className="text-2xl font-bold text-white mt-0.5">
                {room.type}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white font-mono tabular-nums">
                ${room.pricePerNight}
              </div>
              <div className="text-xs text-neutral-400">nightly rate + taxes</div>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-neutral-300">
          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-500 block">Maximum Occupancy</span>
              <span className="font-semibold text-white mt-0.5 block">
                {room.capacity.adults} Adults, {room.capacity.children} Child
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Bed Configuration</span>
              <span className="font-semibold text-white mt-0.5 block">
                {room.bedType}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Suite Area</span>
              <span className="font-semibold text-white font-mono tabular-nums mt-0.5 block">
                {room.sizeSqFt} sq ft ({Math.round(room.sizeSqFt * 0.0929)} m²)
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Suite Overview
            </h4>
            <p className="text-neutral-300 leading-relaxed text-sm">
              {room.description}
            </p>
          </div>

          {/* Curated Features */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Highlights & Inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {room.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-neutral-300">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Amenities */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Suite Amenities
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {room.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="px-2.5 py-1 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/60"
                >
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 px-6 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            Cancellation: <span className="text-neutral-200">Free cancellation up to 48h prior</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-300 hover:text-white bg-neutral-800 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(room);
              }}
              disabled={room.status === 'occupied' || room.status === 'maintenance'}
              className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              Proceed to Reserve (${room.pricePerNight}/night)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
