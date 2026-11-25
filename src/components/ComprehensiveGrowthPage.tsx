import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Dumbbell,
  MessageSquare,
  Target,
  UserCheck,
  Video,
} from 'lucide-react';
import youthActionImg1 from '../assets/images/real_youth_wrestling_1.jpg';
import youthActionImg2 from '../assets/images/real_youth_wrestling_2.jpg';

const EXACT_OFFERINGS = [
  {
    number: '01',
    icon: UserCheck,
    title: '1-on-1 Personal D1 Mentor',
    description:
      'Work directly with a current University of Pennsylvania wrestler—Davis Motyka or Deven Casey—who tailors every 30-minute video call to your individual goals, age, and competition calendar.',
  },
  {
    number: '02',
    icon: Video,
    title: 'Match Film Breakdown',
    description:
      'Send in your tournament or dual-meet footage beforehand for frame-by-frame review of hand-fighting, shot setups, scoring finishes, and scrambling adjustments.',
  },
  {
    number: '03',
    icon: Dumbbell,
    title: 'Targeted Technique & Drilling Plan',
    description:
      'Refine high-percentage attacks, escapes, and top control built around your style, paired with clear drill priorities you can execute immediately in your practice room.',
  },
  {
    number: '04',
    icon: Brain,
    title: 'Match Mindset & Mental Toughness',
    description:
      'Develop calm pre-match routines, composure in tight third-period bouts, and resilience after tough losses—modeled directly after Division I preparation.',
  },
  {
    number: '05',
    icon: Clock,
    title: 'Academic Habits & Time Management',
    description:
      'Build weekly schedules that balance daily practices, weekend travel tournaments, heavy coursework, and strong GPAs using systems proven by 3.7+ GPA Penn Economics majors.',
  },
  {
    number: '06',
    icon: Compass,
    title: 'Goal Setting & College Pathway Q&A',
    description:
      'Set measurable season milestones and get honest answers on weight management, tournament selection, high school academics, and what top college programs look for.',
  },
];

const AGE_STAGES = [
  {
    id: 'youth',
    label: 'Youth (Grades K–5)',
    focus: 'Confidence, Core Fundamentals & Love for Competition',
    summary:
      'Keep wrestling fun while building strong foundational stance, motion, simple setups, and healthy tournament habits before pressure builds.',
    bullets: [
      'Positive pre-match perspective and handling early wins or losses',
      'Core stance, level-change, and basic scoring habits',
      'Balanced homework routines alongside evening practices',
    ],
  },
  {
    id: 'middle',
    label: 'Middle School (Grades 6–8)',
    focus: 'Film Habits, System Building & School Discipline',
    summary:
      'Bridge the jump from youth brackets to tougher regional/national competition while building independent study habits before high school.',
    bullets: [
      'Introductory match film study to spot repeatable mistakes',
      'Connecting go-to attacks from neutral, top, and bottom',
      'Time-blocking around travel tournaments and harder classes',
    ],
  },
  {
    id: 'highschool',
    label: 'High School (Grades 9–12)',
    focus: 'Varsity Execution, Peak Mindset & College Pathway',
    summary:
      'Dial in state and national tournament strategy, close-match mental toughness, academic rigor, and realistic preparation for collegiate opportunities.',
    bullets: [
      'Detailed match breakdown against high-level bracket opponents',
      'Mental composure for state qualifiers, Fargo, and national events',
      'Unfiltered Q&A on grades, recruiting timelines, and D1 standards',
    ],
  },
];

const ATHLETIC_PILLARS = [
  {
    icon: Video,
    title: 'Film Analysis',
    desc: 'Send us your match film before your call for detailed breakdown and tactical feedback.',
  },
  {
    icon: Target,
    title: 'Technique Guidance',
    desc: 'Refine high-percentage wrestling setups, finishes, and top/bottom fundamentals.',
  },
  {
    icon: Brain,
    title: 'Match Mindset',
    desc: 'Build composure, pre-bout routines, and mental toughness for high-pressure brackets.',
  },
];

const ACADEMIC_PILLARS = [
  {
    icon: Clock,
    title: 'Time Management',
    desc: 'Learn to balance demanding daily practices, weekend travel, and challenging schoolwork.',
  },
  {
    icon: BookOpen,
    title: 'Study Habits',
    desc: 'Efficient note-taking, test prep, and weekly planning strategies for student-athletes.',
  },
  {
    icon: MessageSquare,
    title: 'College Pathway & Recruiting',
    desc: 'Direct Q&A on academics, admissions standards, and earning opportunities at the next level.',
  },
];

