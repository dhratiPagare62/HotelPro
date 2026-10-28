import React, { useState } from 'react';
import { X, Calendar, CreditCard, Shield, User, Mail, Phone, Clock, Plus, Check } from 'lucide-react';
import { Room, Booking, PaymentMethod } from '../types/hotel';

interface BookingModalProps {
  room: Room | null;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  room,
  onClose,
  onBookingSuccess,
}) => {
  if (!room) return null;

  const today = '2026-10-28';
  const defaultCheckout = '2026-10-31';

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(defaultCheckout);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [idType, setIdType] = useState('Passport');
  const [idNumber, setIdNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');

  // Add-ons
  const [includeBreakfast, setIncludeBreakfast] = useState(true);
  const [includeTransfer, setIncludeTransfer] = useState(false);
  const [includeSpa, setIncludeSpa] = useState(false);

  // Compute nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(1000 * 60 * 60 * 24, d2.getTime() - d1.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const roomRateTotal = nights * room.pricePerNight;
  const breakfastTotal = includeBreakfast ? 28 * nights : 0;
  const transferTotal = includeTransfer ? 45 : 0;
  const spaTotal = includeSpa ? 90 : 0;
  const addOnsTotal = breakfastTotal + transferTotal + spaTotal;

  const subtotal = roomRateTotal + addOnsTotal;
  const taxAmount = +(subtotal * 0.12).toFixed(2);
  const grandTotal = +(subtotal + taxAmount).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill in guest name, email, and contact number.');
      return;
    }

    const bookingRef = `HP-${Math.floor(10000 + Math.random() * 90000)}`;

    const extraCharges = [];
    if (includeBreakfast) {
      extraCharges.push({
        id: `ch-${Date.now()}-1`,
        item: `Gourmet Breakfast (${nights} Nights)`,
        amount: breakfastTotal,
        date: today,
        category: 'dining' as const
      });
    }
    if (includeTransfer) {
      extraCharges.push({
        id: `ch-${Date.now()}-2`,
        item: 'Airport Luxury Transfer',
        amount: transferTotal,
        date: today,
        category: 'transfer' as const
      });
    }
    if (includeSpa) {
      extraCharges.push({
        id: `ch-${Date.now()}-3`,
        item: 'Signature Wellness Spa Session',
        amount: spaTotal,
        date: today,
        category: 'spa' as const
      });
    }

    const newBooking: Booking = {
      id: `bkg-${Date.now()}`,
      bookingRef,
      guestName,
      guestEmail,
      guestPhone,
      guestIdType: idType,
      guestIdNumber: idNumber || 'ID-VERIFIED',
      roomId: room.id,
      roomNumber: room.roomNumber,
      roomType: room.type,
      checkIn,
      checkOut,
      nights,
      roomRateTotal,
      extraCharges,
      taxAmount,
      totalAmount: grandTotal,
      paymentMethod,
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      specialRequests,
      createdAt: today
    };

    onBookingSuccess(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/60">
          <div>
            <span className="text-xs font-mono text-amber-400">
              Reservation Engine · Suite #{room.roomNumber}
            </span>
            <h2 className="text-base font-bold text-white mt-0.5">
              Confirm Reservation: {room.type}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-5 text-xs">
          {/* Dates Selection */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <div>
              <label className="text-neutral-400 font-medium block mb-1.5">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 font-mono text-xs focus:outline-none focus:border-amber-400"
                required
              />
            </div>
            <div>
              <label className="text-neutral-400 font-medium block mb-1.5">
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 font-mono text-xs focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          {/* Guest Personal Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] text-neutral-400">
              Guest Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alexander Hamilton"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="alexander@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">ID Proof (Type & Number)</label>
                <div className="flex gap-2">
                  <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                    className="bg-neutral-950 border border-neutral-700 rounded-lg px-2 py-2 text-neutral-200 focus:outline-none text-xs"
                  >
                    <option value="Passport">Passport</option>
                    <option value="Driver License">Driver License</option>
                    <option value="National ID">National ID</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Document #"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add-on Experiences */}
          <div className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wider text-[11px] text-neutral-400">
              Optional Enhancements & Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className={`p-3 rounded-lg border cursor-pointer transition-colors flex flex-col justify-between ${
                includeBreakfast ? 'bg-amber-500/10 border-amber-500/40' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">Daily Breakfast</span>
                  <input
                    type="checkbox"
                    checked={includeBreakfast}
                    onChange={(e) => setIncludeBreakfast(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                </div>
                <div className="text-[11px] text-neutral-400">$28 / person / day</div>
              </label>

              <label className={`p-3 rounded-lg border cursor-pointer transition-colors flex flex-col justify-between ${
                includeTransfer ? 'bg-amber-500/10 border-amber-500/40' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">Airport Shuttle</span>
                  <input
                    type="checkbox"
                    checked={includeTransfer}
                    onChange={(e) => setIncludeTransfer(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                </div>
                <div className="text-[11px] text-neutral-400">$45 one-way</div>
              </label>

              <label className={`p-3 rounded-lg border cursor-pointer transition-colors flex flex-col justify-between ${
                includeSpa ? 'bg-amber-500/10 border-amber-500/40' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">Wellness Spa</span>
                  <input
                    type="checkbox"
                    checked={includeSpa}
                    onChange={(e) => setIncludeSpa(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                </div>
                <div className="text-[11px] text-neutral-400">$90 60-min session</div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wider text-[11px] text-neutral-400">
              Payment Gateway Simulation
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'credit_card', label: 'Credit / Debit Card' },
                { id: 'upi', label: 'UPI / NetBanking' },
                { id: 'corporate_invoice', label: 'Corporate Direct Folio' }
              ].map((method) => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                  className={`p-2.5 rounded-lg border text-xs font-medium transition-colors text-left ${
                    paymentMethod === method.id
                      ? 'bg-amber-500/10 border-amber-400 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="text-neutral-400 block mb-1">Special Requests or Instructions</label>
            <textarea
              rows={2}
              placeholder="e.g. High floor preferred, quiet room away from elevators, anniversary celebration setup..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Price Breakdown Calculation */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5 font-mono">
            <div className="flex justify-between text-neutral-400">
              <span>{nights} Nights × ${room.pricePerNight}</span>
              <span className="tabular-nums">${roomRateTotal.toFixed(2)}</span>
            </div>
            {addOnsTotal > 0 && (
              <div className="flex justify-between text-neutral-400">
                <span>Enhancements & Add-ons</span>
                <span className="tabular-nums">${addOnsTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>Hospitality State Tax & Surcharge (12%)</span>
              <span className="tabular-nums">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
              <span className="font-sans font-semibold">Total Payable</span>
              <span className="tabular-nums text-amber-400">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Submission CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl transition-colors shadow-md text-sm flex items-center justify-center gap-2"
            >
              <span>Confirm & Secure Booking (${grandTotal.toFixed(2)})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
