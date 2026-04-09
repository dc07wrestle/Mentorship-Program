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
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Success from './components/Success';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Differentiator />
      <Benefits />
      <HowItWorks />
      <Mentors />
      <FAQ />
      <Pricing />
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
        </Routes>
      </main>
    </Router>
  );
}
