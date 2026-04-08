import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import twilio from 'twilio';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");

// Twilio Client (Lazy initialization)
let twilioClient: any = null;
function getTwilioClient() {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    if (accountSid && authToken) {
      twilioClient = twilio(accountSid, authToken);
    }
  }
  return twilioClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    env: {
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasOwnerEmail: !!process.env.OWNER_EMAIL,
      hasTwilioSid: !!process.env.TWILIO_ACCOUNT_SID,
      hasTwilioToken: !!process.env.TWILIO_AUTH_TOKEN,
      hasTwilioNumber: !!process.env.TWILIO_PHONE_NUMBER
    }
  });
});

// API routes
app.post("/api/request-appointment", async (req, res) => {
  console.log("[API] Received POST /api/request-appointment");
  try {
    const {
      parentName,
      studentName,
      studentGrade,
      parentEmail,
      parentPhone,
      experienceLevel,
      helpWith,
      preferredTimes,
      additionalNotes,
      honeypot
    } = req.body;

    console.log(`[API] Request for student: ${studentName}, parent: ${parentEmail}`);

    // Basic honeypot protection
    if (honeypot) {
      console.log("[API] Honeypot triggered - ignoring request.");
      return res.status(200).json({ success: true, message: "Spam detected." });
    }

    // Validate required fields
    if (!parentName || !studentName || !parentEmail) {
      console.log("[API] Validation failed - missing fields.");
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // 1. Send email to owner
    if (process.env.RESEND_API_KEY) {
      try {
        const ownerEmail = process.env.OWNER_EMAIL || "dc07wrestle@gmail.com";
        await resend.emails.send({
          from: "Mat Mentors Requests <onboarding@resend.dev>",
          to: ownerEmail,
          subject: `New Mentorship Request: ${studentName}`,
          html: `
            <h2>New Mentorship Request</h2>
            <p><strong>Parent Name:</strong> ${parentName}</p>
            <p><strong>Student Name:</strong> ${studentName}</p>
            <p><strong>Student Grade:</strong> ${studentGrade}</p>
            <p><strong>Parent Email:</strong> ${parentEmail}</p>
            <p><strong>Parent Phone:</strong> ${parentPhone}</p>
            <p><strong>Wrestling Experience:</strong> ${experienceLevel}</p>
            <p><strong>Needs Help With:</strong> ${helpWith}</p>
            <p><strong>Preferred Times:</strong> ${preferredTimes}</p>
            <p><strong>Additional Notes:</strong> ${additionalNotes}</p>
          `,
        });
      } catch (e) {
        console.error("[API] Failed to send email to owner:", e);
      }
    }

    // 2. Send confirmation email to parent
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Mat Mentors <onboarding@resend.dev>",
          to: parentEmail,
          subject: "We received your mentorship request!",
          html: `
            <h2>Hi ${parentName},</h2>
            <p>Thank you for requesting an appointment for ${studentName}. We have received your information and will reach out within 24 hours to confirm your mentorship appointment.</p>
            <p>Best regards,<br/>The Mat Mentors Team</p>
          `,
        });
      } catch (e) {
        console.warn("[API] Failed to send confirmation email to parent:", e);
      }
    }

    // 3. Send automated SMS via Twilio
    const client = getTwilioClient();
    let twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    
    // Sanitize phone numbers (remove spaces, dashes, parentheses)
    const sanitizePhone = (phone: string) => {
      const cleaned = phone.replace(/\D/g, '');
      return phone.startsWith('+') ? `+${cleaned}` : `+1${cleaned}`; // Default to US if no +
    };

    if (client && twilioNumber && parentPhone) {
      try {
        const cleanTo = sanitizePhone(parentPhone);
        const cleanFrom = sanitizePhone(twilioNumber);
        
        console.log(`[API] Attempting to send SMS from ${cleanFrom} to ${cleanTo}`);
        
        const message = await client.messages.create({
          body: `This is Mat Mentors. Thanks for reaching out! Feel free to set up your first session through this text thread or email us at dc07wrestle@gmail.com. We’re excited to help you take your wrestling to the next level.\n\nElite Wrestling. Elite Minds.`,
          from: cleanFrom,
          to: cleanTo
        });
        console.log("[API] Twilio SMS sent successfully. SID:", message.sid);
      } catch (smsError: any) {
        console.error("[API] Twilio Error Details:", {
          message: smsError.message,
          code: smsError.code,
          status: smsError.status
        });
      }
    } else {
      console.log("[API] Skipping SMS. Missing:", {
        hasClient: !!client,
        hasTwilioNumber: !!twilioNumber,
        hasParentPhone: !!parentPhone
      });
    }

    console.log("[API] Request processed successfully.");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("[API] Unhandled error:", error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to send request." 
    });
  }
});

// Vite middleware for development / Static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    // Dynamically import Vite only in development to avoid crashes on Vercel
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (!process.env.VERCEL) {
    // This part only runs in local production mode, not on Vercel
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Only listen if not running as a Vercel function
  if (!process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`[SERVER] Mat Mentors server started on port ${PORT}`);
    });
  }
}

startServer();

export default app;
