# Mat Mentors Instructional Videos — Setup & Deployment Guide

This guide gives you everything you need to connect your Stripe Payment Links, set up automated delivery of your unlisted YouTube links, easily add 3–5 new videos every month, and deploy to Vercel without exposing private links on public pages.

---

## 1. How It Works (The Simple, Inexpensive Architecture)

1. **YouTube**: You upload your instructional video as **Unlisted**.
   - Anyone with the link can watch the video.
   - It will **not** appear in YouTube public search, on your channel homepage, or recommended feeds.
   - You **do not** place this URL in the public website source code.
2. **Stripe**: You create:
   - A **$12.99/month recurring product** (Unlimited Membership).
   - A **$3.99 one-time product** for each individual technique (e.g. "Shuck-by" by Davis Motyka).
   - For each product, create a **Payment Link**.
3. **Delivery (Automated & Instant)**:
   - When a customer completes checkout, they are instantly redirected or emailed the private unlisted YouTube link.

---

## 2. Setting Up Automated Video Delivery (Simplest No-Code Solution)

You requested the simplest practical delivery solution using Stripe and a no-code email automation service, without a complex login system. Here are the two easiest ways:

### Method A: Stripe Confirmation Page & Confirmation Email (Fastest — Zero Extra Cost)
Stripe Payment Links can deliver links directly upon checkout without any 3rd party tool:

1. In your **Stripe Dashboard**, go to **Payment Links** > **Edit** (or create a new link for Shuck-by).
2. Go to the **After payment** tab:
   - Select **"Don't show default confirmation page"** > **"Redirect customers to your website"**.
   - Set the redirect URL directly to your unlisted YouTube video URL (or an unlisted YouTube playlist URL for subscribers).
   - Alternatively, keep the confirmation message and paste the private YouTube link and a thank-you note directly into the custom confirmation message!
3. Under **Customer emails** in Stripe Settings:
   - Enable **Successful payment emails**.
   - Under custom email receipt text, you can include notes or customer support contact (`dc07wrestle@gmail.com`).

---

### Method B: Stripe + Zapier or Make.com (Recommended for Scalability & Monthly Subscribers)
Zapier or Make allows you to automatically send branded confirmation emails and maintain subscriber lists:

#### For Individual $3.99 Videos (e.g. "Shuck-by"):
1. **Trigger**: Stripe — *New Payment* or *Checkout Session Completed*.
2. **Filter**: Line item description matches the video title (e.g., "Shuck-by").
3. **Action**: Gmail / SendGrid / MailerLite — *Send Email*.
   - **To**: Customer email from Stripe.
   - **Subject**: "Your Mat Mentors Video: Shuck-by by Davis Motyka"
   - **Body**:
     ```text
     Hey Champ,

     Thanks for purchasing the Mat Mentors instructional video from Davis & Deven!
     
     Here is your private unlisted YouTube access link:
     [Insert Unlisted YouTube Link for Shuck-by]

     Bookmark this link to watch anytime on your phone, tablet, or computer.

     Description: Use your opponents pressure and utilize your collar tie to hit a slick shuck for a takedown.

     Questions or technique requests? Reply directly to this email (dc07wrestle@gmail.com)!
     ```

#### For Monthly $12.99/mo Subscribers:
1. **Unlisted YouTube Playlist**: Create an unlisted YouTube playlist titled "Mat Mentors — Full Vault".
2. **Trigger**: Stripe — *New Subscription Created*.
3. **Action**: Zapier sends welcome email with the private playlist link.
4. **Monthly Update Flow**: When you upload 3–5 new instructional videos each month:
   - Add them to the unlisted playlist (subscribers see them immediately without needing new links).
   - Use Zapier or Mailchimp/MailerLite to send a quick email blast to active subscribers announcing: *"3 new technique videos just dropped in your vault!"*

---

## 3. Connecting Your Real Stripe Payment Links

### Option A: Edit `src/data/videoCatalog.ts` Directly (Recommended)
Open `src/data/videoCatalog.ts`:
1. Find `VIDEO_MEMBERSHIP_CONFIG` (line ~58) and replace `stripePaymentLink` with your $12.99 recurring Stripe link.
2. Find `VIDEO_CATALOG` (line ~83) and replace `stripePaymentLink` in `shuck-by-davis-motyka` with your $3.99 Stripe link.

### Option B: Set Environment Variables (Vercel)
In your Vercel Dashboard under **Settings** > **Environment Variables**, add:
- `VITE_STRIPE_VIDEO_MEMBERSHIP_LINK` = `https://buy.stripe.com/your_membership_link`
- `VITE_STRIPE_VIDEO_SHUCK_BY` = `https://buy.stripe.com/your_shuck_by_link`

---

## 4. How to Add New Videos in 2 Minutes

When you film new videos:
1. Upload video to YouTube as **Unlisted**.
2. Create a $3.99 product in Stripe and copy the Payment Link.
3. Open `src/data/videoCatalog.ts` and append a new object to `VIDEO_CATALOG`:
   ```ts
   {
     id: 'double-leg-finish',
     title: 'Blast Double Leg & Head-Inside Finishes',
     category: 'Takedowns',
     instructor: 'Davis Motyka',
     instructorRole: 'UPenn D1 • NCAA Qualifier',
     duration: '16:45',
     price: '$3.99',
     description: 'Penetration step mechanics and turning the corner through contact.',
     keyPoints: [
       'Level change before contact',
       'Driving through the far hip',
       'High cut finish on edge of the mat'
     ],
     thumbnail: 'https://images.unsplash.com/...',
     stripePaymentLink: 'https://buy.stripe.com/your_new_link'
   }
   ```
4. Commit and push — Vercel will rebuild and publish automatically in ~30 seconds!

---

## 5. Deploying to Vercel

1. Commit your latest code changes to Git:
   ```bash
   git add .
   git commit -m "Add Instructional Videos service with Shuck-by by Davis Motyka"
   git push origin main
   ```
2. Vercel automatically detects the push and deploys to `matmentor.pro`.
3. If you added any new environment variables in Vercel, trigger a redeploy from **Deployments** > **Redeploy**.
