import React from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Bot, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function Services() {
  const services = [
    {
      icon: Globe,
      title: 'Website Creation',
      description: 'Modern, responsive websites built with cutting-edge technologies. From landing pages to complex web applications.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'Modern UI/UX'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.',
      features: ['iOS & Android', 'Cross-platform', 'Native Performance', 'App Store Ready'],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Bot,
      title: 'Telegram Bot Creation',
      description: 'Intelligent Telegram bots that automate tasks, enhance user engagement, and streamline business processes.',
      features: ['Custom Commands', 'API Integration', 'Database Support', 'Analytics'],
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-black to-gray-900">
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
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We specialize in creating digital solutions that push the boundaries of innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm h-full overflow-hidden relative">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center  shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400  leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 ">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-gray-300"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Learn More Button */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors group/button"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}