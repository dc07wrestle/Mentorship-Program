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

  // API routes
  app.post("/api/request-appointment", async (req, res) => {
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

      console.log("Received appointment request for:", studentName);

      // Basic honeypot protection
      if (honeypot) {
        console.log("Spam detected via honeypot.");
        return res.status(200).json({ success: true, message: "Spam detected." });
      }

      // Validate required fields
      if (!parentName || !studentName || !parentEmail) {
        console.log("Validation failed: Missing required fields.");
        return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is not set in environment variables.");
        return res.status(500).json({ 
          success: false, 
          message: "Email service not configured. Please add your RESEND_API_KEY in the settings." 
        });
      }

      // Send email to owner
      try {
        const ownerEmail = process.env.OWNER_EMAIL || "dc07wrestle@gmail.com";
        console.log("Sending email to owner:", ownerEmail);
        
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
        console.log("Owner email sent successfully.");
      } catch (ownerEmailError) {
        console.error("Failed to send email to owner:", ownerEmailError);
        throw ownerEmailError; // Re-throw to trigger the main catch block
      }

      // Send confirmation email to parent
      // We wrap this in a separate try-catch because Resend's free tier 
      // often blocks sending to unverified emails. We don't want the 
      // whole request to fail just because the auto-reply couldn't be sent.
      try {
        console.log("Sending confirmation email to parent:", parentEmail);
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
        console.log("Parent confirmation email sent successfully.");
      } catch (parentEmailError) {
        console.warn("Failed to send confirmation email to parent (this is common on Resend's free tier):", parentEmailError);
        // We don't throw here so the user still sees a success message
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error in /api/request-appointment:", error);
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
