import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Award, Rocket } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../hooks/useLanguage';

export function History() {
  const { t } = useLanguage();
  
  const milestones = [
    {
      year: '2020',
      title: t('history.2020.title.text'),
      description: t('history.2020.description.text'),
      icon: Rocket,
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2021',
      title: t('history.2021.title.text'),
      description: t('history.2021.description.text'),
      icon: Award,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      year: '2022',
      title: t('history.2022.title.text'),
      description: t('history.2022.description.text'),
      icon: Users,
      color: 'from-green-500 to-teal-500'
    },
    {
      year: '2023',
      title: t('history.2023.title.text'),
      description: t('history.2023.description.text'),
      icon: Calendar,
      color: 'from-orange-500 to-red-500'
    },
    {
      year: '2024',
      title: t('history.2024.title.text'),
      description: t('history.2024.description.text'),
      icon: Award,
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const stats = [
    { label: t('history.stat.projects'), value: '50+', gradient: 'from-purple-500 to-pink-500' },
    { label: t('history.stat.clients'), value: '30+', gradient: 'from-cyan-500 to-blue-500' },
    { label: t('history.stat.experience'), value: '4+', gradient: 'from-green-500 to-teal-500' },
    { label: t('history.stat.team'), value: '15+', gradient: 'from-orange-500 to-red-500' }
  ];

  return (
    <section id="history" className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {t('history.title')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 md:px-0">
            {t('history.subtitle')}
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm text-center">
                <CardContent className="p-4 md:p-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-sm md:text-base text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative overflow-hidden">
          {/* Timeline Line - Hidden on mobile, shown on desktop */}
          <div className="hidden md:block absolute md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 opacity-30"></div>

          <div className="space-y-16 md:space-y-20 px-2 md:px-0">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center md:${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content - Mobile: full width without timeline, Desktop: alternating */}
                  <div className={`w-full md:w-5/12 mx-4 md:ml-0 md:mr-0 ${isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="group"
                    >
                      <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm group-hover:border-purple-500/50 transition-colors shadow-xl">
                        <CardContent className="p-5 md:p-6">
                          <div className={`flex items-center gap-3 mb-4 justify-start ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${milestone.color} flex items-center justify-center shadow-lg`}
                            >
                              <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </motion.div>
                            <div className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                              {milestone.year}
                            </div>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                            {milestone.title}
                          </h3>
                          <p className="text-sm md:text-base text-gray-400 leading-relaxed line-height-loose">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Timeline Node - Hidden on mobile, shown on desktop */}
                  <div className="hidden md:relative md:left-0 md:top-0 md:z-10 md:flex md:items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2 }}
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${milestone.color} shadow-lg border-4 border-black`}
                    ></motion.div>
                  </div>

                  {/* Spacer - Hidden on mobile, shown on desktop */}
                  <div className="hidden md:block md:w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}