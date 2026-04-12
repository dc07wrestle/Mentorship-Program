/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <Router>
      <main className="min-h-screen bg-gray-50 font-sans selection:bg-brand-red selection:text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/refunds" element={<Legal />} />
        </Routes>
      </main>
    </Router>
  );
}
