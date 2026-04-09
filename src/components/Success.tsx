import { motion } from 'motion/react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-screen bg-brand-blue flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070&auto=format&fit=crop" 
          alt="Wrestling background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-md w-full bg-white rounded-3xl p-8 md:p-12 text-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-extrabold text-brand-blue mb-4 font-heading">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for choosing Mat Mentors. Your session pack is booked. We will follow up via text and email shortly to schedule your first session.
        </p>

        <div className="space-y-4">
          <Link 
            to="/" 
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/20"
          >
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <p className="text-xs text-gray-400">
            Elite Wrestling. Elite Minds.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
