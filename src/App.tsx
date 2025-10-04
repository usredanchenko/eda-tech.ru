import { SnakeAnimation } from './components/SnakeAnimation';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { ProjectsSection } from './components/ProjectsSection';
import { motion } from 'motion/react';
import { Home, Briefcase, GraduationCap, FolderOpen, Mail } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <SnakeAnimation />
      
      {/* Desktop navigation */}
      <motion.nav 
        className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex flex-col space-y-3">
          {[
            { section: 'hero', icon: Home, label: 'Главная' },
            { section: 'experience', icon: Briefcase, label: 'Опыт' },
            { section: 'education', icon: GraduationCap, label: 'Образование' },
            { section: 'projects', icon: FolderOpen, label: 'Проекты' },
            { section: 'contact', icon: Mail, label: 'Контакты' }
          ].map(({ section, icon: Icon, label }, index) => (
            <motion.button
              key={section}
              className="group relative p-3 bg-black/80 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderColor: "rgb(0, 123, 255)",
                boxShadow: "0 0 20px rgba(0, 123, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = section === 'hero' 
                  ? document.documentElement 
                  : document.getElementById(section);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Icon className="w-4 h-4 text-white group-hover:text-blue-300 transition-colors" />
              <motion.div 
                className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                initial={{ x: 10 }}
                whileHover={{ x: 0 }}
              >
                {label}
              </motion.div>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile navigation */}
      <motion.nav 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex space-x-2 bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
          {[
            { section: 'hero', icon: Home },
            { section: 'experience', icon: Briefcase },
            { section: 'education', icon: GraduationCap },
            { section: 'projects', icon: FolderOpen },
            { section: 'contact', icon: Mail }
          ].map(({ section, icon: Icon }, index) => (
            <motion.button
              key={section}
              className="p-3 rounded-xl bg-black/50 border border-white/10 transition-all duration-300"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderColor: "rgb(0, 123, 255)"
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const element = section === 'hero' 
                  ? document.documentElement 
                  : document.getElementById(section);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Icon className="w-4 h-4 text-white" />
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Gradient overlays for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-r from-blue-900/5 via-green-500/5 to-purple-900/5 pointer-events-none" />
      
      <main className="relative z-10">
        <HeroSection />
        
        <motion.div
          id="experience"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ExperienceSection />
        </motion.div>
        
        <motion.div
          id="education"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <EducationSection />
        </motion.div>
        
        <motion.div
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ProjectsSection />
        </motion.div>
        
        <ContactSection />
      </main>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => {
          const colors = ['bg-blue-400/30', 'bg-green-400/30', 'bg-purple-400/30'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 ${randomColor} rounded-full`}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              }}
              animate={{
                y: [null, -20, null],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}