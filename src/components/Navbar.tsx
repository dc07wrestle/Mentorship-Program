import { useState, useEffect } from 'react';
import { Menu, X, Mail, Copy, Check } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "dc07wrestle@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-blue/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <img 
                src="https://i.postimg.cc/g06cJB6D/7771C723-F9AE-4E58-AD55-CD8A92B9A7A6.png" 
                alt="Mat Mentors Logo" 
                className="w-10 h-10 object-contain rounded-full bg-white p-0.5"
              />
              <span className="text-white font-bold text-xl tracking-tight hidden sm:block font-heading">
                Mat Mentors
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-blue-100 hover:text-white font-medium transition-colors">How It Works</a>
              <a href="#pricing" className="text-blue-100 hover:text-white font-medium transition-colors">Pricing</a>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="text-blue-100 hover:text-white font-medium transition-colors cursor-pointer"
              >
                Contact
              </button>
              <a href="#book-now" className="px-6 py-2.5 bg-brand-red hover:bg-red-800 text-white rounded-lg font-bold transition-all shadow-md">
                Book Now
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-brand-blue border-t border-white/10 shadow-xl">
            <div className="flex flex-col p-6 gap-4">
              <a 
                href="#how-it-works" 
                className="text-white font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                className="text-white font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <button 
                className="text-white font-medium py-2 text-left"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
              >
                Contact
              </button>
              <a 
                href="#book-now" 
                className="w-full px-6 py-3 bg-brand-red text-white text-center rounded-lg font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setIsContactModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold text-brand-blue mb-2">Contact Us</h3>
              <p className="text-gray-600 mb-8">
                Have questions? We're here to help. Reach out to us directly via email.
              </p>
              
              <div className="space-y-4">
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Inquiry from Mat Mentors Website`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  Send Email via Gmail
                </a>
                
                <div className="relative pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Or copy address</span>
                    <div className="h-px flex-1 bg-gray-100"></div>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-all"
                  >
                    <span className="truncate">{email}</span>
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-400" />}
                  </button>
                  {copied && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
              
              <p className="mt-8 text-xs text-gray-400">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
