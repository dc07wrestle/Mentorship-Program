import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Apply / Sign Up",
      description: "Fill out a quick application telling us about your student-athlete's goals, current level, and areas where they need the most guidance."
    },
    {
      number: "02",
      title: "Get Matched",
      description: "We carefully pair your student with a Penn student-athlete whose background, weight class, or academic interests align with their goals."
    },
    {
      number: "03",
      title: "Begin Sessions",
      description: "Start regular 1-on-1 virtual mentorship sessions, focusing on holistic development and detailed match film analysis."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-brand-blue"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A simple, structured process to get your student-athlete the guidance they need.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0" />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="relative z-10 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-24 h-24 rounded-full bg-white border-4 border-brand-red flex items-center justify-center text-3xl font-extrabold text-brand-red mb-6 shadow-xl">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center space-y-6">
          <a 
            href="#pricing" 
            className="inline-flex px-8 py-4 bg-brand-red hover:bg-red-800 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-red-900/20"
          >
            Choose Your Plan
          </a>
          <p className="text-sm text-gray-500">
            Have questions? <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dc07wrestle@gmail.com&su=Inquiry from Mat Mentors Website" target="_blank" rel="noopener noreferrer" className="text-brand-red font-bold hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
}
