import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-blue text-white">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070&auto=format&fit=crop" 
          alt="Wrestling match" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-red/20 text-red-300 text-sm font-semibold tracking-wider uppercase mb-6 border border-brand-red/30">
              Mat Mentors
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Learn from University of Pennsylvania <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">student-athletes</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn from mentors who are succeeding at the highest level—balancing rigorous Ivy League academics with Division I athletics.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a 
              href="#pricing" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-red hover:bg-red-800 text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/50"
            >
              Book Mentorship
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-lg transition-all backdrop-blur-sm"
            >
              How It Works
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
