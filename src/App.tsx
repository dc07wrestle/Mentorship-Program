/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Differentiator from './components/Differentiator';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Mentors from './components/Mentors';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans selection:bg-brand-red selection:text-white">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Differentiator />
      <Benefits />
      <HowItWorks />
      <Mentors />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
