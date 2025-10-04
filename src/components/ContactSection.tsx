import { motion } from 'motion/react';
import { TypewriterText } from './TypewriterText';
import { Github, Mail, MapPin } from 'lucide-react';

export function ContactSection() {
  return (
    <motion.section 
      id="contact"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 pb-24 sm:pb-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="mb-12 bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{
            filter: "drop-shadow(0 0 10px rgba(0, 123, 255, 0.8))"
          }}
        >
          <TypewriterText text="Контакты" delay={200} />
        </motion.h2>

        <motion.p 
          className="mb-8 sm:mb-12 text-white/90 max-w-4xl mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium px-4 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Готов обсудить новые проекты и возможности сотрудничества. 
          Свяжитесь со мной любым удобным способом.
        </motion.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <motion.div
            className="group p-4 sm:p-6 bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl transition-all duration-500 sm:col-span-2 md:col-span-1"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              borderColor: "rgba(0, 123, 255, 0.6)",
              boxShadow: "0 0 30px rgba(0, 123, 255, 0.2)"
            }}
          >
            <motion.div
              className="mb-3 sm:mb-4"
              whileHover={{
                filter: "drop-shadow(0 0 10px rgba(0, 123, 255, 0.8))"
              }}
            >
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto" />
            </motion.div>
            <h3 className="text-white mb-2 text-sm sm:text-base">Локация</h3>
            <p className="text-white/80 text-xs sm:text-sm">Подольск, Московская область</p>
          </motion.div>

          <motion.a
            href="https://github.com/usredanchenko"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 sm:p-6 bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl transition-all duration-500 block"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              borderColor: "rgba(0, 123, 255, 0.6)",
              boxShadow: "0 0 30px rgba(0, 123, 255, 0.2)"
            }}
          >
            <motion.div
              className="mb-3 sm:mb-4"
              whileHover={{
                filter: "drop-shadow(0 0 10px rgba(0, 123, 255, 0.8))"
              }}
            >
              <Github className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto" />
            </motion.div>
            <h3 className="text-white mb-2 text-sm sm:text-base">GitHub</h3>
            <p className="text-white/80 text-xs sm:text-sm">usredanchenko</p>
          </motion.a>

          <motion.div
            className="group p-4 sm:p-6 bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl transition-all duration-500"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              borderColor: "rgba(0, 123, 255, 0.6)",
              boxShadow: "0 0 30px rgba(0, 123, 255, 0.2)"
            }}
          >
            <motion.div
              className="mb-3 sm:mb-4"
              whileHover={{
                filter: "drop-shadow(0 0 10px rgba(0, 123, 255, 0.8))"
              }}
            >
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto" />
            </motion.div>
            <h3 className="text-white mb-2 text-sm sm:text-base">Email</h3>
            <p className="text-white/80 text-xs sm:text-sm">danchenko43@gmail.com</p>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-white/20 pt-6 sm:pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-white/70 text-xs sm:text-sm"
            whileHover={{
              color: "rgb(255, 255, 255)",
              filter: "drop-shadow(0 0 5px rgba(0, 123, 255, 0.3))"
            }}
          >
            © 2025 Егор Данченко. Создано с вниманием к деталям.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}