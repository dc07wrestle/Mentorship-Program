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

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    env: {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      hasCalKey: !!process.env.CAL_API_KEY
    }
  });
});

// Secure, Read-Only Cal.com Availability Proxy
app.get("/api/availability", async (req, res) => {
  try {
    const apiKey = process.env.CAL_API_KEY || "cal_live_8f955f0e3459172f221b0b45ba89e60e";
    const eventTypeId = process.env.CAL_EVENT_TYPE_ID || "5303258";

    // Date range: from now until 35 days out
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
      console.error("[CAL_API_ERROR]", calResponse.status, errText);
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
    console.error("[CAL_PROXY_EXCEPTION]", error);
    return res.status(500).json({
      status: "error",
      message: error?.message || "Internal server error fetching availability"
    });
  }
});

// API routes
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
