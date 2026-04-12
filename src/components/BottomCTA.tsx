import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function BottomCTA() {
  return (
    <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070&auto=format&fit=crop" 
          alt="Wrestling background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">
            Ready to get better?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Book your first session today and start training like an Ivy League athlete.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <a 
              href="#book-now" 
              className="px-10 py-5 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold text-xl transition-all flex items-center gap-2 shadow-xl shadow-red-900/50"
            >
              Book Your Session Now
              <ArrowRight className="w-6 h-6" />
            </a>
            <p className="text-sm text-blue-200 font-medium">
              Limited weekly slots available.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
