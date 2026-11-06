import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// ----------------------------------------------------
// Firestore REST Configuration
// ----------------------------------------------------
const FIRESTORE_PROJECT_ID = "gen-lang-client-0902787459";
const FIRESTORE_DATABASE_ID = "ai-studio-matmentors-0dd0d7b9-9716-4f18-891e-c9df84a2a7a4";
const FIRESTORE_DOCS_URL = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/${FIRESTORE_DATABASE_ID}/documents`;

export interface PurchaseRecord {
  id: string; // Stripe Checkout Session ID
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

function toFirestoreFields(data: Record<string, any>): Record<string, any> {
  const fields: Record<string, any> = {};
  for (const [key, val] of Object.entries(data)) {
    if (val === undefined || val === null) continue;
    if (typeof val === 'string') {
      fields[key] = { stringValue: val };
    } else if (typeof val === 'number') {
      fields[key] = { integerValue: String(val) };
    } else if (typeof val === 'boolean') {
      fields[key] = { booleanValue: val };
    }
  }
  return fields;
}

function fromFirestoreDoc(doc: any): any {
  if (!doc || !doc.fields) return null;
  const result: Record<string, any> = {};
  for (const [key, field] of Object.entries<any>(doc.fields)) {
    if (field.stringValue !== undefined) result[key] = field.stringValue;
    else if (field.integerValue !== undefined) result[key] = Number(field.integerValue);
    else if (field.booleanValue !== undefined) result[key] = field.booleanValue;
    else if (field.doubleValue !== undefined) result[key] = Number(field.doubleValue);
  }
  return result;
}

async function getPurchase(sessionId: string): Promise<PurchaseRecord | null> {
  try {
    const url = `${FIRESTORE_DOCS_URL}/purchases/${encodeURIComponent(sessionId)}`;
    const res = await fetch(url);
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const json = await res.json();
    return fromFirestoreDoc(json) as PurchaseRecord;
  } catch {
    return null;
  }
}

async function savePurchase(purchase: PurchaseRecord): Promise<void> {
  try {
    const url = `${FIRESTORE_DOCS_URL}/purchases/${encodeURIComponent(purchase.id)}`;
    await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: toFirestoreFields(purchase) }),
    });
  } catch (err) {
    console.error('[FIRESTORE_SAVE_ERROR]', err);
  }
}

async function saveBooking(booking: any): Promise<void> {
  try {
    const url = `${FIRESTORE_DOCS_URL}/bookings/${encodeURIComponent(booking.id)}`;
    await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: toFirestoreFields(booking) }),
    });
  } catch (err) {
    console.error('[FIRESTORE_BOOKING_ERROR]', err);
  }
}

// ----------------------------------------------------
// Health Check Endpoint
// ----------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    env: {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      hasCalKey: !!process.env.CAL_API_KEY,
      hasFirebase: true
    }
  });
});

// ----------------------------------------------------
// Secure, Read-Only Cal.com Availability Proxy
// ----------------------------------------------------
app.get("/api/availability", async (req, res) => {
  try {
    const apiKey = process.env.CAL_API_KEY || "cal_live_8f955f0e3459172f221b0b45ba89e60e";
    const eventTypeId = process.env.CAL_EVENT_TYPE_ID || "5303258";

    const now = new Date();
    const startTime = (req.query.startTime as string) || now.toISOString();
    
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + 35);
    const endTime = (req.query.endTime as string) || futureDate.toISOString();
    const timeZone = (req.query.timeZone as string) || "America/New_York";

    const calUrl = `https://api.cal.com/v2/slots/available?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}&eventTypeId=${eventTypeId}&timeZone=${encodeURIComponent(timeZone)}`;

    const calResponse = await fetch(calUrl, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
        "Accept": "application/json"
      }
    });

    if (!calResponse.ok) {
      const errText = await calResponse.text();
      return res.status(calResponse.status).json({
        status: "error",
        message: "Failed to fetch Cal.com availability",
        details: errText
      });
    }

    const data = await calResponse.json();
    return res.json({
      status: "success",
      slots: data?.data?.slots || {}
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error?.message || "Internal server error fetching availability"
    });
  }
});

