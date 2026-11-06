import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  runTransaction 
} from 'firebase/firestore';
import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';

// Load Firebase configuration
let firebaseConfig: any = null;
try {
  const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
} catch (e) {
  console.error('[FIREBASE_CONFIG_LOAD_ERROR]', e);
}

const app = getApps().length === 0 && firebaseConfig 
  ? initializeApp(firebaseConfig) 
  : (getApps()[0] || null);

export const db = app && firebaseConfig?.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
  : null;

// Stripe client (initialized if secret key is provided)
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia' as any,
    })
  : null;

export interface PurchaseRecord {
  id: string; // Stripe Checkout Session ID (e.g. cs_live_...)
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

/**
 * Verifies a Stripe Checkout Session ID and retrieves or creates
 * the corresponding purchase record in Firestore.
 */
export async function verifyStripeSession(sessionId: string): Promise<PurchaseRecord> {
  if (!sessionId || typeof sessionId !== 'string') {
    throw new Error('Valid Stripe Checkout Session ID is required.');
  }

  const cleanSessionId = sessionId.trim();

  // 1. Check if purchase is already registered in Firestore
  if (db) {
    const docRef = doc(db, 'purchases', cleanSessionId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as PurchaseRecord;
    }
  }

  // Handle mock/test sessions for testing and preview verification
  if (
    cleanSessionId.startsWith('mock_') || 
    cleanSessionId.startsWith('test_') || 
    cleanSessionId.includes('demo')
  ) {
    let packageId: '3pack' | '5pack' | '10pack' | '15pack' = '5pack';
    let packageName = '5 Session Pack';
    let totalSessions = 5;

    if (cleanSessionId.includes('3pack')) {
      packageId = '3pack';
      packageName = '3 Session Pack';
      totalSessions = 3;
    } else if (cleanSessionId.includes('10pack')) {
      packageId = '10pack';
      packageName = '10 Session Pack';
      totalSessions = 10;
    } else if (cleanSessionId.includes('15pack')) {
      packageId = '15pack';
      packageName = '15 Session Pack';
      totalSessions = 15;
    }

    const testPurchase: PurchaseRecord = {
      id: cleanSessionId,
      customerEmail: 'athlete@example.com',
      customerName: 'High School Wrestler',
      packageId,
      packageName,
      totalSessions,
      initialBookingStatus: 'unbooked',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (db) {
      await setDoc(doc(db, 'purchases', cleanSessionId), testPurchase);
    }
    return testPurchase;
  }

  // 2. If Stripe Secret Key is available, verify directly with Stripe API
  if (stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(cleanSessionId, {
        expand: ['line_items'],
      });

      if (session.payment_status !== 'paid') {
        throw new Error('This checkout session has not been completed or paid yet.');
      }

      // Determine package details from amount or line items
      const amount = session.amount_total || 0;
      let packageId: '3pack' | '5pack' | '10pack' | '15pack' = '3pack';
      let packageName = '3 Session Pack';
      let totalSessions = 3;

      if (amount >= 30000) {
        packageId = '15pack';
        packageName = '15 Session Pack';
        totalSessions = 15;
      } else if (amount >= 20000) {
        packageId = '10pack';
        packageName = '10 Session Pack';
        totalSessions = 10;
      } else if (amount >= 10000) {
        packageId = '5pack';
        packageName = '5 Session Pack';
        totalSessions = 5;
      } else {
        const itemDesc = session.line_items?.data?.[0]?.description?.toLowerCase() || '';
        if (itemDesc.includes('15')) {
          packageId = '15pack';
          packageName = '15 Session Pack';
          totalSessions = 15;
        } else if (itemDesc.includes('10')) {
          packageId = '10pack';
          packageName = '10 Session Pack';
          totalSessions = 10;
        } else if (itemDesc.includes('5')) {
          packageId = '5pack';
          packageName = '5 Session Pack';
          totalSessions = 5;
        }
      }

      const customerEmail = session.customer_details?.email || session.customer_email || 'parent@matmentors.pro';
      const customerName = session.customer_details?.name || 'Athlete Family';

      const purchase: PurchaseRecord = {
        id: cleanSessionId,
        customerEmail,
        customerName,
        packageId,
        packageName,
        totalSessions,
        initialBookingStatus: 'unbooked',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (db) {
        await setDoc(doc(db, 'purchases', cleanSessionId), purchase);
      }
      return purchase;
    } catch (err: any) {
      console.error('[STRIPE_VERIFY_ERROR]', err?.message || err);
      throw new Error(err?.message || 'Failed to verify checkout session with Stripe.');
    }
  }

  // 3. Fallback for testing / QA when Stripe key is not in local env
  if (
    cleanSessionId.startsWith('cs_test_') || 
    cleanSessionId.startsWith('test_') || 
    cleanSessionId.includes('mock')
  ) {
    let packageId: '3pack' | '5pack' | '10pack' | '15pack' = '5pack';
    let packageName = '5 Session Pack';
    let totalSessions = 5;

    if (cleanSessionId.includes('3pack')) {
      packageId = '3pack';
      packageName = '3 Session Pack';
      totalSessions = 3;
    } else if (cleanSessionId.includes('10pack')) {
      packageId = '10pack';
      packageName = '10 Session Pack';
      totalSessions = 10;
    } else if (cleanSessionId.includes('15pack')) {
      packageId = '15pack';
      packageName = '15 Session Pack';
      totalSessions = 15;
    }

    const testPurchase: PurchaseRecord = {
      id: cleanSessionId,
      customerEmail: 'student-athlete@example.com',
      customerName: 'High School Wrestler',
      packageId,
      packageName,
      totalSessions,
      initialBookingStatus: 'unbooked',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (db) {
      await setDoc(doc(db, 'purchases', cleanSessionId), testPurchase);
    }
    return testPurchase;
  }

  throw new Error('STRIPE_SECRET_KEY is required to verify live session purchases.');
}

/**
 * Creates the initial Cal.com booking on behalf of the customer
 * and atomically locks the purchase in Firestore to prevent duplicate bookings.
 */
export async function createInitialBooking(params: {
  sessionId: string;
  slotTime: string;
  attendeeName: string;
  attendeeEmail: string;
  wrestlerNotes?: string;
  timeZone?: string;
}): Promise<{ purchase: PurchaseRecord; booking: any }> {
  const { sessionId, slotTime, attendeeName, attendeeEmail, wrestlerNotes, timeZone } = params;

  if (!sessionId) throw new Error('Missing Stripe Session ID.');
  if (!slotTime) throw new Error('Please select an available session time slot.');
  if (!attendeeEmail) throw new Error('Attendee email is required.');

  if (!db) {
    throw new Error('Database connection is not available.');
  }

  const purchaseRef = doc(db, 'purchases', sessionId);
  const snap = await getDoc(purchaseRef);
  if (!snap.exists()) {
    throw new Error('Purchase record not found. Please verify your Stripe purchase first.');
  }

  const purchase = snap.data() as PurchaseRecord;
  if (purchase.initialBookingStatus === 'booked') {
    throw new Error(
      `This purchase has already been used to schedule an initial session on ${purchase.initialBookingTime || 'the calendar'}. Remaining package sessions will be coordinated directly with your mentor.`
    );
  }

  // 1. Call Cal.com v2 Booking API
  const isMock = sessionId.includes('mock') || sessionId.includes('demo') || sessionId.startsWith('test_');
  const apiKey = process.env.CAL_API_KEY || 'cal_live_8f955f0e3459172f221b0b45ba89e60e';
  const eventTypeId = process.env.CAL_EVENT_TYPE_ID || '5303258';

  let bookingUid = `demo_${Date.now()}`;
  let bookingResult: any = { uid: bookingUid, start: slotTime };

  if (isMock) {
    // For QA / demo testing: attempt Cal.com if email is valid, but allow mock booking simulation if Cal rejects dummy email
    try {
      const calResponse = await fetch('https://api.cal.com/v2/bookings', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'cal-api-version': '2024-08-13',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          start: slotTime,
          eventTypeId: Number(eventTypeId),
          attendee: {
            name: attendeeName || purchase.customerName,
            email: attendeeEmail || purchase.customerEmail,
            timeZone: timeZone || 'America/New_York',
          },
          metadata: {
            stripeSessionId: sessionId,
            packageId: purchase.packageId,
            notes: wrestlerNotes || '',
          },
        }),
      });
      const calData = await calResponse.json();
      if (calResponse.ok && (calData?.data?.uid || calData?.data?.id)) {
        bookingUid = calData.data.uid || calData.data.id;
        bookingResult = calData.data;
      }
    } catch (e) {
      console.warn('[MOCK_CAL_FALLBACK]', e);
    }
  } else {
    // Live Stripe session: strictly require Cal.com booking to succeed
    const calResponse = await fetch('https://api.cal.com/v2/bookings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'cal-api-version': '2024-08-13',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        start: slotTime,
        eventTypeId: Number(eventTypeId),
        attendee: {
          name: attendeeName || purchase.customerName,
          email: attendeeEmail || purchase.customerEmail,
          timeZone: timeZone || 'America/New_York',
        },
        metadata: {
          stripeSessionId: sessionId,
          packageId: purchase.packageId,
          notes: wrestlerNotes || '',
        },
      }),
    });

    const calData = await calResponse.json();

    if (!calResponse.ok) {
      console.error('[CAL_BOOKING_ERROR]', calResponse.status, calData);
      const errMsg = calData?.error?.message || calData?.message || 'Failed to reserve the chosen slot with Cal.com.';
      throw new Error(errMsg);
    }

    bookingUid = calData?.data?.uid || calData?.data?.id || `booking_${Date.now()}`;
    bookingResult = calData?.data || { uid: bookingUid, start: slotTime };
  }

  // 2. Perform Atomic Firestore Transaction to Consume the Initial Booking
  await runTransaction(db, async (tx) => {
    const currentSnap = await tx.get(purchaseRef);
    if (!currentSnap.exists()) {
      throw new Error('Purchase record disappeared during booking.');
    }
    const currentData = currentSnap.data() as PurchaseRecord;
    if (currentData.initialBookingStatus === 'booked') {
      throw new Error('This purchase has already been used to schedule an initial session.');
    }

    tx.update(purchaseRef, {
      initialBookingStatus: 'booked',
      initialBookingUid: String(bookingUid),
      initialBookingTime: slotTime,
      attendeeName: attendeeName || purchase.customerName,
      attendeeEmail: attendeeEmail || purchase.customerEmail,
      wrestlerNotes: wrestlerNotes || '',
      updatedAt: new Date().toISOString(),
    });

    tx.set(doc(db, 'bookings', String(bookingUid)), {
      id: String(bookingUid),
      purchaseId: sessionId,
      customerEmail: attendeeEmail || purchase.customerEmail,
      customerName: attendeeName || purchase.customerName,
      startTime: slotTime,
      status: 'ACCEPTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });

  const updatedSnap = await getDoc(purchaseRef);
  return {
    purchase: updatedSnap.data() as PurchaseRecord,
    booking: bookingResult,
  };
}

/**
 * Handles incoming Cal.com webhooks (cancellations, reschedules, creations)
 */
export async function handleCalWebhook(body: any, signature?: string) {
  if (!db) return;

  const triggerEvent = String(body?.triggerEvent || body?.event || '').toUpperCase();
  const payload = body?.payload || body;
  const bookingUid = payload?.uid || payload?.id;

  if (!bookingUid) return;

  const bookingRef = doc(db, 'bookings', String(bookingUid));
  const bookingSnap = await getDoc(bookingRef);

  // If this booking is tracked in our system
  if (bookingSnap.exists()) {
    const bookingData = bookingSnap.data();
    const purchaseId = bookingData.purchaseId;
    const purchaseRef = purchaseId ? doc(db, 'purchases', purchaseId) : null;

    if (triggerEvent.includes('RESCHEDULED')) {
      const newStart = payload?.startTime || payload?.start;
      await setDoc(
        bookingRef,
        {
          startTime: newStart,
          status: 'RESCHEDULED',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      if (purchaseRef) {
        await setDoc(
          purchaseRef,
          {
            initialBookingTime: newStart,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } else if (triggerEvent.includes('CANCELLED') || triggerEvent.includes('CANCELED')) {
      await setDoc(
        bookingRef,
        {
          status: 'CANCELLED',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      if (purchaseRef) {
        await setDoc(
          purchaseRef,
          {
            initialBookingStatus: 'cancelled',
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    }
  } else if (triggerEvent.includes('CREATED')) {
    // Webhook fallback: if client disconnected right after Cal.com reservation, link it now
    const stripeSessionId = payload?.metadata?.stripeSessionId || payload?.responses?.stripeSessionId;
    const startTime = payload?.startTime || payload?.start || new Date().toISOString();
    const attendeeEmail = payload?.attendees?.[0]?.email || payload?.attendee?.email || '';
    const attendeeName = payload?.attendees?.[0]?.name || payload?.attendee?.name || '';

    await setDoc(bookingRef, {
      id: String(bookingUid),
      purchaseId: stripeSessionId || null,
      customerEmail: attendeeEmail,
      customerName: attendeeName,
      startTime,
      status: 'ACCEPTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    if (stripeSessionId) {
      const purchaseRef = doc(db, 'purchases', stripeSessionId);
      await setDoc(purchaseRef, {
        initialBookingStatus: 'booked',
        initialBookingUid: String(bookingUid),
        initialBookingTime: startTime,
        attendeeName,
        attendeeEmail,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }
  }
}
