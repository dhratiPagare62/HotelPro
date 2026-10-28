/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Globe, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  FileCode,
  Sparkles
} from 'lucide-react';
import { INITIAL_ROOMS, INITIAL_BOOKINGS } from './data/mockData';
import { Room, Booking, RoomStatus } from './types/hotel';
import { Navbar } from './components/Navbar';
import { GuestBookingPortal } from './components/GuestBookingPortal';
import { FrontDeskMatrix } from './components/FrontDeskMatrix';
import { ReservationsTable } from './components/ReservationsTable';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CodeRepositoryViewer } from './components/CodeRepositoryViewer';
import { SkillWalletSubmissionModal } from './components/SkillWalletSubmissionModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guest' | 'matrix' | 'reservations' | 'analytics'>('guest');
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [showCodeView, setShowCodeView] = useState(false);

  // Handlers for room updates
  const handleUpdateRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status } : r))
    );
  };

  // Add new booking from guest portal
  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    // update room status to reserved
    setRooms((prev) =>
      prev.map((r) => (r.id === newBooking.roomId ? { ...r, status: 'reserved' } : r))
    );
  };

  // Check in booking
  const handleCheckInBooking = (bookingId: string, keyCard: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, bookingStatus: 'checked_in', keyCardAssigned: keyCard }
          : b
      )
    );
  };

  // Check out booking
  const handleCheckOutBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, bookingStatus: 'checked_out' } : b
      )
    );
  };

  // Update existing booking (e.g. folio charges)
  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setShowCodeView(false);
          setActiveTab(tab);
        }}
        onBookNow={() => {
          setShowCodeView(false);
          setActiveTab('guest');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {showCodeView ? (
          <CodeRepositoryViewer
            onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'guest' && (
              <GuestBookingPortal
                rooms={rooms}
                onAddBooking={handleAddBooking}
                onNavigateToReservations={() => setActiveTab('reservations')}
                onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
              />
            )}

            {activeTab === 'matrix' && (
              <FrontDeskMatrix
                rooms={rooms}
                bookings={bookings}
                onUpdateRoomStatus={handleUpdateRoomStatus}
                onCheckInBooking={handleCheckInBooking}
                onCheckOutBooking={handleCheckOutBooking}
                onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
              />
            )}

            {activeTab === 'reservations' && (
              <ReservationsTable
                bookings={bookings}
                onUpdateBooking={handleUpdateBooking}
                onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsDashboard
                rooms={rooms}
                bookings={bookings}
                onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Submission Modal for SkillWallet Links & Git instructions (accessible from footer) */}
      <SkillWalletSubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        onNavigateToCode={() => {
          setIsSubmissionModalOpen(false);
          setShowCodeView(true);
        }}
      />

      {/* Editorial Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-8 px-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-300">HotelPro</span>
            <span>·</span>
            <span>Complete Hotel Booking & Management Solution</span>
            <span>·</span>
            <span>MERN Stack Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <button
              onClick={() => {
                setShowCodeView(!showCodeView);
              }}
              className="hover:text-amber-400 transition-colors"
            >
              {showCodeView ? 'Back to Portal' : 'MERN Source Code'}
            </button>
            <button
              onClick={() => setIsSubmissionModalOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Submission & Git Toolkit
            </button>
            <span className="text-neutral-500 font-mono">EN24CS3010362</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
