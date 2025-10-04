import { motion } from 'motion/react';
import { TypewriterText } from './TypewriterText';

const experiences = [
  {
    company: "VK",
    role: "Аналитик/Разработчик",
    period: "2022-2024",
    description: "Разработка и анализ продуктовых решений в одной из крупнейших IT-компаний России"
  },
  {
    company: "Ecom.Tech",
    role: "Аналитик/Разработчик", 
    period: "2021-2022",
    description: "Работа над e-commerce решениями и оптимизация бизнес-процессов"
  },
  {
    company: "AstraLinux",
    role: "Разработчик",
    period: "2020-2021", 
    description: "Участие в разработке отечественной операционной системы"
  }
];

export function ExperienceSection() {
  return (
    <motion.section 
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="mb-12 text-center bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{
            filter: "drop-shadow(0 0 10px rgba(0, 123, 255, 0.8))"
          }}
        >
          <TypewriterText text="Опыт работы" delay={200} />
        </motion.h2>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="group p-4 sm:p-6 bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl transition-all duration-500"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                borderColor: "rgba(0, 123, 255, 0.6)",
                boxShadow: "0 0 30px rgba(0, 123, 255, 0.2)"
              }}
            >
              <div className="mb-3 sm:mb-4">
                <motion.h3 
                  className="text-white mb-1 text-lg sm:text-xl"
                  whileHover={{
                    color: "rgb(6, 182, 212)",
                    filter: "drop-shadow(0 0 5px rgba(6, 182, 212, 0.8))"
                  }}
                >
                  {exp.company}
                </motion.h3>
                <motion.p 
                  className="text-cyan-300 text-sm sm:text-base"
                  whileHover={{
                    filter: "drop-shadow(0 0 5px rgba(6, 182, 212, 0.5))"
                  }}
                >
                  {exp.role}
                </motion.p>
              </div>
              <motion.p 
                className="text-white/80 leading-relaxed text-sm sm:text-base"
                whileHover={{
                  color: "rgb(255, 255, 255)"
                }}
              >
                {exp.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}