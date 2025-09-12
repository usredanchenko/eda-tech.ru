import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, CheckCircle, AlertCircle, Sparkles, Code, Smartphone, Bot, Globe, Calendar, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { OrderSuccess } from './OrderSuccess';
import { useLanguage } from '../hooks/useLanguage';

interface OrderFormProps {
  onBack: () => void;
}

export function OrderForm({ onBack }: OrderFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    company: '',
    
    // Project Details
    projectType: '',
    projectTitle: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    
    // Features
    features: [] as string[],
    additionalServices: [] as string[],
    
    // Technical Requirements
    platforms: [] as string[],
    integrations: [] as string[],
    designPreferences: '',
    
    // Additional Info
    existingAssets: '',
    inspiration: '',
    additionalNotes: ''
  });

  const totalSteps = 4;

  const projectTypes = [
    {
      id: 'website',
      title: t('order.project.website'),
      description: t('order.project.website.description'),
      icon: Globe,
      gradient: 'from-purple-500 to-pink-500',
      basePrice: t('order.project.from') + ' ₽200,000'
    },
    {
      id: 'mobile',
      title: t('order.project.mobile'),
      description: t('order.project.mobile.description'),
      icon: Smartphone,
      gradient: 'from-cyan-500 to-blue-500',
      basePrice: t('order.project.from') + ' ₽500,000'
    },
    {
      id: 'telegram',
      title: t('order.project.telegram'),
      description: t('order.project.telegram.description'),
      icon: Bot,
      gradient: 'from-green-500 to-teal-500',
      basePrice: t('order.project.from') + ' ₽100,000'
    },
    {
      id: 'custom',
      title: t('order.project.custom'),
      description: t('order.project.custom.description'),
      icon: Code,
      gradient: 'from-orange-500 to-red-500',
      basePrice: t('order.project.quote')
    }
  ];

  const budgetRanges = [
    { value: '1000-3000', label: t('order.budget.1000-3000') },
    { value: '3000-7000', label: t('order.budget.3000-7000') },
    { value: '7000-15000', label: t('order.budget.7000-15000') },
    { value: '15000+', label: t('order.budget.15000+') },
    { value: 'discuss', label: t('order.budget.discuss') }
  ];

  const timelineOptions = [
    { value: '1-2weeks', label: t('order.timeline.1-2weeks') },
    { value: '1month', label: t('order.timeline.1month') },
    { value: '2-3months', label: t('order.timeline.2-3months') },
    { value: '3-6months', label: t('order.timeline.3-6months') },
    { value: '6months+', label: t('order.timeline.6months+') }
  ];

  const commonFeatures = [
    t('feature.auth'), t('feature.payment'), t('feature.admin'), t('feature.api'),
    t('feature.realtime'), t('feature.notifications'), t('feature.analytics'), t('feature.multilang'),
    t('feature.seo'), t('feature.social'), t('feature.upload'), t('feature.search')
  ];

  const additionalServices = [
    t('service.design'), t('service.branding'), t('service.content'), t('service.seo'),
    t('service.hosting'), t('service.maintenance'), t('service.training'), t('service.documentation')
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Временно имитируем успешную отправку
      // TODO: Настроить Telegram бот API на сервере
      console.log('📝 Данные заявки:', formData);
      
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('✅ Заявка обработана (демо режим)');
      setIsSubmitted(true);
    } catch (error) {
      console.error('❌ Ошибка:', error);
      alert('Ошибка обработки заявки. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(item)
        ? (prev[field as keyof typeof prev] as string[]).filter(i => i !== item)
        : [...(prev[field as keyof typeof prev] as string[]), item]
    }));
  };

  // Show success animation if submitted
  if (isSubmitted) {
    return <OrderSuccess onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('order.back')}</span>
            </motion.button>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-400 mb-1">{t('order.step')} {currentStep} {t('order.of')} {totalSteps}</div>
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    i + 1 <= currentStep
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm max-w-4xl mx-auto mx-4 md:mx-auto">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {t('order.title')}
                  </span>
                </CardTitle>
                <p className="text-gray-400 text-base md:text-lg">
                  {t('order.subtitle')}
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="px-4 md:px-8 pb-6 md:pb-8">
              {/* Step 1: Project Type */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="text-center md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t('order.step1.title')}</h3>
                    <p className="text-sm md:text-base text-gray-400">{t('order.step1.subtitle')}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {projectTypes.map((type, index) => {
                      const IconComponent = type.icon;
                      const isSelected = formData.projectType === type.id;
                      
                      return (
                        <motion.div
                          key={type.id}
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          onClick={() => updateFormData('projectType', type.id)}
                          className={`cursor-pointer rounded-xl border-2 transition-all duration-300 touch-manipulation ${
                            isSelected
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                          }`}
                        >
                          <div className="p-4 md:p-6">
                            <div className="flex items-start space-x-4">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${type.gradient} flex items-center justify-center flex-shrink-0`}
                              >
                                <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                              </motion.div>
                              <div className="flex-1">
                                <h4 className="text-base md:text-lg font-semibold text-white mb-1">{type.title}</h4>
                                <p className="text-sm md:text-base text-gray-400 mb-2 md:mb-3">{type.description}</p>
                                <Badge variant="secondary" className="bg-gray-700/50 text-gray-300 text-xs md:text-sm">
                                  {type.basePrice}
                                </Badge>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="text-purple-400"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="text-center md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t('order.step2.title')}</h3>
                    <p className="text-sm md:text-base text-gray-400">{t('order.step2.subtitle')}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-white text-sm md:text-base">{t('order.form.fullName')} *</Label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) => updateFormData('fullName', e.target.value)}
                        placeholder={t('order.form.fullName.placeholder')}
                        className="bg-gray-800/50 border-gray-600 text-white h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-white text-sm md:text-base">{t('order.form.email')} *</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder={t('order.form.email.placeholder')}
                        className="bg-gray-800/50 border-gray-600 text-white h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-white text-sm md:text-base">{t('order.form.phone')}</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder={t('order.form.phone.placeholder')}
                        className="bg-gray-800/50 border-gray-600 text-white h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-white text-sm md:text-base">{t('order.form.company')}</Label>
                      <Input
                        value={formData.company}
                        onChange={(e) => updateFormData('company', e.target.value)}
                        placeholder={t('order.form.company.placeholder')}
                        className="bg-gray-800/50 border-gray-600 text-white h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-white text-sm md:text-base">{t('order.form.projectTitle')} *</Label>
                    <Input
                      value={formData.projectTitle}
                      onChange={(e) => updateFormData('projectTitle', e.target.value)}
                      placeholder={t('order.form.projectTitle.placeholder')}
                      className="bg-gray-800/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-white text-sm md:text-base">{t('order.form.projectDescription')} *</Label>
                    <Textarea
                      value={formData.projectDescription}
                      onChange={(e) => updateFormData('projectDescription', e.target.value)}
                      placeholder={t('order.form.projectDescription.placeholder')}
                      rows={4}
                      className="bg-gray-800/50 border-gray-600 text-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-white text-sm md:text-base">{t('order.form.budget')}</Label>
                      <Select value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder={t('order.form.budget.placeholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {budgetRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value} className="text-white hover:bg-gray-700">
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-white text-sm md:text-base">{t('order.form.timeline')}</Label>
                      <Select value={formData.timeline} onValueChange={(value) => updateFormData('timeline', value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder={t('order.form.timeline.placeholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {timelineOptions.map((timeline) => (
                            <SelectItem key={timeline.value} value={timeline.value} className="text-white hover:bg-gray-700">
                              {timeline.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Features & Services */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="text-center md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t('order.step3.title')}</h3>
                    <p className="text-gray-400 text-sm md:text-base">{t('order.step3.subtitle')}</p>
                  </div>

                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">{t('order.features.title')}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                      {commonFeatures.map((feature) => (
                        <motion.label
                          key={feature}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg border cursor-pointer transition-colors ${
                            formData.features.includes(feature)
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                          }`}
                        >
                          <Checkbox
                            checked={formData.features.includes(feature)}
                            onCheckedChange={() => toggleArrayItem('features', feature)}
                            className="border-gray-500 data-[state=checked]:bg-purple-500"
                          />
                          <span className="text-white text-xs md:text-sm leading-tight">{feature}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">{t('order.services.title')}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                      {additionalServices.map((service) => (
                        <motion.label
                          key={service}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg border cursor-pointer transition-colors ${
                            formData.additionalServices.includes(service)
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                          }`}
                        >
                          <Checkbox
                            checked={formData.additionalServices.includes(service)}
                            onCheckedChange={() => toggleArrayItem('additionalServices', service)}
                            className="border-gray-500 data-[state=checked]:bg-cyan-500"
                          />
                          <span className="text-white text-xs md:text-sm leading-tight">{service}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-white text-sm md:text-base">{t('order.form.designPreferences')}</Label>
                    <Textarea
                      value={formData.designPreferences}
                      onChange={(e) => updateFormData('designPreferences', e.target.value)}
                      placeholder={t('order.form.designPreferences.placeholder')}
                      rows={3}
                      className="bg-gray-800/50 border-gray-600 text-white resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Final Details */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t('order.step4.title')}</h3>
                    <p className="text-gray-400">{t('order.step4.subtitle')}</p>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-white text-sm md:text-base">{t('order.form.existingAssets')}</Label>
                    <Textarea
                      value={formData.existingAssets}
                      onChange={(e) => updateFormData('existingAssets', e.target.value)}
                      placeholder={t('order.form.existingAssets.placeholder')}
                      rows={3}
                      className="bg-gray-800/50 border-gray-600 text-white resize-none"
                    />
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-white text-sm md:text-base">{t('order.form.inspiration')}</Label>
                    <Textarea
                      value={formData.inspiration}
                      onChange={(e) => updateFormData('inspiration', e.target.value)}
                      placeholder={t('order.form.inspiration.placeholder')}
                      rows={3}
                      className="bg-gray-800/50 border-gray-600 text-white resize-none"
                    />
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-white text-sm md:text-base">{t('order.form.additionalNotes')}</Label>
                    <Textarea
                      value={formData.additionalNotes}
                      onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                      placeholder={t('order.form.additionalNotes.placeholder')}
                      rows={3}
                      className="bg-gray-800/50 border-gray-600 text-white resize-none"
                    />
                  </div>

                  {/* Summary Card */}
                  <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-purple-500/30">
                    <CardContent className="p-6">
                      <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
{t('order.summary.title')}
                      </h4>
                      <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">{t('order.summary.projectType')}</span>
                          <span className="text-white">{projectTypes.find(pt => pt.id === formData.projectType)?.title || t('order.summary.notSelected')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{t('order.summary.budget')}</span>
                          <span className="text-white">{budgetRanges.find(b => b.value === formData.budget)?.label || t('order.summary.notSpecified')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{t('order.summary.timeline')}</span>
                          <span className="text-white">{timelineOptions.find(to => to.value === formData.timeline)?.label || t('order.summary.notSpecified')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{t('order.summary.features')}</span>
                          <span className="text-white">{formData.features.length} {t('order.summary.selected')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{t('order.summary.services')}</span>
                          <span className="text-white">{formData.additionalServices.length} {t('order.summary.selected')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between pt-6 md:pt-8 mt-6 md:mt-8 border-t border-gray-700 gap-3 sm:gap-0">
                <div>
                  {currentStep > 1 && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handlePrev}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 min-h-[48px] px-6 w-full sm:w-auto touch-manipulation text-base"
                      >
{t('order.button.previous')}
                      </Button>
                    </motion.div>
                  )}
                </div>
                
                <div>
                  {currentStep < totalSteps ? (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleNext}
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 min-h-[48px] px-6 w-full sm:w-auto touch-manipulation text-base"
                        disabled={currentStep === 1 && !formData.projectType}
                      >
{t('order.button.next')}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 min-h-[48px] px-6 w-full sm:w-auto touch-manipulation text-base"
                        disabled={!formData.fullName || !formData.email || !formData.projectTitle || !formData.projectDescription || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Отправляем в Telegram...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            {t('order.button.submit')}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">{t('contact.help')}</p>
          <div className="flex justify-center space-x-6">
            <a href="https://t.me/eda_tech" className="text-purple-400 hover:text-purple-300 transition-colors">
              {t('contact.telegram.link')}
            </a>
            <a href="mailto:hello@eda-tech.dev" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              {t('contact.email.link')}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}