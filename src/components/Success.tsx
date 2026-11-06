import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  ArrowRight, 
  Mail, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle, 
  Lock, 
  Sparkles,
  User,
  Key
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

interface PurchaseRecord {
  id: string;
  customerEmail: string;
  customerName: string;
  packageId: '3pack' | '5pack' | '10pack' | '15pack';
  packageName: string;
  totalSessions: number;
  initialBookingStatus: 'unbooked' | 'booked' | 'cancelled';
  initialBookingUid?: string;
  initialBookingTime?: string;
  attendeeName?: string;
  attendeeEmail?: string;
  wrestlerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Success() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawSessionId = searchParams.get('session_id') || searchParams.get('session') || '';
  
  const [sessionIdInput, setSessionIdInput] = useState(rawSessionId);
  const [purchase, setPurchase] = useState<PurchaseRecord | null>(null);
  const [loadingPurchase, setLoadingPurchase] = useState<boolean>(!!rawSessionId);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  // Calendar & Slot Selection States
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlotsByDate, setAvailableSlotsByDate] = useState<Record<string, Array<{ time: string }>>>({});
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string | null>(null);

  // Booking Form State
  const [attendeeName, setAttendeeName] = useState<string>('');
  const [attendeeEmail, setAttendeeEmail] = useState<string>('');
  const [wrestlerNotes, setWrestlerNotes] = useState<string>('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // 1. Fetch & Verify Purchase with Backend
  const verifyPurchase = async (sessionIdToVerify: string) => {
    if (!sessionIdToVerify) return;
    setLoadingPurchase(true);
    setPurchaseError(null);
    try {
      const res = await fetch('/api/bookings/verify-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionIdToVerify })
      });
      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        throw new Error(data.message || 'Could not verify checkout session.');
      }
      setPurchase(data.purchase);
      if (data.purchase?.customerName && !attendeeName) {
        setAttendeeName(data.purchase.customerName);
      }
      if (data.purchase?.customerEmail && !attendeeEmail) {
        setAttendeeEmail(data.purchase.customerEmail);
      }
    } catch (err: any) {
      console.error('[PURCHASE_VERIFY_ERROR]', err);
      setPurchaseError(err.message || 'Unable to verify purchase session.');
    } finally {
      setLoadingPurchase(false);
    }
  };

  useEffect(() => {
    if (rawSessionId) {
      verifyPurchase(rawSessionId);
    }
  }, [rawSessionId]);

  // 2. Fetch Live Cal.com Availability
  useEffect(() => {
    if (!purchase || purchase.initialBookingStatus === 'booked') return;

    let isMounted = true;
    async function loadAvailability() {
      setLoadingSlots(true);
      try {
        const res = await fetch('/api/availability?timeZone=America/New_York');
        const data = await res.json();
        if (isMounted && data.status === 'success' && data.slots) {
          setAvailableSlotsByDate(data.slots);
          // Set selected date to earliest available date
          const dateKeys = Object.keys(data.slots).sort();
          if (dateKeys.length > 0) {
            const [y, m, d] = dateKeys[0].split('-').map(Number);
            setSelectedDate(new Date(y, m - 1, d));
          }
        }
      } catch (err) {
        console.error('[AVAILABILITY_ERROR]', err);
      } finally {
        if (isMounted) setLoadingSlots(false);
      }
    }

    loadAvailability();
    return () => { isMounted = false; };
  }, [purchase]);

  // 3. Handle Initial Booking Submission
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purchase || !selectedSlotTime) {
      setBookingError('Please choose a time slot on the calendar first.');
      return;
    }
    if (!attendeeEmail) {
      setBookingError('Please enter a contact email for session reminders.');
      return;
    }

    setIsSubmittingBooking(true);
    setBookingError(null);

    try {
      const res = await fetch('/api/bookings/create-initial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: purchase.id,
          slotTime: selectedSlotTime,
          attendeeName: attendeeName || purchase.customerName,
          attendeeEmail: attendeeEmail || purchase.customerEmail,
          wrestlerNotes,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'
        })
      });

      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        throw new Error(data.message || 'Unable to schedule initial session.');
      }

      // Smoothly update local state with confirmed purchase
      setPurchase(data.purchase);
    } catch (err: any) {
      console.error('[BOOKING_SUBMIT_ERROR]', err);
      setBookingError(err.message || 'Booking submission failed. Please choose another time.');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Helper date formatters
  const formatYMD = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const selectedDateKey = formatYMD(selectedDate);
  const activeSlots = availableSlotsByDate[selectedDateKey] || [];

  const formatSlotTime = (isoTime: string) => {
    try {
      const d = new Date(isoTime);
      return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/New_York',
        hour12: true
      });
    } catch {
      return isoTime;
    }
  };

  const formatFullDate = (isoString?: string) => {
    if (!isoString) return 'Date to be confirmed';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/New_York',
        timeZoneName: 'short'
      });
    } catch {
      return isoString;
    }
  };

  // Month navigation helpers
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionIdInput.trim()) {
      setSearchParams({ session_id: sessionIdInput.trim() });
      verifyPurchase(sessionIdInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-start px-4 sm:px-6 py-10 md:py-16 overflow-x-hidden">
      {/* Background Graphic */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070&auto=format&fit=crop" 
          alt="Wrestling background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl w-full bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* CASE 1: No Session ID Provided */}
        {!rawSessionId && !purchase && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Key className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-blue font-heading mb-3">
              Unlock Your Initial Session Booking
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8">
              Every session package purchased through Stripe comes with an official one-time booking authorization to secure your initial 1-on-1 session with our Penn Division I wrestlers.
            </p>

            <form onSubmit={handleManualSearch} className="max-w-md mx-auto space-y-4 mb-8">
              <div className="text-left">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Stripe Checkout Session ID
                </label>
                <input 
                  type="text"
                  placeholder="e.g. cs_live_..."
                  value={sessionIdInput}
                  onChange={(e) => setSessionIdInput(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Found in your Stripe email receipt or post-checkout confirmation link.
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-red hover:bg-red-800 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Verify Purchase & Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Test Option */}
            <div className="pt-6 border-t border-gray-100 max-w-md mx-auto">
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-bold">
                Looking to test the booking portal?
              </p>
              <button
                type="button"
                onClick={() => {
                  const demoId = 'mock_session_5pack_demo';
                  setSessionIdInput(demoId);
                  setSearchParams({ session_id: demoId });
                  verifyPurchase(demoId);
                }}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Test with Demo 5-Session Pack
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loadingPurchase && (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-brand-blue">Verifying Purchase Session...</h3>
            <p className="text-xs text-gray-500 mt-1">Authenticating directly with Stripe and ledger</p>
          </div>
        )}

        {/* Purchase Verification Error */}
        {purchaseError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-lg mx-auto my-6">
            <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-red-900 mb-1">Verification Unsuccessful</h3>
            <p className="text-xs text-red-700 mb-4">{purchaseError}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/#pricing" 
                className="px-5 py-2.5 bg-brand-red text-white text-xs font-bold rounded-xl hover:bg-red-800 transition-colors"
              >
                Browse Session Packs
              </Link>
              <button 
                type="button"
                onClick={() => {
                  setPurchaseError(null);
                  setPurchase(null);
                  setSearchParams({});
                }}
                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50"
              >
                Try Another Session ID
              </button>
            </div>
          </div>
        )}

        {/* CASE 2: Purchase is ALREADY BOOKED (Strict Single-Use Gate) */}
        {purchase && purchase.initialBookingStatus === 'booked' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold uppercase tracking-wider mb-4">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Initial Session Confirmed</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue font-heading mb-3">
                You're Scheduled on the Mat!
              </h1>
              <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Your initial 1-on-1 mentorship session has been securely confirmed and recorded in our calendar.
              </p>
            </div>

            {/* Confirmed Schedule Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Scheduled Time (EST)
                  </span>
                  <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-brand-blue">
                    <Calendar className="w-5 h-5 text-brand-red shrink-0" />
                    <span>{formatFullDate(purchase.initialBookingTime)}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Package Purchased
                  </span>
                  <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{purchase.packageName}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    1 initial session booked • {purchase.totalSessions - 1} remaining
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Athlete / Contact
                  </span>
                  <p className="text-sm font-semibold text-gray-800">
                    {purchase.attendeeName || purchase.customerName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {purchase.attendeeEmail || purchase.customerEmail}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Booking Authorization ID
                  </span>
                  <p className="text-xs font-mono text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 inline-block">
                    {purchase.id.slice(0, 24)}...
                  </p>
                </div>
              </div>

              {/* Security Gate Notice */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-start gap-3 bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
                <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Single-Use Security Notice:</strong> This purchase authorization has officially fulfilled its initial booking slot. Duplicate initial bookings are restricted to protect calendar slots.
                </div>
              </div>
            </div>

            {/* Preparation and Remaining Sessions Instructions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-brand-red/5 border border-brand-red/10 rounded-2xl p-5 text-left">
                <h4 className="text-sm font-bold text-brand-blue mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-red" />
                  <span>Send Your Match Film</span>
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Send match video prior to your call to{' '}
                  <a href="mailto:matmentorspenn@gmail.com" className="font-bold text-brand-red underline">
                    matmentorspenn@gmail.com
                  </a>{' '}
                  so your mentor can prepare custom tactical feedback.
                </p>
              </div>

              <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-5 text-left">
                <h4 className="text-sm font-bold text-brand-blue mb-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-blue" />
                  <span>Remaining Sessions ({purchase.totalSessions - 1} left)</span>
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  During your initial call, your mentor will coordinate recurring weekly times and provide private booking links for your remaining package sessions.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-blue hover:bg-blue-900 text-white rounded-xl font-bold text-sm transition-all shadow-md"
              >
                <span>Return to Mat Mentors Home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* CASE 3: Purchase is UNBOOKED (In-App Booking Proxy) */}
        {purchase && purchase.initialBookingStatus !== 'booked' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Steps Indicator */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white mb-1 shadow-md">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    1. Paid ({purchase.packageName})
                  </span>
                </div>
                <div className="w-12 h-0.5 bg-gray-200 mb-4" />
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white mb-1 shadow-md animate-pulse">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider">
                    2. Select Initial Slot
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-blue font-heading mb-2">
                Lock In Your Initial Mentorship Session
              </h1>
              <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-sm">
                Verified Purchase: <strong className="text-brand-blue">{purchase.packageName}</strong>. Select your preferred 30-minute time slot below.
              </p>
            </div>

            {bookingError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                <span>{bookingError}</span>
              </div>
            )}

            {/* In-App Interactive Schedule Picker */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column: Calendar Days */}
                <div className="lg:col-span-7">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-brand-blue text-base sm:text-lg">
                      {monthNames[month]} {year}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCurrentMonthDate(new Date(year, month - 1, 1))}
                        className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 cursor-pointer"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentMonthDate(new Date(year, month + 1, 1))}
                        className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 cursor-pointer"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                      <div key={d} className="py-1">{d}</div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-10" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNumber = i + 1;
                      const dateObj = new Date(year, month, dayNumber);
                      const key = formatYMD(dateObj);
                      const hasOpenings = (availableSlotsByDate[key] || []).length > 0;
                      const isSelected = key === selectedDateKey;

                      return (
                        <button
                          key={dayNumber}
                          type="button"
                          onClick={() => {
                            setSelectedDate(dateObj);
                            setSelectedSlotTime(null);
                          }}
                          disabled={!hasOpenings}
                          className={`h-11 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-brand-red text-white shadow-md'
                              : hasOpenings
                              ? 'bg-white text-gray-900 border border-gray-200 hover:border-brand-blue cursor-pointer'
                              : 'text-gray-300 bg-transparent cursor-not-allowed'
                          }`}
                        >
                          <span>{dayNumber}</span>
                          {hasOpenings && !isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-gray-400 mt-4 italic text-center sm:text-left">
                    * Showing live opening slots in Eastern Time (EST/EDT).
                  </p>
                </div>

                {/* Right Column: Time Slots & Attendee Form */}
                <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Available Openings
                    </h4>
                    <p className="text-sm font-bold text-brand-blue mb-3">
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>

                    {loadingSlots ? (
                      <div className="py-8 text-center text-xs text-gray-400">Loading open slots...</div>
                    ) : activeSlots.length === 0 ? (
                      <div className="p-4 bg-white rounded-xl border border-gray-200 text-center text-xs text-gray-500">
                        No open slots on this date. Please select another day marked with green.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                        {activeSlots.map(slot => {
                          const isChosen = selectedSlotTime === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              onClick={() => setSelectedSlotTime(slot.time)}
                              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                isChosen
                                  ? 'bg-brand-blue text-white shadow'
                                  : 'bg-white border border-gray-200 text-gray-700 hover:border-brand-blue'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5 opacity-70" />
                              <span>{formatSlotTime(slot.time)}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Form Submission */}
                  <form onSubmit={handleConfirmBooking} className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                        Athlete / Parent Name
                      </label>
                      <input 
                        type="text"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                        Contact Email (for Meet link)
                      </label>
                      <input 
                        type="email"
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        placeholder="athlete@example.com"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                        Wrestler Notes (Grade / Weight / Focus)
                      </label>
                      <textarea
                        value={wrestlerNotes}
                        onChange={(e) => setWrestlerNotes(e.target.value)}
                        rows={2}
                        placeholder="Optional: high single defense, mindset, match film questions..."
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingBooking || !selectedSlotTime}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                        selectedSlotTime && !isSubmittingBooking
                          ? 'bg-brand-red hover:bg-red-800 text-white cursor-pointer'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isSubmittingBooking ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Securing Your Slot...</span>
                        </>
                      ) : selectedSlotTime ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Confirm & Book Initial Slot</span>
                        </>
                      ) : (
                        <span>Select a Time Slot Above</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Footer Support Note */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <Link to="/" className="hover:text-brand-blue transition-colors">
            Return to Homepage
          </Link>
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-brand-red" />
            <span>Need assistance? Email <a href="mailto:matmentorspenn@gmail.com" className="text-brand-red font-semibold hover:underline">matmentorspenn@gmail.com</a></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
