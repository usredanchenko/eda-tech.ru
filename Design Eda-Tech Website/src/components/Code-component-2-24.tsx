import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Award, Rocket } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function History() {
  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded EDA-TECH with a vision to create innovative digital solutions.',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2021',
      title: 'First Major Project',
      description: 'Launched our first major e-commerce platform, establishing our reputation in web development.',
      icon: Award,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      year: '2022',
      title: 'Team Expansion',
      description: 'Grew our team to 10+ developers and designers, expanding our capabilities in mobile development.',
      icon: Users,
      color: 'from-green-500 to-teal-500'
    },
    {
      year: '2023',
      title: 'EDA-Computers Launch',
      description: 'Successfully launched EDA-Computers.ru and its Telegram bot, revolutionizing PC building experience.',
      icon: Calendar,
      color: 'from-orange-500 to-red-500'
    },
    {
      year: '2024',
      title: 'Staya Messenger',
      description: 'Released Staya Messenger, our flagship product that showcases our expertise in real-time communication.',
      icon: Award,
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '50+', gradient: 'from-purple-500 to-pink-500' },
    { label: 'Happy Clients', value: '30+', gradient: 'from-cyan-500 to-blue-500' },
    { label: 'Years of Experience', value: '4+', gradient: 'from-green-500 to-teal-500' },
    { label: 'Team Members', value: '15+', gradient: 'from-orange-500 to-red-500' }
  ];

  return (
    <section id="history" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold ">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From a small startup to a leading software development studio - here's our story
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
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
                <CardContent className="p-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 opacity-30"></div>

          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="group"
                    >
                      <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm group-hover:border-purple-500/50 transition-colors">
                        <CardContent className="p-6">
                          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`w-10 h-10 rounded-xl bg-gradient-to-r ${milestone.color} flex items-center justify-center`}
                            >
                              <IconComponent className="w-5 h-5 text-white" />
                            </motion.div>
                            <div className={`text-2xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                              {milestone.year}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-400 leading-relaxed">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2 }}
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${milestone.color} shadow-lg border-4 border-black`}
                    ></motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-white mb-4">What's Next?</h3>
              <p className="text-gray-300 text-lg  max-w-3xl mx-auto">
                We're continuously evolving, exploring new technologies like AI, blockchain, and AR/VR 
                to deliver even more innovative solutions for our clients.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all shadow-lg shadow-purple-500/25"
              >
                Join Our Journey
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}