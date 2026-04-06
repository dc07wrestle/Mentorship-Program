import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-blue/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold text-xl font-heading">
              P
            </div>
            <span className="text-white font-bold text-xl tracking-tight hidden sm:block font-heading">
              Penn Wrestling Mentorship Program
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-blue-100 hover:text-white font-medium transition-colors">How It Works</a>
            <a href="#apply" className="px-6 py-2.5 bg-brand-red hover:bg-red-800 text-white rounded-lg font-bold transition-all shadow-md">
              Apply Now
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
              href="#apply" 
              className="w-full px-6 py-3 bg-brand-red text-white text-center rounded-lg font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
