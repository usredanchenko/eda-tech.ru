import { motion } from 'motion/react';
import { TypewriterText } from './TypewriterText';
import exampleImage from 'figma:asset/da4d0925874b8f38805f02ffa9c327b882cc58fa.png';

export function HeroSection() {
  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="mb-6 sm:mb-8 relative inline-block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ 
            scale: 1.05,
            filter: "drop-shadow(0 0 20px rgba(0, 255, 136, 0.5))"
          }}
        >
          <img 
            src={exampleImage} 
            alt="Егор Данченко"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl object-cover mx-auto shadow-2xl"
          />
          <motion.div 
            className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.h1 
          className="mb-6 sm:mb-8 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <TypewriterText text="Егор Данченко" delay={800} speed={100} />
        </motion.h1>

        <motion.p 
          className="mb-8 sm:mb-12 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white max-w-4xl mx-auto px-4 drop-shadow-lg leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            textShadow: "0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(0, 123, 255, 0.2)"
          }}
        >
          <TypewriterText 
            text="Неторопливый житель Подольска. Аналитик и разработчик. Специализируюсь на создании эффективных решений для бизнеса." 
            delay={2000} 
            speed={40}
          />
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.a
            href="https://github.com/usredanchenko"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 sm:px-12 py-4 sm:py-5 bg-black/80 backdrop-blur-sm border border-white/30 rounded-2xl text-white transition-all duration-300 text-center text-xl sm:text-2xl font-medium"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              borderColor: "rgba(0, 123, 255, 0.8)",
              boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
          
          <motion.button
            className="px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white transition-all duration-300 text-center flex items-center justify-center text-xl sm:text-2xl font-medium"
            whileHover={{
              scale: 1.05,
              backgroundImage: "linear-gradient(to right, rgb(0, 123, 255), rgb(138, 43, 226))",
              boxShadow: "0 0 30px rgba(0, 123, 255, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Связаться
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}