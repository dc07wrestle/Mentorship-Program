import { motion } from 'motion/react';
import { useState, FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CTA() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/request-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const errorText = await response.text();
        console.error("Server returned non-JSON response:", errorText);
        setStatus('error');
        setErrorMessage('The server encountered an unexpected error. Please try again later.');
        return;
      }

      if (response.ok && result.success) {
        if (result.smsStatus === 'failed') {
          setStatus('error');
          setErrorMessage(`Request received, but the automated text failed: ${result.smsError?.message || 'Unknown Twilio error'}. Please check your Twilio settings.`);
        } else {
          setStatus('success');
        }
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'There was an error submitting your request. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus('error');
      setErrorMessage('Network error. This could be due to a connection issue or the server being temporarily unavailable.');
    }
  };

  return (
    <section id="apply" className="py-24 bg-brand-blue relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-red-500/20 text-red-200 text-sm font-bold tracking-wider uppercase mb-4">
              Limited Spots Available
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Request an Appointment
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Fill out the form below to request a mentorship session. We'll reach out within 24 hours to confirm your appointment.
            </p>
          </motion.div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Request Received!</h3>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for reaching out. We've sent a confirmation email to the parent's email address provided. We'll be in touch shortly to schedule your session.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="px-8 py-3 bg-brand-blue text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/95 p-8 rounded-2xl shadow-xl">
              {/* Honeypot */}
              <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="parentName" className="block text-sm font-semibold text-gray-700">Parent Full Name *</label>
                  <input type="text" id="parentName" name="parentName" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-transparent" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="studentName" className="block text-sm font-semibold text-gray-700">Student Full Name *</label>
                  <input type="text" id="studentName" name="studentName" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-transparent" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="parentEmail" className="block text-sm font-semibold text-gray-700">Parent Email *</label>
                  <input type="email" id="parentEmail" name="parentEmail" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-transparent" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="parentPhone" className="block text-sm font-semibold text-gray-700">Parent Phone Number</label>
                  <input type="tel" id="parentPhone" name="parentPhone" placeholder="(555) 000-0000" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-transparent" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="studentGrade" className="block text-sm font-semibold text-gray-700">Student Grade</label>
                  <select id="studentGrade" name="studentGrade" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-transparent bg-white">
                    <option value="">Select Grade</option>
                    <option value="Elementary">Elementary School</option>
                    <option value="Middle School">Middle School</option>
                    <option value="High School">High School</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="experienceLevel" className="block text-sm font-semibold text-gray-700">Wrestling Experience Level</label>
                  <select id="experienceLevel" name="experienceLevel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-transparent bg-white">
                    <option value="">Select Experience</option>
                    <option value="Beginner">Beginner (0-2 years)</option>
                    <option value="Intermediate">Intermediate (3-5 years)</option>
                    <option value="Advanced">Advanced (5+ years)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="helpWith" className="block text-sm font-semibold text-gray-700">What does the student want help with?</label>
                <textarea id="helpWith" name="helpWith" rows={3} placeholder="e.g., Technique, Mental Toughness, Film Review, Academics..." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-transparent"></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="preferredTimes" className="block text-sm font-semibold text-gray-700">Preferred Days/Times for Sessions</label>
                <input type="text" id="preferredTimes" name="preferredTimes" placeholder="e.g., Weekdays after 5pm, Weekends" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-transparent" />
              </div>

              <div className="space-y-2">
                <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-700">Additional Notes</label>
                <textarea id="additionalNotes" name="additionalNotes" rows={2} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-transparent"></textarea>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-brand-red hover:bg-red-800 text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
                {!status && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
