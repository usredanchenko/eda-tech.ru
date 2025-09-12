import React from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Bot, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../hooks/useLanguage';

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Globe,
      title: t('services.website.title'),
      description: t('services.website.description'),
      features: [t('services.website.features.responsive'), t('services.website.features.seo'), t('services.website.features.performance'), t('services.website.features.ui')],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Smartphone,
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      features: [t('services.mobile.features.ios'), t('services.mobile.features.cross'), t('services.mobile.features.native'), t('services.mobile.features.store')],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Bot,
      title: t('services.bot.title'),
      description: t('services.bot.description'),
      features: [t('services.bot.features.commands'), t('services.bot.features.api'), t('services.bot.features.database'), t('services.bot.features.analytics')],
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
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {t('services.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('services.subtitle')}
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
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 md:mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-gray-300 text-sm md:text-base"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-2 md:mr-3`}></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Learn More Button */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors group/button touch-manipulation min-h-[44px] text-sm md:text-base"
                    >
                      {t('services.learn.more')}
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