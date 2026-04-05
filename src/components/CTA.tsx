import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="apply" className="py-24 bg-brand-blue relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-16 border border-white/20 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-red-500/20 text-red-200 text-sm font-bold tracking-wider uppercase mb-6">
              Limited Spots Available
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Elevate Your Game?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join the mentorship program built around mentors who are actively proving that you can succeed at both wrestling and academics at the highest level.
            </p>
            
            <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Parent's Email Address" 
                className="w-full px-6 py-4 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red"
                required
              />
              <button 
                type="submit"
                className="w-full px-8 py-4 bg-brand-red hover:bg-red-800 text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-sm text-blue-200 mt-6">
              No commitment required to apply. We'll reach out to schedule a consultation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
