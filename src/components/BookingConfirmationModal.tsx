import React from 'react';
import { CheckCircle2, Printer, X, Download, Calendar, Bed, User, ShieldCheck } from 'lucide-react';
import { Booking } from '../types/hotel';

interface BookingConfirmationModalProps {
  booking: Booking | null;
  onClose: () => void;
  onViewReservations: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
  onViewReservations,
}) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 text-center border-b border-neutral-800 bg-emerald-500/10">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Reservation Confirmed
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Thank you, {booking.guestName}!
          </h2>
          <div className="mt-2 inline-flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 text-xs font-mono text-amber-400">
            <span>Booking Ref:</span>
            <span className="font-bold">{booking.bookingRef}</span>
          </div>
        </div>

        {/* Invoice / Folio Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-neutral-300">
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
            <div className="flex justify-between items-start pb-2 border-b border-neutral-800/80">
              <div>
                <span className="text-neutral-500 block">Room & Suite</span>
                <span className="font-semibold text-white mt-0.5 block">
                  {booking.roomType} (Suite #{booking.roomNumber})
                </span>
              </div>
              <div className="text-right">
                <span className="text-neutral-500 block">Duration</span>
                <span className="font-mono text-white mt-0.5 block">
                  {booking.nights} Nights
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-neutral-400">
              <div>
                <span className="text-neutral-500 block">Check-in</span>
                <span className="text-neutral-200 font-mono">{booking.checkIn} (from 3:00 PM)</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Check-out</span>
                <span className="text-neutral-200 font-mono">{booking.checkOut} (until 11:00 AM)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800/80 space-y-1 font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Room Charges</span>
                <span>${booking.roomRateTotal.toFixed(2)}</span>
              </div>
              {booking.extraCharges.map((ch) => (
                <div key={ch.id} className="flex justify-between text-neutral-400">
                  <span className="font-sans">{ch.item}</span>
                  <span>${ch.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-neutral-400">
                <span>State & Local Tax (12%)</span>
                <span>${booking.taxAmount.toFixed(2)}</span>
              </div>
              <div className="pt-1.5 border-t border-neutral-800 flex justify-between font-bold text-sm text-white">
                <span className="font-sans">Total Paid</span>
                <span className="text-amber-400">${booking.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-neutral-950/60 rounded-lg border border-neutral-800/60 text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Confirmation Email Sent</span>
            </div>
            <p>
              A confirmation voucher and receipt has been sent to <strong className="text-neutral-200">{booking.guestEmail}</strong>. Present this reference number at the front desk upon check-in.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Folio Receipt</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onViewReservations();
              }}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold rounded-lg transition-colors"
            >
              View in Reservations
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
