import { motion } from 'motion/react';
import { Target, BookOpen, Users } from 'lucide-react';

export default function Problem() {
  const painPoints = [
    {
      icon: <Target className="w-8 h-8 text-brand-red" />,
      title: "Lack of Guidance Beyond Coaching",
      description: "Coaches teach technique, but who teaches mindset, discipline, and how to handle the pressure of competition?"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand-red" />,
      title: "The School vs. Sports Struggle",
      description: "Student-athletes often feel forced to choose between excelling on the mat and maintaining top grades in the classroom."
    },
    {
      icon: <Users className="w-8 h-8 text-brand-red" />,
      title: "Missing the Right Role Models",
      description: "It's hard to find mentors who have actually walked the path of balancing elite athletics with rigorous academics."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-brand-blue"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            The Gap in Youth Wrestling
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Wrestling builds character, but without the right guidance, many young athletes struggle to reach their full potential on the mat or translate that discipline into academic and life success. Our focus is helping you dominate in the circle and achieve your full potential.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {painPoints.map((point, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <div className="bg-red-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{point.title}</h3>
              <p className="text-gray-600 leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
