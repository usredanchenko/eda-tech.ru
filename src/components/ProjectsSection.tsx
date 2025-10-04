import { motion } from 'motion/react';
import { TypewriterText } from './TypewriterText';
import { MessageSquare, Bot, Monitor, Sparkles, Brain } from 'lucide-react';

const projects = [
  {
    name: "Neuro Business",
    description: "Платформа для автоматизации бизнес-процессов с помощью нейросетей",
    icon: Brain,
    features: ["Интеграция с различными AI моделями", "Автоматизация рутинных задач", "Аналитика и отчетность"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    color: "from-purple-600 to-pink-600",
    link: "https://neuro-business.com"
  },
  {
    name: "Staya",
    description: "Мессенджер с AI синхронным переводом и стильным дизайном",
    icon: MessageSquare,
    features: ["AI перевод в реальном времени", "Стильный минималистичный UI", "Кроссплатформенность"],
    technologies: ["React", "Node.js", "AI/ML", "WebSocket"],
    color: "from-blue-600 to-purple-600"
  },
  {
    name: "AI PC Store",
    description: "Интернет-магазин продажи кастомных и готовых ПК для AI",
    icon: Monitor,
    features: ["Конфигуратор ПК для AI задач", "Готовые решения", "Консультации экспертов"],
    technologies: ["React", "Next.js", "PostgreSQL", "Stripe"],
    color: "from-emerald-600 to-cyan-600"
  }
];

export function ProjectsSection() {
  return (
    <motion.section 
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="mb-8 sm:mb-12 text-center bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{
            filter: "drop-shadow(0 0 10px rgba(0, 123, 255, 0.8))"
          }}
        >
          <TypewriterText text="Мои проекты" delay={200} />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => {
            const Component = project.link ? motion.a : motion.div;
            const linkProps = project.link ? {
              href: project.link,
              target: "_blank",
              rel: "noopener noreferrer"
            } : {};

            return (
              <Component
                key={index}
                {...linkProps}
                className="group relative p-6 sm:p-8 bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl transition-all duration-500 overflow-hidden cursor-pointer"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  borderColor: "rgba(0, 123, 255, 0.6)",
                  boxShadow: "0 0 40px rgba(0, 123, 255, 0.2)"
                }}
              >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <motion.div
                    className="p-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl mr-4"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      filter: "drop-shadow(0 0 15px rgba(0, 123, 255, 0.6))"
                    }}
                  >
                    <project.icon className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-xl sm:text-2xl text-white mb-1"
                      whileHover={{
                        color: "rgb(96, 165, 250)",
                        filter: "drop-shadow(0 0 5px rgba(96, 165, 250, 0.8))"
                      }}
                    >
                      <TypewriterText text={project.name} delay={400 + index * 300} />
                    </motion.h3>
                  </div>
                </div>

                <motion.p 
                  className="text-white/80 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <TypewriterText 
                    text={project.description} 
                    delay={800 + index * 300} 
                    speed={30}
                  />
                </motion.p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-blue-300 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Особенности
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="text-white/70 text-sm flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.2 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-purple-300 mb-3 flex items-center">
                    <Bot className="w-4 h-4 mr-2" />
                    Технологии
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-xs text-white/80"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + index * 0.2 + techIndex * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(0, 123, 255, 0.2)",
                          borderColor: "rgba(0, 123, 255, 0.5)"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </Component>
          );
          })}
        </div>
      </div>
    </motion.section>
  );
}