import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.history': 'History',
    'nav.contact': 'Contact',
    'nav.account': 'Account',

    // Hero
    'hero.subtitle': 'Software Development Studio crafting cutting-edge digital solutions',
    'hero.services.websites': 'Website Creation',
    'hero.services.mobile': 'Mobile App Development',
    'hero.services.bots': 'Telegram Bot Creation',
    'hero.cta.start': 'Start Your Project',
    'hero.cta.portfolio': 'View Portfolio',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'We specialize in creating digital solutions that push the boundaries of innovation',
    'services.website.title': 'Website Creation',
    'services.website.description': 'Modern, responsive websites built with cutting-edge technologies. From landing pages to complex web applications.',
    'services.website.features.responsive': 'Responsive Design',
    'services.website.features.seo': 'SEO Optimized',
    'services.website.features.performance': 'Fast Performance',
    'services.website.features.ui': 'Modern UI/UX',
    'services.mobile.title': 'Mobile App Development',
    'services.mobile.description': 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.',
    'services.mobile.features.ios': 'iOS & Android',
    'services.mobile.features.cross': 'Cross-platform',
    'services.mobile.features.native': 'Native Performance',
    'services.mobile.features.store': 'App Store Ready',
    'services.bot.title': 'Telegram Bot Creation',
    'services.bot.description': 'Intelligent Telegram bots that automate tasks, enhance user engagement, and streamline business processes.',
    'services.bot.features.commands': 'Custom Commands',
    'services.bot.features.api': 'API Integration',
    'services.bot.features.database': 'Database Support',
    'services.bot.features.analytics': 'Analytics',
    'services.learn.more': 'Learn More',

    // Portfolio
    'portfolio.title': 'Our Portfolio',
    'portfolio.subtitle': 'Discover our latest projects that showcase innovation, creativity, and technical excellence',
    'portfolio.staya.description': 'A modern, secure messaging platform with end-to-end encryption, real-time communication, and advanced features for both personal and business use.',
    'portfolio.computers.description': 'E-commerce platform for custom PC building and selling. Features advanced configurator, real-time pricing, and comprehensive component database.',
    'portfolio.bot.description': 'Intelligent Telegram bot for EDA-Computers that helps customers configure PCs, check prices, and manage orders directly through Telegram.',
    'portfolio.status.live': 'Live',
    'portfolio.visit': 'Visit Site',
    'portfolio.more.text': 'Want to see more of our work?',
    'portfolio.more.button': 'View All Projects',

    // History
    'history.title': 'Our Journey',
    'history.subtitle': 'From a small startup to a leading software development studio - here\'s our story',
    'history.stats.projects': 'Projects Completed',
    'history.stats.clients': 'Happy Clients',
    'history.stats.experience': 'Years of Experience',
    'history.stats.team': 'Team Members',
    'history.2020.title': 'The Beginning',
    'history.2020.description': 'Founded EDA-TECH with a vision to create innovative digital solutions.',
    'history.2021.title': 'First Major Project',
    'history.2021.description': 'Launched our first major e-commerce platform, establishing our reputation in web development.',
    'history.2022.title': 'Team Expansion',
    'history.2022.description': 'Grew our team to 10+ developers and designers, expanding our capabilities in mobile development.',
    'history.2023.title': 'EDA-Computers Launch',
    'history.2023.description': 'Successfully launched EDA-Computers.ru and its Telegram bot, revolutionizing PC building experience.',
    'history.2024.title': 'Staya Messenger',
    'history.2024.description': 'Released Staya Messenger, our flagship product that showcases our expertise in real-time communication.',
    'history.future.title': 'What\'s Next?',
    'history.future.description': 'We\'re continuously evolving, exploring new technologies like AI, blockchain, and AR/VR to deliver even more innovative solutions for our clients.',
    'history.future.button': 'Join Our Journey',

    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to start your next project? Let\'s discuss how we can bring your ideas to life',
    'contact.form.title': 'Send us a message',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Tell us about your project...',
    'contact.form.send': 'Send Message',
    'contact.reach.title': 'Reach us directly',
    'contact.telegram.title': 'Telegram',
    'contact.telegram.description': 'Chat with us instantly',
    'contact.staya.title': 'Staya Messenger',
    'contact.staya.description': 'Connect via our own platform',
    'contact.email.title': 'Email',
    'contact.email.description': 'Send us a detailed message',
    'contact.phone.title': 'Phone',
    'contact.phone.description': 'Call us directly',
    'contact.office.title': 'Our Office',
    'contact.office.description': 'Remote-first, Global reach',
    'contact.office.available': 'Available worldwide',
    'contact.cta.title': 'Ready to innovate?',
    'contact.cta.description': 'Let\'s turn your vision into reality. Contact us today and let\'s build something amazing together.',
    'contact.cta.start': 'Start a Project',
    'contact.cta.call': 'Schedule a Call',
    'contact.help': 'Need help with your request?',
    'contact.telegram.link': 'Contact us on Telegram',
    'contact.email.link': 'Send us an email',

    // Footer
    'footer.description': 'We are a software development studio passionate about creating innovative digital solutions that transform businesses and enhance user experiences.',
    'footer.links.title': 'Quick Links',
    'footer.services.title': 'Services',
    'footer.services.website': 'Website Development',
    'footer.services.mobile': 'Mobile Apps',
    'footer.services.bots': 'Telegram Bots',
    'footer.services.custom': 'Custom Solutions',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with',
    'footer.by': 'by EDA-TECH',

    // Order Form
    'order.title': 'Start Your Project',
    'order.subtitle': 'Let\'s bring your digital vision to life',
    'order.step': 'Step',
    'order.of': 'of',
    'order.back': 'Back to Home',
    'order.step1.title': 'What do you want to build?',
    'order.step1.subtitle': 'Choose the type of project you need',
    'order.project.website': 'Website Development',
    'order.project.website.description': 'Modern, responsive websites',
    'order.project.mobile': 'Mobile App',
    'order.project.mobile.description': 'iOS & Android applications',
    'order.project.telegram': 'Telegram Bot',
    'order.project.telegram.description': 'Intelligent automation bots',
    'order.project.custom': 'Custom Solution',
    'order.project.custom.description': 'Tailored software development',
    'order.project.from': 'From',
    'order.project.quote': 'Custom Quote',
    'order.step2.title': 'Tell us about your project',
    'order.step2.subtitle': 'Provide details so we can understand your needs',
    'order.form.fullName': 'Full Name',
    'order.form.email': 'Email',
    'order.form.phone': 'Phone',
    'order.form.company': 'Company',
    'order.form.projectTitle': 'Project Title',
    'order.form.projectDescription': 'Project Description',
    'order.form.projectDescription.placeholder': 'Describe your project, its goals, target audience, and key features...',
    'order.form.budget': 'Budget Range',
    'order.form.budget.placeholder': 'Select budget range',
    'order.form.timeline': 'Timeline',
    'order.form.timeline.placeholder': 'Select timeline',
    'order.budget.1000-3000': '₽100,000 - ₽300,000',
    'order.budget.3000-7000': '₽300,000 - ₽700,000',
    'order.budget.7000-15000': '₽700,000 - ₽1,500,000',
    'order.budget.15000+': '₽1,500,000+',
    'order.budget.discuss': 'Let\'s discuss',
    'order.timeline.1-2weeks': '1-2 weeks',
    'order.timeline.1month': '1 month',
    'order.timeline.2-3months': '2-3 months',
    'order.timeline.3-6months': '3-6 months',
    'order.timeline.6months+': '6+ months',
    'order.step3.title': 'Features & Services',
    'order.step3.subtitle': 'Select the features and services you need',
    'order.features.title': 'Required Features',
    'order.services.title': 'Additional Services',
    'order.form.designPreferences': 'Design Preferences',
    'order.form.designPreferences.placeholder': 'Describe your design preferences, color schemes, style inspiration...',
    'order.step4.title': 'Almost Done!',
    'order.step4.subtitle': 'Final details to complete your request',
    'order.form.existingAssets': 'Existing Assets',
    'order.form.existingAssets.placeholder': 'Do you have existing logos, brand guidelines, content, or other assets we should know about?',
    'order.form.inspiration': 'Inspiration & References',
    'order.form.inspiration.placeholder': 'Share any websites, apps, or designs that inspire you. Include URLs if possible.',
    'order.form.additionalNotes': 'Additional Notes',
    'order.form.additionalNotes.placeholder': 'Anything else you\'d like us to know about your project?',
    'order.summary.title': 'Order Summary',
    'order.summary.projectType': 'Project Type:',
    'order.summary.budget': 'Budget Range:',
    'order.summary.timeline': 'Timeline:',
    'order.summary.features': 'Features:',
    'order.summary.services': 'Additional Services:',
    'order.summary.selected': 'selected',
    'order.summary.notSelected': 'Not selected',
    'order.summary.notSpecified': 'Not specified',
    'order.button.previous': 'Previous',
    'order.button.next': 'Next Step',
    'order.button.submit': 'Submit Request',

    // Order Success
    'success.title': 'Order Submitted!',
    'success.subtitle': 'Thank you for choosing EDA-TECH! Your project request has been successfully submitted.',
    'success.next.title': 'What happens next?',
    'success.step1': 'We\'ll review your project details within 2-4 hours',
    'success.step2': 'Our team will contact you to discuss project details',
    'success.step3': 'We\'ll provide a detailed proposal and timeline',
    'success.button.home': 'Back to Home',
    'success.button.telegram': 'Contact us on Telegram',

    // Features
    'feature.auth': 'User Authentication',
    'feature.payment': 'Payment Integration',
    'feature.admin': 'Admin Dashboard',
    'feature.api': 'API Integration',
    'feature.realtime': 'Real-time Updates',
    'feature.notifications': 'Push Notifications',
    'feature.analytics': 'Analytics',
    'feature.multilang': 'Multi-language Support',
    'feature.seo': 'SEO Optimization',
    'feature.social': 'Social Media Integration',
    'feature.upload': 'File Upload',
    'feature.search': 'Search Functionality',

    // Additional Services
    'service.design': 'UI/UX Design',
    'service.branding': 'Branding & Logo',
    'service.content': 'Content Creation',
    'service.seo': 'SEO Setup',
    'service.hosting': 'Hosting & Deployment',
    'service.maintenance': 'Maintenance & Support',
    'service.training': 'Training',
    'service.documentation': 'Documentation',

    // Contact Methods
    'contact.method.telegram.chat': 'Chat with us instantly',
    'contact.method.staya.connect': 'Connect via our own platform',
    'contact.method.email.send': 'Send us a detailed message',
    'contact.method.phone.call': 'Call us directly',

    // Footer Links
    'footer.links.services': 'Services',
    'footer.links.portfolio': 'Portfolio',
    'footer.links.history': 'History',
    'footer.links.contact': 'Contact',

    // Footer Services
    'footer.service.website': 'Website Development',
    'footer.service.mobile': 'Mobile Apps',
    'footer.service.bots': 'Telegram Bots',
    'footer.service.custom': 'Custom Solutions',

    // History Milestones
    'history.2020.title.text': 'The Beginning',
    'history.2020.description.text': 'Founded EDA-TECH with a vision to create innovative digital solutions.',
    'history.2021.title.text': 'First Major Project',
    'history.2021.description.text': 'Launched our first major e-commerce platform, establishing our reputation in web development.',
    'history.2022.title.text': 'Team Expansion',
    'history.2022.description.text': 'Grew our team to 10+ developers and designers, expanding our capabilities in mobile development.',
    'history.2023.title.text': 'EDA-Computers Launch',
    'history.2023.description.text': 'Successfully launched EDA-Computers.ru and its Telegram bot, revolutionizing PC building experience.',
    'history.2024.title.text': 'Staya Messenger',
    'history.2024.description.text': 'Released Staya Messenger, our flagship product that showcases our expertise in real-time communication.',

    // History Stats
    'history.stat.projects': 'Projects Completed',
    'history.stat.clients': 'Happy Clients',
    'history.stat.experience': 'Years of Experience',
    'history.stat.team': 'Team Members',

    // Order Form Step 2 placeholders
    'order.form.fullName.placeholder': 'John Doe',
    'order.form.email.placeholder': 'john@example.com',
    'order.form.phone.placeholder': '+1 (555) 123-4567',
    'order.form.company.placeholder': 'Your Company',
    'order.form.projectTitle.placeholder': 'My Awesome Project',
  },
  ru: {
    // Header
    'nav.services': 'Услуги',
    'nav.portfolio': 'Портфолио',
    'nav.history': 'История',
    'nav.contact': 'Контакты',
    'nav.account': 'Аккаунт',

    // Hero
    'hero.subtitle': 'Студия разработки современных IT-решений для российского бизнеса',
    'hero.services.websites': 'Создание веб-сайтов',
    'hero.services.mobile': 'Разработка мобильных приложений',
    'hero.services.bots': 'Создание Telegram ботов',
    'hero.cta.start': 'Начать проект',
    'hero.cta.portfolio': 'Смотреть портфолио',

    // Services
    'services.title': 'Наши услуги',
    'services.subtitle': 'Мы специализируемся на создании цифровых решений, которые раздвигают границы инноваций',
    'services.website.title': 'Создание веб-сайтов',
    'services.website.description': 'Современные, адаптивные веб-сайты с интеграцией российских платежных систем и соответствием требованиям 152-ФЗ. От лендингов до сложных веб-приложений с НДС.',
    'services.website.features.responsive': 'Адаптивный дизайн',
    'services.website.features.seo': 'SEO оптимизация',
    'services.website.features.performance': 'Высокая производительность',
    'services.website.features.ui': 'Современный UI/UX',
    'services.mobile.title': 'Разработка мобильных приложений',
    'services.mobile.description': 'Нативные и кроссплатформенные мобильные приложения, которые обеспечивают исключительный пользовательский опыт на всех устройствах.',
    'services.mobile.features.ios': 'iOS и Android',
    'services.mobile.features.cross': 'Кроссплатформенность',
    'services.mobile.features.native': 'Нативная производительность',
    'services.mobile.features.store': 'Готовность к App Store',
    'services.bot.title': 'Создание Telegram ботов',
    'services.bot.description': 'Интеллектуальные Telegram боты с интеграцией российских API и банков. Автоматизируют задачи, принимают платежи и соответствуют российскому законодательству.',
    'services.bot.features.commands': 'Пользовательские команды',
    'services.bot.features.api': 'Интеграция с API',
    'services.bot.features.database': 'Поддержка баз данных',
    'services.bot.features.analytics': 'Аналитика',
    'services.learn.more': 'Узнать больше',

    // Portfolio
    'portfolio.title': 'Наше портфолио',
    'portfolio.subtitle': 'Успешные проекты для российских компаний: от стартапов до крупного бизнеса с соблюдением всех требований законодательства РФ',
    'portfolio.staya.description': 'Современная, безопасная платформа для обмена сообщениями со сквозным шифрованием, общением в реальном времени и расширенными функциями для личного и делового использования.',
    'portfolio.computers.description': 'Российская платформа электронной коммерции для сборки ПК с интеграцией отечественных платежных систем, учетом НДС и соответствием 54-ФЗ о применении ККТ.',
    'portfolio.bot.description': 'Российский Telegram бот для EDA-Computers с интеграцией отечественных банков, приемом платежей по СБП и автоматическим расчетом НДС для корпоративных клиентов.',
    'portfolio.status.live': 'Работает',
    'portfolio.visit': 'Посетить сайт',
    'portfolio.more.text': 'Хотите увидеть больше наших работ?',
    'portfolio.more.button': 'Смотреть все проекты',

    // History
    'history.title': 'Наш путь',
    'history.subtitle': 'От небольшого стартапа до ведущей студии разработки программного обеспечения — вот наша история',
    'history.stats.projects': 'Проектов завершено',
    'history.stats.clients': 'Довольных клиентов',
    'history.stats.experience': 'Лет опыта',
    'history.stats.team': 'Членов команды',
    'history.2020.title': 'Начало',
    'history.2020.description': 'Основали EDA-TECH с видением создания инновационных цифровых решений.',
    'history.2021.title': 'Первый крупный проект',
    'history.2021.description': 'Запустили нашу первую крупную платформу электронной коммерции, утвердив нашу репутацию в веб-разработке.',
    'history.2022.title': 'Расширение команды',
    'history.2022.description': 'Увеличили нашу команду до 10+ разработчиков и дизайнеров, расширив наши возможности в мобильной разработке.',
    'history.2023.title': 'Запуск EDA-Computers',
    'history.2023.description': 'Успешно запустили EDA-Computers.ru и его Telegram бота, революционизировав опыт сборки ПК.',
    'history.2024.title': 'Staya Messenger',
    'history.2024.description': 'Выпустили Staya Messenger, наш флагманский продукт, демонстрирующий наш опыт в общении в реальном времени.',
    'history.future.title': 'Что дальше?',
    'history.future.description': 'Мы постоянно развиваемся, изучаем новые технологии, такие как ИИ, блокчейн и AR/VR, чтобы предоставлять еще более инновационные решения для наших клиентов.',
    'history.future.button': 'Присоединиться к нашему пути',

    // Contact
    'contact.title': 'Свяжитесь с нами',
    'contact.subtitle': 'Готовы начать ваш следующий проект? Давайте обсудим, как мы можем воплотить ваши идеи в жизнь',
    'contact.form.title': 'Отправьте нам сообщение',
    'contact.form.name': 'Ваше имя',
    'contact.form.email': 'Ваш email',
    'contact.form.subject': 'Тема',
    'contact.form.message': 'Расскажите нам о вашем проекте...',
    'contact.form.send': 'Отправить сообщение',
    'contact.reach.title': 'Свяжитесь с нами напрямую',
    'contact.telegram.title': 'Telegram',
    'contact.telegram.description': 'Пообщайтесь с нами мгновенно',
    'contact.staya.title': 'Staya Messenger',
    'contact.staya.description': 'Подключитесь через нашу собственную платформу',
    'contact.email.title': 'Email',
    'contact.email.description': 'Отправьте нам подробное сообщение',
    'contact.phone.title': 'Телефон',
    'contact.phone.description': 'Позвоните нам напрямую',
    'contact.office.title': 'Наш офис',
    'contact.office.description': 'Работаем с российскими компаниями по МСК',
    'contact.office.available': 'Доступны с 9:00 до 18:00 МСК',
    'contact.cta.title': 'Готовы к инновациям?',
    'contact.cta.description': 'Давайте превратим ваше видение в реальность. Свяжитесь с нами сегодня, и давайте создадим что-то удивительное вместе.',
    'contact.cta.start': 'Начать проект',
    'contact.cta.call': 'Запланировать звонок',
    'contact.help': 'Нужна помощь с вашим запросом?',
    'contact.telegram.link': 'Свяжитесь с нами в Telegram',
    'contact.email.link': 'Отправьте нам email',

    // Footer
    'footer.description': 'Мы — студия разработки программного обеспечения, увлеченная созданием инновационных цифровых решений, которые трансформируют бизнес и улучшают пользовательский опыт.',
    'footer.links.title': 'Быстрые ссылки',
    'footer.services.title': 'Услуги',
    'footer.services.website': 'Разработка веб-сайтов',
    'footer.services.mobile': 'Мобильные приложения',
    'footer.services.bots': 'Telegram боты',
    'footer.services.custom': 'Индивидуальные решения',
    'footer.rights': 'Все права защищены.',
    'footer.made': 'Сделано с',
    'footer.by': 'командой EDA-TECH',

    // Order Form
    'order.title': 'Начните ваш проект',
    'order.subtitle': 'Давайте воплотим ваше цифровое видение в жизнь',
    'order.step': 'Шаг',
    'order.of': 'из',
    'order.back': 'Вернуться на главную',
    'order.step1.title': 'Что вы хотите создать?',
    'order.step1.subtitle': 'Выберите тип проекта, который вам нужен',
    'order.project.website': 'Разработка веб-сайта',
    'order.project.website.description': 'Современные, адаптивные веб-сайты',
    'order.project.mobile': 'Мобильное приложение',
    'order.project.mobile.description': 'iOS и Android приложения',
    'order.project.telegram': 'Telegram бот',
    'order.project.telegram.description': 'Интеллектуальные боты автоматизации',
    'order.project.custom': 'Индивидуальное решение',
    'order.project.custom.description': 'Индивидуальная разработка ПО',
    'order.project.from': 'От',
    'order.project.quote': 'Индивидуальная цена',
    'order.step2.title': 'Расскажите нам о вашем проекте',
    'order.step2.subtitle': 'Предоставьте детали, чтобы мы могли понять ваши потребности',
    'order.form.fullName': 'Полное имя',
    'order.form.email': 'Email',
    'order.form.phone': 'Телефон',
    'order.form.company': 'Компания',
    'order.form.projectTitle': 'Название проекта',
    'order.form.projectDescription': 'Описание проекта',
    'order.form.projectDescription.placeholder': 'Опишите ваш проект, его цели, целевую аудиторию и ключевые функции...',
    'order.form.budget': 'Бюджет',
    'order.form.budget.placeholder': 'Выберите диапазон бюджета',
    'order.form.timeline': 'Временные рамки',
    'order.form.timeline.placeholder': 'Выберите временные рамки',
    'order.budget.1000-3000': '₽100,000 - ₽300,000',
    'order.budget.3000-7000': '₽300,000 - ₽700,000',
    'order.budget.7000-15000': '₽700,000 - ₽1,500,000',
    'order.budget.15000+': '₽1,500,000+',
    'order.budget.discuss': 'Давайте обсудим',
    'order.timeline.1-2weeks': '1-2 недели',
    'order.timeline.1month': '1 месяц',
    'order.timeline.2-3months': '2-3 месяца',
    'order.timeline.3-6months': '3-6 месяцев',
    'order.timeline.6months+': '6+ месяцев',
    'order.step3.title': 'Функции и услуги',
    'order.step3.subtitle': 'Выберите функции и услуги, которые вам нужны',
    'order.features.title': 'Необходимые функции',
    'order.services.title': 'Дополнительные услуги',
    'order.form.designPreferences': 'Дизайнерские предпочтения',
    'order.form.designPreferences.placeholder': 'Опишите ваши дизайнерские предпочтения, цветовые схемы, стилистическое вдохновение...',
    'order.step4.title': 'Почти готово!',
    'order.step4.subtitle': 'Последние детали для завершения вашего запроса',
    'order.form.existingAssets': 'Существующие активы',
    'order.form.existingAssets.placeholder': 'У вас есть существующие логотипы, брендбук, контент или другие активы, о которых нам следует знать?',
    'order.form.inspiration': 'Вдохновение и референсы',
    'order.form.inspiration.placeholder': 'Поделитесь любыми веб-сайтами, приложениями или дизайнами, которые вас вдохновляют. Включите URL, если возможно.',
    'order.form.additionalNotes': 'Дополнительные заметки',
    'order.form.additionalNotes.placeholder': 'Есть ли что-то еще, что вы хотели бы рассказать нам о вашем проекте?',
    'order.summary.title': 'Сводка заказа',
    'order.summary.projectType': 'Тип проекта:',
    'order.summary.budget': 'Бюджет:',
    'order.summary.timeline': 'Временные рамки:',
    'order.summary.features': 'Функции:',
    'order.summary.services': 'Дополнительные услуги:',
    'order.summary.selected': 'выбрано',
    'order.summary.notSelected': 'Не выбрано',
    'order.summary.notSpecified': 'Не указано',
    'order.button.previous': 'Назад',
    'order.button.next': 'Следующий шаг',
    'order.button.submit': 'Отправить запрос',

    // Order Success
    'success.title': 'Заказ отправлен!',
    'success.subtitle': 'Спасибо за выбор EDA-TECH! Ваш запрос на проект был успешно отправлен.',
    'success.next.title': 'Что будет дальше?',
    'success.step1': 'Мы рассмотрим детали вашего проекта в течение 2-4 часов',
    'success.step2': 'Наша команда свяжется с вами для обсуждения деталей проекта',
    'success.step3': 'Мы предоставим подробное предложение и временные рамки',
    'success.button.home': 'Вернуться на главную',
    'success.button.telegram': 'Свяжитесь с нами в Telegram',

    // Features
    'feature.auth': 'Аутентификация пользователей',
    'feature.payment': 'Интеграция платежей',
    'feature.admin': 'Панель администратора',
    'feature.api': 'Интеграция API',
    'feature.realtime': 'Обновления в реальном времени',
    'feature.notifications': 'Push-уведомления',
    'feature.analytics': 'Аналитика',
    'feature.multilang': 'Многоязычная поддержка',
    'feature.seo': 'SEO оптимизация',
    'feature.social': 'Интеграция с соц. сетями',
    'feature.upload': 'Загрузка файлов',
    'feature.search': 'Функция поиска',

    // Additional Services
    'service.design': 'UI/UX дизайн',
    'service.branding': 'Брендинг и логотип',
    'service.content': 'Создание контента',
    'service.seo': 'Настройка SEO',
    'service.hosting': 'Хостинг и развертывание',
    'service.maintenance': 'Поддержка и обслуживание',
    'service.training': 'Обучение',
    'service.documentation': 'Документация',

    // Contact Methods
    'contact.method.telegram.chat': 'Пообщайтесь с нами мгновенно',
    'contact.method.staya.connect': 'Подключитесь через нашу собственную платформу',
    'contact.method.email.send': 'Отправьте нам подробное сообщение',
    'contact.method.phone.call': 'Позвоните нам напрямую',

    // Footer Links
    'footer.links.services': 'Услуги',
    'footer.links.portfolio': 'Портфолио',
    'footer.links.history': 'История',
    'footer.links.contact': 'Контакты',

    // Footer Services
    'footer.service.website': 'Разработка веб-сайтов',
    'footer.service.mobile': 'Мобильные приложения',
    'footer.service.bots': 'Telegram боты',
    'footer.service.custom': 'Индивидуальные решения',

    // History Milestones
    'history.2020.title.text': 'Начало',
    'history.2020.description.text': 'Основали EDA-TECH с видением создания инновационных цифровых решений.',
    'history.2021.title.text': 'Первый крупный проект',
    'history.2021.description.text': 'Запустили нашу первую крупную платформу электронной коммерции, утвердив нашу репутацию в веб-разработке.',
    'history.2022.title.text': 'Расширение команды',
    'history.2022.description.text': 'Увеличили нашу команду до 10+ разработчиков и дизайнеров, расширив наши возможности в мобильной разработке.',
    'history.2023.title.text': 'Запуск EDA-Computers',
    'history.2023.description.text': 'Успешно запустили EDA-Computers.ru и его Telegram бота, революционизировав опыт сборки ПК.',
    'history.2024.title.text': 'Staya Messenger',
    'history.2024.description.text': 'Выпустили Staya Messenger, наш флагманский продукт, демонстрирующий наш опыт в общении в реальном времени.',

    // History Stats
    'history.stat.projects': 'Проектов завершено',
    'history.stat.clients': 'Довольных клиентов',
    'history.stat.experience': 'Лет опыта',
    'history.stat.team': 'Членов команды',

    // Order Form Step 2 placeholders
    'order.form.fullName.placeholder': 'Иван Иванов',
    'order.form.email.placeholder': 'ivan@example.com',
    'order.form.phone.placeholder': '+7 (999) 123-45-67',
    'order.form.company.placeholder': 'Ваша компания',
    'order.form.projectTitle.placeholder': 'Мой замечательный проект',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}