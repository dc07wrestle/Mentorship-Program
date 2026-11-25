import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Copy, Check } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isSubPage =
    location.pathname.startsWith('/videos') ||
    location.pathname.startsWith('/academy') ||
    location.pathname.startsWith('/mentors') ||
    location.pathname.startsWith('/comprehensive-growth') ||
    location.pathname.startsWith('/growth') ||
    location.pathname.startsWith('/why-us') ||
    location.pathname.startsWith('/what-makes-us-different') ||
    location.pathname.startsWith('/faq');

  const isMentorsActive = location.pathname.startsWith('/mentors');
  const isGrowthActive =
    location.pathname.startsWith('/comprehensive-growth') ||
    location.pathname.startsWith('/growth');
  const isDifferentActive =
    location.pathname.startsWith('/why-us') ||
    location.pathname.startsWith('/what-makes-us-different');
  const isVideosActive =
    location.pathname.startsWith('/videos') ||
    location.pathname.startsWith('/academy');
  const isFaqActive = location.pathname.startsWith('/faq');

  const email = "matmentorspenn@gmail.com";

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

  const hasSolidNav = isScrolled || isSubPage;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasSolidNav
            ? 'bg-brand-blue/95 backdrop-blur-md shadow-lg py-4 border-b border-white/10'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 xl:px-6">
          <div className="flex items-center justify-between gap-2 xl:gap-3">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img 
                src="https://i.postimg.cc/g06cJB6D/7771C723-F9AE-4E58-AD55-CD8A92B9A7A6.png" 
                alt="Mat Mentors Logo" 
                className="w-9 h-9 xl:w-10 xl:h-10 object-contain rounded-full bg-white p-0.5"
              />
              <span className="text-white font-bold text-lg 2xl:text-xl tracking-tight hidden sm:block font-heading whitespace-nowrap">
                Mat Mentors
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1.5 2xl:gap-2.5">
              <Link
                to="/mentors"
                className={`px-2.5 2xl:px-3 py-1.5 rounded-lg font-semibold text-xs 2xl:text-sm transition-all border shadow-sm whitespace-nowrap ${
                  isMentorsActive
                    ? 'bg-white/25 text-white border-white/40'
                    : 'text-white bg-white/10 hover:bg-white/20 border-white/20'
                }`}
              >
                Meet Your Mentors
              </Link>
              <Link
                to="/comprehensive-growth"
                className={`px-2.5 2xl:px-3 py-1.5 rounded-lg font-semibold text-xs 2xl:text-sm transition-all border shadow-sm whitespace-nowrap ${
                  isGrowthActive
                    ? 'bg-white/25 text-white border-white/40'
                    : 'text-white bg-white/10 hover:bg-white/20 border-white/20'
                }`}
              >
                Comprehensive Growth
              </Link>
              <Link
                to="/why-us"
                className={`px-2.5 2xl:px-3 py-1.5 rounded-lg font-semibold text-xs 2xl:text-sm transition-all border shadow-sm whitespace-nowrap ${
                  isDifferentActive
                    ? 'bg-white/25 text-white border-white/40'
                    : 'text-white bg-white/10 hover:bg-white/20 border-white/20'
                }`}
              >
                What Makes Us Different
              </Link>
              <Link
                to="/videos"
                className={`px-2.5 2xl:px-3 py-1.5 rounded-lg font-semibold text-xs 2xl:text-sm transition-all border shadow-sm whitespace-nowrap ${
                  isVideosActive
                    ? 'bg-white/25 text-white border-white/40'
                    : 'text-white bg-white/10 hover:bg-white/20 border-white/20'
                }`}
              >
                Instructional Videos
              </Link>
              <Link
                to="/faq"
                className={`px-2.5 2xl:px-3 py-1.5 rounded-lg font-semibold text-xs 2xl:text-sm transition-all border shadow-sm whitespace-nowrap ${
                  isFaqActive
                    ? 'bg-white/25 text-white border-white/40'
                    : 'text-white bg-white/10 hover:bg-white/20 border-white/20'
                }`}
              >
                FAQ
              </Link>
              <Link to="/#pricing" className="text-blue-100 hover:text-white font-medium text-xs 2xl:text-sm transition-colors whitespace-nowrap px-1.5">
                Pricing
              </Link>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="text-blue-100 hover:text-white font-medium text-xs 2xl:text-sm transition-colors cursor-pointer whitespace-nowrap px-1.5"
              >
                Contact
              </button>
              <Link to="/#book-now" className="px-3.5 2xl:px-4 py-2 bg-brand-red hover:bg-red-800 text-white rounded-lg font-bold text-xs 2xl:text-sm transition-all shadow-md whitespace-nowrap shrink-0">
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="xl:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-brand-blue border-t border-white/10 shadow-xl">
            <div className="flex flex-col p-6 gap-3">
              <Link 
                to="/mentors" 
                className={`text-white font-bold py-2.5 px-4 rounded-lg border transition-colors ${
                  isMentorsActive ? 'bg-white/25 border-white/40' : 'bg-white/10 border-white/20'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Meet Your Mentors
              </Link>
              <Link 
                to="/comprehensive-growth" 
                className={`text-white font-bold py-2.5 px-4 rounded-lg border transition-colors ${
                  isGrowthActive ? 'bg-white/25 border-white/40' : 'bg-white/10 border-white/20'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Comprehensive Growth
              </Link>
              <Link 
                to="/why-us" 
                className={`text-white font-bold py-2.5 px-4 rounded-lg border transition-colors ${
                  isDifferentActive ? 'bg-white/25 border-white/40' : 'bg-white/10 border-white/20'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                What Makes Us Different
              </Link>
              <Link 
                to="/videos" 
                className={`text-white font-bold py-2.5 px-4 rounded-lg border transition-colors ${
                  isVideosActive ? 'bg-white/25 border-white/40' : 'bg-white/10 border-white/20'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Instructional Videos
              </Link>
              <Link 
                to="/faq" 
                className={`text-white font-bold py-2.5 px-4 rounded-lg border transition-colors ${
                  isFaqActive ? 'bg-white/25 border-white/40' : 'bg-white/10 border-white/20'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/#how-it-works" 
                className="text-blue-100 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/#pricing" 
                className="text-blue-100 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <button 
                className="text-blue-100 font-medium py-2 text-left"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
              >
                Contact
              </button>
              <Link 
                to="/#book-now" 
                className="w-full px-6 py-3 bg-brand-red text-white text-center rounded-lg font-bold mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </Link>
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
