import { motion } from 'motion/react';

export default function Mentors() {
  const mentors = [
    {
      name: "Davis Motyka",
      image: "https://pennathletics.com/images/2025/9/2/DavisMotyka.jpg",
      major: "Economics Major",
      achievements: [
        "NCAA Qualifier",
        "World Team Member",
        "Ironman Champion",
        "NWCA Scholar All-American"
      ],
      gpa: "3.7 GPA"
    },
    {
      name: "Deven Casey",
      image: "https://pennathletics.com/images/2025/9/2/DevenCasey.jpg",
      major: "Economics Major",
      achievements: [
        "2x State Champion",
        "Fargo All-American",
        "Interned coaching youth athletes"
      ],
      gpa: "3.6 GPA"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-brand-blue"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Meet Your Mentors
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Current University of Pennsylvania student-athletes dedicated to mentoring K-12 wrestlers who want to succeed at both wrestling and academics at the highest level.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mentors.map((mentor, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="h-96 overflow-hidden bg-gray-200">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{mentor.name}</h3>
                <p className="text-brand-red font-semibold mb-4">{mentor.major}</p>
                
                <div className="space-y-2 text-gray-600 mb-8">
                  {mentor.achievements.map((achievement, idx) => (
                    <p key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                      {achievement}
                    </p>
                  ))}
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    {mentor.gpa}
                  </p>
                </div>

                <a 
                  href="#book-now" 
                  className="block w-full py-3 bg-brand-blue hover:bg-blue-900 text-white text-center rounded-xl font-bold transition-all shadow-md"
                >
                  Book with {mentor.name.split(' ')[0]}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p 
          className="mt-12 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Have a specific request for a mentor? Email us at <a href="mailto:dc07wrestle@gmail.com" className="text-brand-red font-bold hover:underline">dc07wrestle@gmail.com</a>
        </motion.p>
      </div>
    </section>
  );
}
