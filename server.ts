import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function startServer() {
  const app = express();
  const PORT = 3000;

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

      // Basic honeypot protection
      if (honeypot) {
        return res.status(200).json({ success: true, message: "Spam detected." });
      }

      // Validate required fields
      if (!parentName || !studentName || !parentEmail) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      // Send email to owner
      await resend.emails.send({
        from: "Mentorship Requests <onboarding@resend.dev>",
        to: process.env.OWNER_EMAIL || "dc07wrestle@gmail.com", // Fallback to user email
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

      // Send confirmation email to parent
      await resend.emails.send({
        from: "Wrestling Mentorship <onboarding@resend.dev>",
        to: parentEmail,
        subject: "We received your mentorship request!",
        html: `
          <h2>Hi ${parentName},</h2>
          <p>Thank you for requesting an appointment for ${studentName}. We have received your information and will reach out within 24 hours to confirm your mentorship appointment.</p>
          <p>Best regards,<br/>The Mentorship Team</p>
        `,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send request." });
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
