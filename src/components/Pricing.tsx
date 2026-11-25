import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Calendar, Copy, Tag } from 'lucide-react';
import AvailabilityModal from './AvailabilityModal';

export default function Pricing() {
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const blackFridayEndMs = new Date('2026-11-29T23:59:59-05:00').getTime();
  const isBlackFridayActive = Date.now() <= blackFridayEndMs;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('BF50').catch(() => {});
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const plans = [
    {
      id: "3pack",
      title: "3-Call Package",
      subtitle: "Get to Know Mat Mentors",
      totalPrice: isBlackFridayActive ? "89.50" : "179",
      originalPrice: isBlackFridayActive ? "179" : null,
      perCallPrice: isBlackFridayActive ? "29.83" : "59.67",
      description:
        "A great starting point for wrestlers who want to experience our mentorship and see what we can offer.",
      buttonText: "Book 3 Calls",
      link: "https://buy.stripe.com/14AcN69NL1fGdC05pKeME0m",
      popular: false
    },
    {
      id: "5pack",
      title: "5-Call Package",
      subtitle: "Navigate the Tournament Season",
      totalPrice: isBlackFridayActive ? "139.50" : "279",
      originalPrice: isBlackFridayActive ? "279" : null,
      perCallPrice: isBlackFridayActive ? "27.90" : "55.80",
      description:
        "Designed for wrestlers looking for guidance through a challenging stretch of tournaments.",
      buttonText: "Book 5 Calls",
      link: "https://buy.stripe.com/aFa6oI0db3nObtSbO8eME0n",
      popular: false
    },
    {
      id: "10pack",
      title: "10-Call Package",
      subtitle: "Build Momentum This Season",
      totalPrice: isBlackFridayActive ? "249.50" : "499",
      originalPrice: isBlackFridayActive ? "499" : null,
      perCallPrice: isBlackFridayActive ? "24.95" : "49.90",
      badge: "Most Popular",
      description:
        "Best suited for wrestlers looking to make meaningful progress throughout the remainder of their season.",
      buttonText: "Book 10 Calls",
      link: "https://buy.stripe.com/5kQ6oI7FD2jKfK88BWeME0o",
      popular: true
    },
    {
      id: "15pack",
      title: "15-Call Package",
      subtitle: "Develop All Year Long",
      totalPrice: isBlackFridayActive ? "329.50" : "659",
      originalPrice: isBlackFridayActive ? "659" : null,
      perCallPrice: isBlackFridayActive ? "21.97" : "43.93",
      description:
        "Our most comprehensive mentorship option for wrestlers committed to developing throughout the season and offseason.",
      buttonText: "Book 15 Calls",
      link: "https://buy.stripe.com/dRm8wQaRPcYo55u5pKeME0p",
      popular: false
    }
  ];

  const handleCheckout = (link: string) => {
    // Opening in a new tab is required because Stripe blocks loading inside an iframe
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-brand-blue"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the mentorship option that fits your goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3"
          >
            {isBlackFridayActive ? (
              <div className="flex flex-col items-center gap-3">
                <div className="inline-block bg-brand-red text-white px-5 py-1.5 rounded-full text-sm font-extrabold uppercase tracking-wider shadow-md">
                  Black Friday Sale • 50% Off All Bundles
                </div>
                <div className="bg-red-50 border-2 border-brand-red/30 rounded-2xl px-6 py-3.5 flex flex-col sm:flex-row items-center gap-3 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                    <Tag className="w-4 h-4 text-brand-red shrink-0" />
                    <span>Enter promo code at Stripe checkout:</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border-2 border-dashed border-brand-red px-4 py-1.5 rounded-xl font-mono font-black text-brand-red text-base tracking-wider cursor-pointer transition-all shadow-xs"
                    title="Click to copy promo code BF50"
                  >
                    <span>BF50</span>
                    {copiedCode ? (
                      <span className="text-xs font-sans font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-75" />
                    )}
                  </button>
                </div>
                <p className="text-brand-red font-bold text-sm animate-pulse">
                  Ends Sunday, November 29 at Midnight (11:59 PM ET)
                </p>
              </div>
            ) : (
              <div className="inline-block bg-brand-red/10 text-brand-red px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider border border-brand-red/20">
                Best Value: Save with 5, 10, or 15 session packages
              </div>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="mb-16 max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-brand-blue mb-4 text-center">Mentor Availability</h3>
          <p className="text-center text-sm text-gray-600 mb-8 max-w-lg mx-auto">
            Check our hours below. Our mentorship is specifically designed for <span className="font-bold text-brand-blue">K-12 wrestlers</span>. For all session packs, you only need to book your <span className="font-bold text-brand-red">first session</span> initially—we'll coordinate your recurring weekly schedule during our first call.
          </p>
          <div className="mb-8 p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10 text-center space-y-3">
            <p className="text-sm text-brand-blue font-medium italic">
              "Want more personalized feedback? Send us your match film before your session and we'll review it in advance."
            </p>
            <p className="text-xs text-gray-600">
              Have a specific mentor request? Email us at <a href="https://mail.google.com/mail/?view=cm&fs=1&to=matmentorspenn@gmail.com&su=Mentor Request - Mat Mentors" target="_blank" rel="noopener noreferrer" className="text-brand-red font-bold hover:underline">matmentorspenn@gmail.com</a>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="font-bold text-brand-red mb-1">Sunday</p>
              <p className="text-sm text-gray-600">9:00 AM – 10:00 PM</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="font-bold text-brand-red mb-1">Mon – Thu</p>
              <p className="text-sm text-gray-600">2:00 PM – 10:00 PM</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="font-bold text-brand-red mb-1">Fri – Sat</p>
              <p className="text-sm text-gray-600">12:00 PM – 10:00 PM</p>
            </div>
          </div>

          {/* Interactive Check Live Availability Trigger */}
          <div className="mt-6 flex flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setIsAvailabilityOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              <span>Check Live Cal.com Openings</span>
            </button>
            <p className="text-xs text-gray-400">
              Browse real-time 30-minute open slots before securing your session.
            </p>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400 italic">
            * All times in EST. Specific session times are selected after booking is confirmed.
          </p>
          <div className="mt-8 pt-6 border-t border-gray-100 text-[10px] text-gray-400 text-center space-y-2">
            <p>
              <span className="font-bold uppercase tracking-widest text-emerald-600 block mb-1">Athlete Safety & Standards</span>
              Both mentors are SafeSport certified and background-checked to ensure a safe, professional, and positive learning environment for all K-12 student-athletes.
            </p>
            <p>
              <span className="font-bold uppercase tracking-widest text-gray-500 block mb-1">Refund Policy</span>
              Refunds are only available within 24 hours of purchasing a session. After that 24-hour point, all sales are final and cannot be refunded. Sessions must be canceled or rescheduled at least 24 hours in advance.
            </p>
            <p>
              <span className="font-bold uppercase tracking-widest text-gray-500 block mb-1">Disclaimer</span>
              Mentorship sessions are for educational and guidance purposes only. Mat Mentors does not guarantee specific performance outcomes and is not responsible for injuries or results arising from training or advice.
            </p>
          </div>
        </motion.div>

        <div id="book-now" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 transition-all duration-200 ${
                plan.popular
                  ? 'border-2 border-brand-blue shadow-lg'
                  : 'border border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {plan.title}
                  </h3>
                  {plan.badge && (
                    <span className="shrink-0 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-500 mb-5">
                  {plan.subtitle}
                </p>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-baseline gap-2">
                    {plan.originalPrice && (
                      <span className="text-base font-semibold line-through text-gray-400">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
                      ${plan.totalPrice}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">${plan.perCallPrice} / call</span>
                    {isBlackFridayActive && (
                      <span className="text-brand-red font-bold">• 50% off</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mt-7 pt-5 border-t border-gray-100 space-y-2.5">
                <button
                  onClick={() => handleCheckout(plan.link)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-brand-red hover:bg-red-700 text-white shadow-sm'
                      : 'bg-brand-blue hover:bg-blue-900 text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
                <p className="text-[11px] text-center text-gray-500">
                  {isBlackFridayActive ? (
                    <>
                      Use code <span className="font-mono font-bold text-brand-red">BF50</span> at checkout • Instant scheduling
                    </>
                  ) : (
                    'Instant scheduling after checkout'
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12 text-gray-500">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="w-5 h-5 text-green-500" />
            Secure payments powered by Stripe
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="w-5 h-5 text-green-500" />
            Private 1-on-1 sessions
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="w-5 h-5 text-green-500" />
            Flexible scheduling
          </div>
        </div>

        <motion.p 
          className="mt-12 text-center text-sm text-gray-500 max-w-2xl mx-auto italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          All sessions are 30 minutes and designed to support growth in wrestling, discipline, confidence, and life off the mat.
        </motion.p>
      </div>

      {/* Real-time Cal.com Availability Modal */}
      <AvailabilityModal
        isOpen={isAvailabilityOpen}
        onClose={() => setIsAvailabilityOpen(false)}
      />
    </section>
  );
}
