import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2 font-heading">Mat Mentors</h3>
            <p className="text-sm">Empowering the next generation of student-athletes.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/refunds" className="hover:text-white transition-colors">Refund Policy</Link>
            <a href="mailto:dc07wrestle@gmail.com" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm border-t border-gray-800 pt-8">
          <p>&copy; {new Date().getFullYear()} Mat Mentors. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500">Not officially affiliated with the University of Pennsylvania.</p>
          <p className="mt-4 text-xs text-gray-600">Made with ❤️ for the wrestling community.</p>
        </div>
      </div>
    </footer>
  );
}
