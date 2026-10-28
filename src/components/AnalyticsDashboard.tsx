import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Users, 
  Bed, 
  Calendar,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { Room, Booking } from '../types/hotel';

interface AnalyticsDashboardProps {
  rooms: Room[];
  bookings: Booking[];
  onOpenSubmissionModal: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  rooms,
  bookings,
  onOpenSubmissionModal,
}) => {
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === 'occupied').length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  // Total Revenue
  const totalRevenue = bookings
    .filter((b) => b.bookingStatus !== 'cancelled')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  // Total Nights sold
  const totalNights = bookings
    .filter((b) => b.bookingStatus !== 'cancelled')
    .reduce((sum, b) => sum + b.nights, 0) || 1;

  // Average Daily Rate (ADR) = Total Room Revenue / Total Nights
  const roomRevenueOnly = bookings
    .filter((b) => b.bookingStatus !== 'cancelled')
    .reduce((sum, b) => sum + b.roomRateTotal, 0);
  const adr = Math.round(roomRevenueOnly / totalNights);

  // RevPAR = ADR * Occupancy Rate
  const revpar = Math.round(adr * (occupancyRate / 100));

  // Revenue by Room Type
  const revenueByType: { [key: string]: number } = {};
  rooms.forEach((r) => {
    revenueByType[r.type] = 0;
  });
  bookings.forEach((b) => {
    if (b.bookingStatus !== 'cancelled') {
      revenueByType[b.roomType] = (revenueByType[b.roomType] || 0) + b.totalAmount;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-neutral-900 border border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400">Hospitality Yield & Performance</span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">Real-Time Financial Intelligence</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            RevPAR & Occupancy Analytics
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time revenue metrics, average daily rate calculations, and capacity optimization.
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

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* RevPAR */}
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>RevPAR (Yield)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            ${revpar}
          </div>
          <div className="text-[11px] text-neutral-500">Revenue per available room</div>
        </div>

        {/* ADR */}
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Average Daily Rate (ADR)</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            ${adr}
          </div>
          <div className="text-[11px] text-neutral-500">Across {totalNights} guest nights</div>
        </div>

        {/* Occupancy Rate */}
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Occupancy Rate</span>
            <Percent className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            {occupancyRate}%
          </div>
          <div className="text-[11px] text-neutral-500">
            {occupiedRooms} of {totalRooms} suites occupied
          </div>
        </div>

        {/* Gross Revenue */}
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Total Gross Revenue</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-neutral-500">Includes rooms, spa & dining</div>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Revenue by Room Tier */}
        <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Revenue by Room Category</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Financial performance segmented across luxury suite configurations.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(revenueByType).map(([type, amount]) => {
              const maxCatRev = Math.max(...Object.values(revenueByType), 1);
              const percentage = Math.round((amount / maxCatRev) * 100);

              return (
                <div key={type} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-neutral-300">
                    <span className="font-medium truncate max-w-[280px]">{type}</span>
                    <span className="font-mono tabular-nums font-semibold text-white">
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-800">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Operational Status Distribution */}
        <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Room Inventory Turnover</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live capacity breakdown across all floors.
            </p>
          </div>

          <div className="space-y-2.5 py-2 text-xs">
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-emerald-400 font-medium">Vacant Clean (Ready)</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {rooms.filter((r) => r.status === 'vacant_clean').length} Suites
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-rose-400 font-medium">In-House Guests (Occupied)</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {rooms.filter((r) => r.status === 'occupied').length} Suites
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-amber-400 font-medium">Arrivals Due (Reserved)</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {rooms.filter((r) => r.status === 'reserved').length} Suites
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-orange-400 font-medium">Housekeeping / Cleaning</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {rooms.filter((r) => r.status === 'vacant_dirty').length} Suites
              </span>
            </div>
          </div>

          <div className="p-3 bg-neutral-950/60 rounded-lg border border-neutral-800/80 text-[11px] text-neutral-400">
            Current property health index is nominal. All active reservations possess verified security deposits and guaranteed payment folios.
          </div>
        </div>
      </div>
    </div>
  );
};
