import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function Solution() {
  const features = [
    "1-on-1 virtual mentorship sessions",
    "Film study analysis of your matches",
    "Guidance in wrestling technique and match mindset",
    "Academic strategies and study habits",
    "Discipline and goal setting frameworks"
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Jordan_Burroughs_at_2017_Men%27s_freestyle_Wrestling_World_Cup%2C_Kermanshah.jpg" 
                alt="Jordan Burroughs Wrestling" 
                className="w-full h-[500px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/80 to-transparent mix-blend-multiply" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  100%
                </div>
                <div className="text-sm font-bold text-gray-900 leading-tight">
                  Ivy League<br/>Members
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brand-blue">
              The Solution: Mentorship That Bridges the Gap
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We connect young wrestlers with mentors who have proven their ability to balance both worlds. Our mentors aren't just great athletes—they are current University of Pennsylvania student-athletes who understand the discipline required to succeed everywhere.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <a 
              href="#apply" 
              className="inline-flex px-8 py-4 bg-brand-blue hover:bg-blue-900 text-white rounded-lg font-bold text-lg transition-all shadow-lg"
            >
              Meet Our Mentors
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