export default function ComprehensiveGrowthPage() {
  const [selectedStageId, setSelectedStageId] = useState<string>('highschool');
  const activeStage =
    AGE_STAGES.find((stage) => stage.id === selectedStageId) || AGE_STAGES[2];

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
              Mat Mentors Program Breakdown
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-6 leading-tight [text-wrap:balance]"
            >
              Comprehensive Growth —{' '}
              <span className="text-red-400">On the Mat and in School</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Our mentorship connects K–12 wrestlers with current University of Pennsylvania student-athletes to build sharp wrestling habits, resilient mindset, and strong classroom discipline.
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
                <span>Choose a Call Bundle</span>
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

      {/* Age-Inclusive Framing + Dynamic Visual Showcase */}
      <section className="py-20 lg:py-24 bg-white border-b border-gray-200 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue mb-5 tracking-tight">
              Tailored for ALL AGES (Grades K–12)
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Mindset, film study, and discipline matter at every stage of a wrestler&apos;s journey. Every 1-on-1 call is adapted to meet the exact age, goals, and schedule of each individual student-athlete.
            </p>
          </div>

          {/* Dynamic Angled Photographic Showcase (Navy & Crimson Framing) */}
          <div className="max-w-5xl mx-auto mb-16 relative px-2 sm:px-6">
            <div className="relative grid md:grid-cols-2 gap-6 items-center">
              {/* Left Image Block */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="relative"
              >
                <div
                  className="hidden sm:block absolute -inset-3 bg-brand-blue rounded-2xl -rotate-2 opacity-95"
                  aria-hidden="true"
                />
                <div
                  className="hidden sm:block absolute -bottom-4 -left-4 w-28 h-28 bg-brand-red rounded-xl -rotate-6"
                  aria-hidden="true"
                />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-brand-blue aspect-[4/3]">
                  <img
                    src={youthActionImg1}
                    alt="Youth folkstyle wrestlers competing on the mat during a tournament"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </motion.div>

              {/* Right Image Block */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="relative md:mt-10"
              >
                <div
                  className="hidden sm:block absolute -inset-3 bg-brand-red rounded-2xl rotate-2 opacity-95"
                  aria-hidden="true"
                />
                <div
                  className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 bg-brand-blue rounded-xl rotate-6"
                  aria-hidden="true"
                />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-brand-blue aspect-[4/3]">
                  <img
                    src={youthActionImg2}
                    alt="High school wrestler executing a takedown during dual tournament competition"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Interactive Age-Stage Selector */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {AGE_STAGES.map((stage) => {
                const isSelected = stage.id === selectedStageId;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {stage.label}
                  </button>
                );
              })}
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-200">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">
                {activeStage.label}
              </p>
              <h3 className="text-2xl font-bold text-brand-blue mb-3">
                {activeStage.focus}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {activeStage.summary}
              </p>
              <ul className="grid sm:grid-cols-3 gap-4">
                {activeStage.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="bg-white rounded-xl p-4 border border-gray-200 text-sm text-gray-700 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Here's Exactly What You Get (Unified Breakdown) */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue mb-4 tracking-tight">
              Here&apos;s Exactly What You Get
            </h2>
            <p className="text-lg text-gray-600">
              Every 30-minute session combines Mat Mentors&apos; athletic film review, mental coaching, and academic accountability into one focused plan.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {EXACT_OFFERINGS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl p-7 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/5 text-brand-red flex items-center justify-center border border-gray-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold tracking-widest text-gray-400">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-blue mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two Pillars: Athletic + Academic & Life Benefits */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              Two Pillars of the Complete Student-Athlete
            </h2>
            <p className="text-lg text-gray-600">
              Success on the mat reinforces confidence in the classroom—and academic organization frees wrestlers to compete relaxed and prepared.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-200">
              <h3 className="text-2xl font-bold mb-8 text-brand-blue flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center text-base font-bold">
                  1
                </span>
                <span>Athletic Benefits</span>
              </h3>
              <div className="space-y-6">
                {ATHLETIC_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {pillar.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-red-50/70 rounded-3xl p-8 md:p-10 border border-red-100">
              <h3 className="text-2xl font-bold mb-8 text-brand-red flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center text-base font-bold">
                  2
                </span>
                <span>Academic &amp; Life Benefits</span>
              </h3>
              <div className="space-y-6">
                {ACADEMIC_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-red flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {pillar.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Conversion Banner */}
          <div className="mt-16 max-w-5xl mx-auto bg-brand-blue text-white rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                Ready to Start 1-on-1 Mentorship?
              </h3>
              <p className="text-blue-100 text-base max-w-xl">
                Pick a 3, 5, 10, or 15-call bundle, select your mentor preference, and schedule your first 30-minute video call in minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto justify-center">
              <Link
                to="/#book-now"
                className="px-8 py-4 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold text-center transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Bundle</span>
              </Link>
              <Link
                to="/mentors"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-center transition-all"
              >
                Meet the Mentors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
