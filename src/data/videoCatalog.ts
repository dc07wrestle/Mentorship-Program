/**
 * Mat Mentors Instructional Videos - Catalog & Stripe Configuration
 *
 * To add a new video:
 * 1. Upload your video to YouTube as "Unlisted".
 * 2. Create a one-time product ($3.99) in your Stripe Dashboard > Product catalog.
 * 3. Generate a Payment Link for that product.
 * 4. Add the entry to `VIDEO_CATALOG` below with its title, instructor, description,
 *    category, duration, and paste your Stripe payment link into `stripePaymentLink`.
 * 5. (Important) Do NOT put unlisted YouTube URLs directly in this file to keep them private.
 *    Instead, use your Stripe post-payment redirect or automated email tool (e.g. Zapier, Make,
 *    or Stripe Customer Portal/Confirmation Email) to send the unlisted YouTube link.
 */

export interface VideoItem {
  id: string;
  title: string;
  category: VideoCategory;
  instructor: string;
  instructorRole: string;
  duration: string;
  price: string; // e.g. "$3.99"
  description: string;
  keyPoints: string[];
  thumbnail: string;
  badge?: string;
  // Paste your Stripe $3.99 Payment Link here:
  stripePaymentLink: string;
}

export type VideoCategory =
  | 'All'
  | 'Takedowns'
  | 'Setups and Finishes'
  | 'Top Wrestling'
  | 'Bottom Wrestling'
  | 'Escapes'
  | 'Defense'
  | 'Scrambles';

export const VIDEO_CATEGORIES: VideoCategory[] = [
  'All',
  'Takedowns',
  'Setups and Finishes',
  'Defense',
  'Top Wrestling',
  'Bottom Wrestling',
  'Escapes',
  'Scrambles',
];

/**
 * Monthly Subscription Stripe Payment Link ($12.99/mo)
 * Replace the placeholder below with your real Stripe recurring Payment Link
 * (e.g., https://buy.stripe.com/your_monthly_subscription_id)
 * You can also set VITE_STRIPE_VIDEO_MEMBERSHIP_LINK in your environment.
 */
export const VIDEO_MEMBERSHIP_CONFIG = {
  price: '$12.99',
  interval: 'month',
  title: 'Unlimited All-Access Membership',
  stripePaymentLink:
    (import.meta as any).env?.VITE_STRIPE_VIDEO_MEMBERSHIP_LINK ||
    'https://buy.stripe.com/placeholder_membership_1299',
  features: [
    'Unlimited on-demand access to our full instructional video library',
    '3–5 brand new high-level technique breakdowns added every month',
    'Elite Ivy League Division I coaching from Penn varsity wrestlers',
    'Replay, pause, and study technique anytime from phone or tablet',
    'Full access across all categories: takedowns, mat wrestling, scrambles, defense',
    'Recurring monthly billing with instant anytime cancellation via Stripe',
  ],
};

export const VIDEO_ACADEMY_MEMBERSHIP_CONFIG = VIDEO_MEMBERSHIP_CONFIG;
export const VIDEO_INSTRUCTIONAL_MEMBERSHIP_CONFIG = VIDEO_MEMBERSHIP_CONFIG;

/**
 * Video Catalog
 * Currently featuring our first launch video: "Shuck-by" by Davis Motyka.
 * Additional videos can be easily appended here as you film and release them.
 */
export const VIDEO_CATALOG: VideoItem[] = [
  {
    id: 'shuck-by-davis-motyka',
    title: 'Shuck-by',
    category: 'Takedowns',
    instructor: 'Davis Motyka',
    instructorRole: 'UPenn D1 • NCAA Qualifier • Wyoming Seminary Alumni',
    duration: '1:29',
    price: '$3.99',
    description:
      'Use your opponents pressure and utilize your collar tie to hit a slick shuck for a takedown',
    keyPoints: [
      'Baiting and reading forward pressure from your opponent',
      'Collar tie hand placement and elbow pull mechanics',
      'Clearing the hips and securing the immediate 2-point takedown',
    ],
    thumbnail: '/shuck-by.jpg',
    badge: 'Featured Release',
    stripePaymentLink:
      (import.meta as any).env?.VITE_STRIPE_VIDEO_SHUCK_BY ||
      (import.meta as any).env?.VITE_STRIPE_VIDEO_SWEEP_SINGLE ||
      'https://buy.stripe.com/placeholder_video_shuck_by',
  },
];
