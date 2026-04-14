import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {

  const plans = [
    {
      id: "3pack",
      title: "3 Session Pack",
      totalPrice: "60",
      perSessionPrice: "30",
      description: "Perfect for a focused technical tune-up",
      features: [
        "First session free included",
        "Personalized guidance",
        "Flexible scheduling",
        "Great for targeted improvement"
      ],
      buttonText: "Book 3 Sessions",
      link: (import.meta as any).env.VITE_STRIPE_LINK_3PACK || "https://buy.stripe.com/7sYdRa5xv4rS41q7xSeME01",
      highlight: false
    },
    {
      id: "5pack",
      title: "5 Session Pack",
      totalPrice: "108",
      perSessionPrice: "27",
      badge: "Most Popular",
      description: "Best for serious athletes who want consistent improvement",
      features: [
        "First session free included",
        "Save compared to single sessions",
        "Consistent support",
        "Strong accountability",
        "Track progress over multiple sessions"
      ],
      buttonText: "Book 5 Sessions",
      link: (import.meta as any).env.VITE_STRIPE_LINK_5PACK || "https://buy.stripe.com/aFadRa5xv6A069y8BWeME02",
      highlight: true
    },
    {
      id: "10pack",
      title: "10 Session Pack",
      totalPrice: "225",
      perSessionPrice: "25",
      description: "Best value for long-term growth on and off the mat",
      features: [
        "First session free included",
        "Significant long-term savings",
        "Long-term mentorship",
        "Priority scheduling",
        "Built for committed athletes"
      ],
      buttonText: "Book 10 Sessions",
      link: (import.meta as any).env.VITE_STRIPE_LINK_10PACK || "https://buy.stripe.com/bJe8wQaRP6A08hG5pKeME03",
      highlight: false
    },
    {
      id: "15pack",
      title: "15 Session Pack",
      totalPrice: "322",
      perSessionPrice: "23",
      badge: "Best Value",
      description: "The ultimate commitment to elite performance",
      features: [
        "First session free included",
        "Maximum savings",
        "Deep mentor relationship",
        "Comprehensive progress tracking",
        "Priority support"
      ],
      buttonText: "Book 15 Sessions",
      link: (import.meta as any).env.VITE_STRIPE_LINK_15PACK || "https://buy.stripe.com/bJeeVee41e2s1Tig4oeME04",
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
            <div className="inline-block bg-brand-red/10 text-brand-red px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider border border-brand-red/20">
              Best Value: Save with 5, 10, or 15 session packages
            </div>
            <p className="text-brand-red font-bold text-sm animate-pulse">
              ⚠️ Limited Time: Free first session deal ends July 31st!
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="mb-16 max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-100"
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
              Have a specific mentor request? Email us at <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dc07wrestle@gmail.com&su=Mentor Request - Mat Mentors" target="_blank" rel="noopener noreferrer" className="text-brand-red font-bold hover:underline">dc07wrestle@gmail.com</a>
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
          <p className="mt-6 text-center text-xs text-gray-400 italic">
            * All times in EST. Specific session times are selected after booking is confirmed.
          </p>
          <div className="mt-8 pt-6 border-t border-gray-100 text-[10px] text-gray-400 text-center space-y-2">
            <p>
              <span className="font-bold uppercase tracking-widest text-gray-500 block mb-1">Refund Policy</span>
              Refunds are available within 24 hours after the first session. After that, all sales are final. Sessions must be canceled or rescheduled at least 24 hours in advance.
            </p>
            <p>
              <span className="font-bold uppercase tracking-widest text-gray-500 block mb-1">Disclaimer</span>
              Mentorship sessions are for educational and guidance purposes only. Mat Mentors does not guarantee specific performance outcomes and is not responsible for injuries or results arising from training or advice.
            </p>
          </div>
        </motion.div>

        <div id="book-now" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold">${plan.perSessionPrice}</span>
                  <span className={`text-sm font-medium ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>/session</span>
                </div>
                <p className={`text-sm font-bold mb-2 ${plan.highlight ? 'text-red-300' : 'text-brand-red'}`}>
                  First session free included
                </p>
                <div className={`text-[10px] font-bold py-1 px-2 rounded uppercase tracking-wider inline-block border ${
                  plan.highlight 
                    ? 'bg-white/20 text-white border-white/30' 
                    : 'bg-brand-blue/5 text-brand-blue border-brand-blue/10'
                }`}>
                  Total: ${plan.totalPrice} paid today
                </div>
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

          <div className="space-y-4">
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
            <div className="space-y-1">
              <p className={`text-[10px] text-center uppercase tracking-wider font-bold ${plan.highlight ? 'text-red-300' : 'text-brand-red'}`}>
                Pay to secure your session, then instantly choose your time.
              </p>
              <p className={`text-[10px] text-center font-bold uppercase tracking-widest ${plan.highlight ? 'text-white' : 'text-brand-red'}`}>
                Only 10 sessions available per week — book early.
              </p>
              <p className={`text-[10px] text-center font-medium ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>
                You'll receive a confirmation email with your session link after booking.
              </p>
              <p className={`text-[9px] text-center italic mt-1 ${plan.highlight ? 'text-blue-300' : 'text-gray-400'}`}>
                Refunds available within 24h of first session.
              </p>
            </div>
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
    </section>
  );
}
