import React from 'react';
import { Calendar, KeyRound } from 'lucide-react';

interface NavbarProps {
  activeTab: 'guest' | 'matrix' | 'reservations' | 'analytics';
  setActiveTab: (tab: 'guest' | 'matrix' | 'reservations' | 'analytics') => void;
  onBookNow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onBookNow,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('guest')}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
              HP
            </div>
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
              HotelPro
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <button
            onClick={() => setActiveTab('guest')}
            className={`transition-colors whitespace-nowrap hover:text-white pb-0.5 border-b-2 ${
              activeTab === 'guest'
                ? 'text-white border-amber-500 font-semibold'
                : 'border-transparent text-neutral-400'
            }`}
          >
            Suites & Booking
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`transition-colors whitespace-nowrap hover:text-white pb-0.5 border-b-2 ${
              activeTab === 'matrix'
                ? 'text-white border-amber-500 font-semibold'
                : 'border-transparent text-neutral-400'
            }`}
          >
            Front Desk Matrix
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`transition-colors whitespace-nowrap hover:text-white pb-0.5 border-b-2 ${
              activeTab === 'reservations'
                ? 'text-white border-amber-500 font-semibold'
                : 'border-transparent text-neutral-400'
            }`}
          >
            Reservations & Folio
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`transition-colors whitespace-nowrap hover:text-white pb-0.5 border-b-2 ${
              activeTab === 'analytics'
                ? 'text-white border-amber-500 font-semibold'
                : 'border-transparent text-neutral-400'
            }`}
          >
            Yield & RevPAR
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBookNow}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Suite</span>
          </button>
        </div>
      </div>
    </header>
  );
};
