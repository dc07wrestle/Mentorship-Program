import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, HelpCircle, Mail } from 'lucide-react';

interface FAQEntry {
  category: 'Program' | 'Sessions & Film' | 'Booking & Policies';
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQEntry[] = [
  {
    category: 'Program',
    question: 'Who is this program for?',
    answer:
      'Mat Mentors is built for K–12 student-athletes who want to elevate their wrestling performance while developing disciplined academic and daily habits. Whether your wrestler is newer to competition, aiming for a state podium, or preparing for college opportunities, our mentors tailor every session to their age and goals.',
  },
  {
    category: 'Program',
    question: 'How are mentors vetted for safety?',
    answer:
      'Safety is our top priority. Both mentors—Davis Motyka and Deven Casey—are current University of Pennsylvania student-athletes in good standing, SafeSport certified, and background-checked. Parents are always welcome to join or sit in on sessions.',
  },
  {
    category: 'Sessions & Film',
    question: 'Are the sessions virtual or in-person?',
    answer:
      'All mentorship sessions are 1-on-1 and conducted 100% virtually. This lets us work with student-athletes anywhere in the country and review match film together step-by-step via screen share.',
  },
  {
    category: 'Sessions & Film',
    question: 'What does a typical 30-minute session look like?',
    answer:
      'Each 30-minute session is tailored to the athlete’s needs that week—typically combining match film breakdown, targeted technique and mindset coaching, and practical academic coaching around study habits, goal setting, and time management.',
  },
  {
    category: 'Sessions & Film',
    question: 'Can we send match film ahead of time?',
    answer:
      'Yes. Sending your match footage prior to your session is strongly encouraged so your mentor can review positioning, setups, and key moments in advance and maximize your live 30 minutes together.',
  },
  {
    category: 'Sessions & Film',
    question: 'What is the recommended time commitment?',
    answer:
      'We recommend one 30-minute session per week to build momentum and consistent accountability across the season, though scheduling is completely flexible around tournaments, exams, and family travel.',
  },
  {
    category: 'Booking & Policies',
    question: 'How does scheduling work for 3, 5, 10, or 15-call bundles?',
    answer:
      'After checkout, you immediately unlock scheduling for your first 30-minute session and can choose your preferred mentor (First Available, Davis Motyka, or Deven Casey). During your first call, we coordinate your recurring schedule for the rest of your bundle.',
  },
  {
    category: 'Booking & Policies',
    question: 'Can we request a specific mentor?',
    answer:
      'Yes. Right after checkout on the booking confirmation page, you can select Davis Motyka, Deven Casey, or First Available. You can also email matmentorspenn@gmail.com anytime with specific mentor requests.',
  },
  {
    category: 'Booking & Policies',
    question: 'What is your refund and rescheduling policy?',
    answer:
      'Refunds are available within 24 hours of purchasing a session bundle; after 24 hours, all sales are final. Individual scheduled calls must be canceled or rescheduled at least 24 hours in advance.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Program', 'Sessions & Film', 'Booking & Policies'];

  const visibleFaqs =
    selectedCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-blue text-white pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-red/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-red-300 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-4"
            >
              Answers for Families &amp; Athletes
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-6 leading-tight [text-wrap:balance]"
            >
              Frequently Asked <span className="text-red-400">Questions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
            >
              Everything you need to know about 1-on-1 mentorship sessions, match film review, mentor safety standards, and bundle scheduling.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter + Accordion List */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenIndex(0);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              {visibleFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red block mb-1">
                          {faq.category}
                        </span>
                        <span className="font-bold text-lg text-gray-900">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-brand-red shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Still have questions CTA */}
            <div className="mt-14 bg-brand-blue text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-6 h-6 text-red-300" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-1">
                    Still have a question?
                  </h2>
                  <p className="text-blue-100 text-sm md:text-base">
                    Email Davis and Deven directly and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=matmentorspenn@gmail.com&su=Question%20for%20Mat%20Mentors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Us</span>
                </a>
                <Link
                  to="/#book-now"
                  className="px-6 py-3 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold text-center transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Book a Bundle</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
