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

export interface VideoPromotion {
  enabled: boolean;
  startDate: string; // ISO string with ET offset e.g. '2026-10-14T00:00:00-04:00'
  endDate: string; // ISO string with ET offset e.g. '2026-11-14T23:59:59-05:00' (Nov 14, 2026 11:59 PM Eastern Time)
  badge: string; // 'FREE THIS MONTH'
  promotionalPriceLabel: string; // 'FREE FOR A LIMITED TIME'
  buttonLabel: string; // 'WATCH FREE NOW'
  originalPrice: string; // '$3.99'
  youtubeVideoId: string; // 'ArY1nlwN9Vc'
  youtubeUrl: string; // 'https://youtube.com/shorts/ArY1nlwN9Vc?feature=share'
  embedUrl: string; // 'https://www.youtube.com/embed/ArY1nlwN9Vc'
}

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
  promotion?: VideoPromotion;
  aspectRatio?: 'portrait' | 'landscape';
  status?: 'available' | 'coming-soon';
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
    'https://buy.stripe.com/28E8wQ0db3nO41q9G0eME08',
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
 * Currently featuring our first launch video: "Shuck-by" by Davis Motyka,
 * plus upcoming technique releases.
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
    status: 'available',
    stripePaymentLink:
      (import.meta as any).env?.VITE_STRIPE_VIDEO_SHUCK_BY ||
      (import.meta as any).env?.VITE_STRIPE_VIDEO_SWEEP_SINGLE ||
      'https://buy.stripe.com/dRmbJ2gc9e2s1Ti2dyeME07',
    promotion: {
      enabled: true,
      startDate: '2026-10-14T00:00:00-04:00',
      endDate: '2026-11-14T23:59:59-05:00', // Nov 14, 2026 11:59 PM Eastern Time
      badge: 'FREE THIS MONTH',
      promotionalPriceLabel: 'FREE FOR A LIMITED TIME',
      buttonLabel: 'WATCH FREE NOW',
      originalPrice: '$3.99',
      youtubeVideoId: 'ArY1nlwN9Vc',
      youtubeUrl: 'https://youtube.com/shorts/ArY1nlwN9Vc?feature=share',
      embedUrl: 'https://www.youtube.com/embed/ArY1nlwN9Vc',
    },
    aspectRatio: 'portrait',
  },
  {
    id: 'arm-drag-series',
    title: 'Arm Drag',
    category: 'Setups and Finishes',
    instructor: 'CJ Composto',
    instructorRole: 'UPenn D1 • 3x All-American • PRTC',
    duration: '1:15',
    price: '$3.99',
    description:
      'Pull your opponents arm across your body to transition to the leg or body.',
    keyPoints: [
      'Wrist control and tricep grip mechanics to initiate high-speed drag',
      'Pulling opponent’s arm across the centerline to expose the flank and hips',
      'Seamless level changes straight into high single, double leg, or go-behind finishes',
    ],
    thumbnail: '/arm-drag-series.jpg',
    badge: 'FREE THIS MONTH',
    status: 'active',
    stripePaymentLink:
      (import.meta as any).env?.VITE_STRIPE_VIDEO_ARM_DRAG || '',
    promotion: {
      enabled: true,
      startDate: '2026-10-14T00:00:00-04:00',
      endDate: '2026-11-14T23:59:59-05:00',
      badge: 'FREE THIS MONTH',
      promotionalPriceLabel: 'FREE FOR A LIMITED TIME',
      buttonLabel: 'WATCH FREE NOW',
      originalPrice: '$3.99',
      youtubeVideoId: 'o7JqC9qxegA',
      youtubeUrl: 'https://youtube.com/shorts/o7JqC9qxegA?feature=share',
      embedUrl: 'https://www.youtube.com/embed/o7JqC9qxegA',
    },
    aspectRatio: 'portrait',
  },
  {
    id: 'shin-whizzer-finish',
    title: 'Shin Whizzer Defense & Finish',
    category: 'Takedowns',
    instructor: 'Darian Cruz',
    instructorRole: 'Lehigh D1 • NCAA Champion • Olympian / PRTC',
    duration: 'Coming Soon',
    price: '$3.99',
    description:
      'Learn to finish the single leg when your opponent forces the shin whizzer position.',
    keyPoints: [
      'Neutralizing the defensive leverage of opponent’s shin whizzer trap',
      'Shelving the leg and driving through the center of gravity',
      'Finishing high-percentage collegiate takedowns into back exposure points',
    ],
    thumbnail: '/shin-whizzer.jpg',
    badge: 'Coming Soon',
    status: 'coming-soon',
    stripePaymentLink: '',
    aspectRatio: 'portrait',
  },
];

/**
 * Checks whether a video promotion is currently active.
 * Automatically checks the current time against the Eastern Time promotion window
 * (Oct 14, 2026 - Nov 14, 2026 11:59:59 PM ET).
 * Also supports simulated dates or URL parameter testing (?promo=expired or ?promo=free).
 */
export function isVideoPromotionActive(
  video: VideoItem,
  simulatedTimeMs?: number | null
): boolean {
  if (!video.promotion || !video.promotion.enabled) {
    return false;
  }

  // URL query parameter check for QA testing / verification:
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const promoParam = params.get('promo');
      if (promoParam === 'expired' || promoParam === 'paid' || promoParam === 'false') {
        return false;
      }
      if (promoParam === 'free' || promoParam === 'active' || promoParam === 'true') {
        return true;
      }
      const testDate = params.get('test_date');
      if (testDate) {
        const testTimestamp = new Date(testDate).getTime();
        if (!isNaN(testTimestamp)) {
          return (
            testTimestamp >= new Date(video.promotion.startDate).getTime() &&
            testTimestamp <= new Date(video.promotion.endDate).getTime()
          );
        }
      }
    } catch {
      // Ignore if URLSearchParams not available
    }
  }

  const now =
    simulatedTimeMs !== undefined && simulatedTimeMs !== null
      ? simulatedTimeMs
      : Date.now();
  const start = new Date(video.promotion.startDate).getTime();
  const end = new Date(video.promotion.endDate).getTime();

  return now >= start && now <= end;
}
