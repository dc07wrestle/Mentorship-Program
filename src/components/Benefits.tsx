import { motion } from 'motion/react';
import { Dumbbell, Brain, Clock, Target, BookOpen, Compass, Video } from 'lucide-react';

export default function Benefits() {
  const athleticBenefits = [
    { icon: <Video className="w-6 h-6" />, title: "Film Analysis", desc: "Send us your match film for detailed breakdown and feedback." },
    { icon: <Dumbbell className="w-6 h-6" />, title: "Technique Guidance", desc: "Refine high-level wrestling techniques." },
    { icon: <Brain className="w-6 h-6" />, title: "Match Mindset", desc: "Develop mental toughness for competition." }
  ];

  const academicBenefits = [
    { icon: <Clock className="w-6 h-6" />, title: "Time Management", desc: "Learn to balance practice, travel, and studying." },
    { icon: <BookOpen className="w-6 h-6" />, title: "Study Habits", desc: "Efficient learning strategies for student-athletes." },
    { icon: <Compass className="w-6 h-6" />, title: "College Pathway", desc: "Insights into recruiting and college admissions." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-brand-blue"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Comprehensive Growth
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our mentorship program is designed to develop the complete student-athlete.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Athletic Benefits */}
          <motion.div 
            className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-brand-blue flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center">
                1
              </span>
              Athletic Benefits
            </h3>
            <div className="space-y-8">
              {athleticBenefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Academic Benefits */}
          <motion.div 
            className="bg-red-50 rounded-3xl p-8 md:p-12 border border-red-100"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-brand-red flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center">
                2
              </span>
              Academic & Life Benefits
            </h3>
            <div className="space-y-8">
              {academicBenefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-red flex items-center justify-center shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
