/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Differentiator from './components/Differentiator';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Mentors from './components/Mentors';
import WhatYouGet from './components/WhatYouGet';
import FAQ from './components/FAQ';
import BottomCTA from './components/BottomCTA';
import Footer from './components/Footer';
import Success from './components/Success';
import Legal from './components/Legal';
import InstructionalVideos from './components/InstructionalVideos';

function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Differentiator />
      <Benefits />
      <WhatYouGet />
      <HowItWorks />
      <Mentors />
      <FAQ />
      <Pricing />
      <BottomCTA />
      <Footer />
    </>
  );
}

function InstructionalVideosPage() {
  return (
    <>
      <Navbar />
      <InstructionalVideos />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <main className="min-h-screen bg-gray-50 font-sans selection:bg-brand-red selection:text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/videos" element={<InstructionalVideosPage />} />
          <Route path="/academy" element={<InstructionalVideosPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/refunds" element={<Legal />} />
        </Routes>
      </main>
    </Router>
  );
}

