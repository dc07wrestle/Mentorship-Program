import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  XCircle,
} from 'lucide-react';

const DIFFERENTIATORS = [
  {
    number: '01',
    icon: GraduationCap,
    title: 'Ivy League Academic Rigor',
    description:
      'Our mentors study Economics at the University of Pennsylvania while maintaining 3.7+ GPAs. They know firsthand how to manage demanding coursework alongside elite daily training.',
    featured: false,
  },
  {
    number: '02',
    icon: Award,
    title: 'Active Division I Competition',
    description:
      'Both mentors actively compete at the NCAA Division I level—they are inside the room every day, living the grind, weight management, and big-match mindset they teach.',
    featured: true,
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Proven Daily Balance',
    description:
      'We do not preach theory. Your student-athlete learns systems directly from older peers who have already balanced state titles, national brackets, and top college admissions.',
    featured: false,
  },
];

const COMPARISON_ROWS = [
  {
    traditional: 'Weekend camps with 50+ kids and brief group instruction',
    matMentors: 'Private 1-on-1 30-minute video calls built around one wrestler',
  },
  {
    traditional: 'Technique drills forgotten a week after the clinic ends',
    matMentors: 'Ongoing weekly accountability and clear practice-room goals',
  },
  {
    traditional: 'Zero attention to school grades, study systems, or travel balance',
    matMentors: 'Equal focus on classroom habits, time-blocking, and GPA discipline',
  },
  {
    traditional: 'Limited chance to break down your own match video step-by-step',
    matMentors: 'Pre-submitted match film study reviewed together frame by frame',
  },
];

export default function WhyUsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-blue text-white pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-red/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-red-300 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-4"
            >
              Why Mat Mentors
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-6 leading-tight [text-wrap:balance]"
            >
              What Makes Us <span className="text-red-400">Different</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              This is not just technique coaching—it is peer-level life and athletic mentorship from University of Pennsylvania student-athletes actively succeeding on the mat and in the classroom.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/#book-now"
                className="w-full sm:w-auto px-8 py-4 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
              >
                <span>Book 1-on-1 Mentorship</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/mentors"
                className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <span>Meet Your Mentors</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Core Pillars */}
      <section className="py-20 lg:py-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue mb-4">
              Built on Real Experience, Not Guesswork
            </h2>
            <p className="text-lg text-gray-600">
              Every insight we share comes straight from living the schedule of a Division I wrestler and Ivy League student.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {DIFFERENTIATORS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`rounded-3xl p-8 md:p-9 transition-all ${
                    item.featured
                      ? 'bg-brand-red text-white shadow-xl'
                      : 'bg-brand-blue text-white shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <Icon className={`w-11 h-11 ${item.featured ? 'text-white' : 'text-red-400'}`} />
                    <span className="text-xs font-extrabold tracking-widest text-white/60">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className={`leading-relaxed ${item.featured ? 'text-red-100' : 'text-blue-100'}`}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison: Camps vs Mat Mentors */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue mb-4">
              Beyond Weekend Clinics
            </h2>
            <p className="text-lg text-gray-600">
              Practices and camps teach moves—consistent 1-on-1 mentorship helps young athletes put everything together between tournaments and in school.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 bg-brand-blue text-white font-bold text-sm uppercase tracking-wider">
              <div className="px-8 py-4 border-b md:border-b-0 md:border-r border-white/15 text-blue-200">
                Typical Group Camps &amp; Clinics
              </div>
              <div className="px-8 py-4 bg-brand-red text-white">
                Mat Mentors 1-on-1 Program
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {COMPARISON_ROWS.map((row) => (
                <div key={row.matMentors} className="grid md:grid-cols-2">
                  <div className="px-8 py-5 flex items-start gap-3 text-gray-500 text-sm md:text-base border-b md:border-b-0 md:border-r border-gray-200">
                    <XCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                  <div className="px-8 py-5 flex items-start gap-3 text-gray-900 font-medium text-sm md:text-base bg-red-50/30">
                    <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <span>{row.matMentors}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & CTA Banner */}
          <div className="mt-14 max-w-5xl mx-auto bg-brand-blue text-white rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-red-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  SafeSport Certified &amp; Built for K–12 Families
                </h3>
                <p className="text-blue-100 text-sm md:text-base">
                  Both mentors are background-checked, parents are welcome on calls, and sessions adapt to your athlete&apos;s exact age and goals.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
              <Link
                to="/comprehensive-growth"
                className="px-6 py-3.5 bg-white text-brand-blue hover:bg-gray-100 rounded-xl font-bold text-center transition-all"
              >
                See What You Get
              </Link>
              <Link
                to="/#book-now"
                className="px-7 py-3.5 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold text-center transition-all shadow-md"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
