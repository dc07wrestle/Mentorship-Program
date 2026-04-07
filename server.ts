import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      env: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        hasOwnerEmail: !!process.env.OWNER_EMAIL
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

      if (!process.env.RESEND_API_KEY) {
        console.error("[API] Error: RESEND_API_KEY is missing.");
        return res.status(500).json({ 
          success: false, 
          message: "Email service not configured. Please add your RESEND_API_KEY in the settings." 
        });
      }

      // Send email to owner
      try {
        const ownerEmail = process.env.OWNER_EMAIL || "dc07wrestle@gmail.com";
        console.log(`[API] Sending notification to owner: ${ownerEmail}`);
        
        const ownerResult = await resend.emails.send({
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
        console.log("[API] Owner email result:", ownerResult);
      } catch (ownerEmailError) {
        console.error("[API] Failed to send email to owner:", ownerEmailError);
        throw ownerEmailError;
      }

      // Send confirmation email to parent
      try {
        console.log(`[API] Sending confirmation to parent: ${parentEmail}`);
        const parentResult = await resend.emails.send({
          from: "Mat Mentors <onboarding@resend.dev>",
          to: parentEmail,
          subject: "We received your mentorship request!",
          html: `
            <h2>Hi ${parentName},</h2>
            <p>Thank you for requesting an appointment for ${studentName}. We have received your information and will reach out within 24 hours to confirm your mentorship appointment.</p>
            <p>Best regards,<br/>The Mat Mentors Team</p>
          `,
        });
        console.log("[API] Parent email result:", parentResult);
      } catch (parentEmailError) {
        console.warn("[API] Failed to send confirmation email to parent (non-critical):", parentEmailError);
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Mat Mentors server started on port ${PORT}`);
    console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`[SERVER] Resend Key Present: ${!!process.env.RESEND_API_KEY}`);
    console.log(`[SERVER] Owner Email: ${process.env.OWNER_EMAIL || 'Not set (using fallback)'}`);
  });
}

startServer();
