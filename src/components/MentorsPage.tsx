import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Mail,
  ShieldCheck,
  Target,
} from 'lucide-react';
import AvailabilityModal from './AvailabilityModal';

interface MentorProfile {
  id: string;
  name: string;
  firstName: string;
  image: string;
  role: string;
  major: string;
  gpa: string;
  highSchool: string;
  achievements: string[];
  focusAreas: string[];
  bio: string;
}

const MENTOR_PROFILES: MentorProfile[] = [
  {
    id: 'davis',
    name: 'Davis Motyka',
    firstName: 'Davis',
    image: 'https://pennathletics.com/images/2025/9/2/DavisMotyka.jpg',
    role: 'University of Pennsylvania Wrestler',
    major: 'Economics Major',
    gpa: '3.7 GPA',
    highSchool: 'Wyoming Seminary, PA Alumni',
    achievements: [
      'NCAA Qualifier',
      'World Team Member',
      'Ironman Champion',
      'NWCA Scholar All-American',
    ],
    focusAreas: [
      'Preparing for national prep & high school tournament brackets',
      'Composure and match strategy in high-stakes matches',
      'Balancing demanding varsity training with Ivy League academics',
    ],
    bio: 'Coming out of Wyoming Seminary and competing on the national and NCAA Division I stage, Davis mentors wrestlers on building repeatable scoring attacks, sharp positioning under pressure, and steady academic habits that hold up during peak competition season.',
  },
  {
    id: 'deven',
    name: 'Deven Casey',
    firstName: 'Deven',
    image: 'https://pennathletics.com/images/2025/9/2/DevenCasey.jpg',
    role: 'University of Pennsylvania Wrestler',
    major: 'Economics Major',
    gpa: '3.8 GPA',
    highSchool: 'Izzy Style, IL Alumni',
    achievements: [
      'U23 All-American',
      '2x Illinois State Champion',
      'Fargo All-American',
      'Interned coaching youth athletes',
    ],
    focusAreas: [
      'Youth & middle school technical foundations and scrambling',
      'Weekly match film review and fixing repeatable mistakes',
      'Study systems and time-blocking for multi-tournament student-athletes',
    ],
    bio: 'With hands-on experience coaching youth athletes alongside competing at Fargo, U23 Nationals, and the Division I level, Deven focuses on meeting younger wrestlers where they are—breaking complex positions into clear habits both on the mat and in the classroom.',
  },
];

const STANDARDS = [
  {
    icon: ShieldCheck,
    title: 'SafeSport Certified',
    description:
      'Both mentors maintain active SafeSport certification and background clearances for youth mentorship.',
  },
  {
    icon: GraduationCap,
    title: '3.7+ GPA Standard',
    description:
      'Active University of Pennsylvania Economics majors proving elite wrestling and rigorous academics belong together.',
  },
  {
    icon: Target,
    title: 'Peer Accountability',
    description:
      'Younger athletes listen differently to active D1 competitors who are living the same daily grind right now.',
  },
  {
    icon: BookOpen,
    title: 'Parent Transparency',
    description:
      'Parents are welcome to join sessions, ask questions about recruiting or schedules, and share match film ahead of time.',
  },
];

export default function MentorsPage() {
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  return (
    <>
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
                University of Pennsylvania Student-Athletes
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-6 leading-tight [text-wrap:balance]"
              >
                Meet Your <span className="text-red-400">Division I Mentors</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10"
              >
                Work 1-on-1 with current Ivy League wrestlers who have navigated youth tournaments, state championships, national brackets, and elite college admissions.
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
                <button
                  type="button"
                  onClick={() => setIsAvailabilityOpen(true)}
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-5 h-5 text-red-400" />
                  <span>Check Availability</span>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Full Mentor Profiles */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {MENTOR_PROFILES.map((mentor, index) => (
                <motion.article
                  key={mentor.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="relative h-[420px] bg-brand-blue/10 overflow-hidden">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-8 md:p-10 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h2 className="text-3xl font-extrabold text-brand-blue font-heading">
                        {mentor.name}
                      </h2>
                      <span className="text-sm font-bold text-brand-red">
                        {mentor.gpa}
                      </span>
                    </div>

                    <p className="text-gray-700 font-semibold mb-1">
                      {mentor.role} &middot; {mentor.major}
                    </p>
                    <p className="text-sm text-gray-500 mb-6">{mentor.highSchool}</p>

                    <p className="text-gray-600 leading-relaxed mb-8">
                      {mentor.bio}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 mb-8 pt-6 border-t border-gray-200">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-3 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-brand-red" />
                          Credentials
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {mentor.achievements.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0 mt-2" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-3 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-brand-red" />
                          Mentorship Focus
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {mentor.focusAreas.map((focus) => (
                            <li key={focus} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-2" />
                              <span>{focus}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link
                        to="/#book-now"
                        className="w-full py-3.5 px-6 bg-brand-blue hover:bg-blue-900 text-white rounded-xl font-bold text-center transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <span>Book Sessions with {mentor.firstName}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Mentorship Standards & Safety */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
                Built on Trust, Preparation, and Accountability
              </h2>
              <p className="text-lg text-gray-600">
                Every session is structured so families feel confident and wrestlers leave with concrete action steps for practice and school.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {STANDARDS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-blue mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-14 max-w-4xl mx-auto bg-brand-blue text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Want to see everything included in each session?
                </h3>
                <p className="text-blue-100 text-sm md:text-base">
                  Explore our full Comprehensive Growth breakdown covering film study, mindset, and academics.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                <Link
                  to="/comprehensive-growth"
                  className="px-6 py-3 bg-white text-brand-blue hover:bg-gray-100 rounded-xl font-bold text-center transition-all"
                >
                  Comprehensive Growth
                </Link>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=matmentorspenn@gmail.com&su=Mentor%20Request%20-%20Mat%20Mentors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Request a Mentor</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AvailabilityModal
        isOpen={isAvailabilityOpen}
        onClose={() => setIsAvailabilityOpen(false)}
      />
    </>
  );
}