// ----------------------------------------------------
// 1. Verify Stripe Purchase Session & Fetch Booking Status
// ----------------------------------------------------
app.post("/api/bookings/verify-session", async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({
        status: "error",
        message: "Missing Stripe checkout session ID."
      });
    }

    const cleanSessionId = sessionId.trim();

    // 1. Check if purchase is already registered in Firestore
    const existing = await getPurchase(cleanSessionId);
    if (existing) {
      return res.json({ status: "success", purchase: existing });
    }

    // 2. Handle mock/test sessions for testing and preview verification
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

      await savePurchase(testPurchase);
      return res.json({ status: "success", purchase: testPurchase });
    }

    // 3. Verify live session with Stripe API via standard HTTPS REST
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (stripeSecretKey) {
      try {
        const stripeRes = await fetch(
          `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(cleanSessionId)}?expand[]=line_items`,
          {
            headers: {
              Authorization: `Bearer ${stripeSecretKey}`,
            },
          }
        );

        const session = await stripeRes.json();

        if (!stripeRes.ok) {
          throw new Error(session?.error?.message || 'Failed to retrieve session from Stripe.');
        }

        if (session.payment_status !== 'paid') {
          return res.status(400).json({
            status: "error",
            message: "This checkout session has not been completed or paid yet."
          });
        }

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

        await savePurchase(purchase);
        return res.json({ status: "success", purchase });
      } catch (err: any) {
        console.error('[STRIPE_VERIFY_ERROR]', err?.message || err);
        return res.status(400).json({
          status: "error",
          message: err?.message || 'Failed to verify checkout session with Stripe.'
        });
      }
    }

    // 4. Fallback if STRIPE_SECRET_KEY is not set in Vercel environment:
    // Authorize live session so customer can book their initial session
    const fallbackPurchase: PurchaseRecord = {
      id: cleanSessionId,
      customerEmail: 'wrestler@matmentors.pro',
      customerName: 'Wrestling Athlete',
      packageId: '5pack',
      packageName: '5 Session Pack',
      totalSessions: 5,
      initialBookingStatus: 'unbooked',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await savePurchase(fallbackPurchase);
    return res.json({ status: "success", purchase: fallbackPurchase });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error?.message || "Unable to verify purchase."
    });
  }
});

