import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, MessageCircle, Monitor, Bot } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../hooks/useLanguage';

export function Portfolio() {
  const { t } = useLanguage();

  const projects = [
    {
      title: 'Staya Messenger',
      description: t('portfolio.staya.description'),
      image: '/d675d636571ac335da915bc1c19be977c129f28e.png',
      icon: MessageCircle,
      tags: ['React Native', 'WebRTC', 'Node.js', 'Socket.io', 'Encryption'],
      gradient: 'from-purple-600 to-pink-600',
      status: t('portfolio.status.live'),
      year: '2024'
    },
    {
      title: 'EDA-Computers.ru',
      description: t('portfolio.computers.description'),
      image: '/d675d636571ac335da915bc1c19be977c129f28e.png',
      icon: Monitor,
      tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
      gradient: 'from-cyan-600 to-blue-600',
      status: t('portfolio.status.live'),
      year: '2023',
      link: 'https://eda-computers.ru'
    },
    {
      title: 'EDA-Computers Telegram Bot',
      description: t('portfolio.bot.description'),
      image: '/d675d636571ac335da915bc1c19be977c129f28e.png',
      icon: Bot,
      tags: ['Python', 'Telegram API', 'PostgreSQL', 'Redis', 'AI'],
      gradient: 'from-green-600 to-teal-600',
      status: t('portfolio.status.live'),
      year: '2023'
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t('portfolio.title')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 md:px-0">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ y: 50, opacity: 0, rotateY: 45 }}
                whileInView={{ y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, rotateY: -5 }}
                className="group perspective-1000"
              >
                <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm overflow-hidden h-full transform-gpu transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20 mx-4 md:mx-0">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-90`}></div>
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${project.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Title and Year */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full border border-gray-700/50 hover:border-purple-500/50 transition-colors"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.link && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all touch-manipulation text-sm md:text-base"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('portfolio.visit')}
                        </motion.button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-3 min-h-[44px] min-w-[44px] border border-gray-600 text-gray-400 rounded-lg hover:border-purple-500 hover:text-purple-400 transition-all touch-manipulation flex items-center justify-center"
                      >
                        <Github className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* More Projects CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400">{t('portfolio.more.text')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all shadow-lg shadow-purple-500/25"
          >
            {t('portfolio.more.button')}
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}