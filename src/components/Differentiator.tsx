import { motion } from 'motion/react';
import { Award, GraduationCap, TrendingUp } from 'lucide-react';

export default function Differentiator() {
  return (
    <section className="py-24 bg-brand-blue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Makes Us Different
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            This is NOT just coaching—it's life mentorship from those who have already achieved what your student is striving for.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GraduationCap className="w-12 h-12 text-red-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Ivy League Excellence</h3>
            <p className="text-blue-100 leading-relaxed">
              Our mentors attend the University of Pennsylvania, one of the most prestigious academic institutions in the world. They know what it takes to excel in the classroom.
            </p>
          </motion.div>

          <motion.div 
            className="bg-brand-red rounded-2xl p-8 shadow-2xl transform md:-translate-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Award className="w-12 h-12 text-white mb-6" />
            <h3 className="text-2xl font-bold mb-4">Division I Athletics</h3>
            <p className="text-red-100 leading-relaxed">
              They actively compete at the highest level of collegiate wrestling. They understand the grind, the pressure, and the mindset required to win.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TrendingUp className="w-12 h-12 text-red-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Proven Balance</h3>
            <p className="text-blue-100 leading-relaxed">
              They aren't just talking about balance; they are living it every day. They serve as real, tangible examples of long-term success.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
