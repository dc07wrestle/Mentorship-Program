import { useState, useEffect } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Lock, 
  ArrowRight,
  CheckCircle2,
  Loader2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CalSlot {
  time: string; // ISO 8601 string, e.g. "2026-10-22T18:00:00.000Z"
}

// Fallback weekly availability window (Eastern Time) if network is offline
const FALLBACK_HOURS: Record<number, string> = {
  0: '9:00 AM – 10:00 PM EST',  // Sunday
  1: '2:00 PM – 10:00 PM EST',  // Monday
  2: '2:00 PM – 10:00 PM EST',  // Tuesday
  3: '2:00 PM – 10:00 PM EST',  // Wednesday
  4: '2:00 PM – 10:00 PM EST',  // Thursday
  5: '12:00 PM – 10:00 PM EST', // Friday
  6: '12:00 PM – 10:00 PM EST', // Saturday
};

export default function AvailabilityModal({ isOpen, onClose }: AvailabilityModalProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  
  // Real Cal.com API slots dictionary: { "2026-10-22": [{ time: "..." }, ...], ... }
  const [slotsByDate, setSlotsByDate] = useState<Record<string, CalSlot[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function fetchLiveAvailability() {
      try {
        setLoading(true);
        setError(null);

        const now = new Date();
        const start = now.toISOString();

        const future = new Date();
        future.setDate(now.getDate() + 45);
        const end = future.toISOString();

        const res = await fetch(`/api/availability?startTime=${encodeURIComponent(start)}&endTime=${encodeURIComponent(end)}`);
        if (!res.ok) {
          throw new Error(`Failed to load calendar (Status ${res.status})`);
        }

        const data = await res.json();
        if (data.status === 'success' && data.slots) {
          if (isMounted) {
            setSlotsByDate(data.slots);
            
            // If today has no slots, find the earliest day that does
            const slotDates = Object.keys(data.slots).sort();
            if (slotDates.length > 0) {
              const [y, m, d] = slotDates[0].split('-').map(Number);
              setSelectedDate(new Date(y, m - 1, d));
            }
          }
        } else {
          throw new Error(data.message || 'Unable to retrieve availability data');
        }
      } catch (err: any) {
        console.error('Error fetching live Cal.com availability:', err);
        if (isMounted) {
          setError(err.message || 'Error loading live schedule');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchLiveAvailability();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calendar matrix calculations
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Format selected date as YYYY-MM-DD
  const formatYMD = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const selectedKey = formatYMD(selectedDate);
  const activeSlots = slotsByDate[selectedKey] || [];

  // Helper to format slot time into 12-hour Eastern Time string
  const formatSlotTime = (isoTime: string) => {
    try {
      const date = new Date(isoTime);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/New_York',
        hour12: true
      });
    } catch {
      return isoTime;
    }
  };

  const handlePurchaseClick = () => {
    onClose();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#pricing';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[94vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-brand-blue to-blue-950 text-white p-5 sm:p-7 flex items-center justify-between border-b border-white/10 relative">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-red-400 shadow-inner">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Cal.com Availability
                </span>
                <span className="bg-white/10 text-blue-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                  View-Only
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Check Mentor Availability
              </h3>
              <p className="text-xs sm:text-sm text-blue-200">
                1-on-1 Mentorship Sessions (30 Min) • UPenn Division I Wrestlers
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner: Pay-First Policy */}
        <div className="bg-amber-50/90 border-b border-amber-200/80 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>View-Only Mode:</strong> Sessions are secured upon purchase. After booking your session pack, you receive an immediate direct link to lock in your exact slot!
            </span>
          </div>
          <button 
            onClick={handlePurchaseClick}
            className="font-bold text-brand-red hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View Session Packs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body: Split Calendar & Time Slots */}
        <div className="p-5 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 flex-1">
          {/* Left Column: Interactive Month Picker (7 Cols) */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">
                    {monthNames[month]} {year}
                  </h4>
                  <p className="text-xs text-gray-500">
                    All times in Eastern Time (EST)
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
                  <button 
                    onClick={prevMonth}
                    className="p-1.5 hover:bg-white rounded-lg text-gray-700 transition-colors cursor-pointer"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextMonth}
                    className="p-1.5 hover:bg-white rounded-lg text-gray-700 transition-colors cursor-pointer"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-gray-400 mb-2">
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1.5">
                {/* Empty slots for first day offset */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10 sm:h-11" />
                ))}

                {/* Actual Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dateObj = new Date(year, month, dayNum);
                  dateObj.setHours(0, 0, 0, 0);

                  const dateKey = formatYMD(dateObj);
                  const isPast = dateObj < today;
                  const daySlots = slotsByDate[dateKey] || [];
                  const hasSlots = daySlots.length > 0;

                  const isSelected = 
                    selectedDate.getDate() === dayNum &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getFullYear() === year;

                  const isToday = 
                    today.getDate() === dayNum &&
                    today.getMonth() === month &&
                    today.getFullYear() === year;

                  return (
                    <button
                      key={dayNum}
                      disabled={isPast}
                      onClick={() => setSelectedDate(dateObj)}
                      className={`h-10 sm:h-11 rounded-xl font-bold text-sm flex flex-col items-center justify-center transition-all relative ${
                        isSelected
                          ? 'bg-brand-red text-white shadow-md shadow-red-900/30 scale-105 z-10'
                          : isPast
                          ? 'text-gray-300 cursor-not-allowed bg-gray-50/50'
                          : hasSlots
                          ? 'text-gray-900 hover:bg-blue-50 hover:text-brand-blue cursor-pointer border border-blue-100 font-extrabold'
                          : 'text-gray-400 hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      <span>{dayNum}</span>
                      
                      {/* Dot indicators: Open slots badge */}
                      {hasSlots && !isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute bottom-1" />
                      )}

                      {isToday && !isSelected && !hasSlots && (
                        <span className="w-1 h-1 rounded-full bg-brand-red absolute bottom-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hours Guide Box */}
            <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs text-gray-600">
              <div className="font-bold text-brand-blue mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-red" />
                <span>Mentor Schedule Window</span>
              </div>
              <p className="leading-relaxed">
                • <strong>Sundays:</strong> 9:00 AM – 10:00 PM EST<br />
                • <strong>Mon – Thu:</strong> 2:00 PM – 10:00 PM EST<br />
                • <strong>Fri – Sat:</strong> 12:00 PM – 10:00 PM EST
              </p>
            </div>
          </div>

          {/* Right Column: 30-Minute Open Slots for Selected Day (5 Cols) */}
          <div className="md:col-span-5 flex flex-col border-t md:border-t-0 md:border-l md:border-gray-100 md:pl-8 pt-5 md:pt-0">
            <div className="mb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-red">
                Available Openings
              </div>
              <h5 className="font-bold text-gray-900 text-base">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </h5>
              <p className="text-xs text-gray-500 mt-0.5">
                {FALLBACK_HOURS[selectedDate.getDay()] || 'Closed'}
              </p>
            </div>

            {/* Slots List or Loader */}
            <div className="flex-1 overflow-y-auto max-h-[300px] pr-1 space-y-2">
              {loading ? (
                <div className="py-16 flex flex-col items-center justify-center gap-3 text-gray-400">
                  <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                  <span className="text-xs font-medium">Checking live Cal.com slots...</span>
                </div>
              ) : activeSlots.length > 0 ? (
                activeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between text-sm hover:border-brand-blue hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <Clock className="w-4 h-4 text-brand-blue group-hover:text-brand-red transition-colors" />
                      <span>{formatSlotTime(slot.time)}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                      Open Slot
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-sm font-semibold text-gray-600">No open slots on this date</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Select any date with a green dot to view available 30-minute times.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>30 min session</span>
              </div>
              <span className="font-semibold text-gray-700">
                {activeSlots.length} open {activeSlots.length === 1 ? 'slot' : 'slots'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="bg-gray-50 border-t border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500 text-center sm:text-left">
            <span>Want to lock in one of these slots? </span>
            <span className="font-semibold text-gray-700">Purchase a mentorship pack to reserve your time.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 text-sm font-bold transition-all cursor-pointer flex-1 sm:flex-initial"
            >
              Close
            </button>
            <button
              onClick={handlePurchaseClick}
              className="px-6 py-3 rounded-xl bg-brand-red hover:bg-red-800 text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer flex-1 sm:flex-initial"
            >
              <span>Purchase Sessions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
