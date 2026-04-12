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
    },
    {
      name: "Sean Seefeldt",
      image: "https://pennathletics.com/images/2025/9/2/SeanSeefeldt.jpg",
      major: "Philosophy, Politics & Economics Major",
      achievements: [
        "NCAA Qualifier",
        "NWCA Scholar All-American",
        "Team Captain",
        "Minor in Consumer Psychology"
      ],
      gpa: "3.4 GPA"
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                
                <div className="space-y-2 text-gray-600">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
