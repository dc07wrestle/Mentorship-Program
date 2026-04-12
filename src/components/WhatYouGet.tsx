import { motion } from 'motion/react';
import { Video, Target, Brain, MessageSquare } from 'lucide-react';

export default function WhatYouGet() {
  const items = [
    {
      icon: <Target className="w-8 h-8 text-brand-red" />,
      title: "Technique Breakdown",
      description: "Detailed analysis of your specific wrestling style and technical improvements."
    },
    {
      icon: <Video className="w-8 h-8 text-brand-red" />,
      title: "Match Film Review",
      description: "Send us your match footage beforehand for a professional review during the session."
    },
    {
      icon: <Brain className="w-8 h-8 text-brand-red" />,
      title: "Mental Coaching",
      description: "Learn the mindset required to compete at the Division I and Ivy League level."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-brand-red" />,
      title: "Q&A with a Penn Athlete",
      description: "Direct access to ask anything about recruiting, academics, and elite training."
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
            What You Get
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Every 30-minute session is tailored to your specific needs and goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-brand-blue mb-4">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
