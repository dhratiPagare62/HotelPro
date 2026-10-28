import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Printer, 
  Plus, 
  Eye, 
  CheckCircle, 
  Clock, 
  X,
  CreditCard,
  User
} from 'lucide-react';
import { Booking, BookingStatus, FolioCharge } from '../types/hotel';

interface ReservationsTableProps {
  bookings: Booking[];
  onUpdateBooking: (updated: Booking) => void;
  onOpenSubmissionModal: () => void;
}

export const ReservationsTable: React.FC<ReservationsTableProps> = ({
  bookings,
  onUpdateBooking,
  onOpenSubmissionModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [selectedBookingForFolio, setSelectedBookingForFolio] = useState<Booking | null>(null);

  // New charge inputs inside folio modal
  const [newChargeItem, setNewChargeItem] = useState('');
  const [newChargeAmount, setNewChargeAmount] = useState('');
  const [newChargeCategory, setNewChargeCategory] = useState<'dining' | 'spa' | 'transfer' | 'room' | 'other'>('dining');

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.bookingStatus !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = b.guestName.toLowerCase().includes(q);
      const matchRef = b.bookingRef.toLowerCase().includes(q);
      const matchRoom = b.roomNumber.toLowerCase().includes(q);
      const matchEmail = b.guestEmail.toLowerCase().includes(q);
      if (!matchName && !matchRef && !matchRoom && !matchEmail) return false;
    }
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'checked_in':
        return {
          text: 'Checked In',
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
        };
      case 'confirmed':
        return {
          text: 'Confirmed',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
        };
      case 'checked_out':
        return {
          text: 'Checked Out',
          color: 'text-neutral-400 bg-neutral-800 border-neutral-700'
        };
      case 'cancelled':
        return {
          text: 'Cancelled',
          color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
        };
    }
  };

  const handleAddCharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForFolio || !newChargeItem || !newChargeAmount) return;

    const amountNum = parseFloat(newChargeAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const newCharge: FolioCharge = {
      id: `ch-${Date.now()}`,
      item: newChargeItem,
      amount: amountNum,
      date: new Date().toISOString().split('T')[0],
      category: newChargeCategory
    };

    const updatedCharges = [...selectedBookingForFolio.extraCharges, newCharge];
    const chargesSum = updatedCharges.reduce((acc, c) => acc + c.amount, 0);
    const subtotal = selectedBookingForFolio.roomRateTotal + chargesSum;
    const taxAmount = +(subtotal * 0.12).toFixed(2);
    const totalAmount = +(subtotal + taxAmount).toFixed(2);

    const updatedBooking: Booking = {
      ...selectedBookingForFolio,
      extraCharges: updatedCharges,
      taxAmount,
      totalAmount
    };

    onUpdateBooking(updatedBooking);
    setSelectedBookingForFolio(updatedBooking);
    setNewChargeItem('');
    setNewChargeAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-neutral-900 border border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400">Guest Folio & Booking Registry</span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">MERN Database Management</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Guest Reservations & Billing Ledger
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Search guest stays, inspect line-item folios, apply room charges, and generate invoices.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSubmissionModal}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition-colors"
          >
            SkillWallet Submission
          </button>
        </div>
      </div>

      {/* Search and Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Bookings' },
            { id: 'checked_in', label: 'Checked In' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'checked_out', label: 'Checked Out' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? 'bg-amber-400 text-neutral-950 font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, ref, room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-8 pr-3 py-2 text-neutral-200 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300 border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/80 text-neutral-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Suite</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Nights</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredBookings.map((b) => {
                const statusBadge = getStatusBadge(b.bookingStatus);

                return (
                  <tr key={b.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-amber-400">
                      {b.bookingRef}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{b.guestName}</div>
                      <div className="text-[11px] text-neutral-500">{b.guestEmail}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-neutral-200">#{b.roomNumber}</div>
                      <div className="text-[11px] text-neutral-500">{b.roomType}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">
                      {b.checkIn} → {b.checkOut}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-neutral-300">
                      {b.nights}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold tabular-nums text-white">
                      ${b.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium border ${statusBadge.color}`}>
                        {statusBadge.text}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedBookingForFolio(b)}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Folio</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-400">
            No reservations found matching your criteria.
          </div>
        )}
      </div>

      {/* Guest Folio Modal */}
      {selectedBookingForFolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/60">
              <div>
                <span className="text-xs font-mono text-amber-400">
                  Guest Billing Folio · {selectedBookingForFolio.bookingRef}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {selectedBookingForFolio.guestName} (Suite #{selectedBookingForFolio.roomNumber})
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookingForFolio(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-neutral-300">
              {/* Guest Details Bar */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <div>
                  <span className="text-neutral-500 block">Phone</span>
                  <span className="text-neutral-200 mt-0.5 block">{selectedBookingForFolio.guestPhone}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">ID Proof</span>
                  <span className="text-neutral-200 font-mono mt-0.5 block">
                    {selectedBookingForFolio.guestIdType} ({selectedBookingForFolio.guestIdNumber || 'VERIFIED'})
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Key Card</span>
                  <span className="text-emerald-400 font-mono mt-0.5 block">
                    {selectedBookingForFolio.keyCardAssigned || 'Pending Check-In'}
                  </span>
                </div>
              </div>

              {/* Itemized Folio Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] text-neutral-400">
                    Itemized Folio Transactions
                  </h4>
                  <span className="text-neutral-500 font-mono">
                    {selectedBookingForFolio.nights} Nights Stay
                  </span>
                </div>

                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 font-mono space-y-2">
                  <div className="flex justify-between text-neutral-300 pb-1.5 border-b border-neutral-800/80">
                    <span className="font-sans">Room Rate ({selectedBookingForFolio.nights} nights @ ${Math.round(selectedBookingForFolio.roomRateTotal / selectedBookingForFolio.nights)})</span>
                    <span className="tabular-nums">${selectedBookingForFolio.roomRateTotal.toFixed(2)}</span>
                  </div>

                  {selectedBookingForFolio.extraCharges.map((ch) => (
                    <div key={ch.id} className="flex justify-between text-neutral-400 text-[11px]">
                      <span className="font-sans">{ch.item} ({ch.date})</span>
                      <span className="tabular-nums">${ch.amount.toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="flex justify-between text-neutral-400 pt-1 border-t border-neutral-800/60">
                    <span className="font-sans">State & City Hospitality Tax (12%)</span>
                    <span className="tabular-nums">${selectedBookingForFolio.taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                    <span className="font-sans">Total Folio Balance</span>
                    <span className="tabular-nums text-amber-400">${selectedBookingForFolio.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Add In-Stay Room Charge Form */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] text-neutral-400">
                  Post Room Charge / In-Room Dining
                </h4>
                <form onSubmit={handleAddCharge} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      placeholder="e.g. Minibar Consumption, Room Service"
                      value={newChargeItem}
                      onChange={(e) => setNewChargeItem(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 text-xs focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <select
                      value={newChargeCategory}
                      onChange={(e) => setNewChargeCategory(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-2 text-neutral-200 text-xs focus:outline-none"
                    >
                      <option value="dining">Dining</option>
                      <option value="spa">Spa</option>
                      <option value="transfer">Transfer</option>
                      <option value="room">Room Misc</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="$ Amount"
                      value={newChargeAmount}
                      onChange={(e) => setNewChargeAmount(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-2 text-neutral-200 text-xs font-mono focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Post</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 px-6 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Folio Invoice</span>
              </button>
              <button
                onClick={() => setSelectedBookingForFolio(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
