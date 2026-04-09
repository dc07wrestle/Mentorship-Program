import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {

  const plans = [
    {
      id: "single",
      title: "Single Session",
      price: "30",
      description: "30 minute 1-on-1 mentorship session",
      features: [
        "Personalized guidance",
        "Flexible scheduling",
        "Great for first-time athletes"
      ],
      buttonText: "Book 1 Session",
      link: (import.meta as any).env.VITE_STRIPE_LINK_SINGLE || "https://buy.stripe.com/7sYdRa5xv4rS41q7xSeME01",
      highlight: false
    },
    {
      id: "5pack",
      title: "5 Session Pack",
      price: "135",
      subtext: "$27 per session",
      badge: "Most Popular",
      description: "Best for consistent progress and building a mentor relationship",
      features: [
        "Save compared to single sessions",
        "Consistent support",
        "Strong accountability",
        "Ideal for athletes serious about improvement"
      ],
      buttonText: "Book 5 Sessions",
      link: (import.meta as any).env.VITE_STRIPE_LINK_5PACK || "https://buy.stripe.com/aFadRa5xv6A069y8BWeME02",
      highlight: true
    },
    {
      id: "10pack",
      title: "10 Session Pack",
      price: "250",
      subtext: "$25 per session",
      description: "Best value for long-term growth on and off the mat",
      features: [
        "Lowest price per session",
        "Long-term mentorship",
        "Priority scheduling",
        "Built for committed athletes"
      ],
      buttonText: "Book 10 Sessions",
      link: (import.meta as any).env.VITE_STRIPE_LINK_10PACK || "https://buy.stripe.com/bJe8wQaRP6A08hG5pKeME03",
      highlight: false
    }
  ];

  const handleCheckout = (link: string) => {
    // Opening in a new tab is required because Stripe blocks loading inside an iframe
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing" className="py-24 bg-white">
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
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the mentorship option that fits your goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-brand-blue text-white shadow-2xl scale-105 z-10 border-2 border-brand-red' 
                  : 'bg-gray-50 text-gray-900 border border-gray-200 hover:shadow-xl'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-4 ${plan.highlight ? 'text-white' : 'text-brand-blue'}`}>
                  {plan.title}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                </div>
                {plan.subtext && (
                  <p className={`text-sm font-medium ${plan.highlight ? 'text-blue-200' : 'text-brand-red'}`}>
                    {plan.subtext}
                  </p>
                )}
                <p className={`mt-4 text-sm leading-relaxed ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-red-400' : 'text-brand-red'}`} />
                    <span className={plan.highlight ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <button
                  onClick={() => handleCheckout(plan.link)}
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? 'bg-brand-red hover:bg-red-700 text-white shadow-lg shadow-red-900/40'
                      : 'bg-brand-blue hover:bg-blue-900 text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
                <p className={`text-[10px] text-center uppercase tracking-wider font-semibold ${plan.highlight ? 'text-blue-300' : 'text-gray-400'}`}>
                  Select your time after payment
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-brand-blue mb-6 text-center">Mentor Availability</h3>
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
          <p className="mt-6 text-center text-xs text-gray-400 italic">
            * All times in EST. Specific session times are selected after booking is confirmed.
          </p>
        </motion.div>

        <motion.p 
          className="mt-16 text-center text-sm text-gray-500 max-w-2xl mx-auto italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          All sessions are 30 minutes and designed to support growth in wrestling, discipline, confidence, and life off the mat.
        </motion.p>
      </div>
    </section>
  );
}