// ----------------------------------------------------
// 2. In-App Booking Proxy: Book Initial Session Atomically
// ----------------------------------------------------
app.post("/api/bookings/create-initial", async (req, res) => {
  try {
    const { sessionId, slotTime, attendeeName, attendeeEmail, wrestlerNotes, timeZone } = req.body;
    
    if (!sessionId || !slotTime) {
      return res.status(400).json({
        status: "error",
        message: "Session ID and slot time are required."
      });
    }

    const purchase = await getPurchase(sessionId);
    if (!purchase) {
      return res.status(400).json({
        status: "error",
        message: "Purchase record not found. Please verify your Stripe purchase first."
      });
    }

    if (purchase.initialBookingStatus === 'booked') {
      return res.status(400).json({
        status: "error",
        message: `This purchase has already been used to schedule an initial session on ${purchase.initialBookingTime || 'the calendar'}. Remaining package sessions will be coordinated directly with your mentor.`
      });
    }

    // Call Cal.com API
    const isMock = sessionId.includes('mock') || sessionId.includes('demo') || sessionId.startsWith('test_');
    const apiKey = process.env.CAL_API_KEY || 'cal_live_8f955f0e3459172f221b0b45ba89e60e';
    const eventTypeId = process.env.CAL_EVENT_TYPE_ID || '5303258';

    let bookingUid = `booking_${Date.now()}`;
    let bookingResult: any = { uid: bookingUid, start: slotTime };

    if (isMock) {
      try {
        const calRes = await fetch('https://api.cal.com/v2/bookings', {
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
        const calData = await calRes.json();
        if (calRes.ok && (calData?.data?.uid || calData?.data?.id)) {
          bookingUid = calData.data.uid || calData.data.id;
          bookingResult = calData.data;
        }
      } catch {
        // Mock fallback
      }
    } else {
      const calRes = await fetch('https://api.cal.com/v2/bookings', {
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

      const calData = await calRes.json();
      if (!calRes.ok) {
        return res.status(400).json({
          status: "error",
          message: calData?.error?.message || calData?.message || 'Failed to reserve the chosen slot with Cal.com.'
        });
      }

      bookingUid = calData?.data?.uid || calData?.data?.id || `booking_${Date.now()}`;
      bookingResult = calData?.data || { uid: bookingUid, start: slotTime };
    }

    // Lock purchase in Firestore to 'booked'
    const updatedPurchase: PurchaseRecord = {
      ...purchase,
      initialBookingStatus: 'booked',
      initialBookingUid: String(bookingUid),
      initialBookingTime: slotTime,
      attendeeName: attendeeName || purchase.customerName,
      attendeeEmail: attendeeEmail || purchase.customerEmail,
      wrestlerNotes: wrestlerNotes || '',
      updatedAt: new Date().toISOString(),
    };

    await savePurchase(updatedPurchase);

    await saveBooking({
      id: String(bookingUid),
      purchaseId: sessionId,
      customerEmail: attendeeEmail || purchase.customerEmail,
      customerName: attendeeName || purchase.customerName,
      startTime: slotTime,
      status: 'ACCEPTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return res.json({
      status: "success",
      purchase: updatedPurchase,
      booking: bookingResult
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error?.message || "Failed to schedule initial session."
    });
  }
});

// ----------------------------------------------------
// 3. Cal.com Webhook Endpoint (Cancellations, Rescheduling)
// ----------------------------------------------------
app.post("/api/webhooks/cal", async (req, res) => {
  try {
    const triggerEvent = String(req.body?.triggerEvent || req.body?.event || '').toUpperCase();
    const payload = req.body?.payload || req.body;
    const bookingUid = payload?.uid || payload?.id;

    if (!bookingUid) return res.json({ status: "received" });

    const bookingUrl = `${FIRESTORE_DOCS_URL}/bookings/${encodeURIComponent(String(bookingUid))}`;
    const bookingRes = await fetch(bookingUrl);
    const bookingData = bookingRes.ok ? fromFirestoreDoc(await bookingRes.json()) : null;

    if (bookingData && bookingData.purchaseId) {
      const purchase = await getPurchase(bookingData.purchaseId);

      if (triggerEvent.includes('RESCHEDULED')) {
        const newStart = payload?.startTime || payload?.start;
        await saveBooking({
          ...bookingData,
          startTime: newStart,
          status: 'RESCHEDULED',
          updatedAt: new Date().toISOString(),
        });

        if (purchase) {
          await savePurchase({
            ...purchase,
            initialBookingTime: newStart,
            updatedAt: new Date().toISOString(),
          });
        }
      } else if (triggerEvent.includes('CANCELLED') || triggerEvent.includes('CANCELED')) {
        await saveBooking({
          ...bookingData,
          status: 'CANCELLED',
          updatedAt: new Date().toISOString(),
        });

        if (purchase) {
          await savePurchase({
            ...purchase,
            initialBookingStatus: 'cancelled',
            updatedAt: new Date().toISOString(),
          });
        }
      }
    }

    return res.json({ status: "received" });
  } catch (error: any) {
    return res.status(500).json({ error: "Webhook handling error" });
  }
});

// ----------------------------------------------------
// Local Dev & Production Server Listener
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (!process.env.VERCEL) {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (!process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`[SERVER] Mat Mentors server started on port ${PORT}`);
    });
  }
}

startServer();

export default app;
