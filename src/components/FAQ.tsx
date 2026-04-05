import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "Who is this program for?",
      answer: "This program is designed for K-12 student wrestlers who want to elevate their performance on the mat while developing strong academic and life habits. Whether your goal is to wrestle in college or simply build discipline, our mentors can help."
    },
    {
      question: "Are the sessions virtual or in-person?",
      answer: "All of our mentorship sessions are 1-on-1 and conducted 100% virtually. This allows us to work with student-athletes anywhere in the country and easily review match film together via screen share."
    },
    {
      question: "What is the time commitment?",
      answer: "We recommend at least one 45-60 minute session per week to maintain consistency and build a strong mentor-mentee relationship. However, the schedule is flexible and can be tailored to fit your student's busy athletic and academic calendar."
    },
    {
      question: "How are mentors vetted for safety?",
      answer: "Safety is our top priority. All mentors are current University of Pennsylvania student-athletes in good standing. They undergo background checks and are trained in our specific mentorship curriculum before working with students."
    },
    {
      question: "What does a typical session look like?",
      answer: "Sessions are split between athletic review (analyzing match footage, discussing technique and mindset) and academic/life coaching (reviewing study habits, setting goals, and discussing time management strategies)."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-brand-blue"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQItem: React.FC<{ question: string, answer: string, index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button 
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-lg text-gray-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-brand-red transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
