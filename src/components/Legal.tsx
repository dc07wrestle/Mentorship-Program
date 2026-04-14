import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Legal() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const getContent = () => {
    switch (path) {
      case '/terms':
        return {
          title: "Terms of Service",
          content: (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">1. Acceptance of Terms</h2>
                <p>By accessing and using Mat Mentors, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">2. Description of Service</h2>
                <p>Mat Mentors provides 1-on-1 virtual mentorship sessions for student-athletes, focusing on wrestling development, film analysis, and academic guidance.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">3. Disclaimer</h2>
                <p>Mentorship sessions are for educational and guidance purposes only. Mat Mentors does not guarantee specific performance outcomes and is not responsible for injuries or results arising from training or advice.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">4. User Responsibilities</h2>
                <p>Users are responsible for providing accurate information and maintaining a respectful environment during mentorship sessions.</p>
              </section>
            </div>
          )
        };
      case '/privacy':
        return {
          title: "Privacy Policy",
          content: (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">Information Collection</h2>
                <p>We collect basic information such as name and email to provide our services. This information is used to schedule sessions and communicate with you about your mentorship.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">Payment Processing</h2>
                <p>Payments are securely processed through Stripe. Mat Mentors does not store your credit card information on our servers.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">Data Sharing</h2>
                <p>We do not sell or share your personal information with third parties for marketing purposes. Your data is only used to facilitate the mentorship sessions you have booked.</p>
              </section>
            </div>
          )
        };
      case '/refunds':
        return {
          title: "Refund Policy",
          content: (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">Cancellation & Rescheduling</h2>
                <p>Sessions must be canceled or rescheduled at least 24 hours in advance. This allows our mentors to manage their schedules effectively.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">Refund Eligibility</h2>
                <p>Missed sessions or late cancellations (less than 24 hours notice) are non-refundable. If a mentor needs to cancel, a full refund or a rescheduled session will be provided.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-brand-blue mb-3">3. Session Packages</h2>
                <p>Session packages (3, 5, 10, and 15 packs) are offered at a discount and must be used within a reasonable time frame (typically 1 year from purchase). Unused sessions in a package are non-refundable after 90 days.</p>
              </section>
            </div>
          )
        };
      default:
        return { title: "Legal", content: <p>Page not found.</p> };
    }
  };

  const { title, content } = getContent();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-brand-red font-bold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue mb-8 font-heading border-b border-gray-100 pb-6">
              {title}
            </h1>
            
            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
              {content}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
