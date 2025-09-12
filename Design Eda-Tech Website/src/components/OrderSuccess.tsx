import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../hooks/useLanguage';

interface OrderSuccessProps {
  onBack: () => void;
}

export function OrderSuccess({ onBack }: OrderSuccessProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center py-24">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-12">
              {/* Animated Checkmark */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  type: "spring", 
                  stiffness: 150, 
                  damping: 10 
                }}
                className="mb-8"
              >
                <div className="relative mx-auto w-32 h-32">
                  {/* Outer Ring Animation */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-20"
                  />
                  
                  {/* Middle Ring */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 0.8, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute inset-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-40"
                  />
                  
                  {/* Inner Circle with Checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.5,
                      type: "spring", 
                      stiffness: 200 
                    }}
                    className="absolute inset-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/50"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <Check className="w-12 h-12 text-white" strokeWidth={3} />
                    </motion.div>
                  </motion.div>

                  {/* Sparkle Effects */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: 360 }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4"
                  >
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: -360 }}
                    transition={{ duration: 3, delay: 1.2, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-4 -left-4"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {t('success.title')}
                  </span>
                </h1>
                <p className="text-xl text-gray-300">
                  {t('success.subtitle')}
                </p>
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-8"
              >
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-400" />
                    {t('success.next.title')}
                  </h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.0 }}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5"
                      >
                        <span className="text-white text-xs font-bold">1</span>
                      </motion.div>
                      <p className="text-gray-300">{t('success.step1')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5"
                      >
                        <span className="text-white text-xs font-bold">2</span>
                      </motion.div>
                      <p className="text-gray-300">{t('success.step2')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.4 }}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5"
                      >
                        <span className="text-white text-xs font-bold">3</span>
                      </motion.div>
                      <p className="text-gray-300">{t('success.step3')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={onBack}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3"
                  >
                    {t('success.button.home')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400 px-4 md:px-8 py-4 min-h-[60px] w-full sm:w-auto touch-manipulation text-xs md:text-sm overflow-hidden leading-tight"
                    asChild
                  >
                    <a href="https://t.me/eda_tech">
                      <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 flex-shrink-0" />
                      {t('success.button.telegram')}
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Floating Particles */}
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    y: [0, -100, -200],
                    x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100]
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: 1.5 + i * 0.2, 
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: '50%'
                  }}
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                    i % 3 === 0 ? 'from-green-400 to-emerald-400' :
                    i % 3 === 1 ? 'from-purple-400 to-pink-400' :
                    'from-cyan-400 to-blue-400'
                  }`} />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}