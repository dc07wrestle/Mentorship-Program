import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Success() {
  useEffect(() => {
    // Cal.com embed script initialization
    const script = document.createElement('script');
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.q = cal.q || [];
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const cand = d.createElement("script");
            cand.src = "https://app.cal.com/embed/embed.js";
            d.head.appendChild(cand);
            return api;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", {origin:"https://cal.com"});
      Cal("ui", {"theme":"light","styles":{"branding":{"brandColor":"#002147"}},"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.head.appendChild(script);

    return () => {
      // Cleanup if necessary, though usually not needed for this script
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-start px-6 py-12 md:py-20 overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070&auto=format&fit=crop" 
          alt="Wrestling background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue mb-4 font-heading">
            Payment Received
          </h1>
          
          <p className="text-xl font-bold text-brand-red mb-2">
            Your session is almost locked in.
          </p>
          
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose your 30-minute mentorship time below. Please select the time that works best for you. Once booked, you'll receive confirmation details for your session.
          </p>
        </div>

        {/* Cal.com Embed Container */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-inner min-h-[600px]">
          <iframe
            src="https://cal.com/mat-mentors/30min?embed=true"
            title="Schedule your session"
            width="100%"
            height="600"
            frameBorder="0"
            className="w-full"
          />
        </div>

        <div className="mt-10 text-center space-y-8">
          <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-brand-blue font-bold mb-2 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-red" />
              For 5 and 10-Session Packs
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Please book your <span className="font-bold text-brand-red underline">first session</span> using the calendar above. During our first call, we will discuss and lock in your future recurring times (e.g., every Tuesday at 4:00 PM) to ensure consistent growth.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-gray-500">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              <span>Need help? Email <a href="mailto:dc07wrestle@gmail.com" className="text-brand-red font-semibold hover:underline">dc07wrestle@gmail.com</a></span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-blue hover:bg-blue-900 text-white rounded-xl font-bold transition-all shadow-lg"
            >
              Back to Home
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-6 text-[10px] text-gray-400 max-w-xs mx-auto">
              By booking a session, you agree to our <Link to="/terms" className="underline hover:text-brand-red">Terms of Service</Link> and <Link to="/refunds" className="underline hover:text-brand-red">Refund Policy</Link>.
            </p>
          </div>
        </div>
      </motion.div>

      <p className="relative z-10 text-white/60 text-sm font-medium">
        Elite Wrestling. Elite Minds.
      </p>
    </div>
  );
}
