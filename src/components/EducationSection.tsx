import { motion } from 'motion/react';
import { TypewriterText } from './TypewriterText';

const education = [
  {
    institution: "НИУ Московский Энергетический Институт",
    degree: "Бакалавр, Бизнес-информатика",
    period: "2020-2024",
    description: "Изучение современных технологий в области информационных систем и бизнес-анализа"
  },
  {
    institution: "Московский приборостроительный техникум",
    degree: "Компьютерные системы и комплексы",
    period: "2015-2019",
    description: "Фундаментальная подготовка в области компьютерных технологий и системного администрирования"
  }
];

export function EducationSection() {
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
          <TypewriterText text="Образование" delay={200} />
        </motion.h2>

        <div className="space-y-6 sm:space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="group p-4 sm:p-6 bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl transition-all duration-500"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                borderColor: "rgba(0, 255, 136, 0.6)",
                boxShadow: "0 0 30px rgba(0, 255, 136, 0.2)"
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                  <motion.h3 
                    className="text-white mb-2 text-lg sm:text-xl"
                    whileHover={{
                      color: "rgb(6, 182, 212)",
                      filter: "drop-shadow(0 0 5px rgba(6, 182, 212, 0.8))"
                    }}
                  >
                    {edu.institution}
                  </motion.h3>
                  <motion.p 
                    className="text-cyan-300 mb-2 text-sm sm:text-base"
                    whileHover={{
                      filter: "drop-shadow(0 0 5px rgba(6, 182, 212, 0.5))"
                    }}
                  >
                    {edu.degree}
                  </motion.p>
                </div>
                <motion.span 
                  className="text-white/70 text-sm mt-2 md:mt-0 md:ml-4"
                  whileHover={{
                    color: "rgb(34, 197, 94)",
                    filter: "drop-shadow(0 0 5px rgba(34, 197, 94, 0.8))"
                  }}
                >
                  {edu.period}
                </motion.span>
              </div>
              <motion.p 
                className="text-white/80 leading-relaxed text-sm sm:text-base"
                whileHover={{
                  color: "rgb(255, 255, 255)"
                }}
              >
                {edu.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}