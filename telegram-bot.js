const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// === ТВОИ ДАННЫЕ ===
const BOT_TOKEN = '8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk'; // Твой токен
// ✅ ТВОЙ РЕАЛЬНЫЙ CHAT ID
const ADMIN_CHAT_ID = '7999992510'; // Egor Danchenko (@edanchenko_tg)
const GROUP_CHAT_ID = '-1001234567890'; // ID группы команды (опционально)
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: ['https://eda-tech.ru', 'https://www.eda-tech.ru'],
    credentials: true
}));
app.use(express.json());

// === ФУНКЦИЯ ЭКРАНИРОВАНИЯ MARKDOWN ===
function escapeMarkdown(text) {
    if (!text) return text;
    return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
}

// === ФУНКЦИЯ ОТПРАВКИ В TELEGRAM ===
async function sendToTelegram(message, chatId = ADMIN_CHAT_ID) {
    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        console.error('❌ Ошибка отправки в Telegram:', error.response?.data);
        return { success: false, error: error.message };
    }
}

// === ОБРАБОТКА ЗАЯВОК С САЙТА EDA-TECH ===
app.post('/api/submit-order', async (req, res) => {
    const orderData = req.body;
    
    // Функция для форматирования массивов
    const formatArray = (array, emptyText = 'Не выбрано') => {
        if (!array || !Array.isArray(array) || array.length === 0) {
            return emptyText;
        }
        return array.map(item => `• ${item}`).join('\n');
    };

    // Функция для форматирования типа проекта
    const getProjectTypeInfo = (projectType) => {
        const types = {
            'website': '🌐 Веб-сайт',
            'mobile': '📱 Мобильное приложение', 
            'telegram': '🤖 Telegram бот',
            'custom': '⚙️ Кастомное решение'
        };
        return types[projectType] || projectType || 'Не указан';
    };

    const message = `
🚀 *НОВАЯ ЗАЯВКА НА РАЗРАБОТКУ*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *ИНФОРМАЦИЯ О КЛИЕНТЕ*
• *Имя:* ${escapeMarkdown(orderData.fullName) || 'Не указано'}
• *Email:* ${escapeMarkdown(orderData.email) || 'Не указан'}
• *Телефон:* ${escapeMarkdown(orderData.phone) || 'Не указан'}
• *Компания:* ${escapeMarkdown(orderData.company) || 'Не указана'}

📋 *ДЕТАЛИ ПРОЕКТА*
• *Тип проекта:* ${getProjectTypeInfo(orderData.projectType)}
• *Название:* ${escapeMarkdown(orderData.projectTitle) || 'Не указано'}
• *Описание:* 
${escapeMarkdown(orderData.projectDescription) || 'Описание не предоставлено'}

💰 *БЮДЖЕТ И СРОКИ*
• *Бюджет:* ${orderData.budget || 'Не указан'}
• *Временные рамки:* ${orderData.timeline || 'Не указаны'}

🔧 *ТРЕБУЕМЫЕ ФУНКЦИИ*
${formatArray(orderData.features, 'Функции не выбраны')}

🛠 *ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ*
${formatArray(orderData.additionalServices, 'Доп. услуги не выбраны')}

💻 *ДИЗАЙН И ПРЕДПОЧТЕНИЯ*
${orderData.designPreferences ? escapeMarkdown(orderData.designPreferences) : 'Предпочтения не указаны'}

📎 *ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ*
${orderData.existingAssets ? `*Существующие материалы:*\n${escapeMarkdown(orderData.existingAssets)}\n` : ''}
${orderData.inspiration ? `*Источники вдохновения:*\n${escapeMarkdown(orderData.inspiration)}\n` : ''}
${orderData.additionalNotes ? `*Дополнительные заметки:*\n${escapeMarkdown(orderData.additionalNotes)}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ *Получено:* ${new Date().toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})}
🌐 *Источник:* eda-tech.ru  
🎯 *Статус:* Новая заявка

🎬 *БЫСТРЫЕ ДЕЙСТВИЯ:*
• Ответить на email: ${escapeMarkdown(orderData.email) || 'Email не указан'}
${orderData.phone ? `• Позвонить: ${escapeMarkdown(orderData.phone)}` : ''}
• Оценить проект и составить предложение
• Добавить в CRM систему
    `.trim();

    try {
        // Отправить админу
        const result = await sendToTelegram(message);
        
        // Если есть группа команды - отправить и туда
        if (GROUP_CHAT_ID && GROUP_CHAT_ID !== '-1001234567890') {
            await sendToTelegram(message, GROUP_CHAT_ID);
        }
        
        if (result.success) {
            res.json({ 
                success: true, 
                message: 'Заявка отправлена в EDA-TECH!' 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                error: 'Ошибка отправки в Telegram' 
            });
        }
    } catch (error) {
        console.error('❌ Ошибка обработки заявки:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Внутренняя ошибка сервера' 
        });
    }
});

// === WEBHOOK ДЛЯ TELEGRAM ===
app.post('/webhook/telegram', async (req, res) => {
    const update = req.body;
    
    if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text;
        const userName = update.message.from.first_name;
        
        // Обработка команд
        if (text === '/start') {
            await sendToTelegram(
                `👋 Привет, ${userName}! \n\n🤖 Это EDA-TECH Support Bot\n📋 Я обрабатываю заявки с сайта eda-tech.ru\n\n💡 Используй /help для справки`,
                chatId
            );
        }
        else if (text === '/help') {
            await sendToTelegram(
                `❓ *Помощь по EDA-TECH Support Bot*\n\n📋 *Доступные команды:*\n/start - Запуск бота\n/help - Эта справка\n/status - Статус системы\n/chatid - Получить ID чата\n\n🌐 Сайт: https://eda-tech.ru\n💼 Студия разработки программного обеспечения`,
                chatId
            );
        }
        else if (text === '/status') {
            await sendToTelegram(
                `📊 *Статус EDA-TECH системы*\n\n✅ Бот работает\n🌐 Сервер активен\n📧 Прием заявок работает\n⏰ ${new Date().toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})}`,
                chatId
            );
        }
        else if (text === '/chatid') {
            // Полезная команда для получения ID чата
            await sendToTelegram(
                `🆔 *Твой Chat ID:* \`${chatId}\`\n\nИспользуй этот ID для настройки уведомлений.\n\n📝 *Инструкция:*\n1. Скопируй ID: \`${chatId}\`\n2. Замени ADMIN_CHAT_ID в коде на этот ID\n3. Перезапусти сервер`,
                chatId
            );
        }
    }
    
    res.sendStatus(200);
});

// === ОБРАБОТКА КОНТАКТНОЙ ФОРМЫ ===
app.post('/api/submit-contact', async (req, res) => {
    const contactData = req.body;
    
    const message = `
📧 *НОВОЕ СООБЩЕНИЕ - EDA-TECH*

👤 *Отправитель:*
• Имя: ${contactData.name || 'Не указано'}
• Email: ${contactData.email || 'Не указан'}
• Тема: ${contactData.subject || 'Не указана'}

💬 *Сообщение:*
${contactData.message || 'Пустое сообщение'}

---
⏰ Получено: ${new Date().toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})}
🌐 Источник: eda-tech.ru/contact
    `.trim();

    try {
        const result = await sendToTelegram(message);
        
        if (result.success) {
            res.json({ 
                success: true, 
                message: 'Сообщение отправлено!' 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                error: 'Ошибка отправки в Telegram' 
            });
        }
    } catch (error) {
        console.error('❌ Ошибка обработки контакта:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Внутренняя ошибка сервера' 
        });
    }
});

// === ТЕСТ ФОРМАТИРОВАНИЯ ЗАЯВКИ ===
app.post('/api/test-order-format', async (req, res) => {
    const testOrder = {
        fullName: 'Иван Петров',
        email: 'ivan.petrov@example.com',
        phone: '+7 (915) 123-45-67',
        company: 'ООО "Инновации"',
        projectType: 'website',
        projectTitle: 'Интернет-магазин электроники',
        projectDescription: 'Нужен современный интернет-магазин с каталогом, корзиной, системой оплаты и админкой для управления товарами.',
        budget: '₽300,000 - ₽500,000',
        timeline: '2-3 месяца',
        features: ['Авторизация пользователей', 'Система оплаты', 'Админ-панель', 'API интеграции', 'Push-уведомления'],
        additionalServices: ['Дизайн', 'SEO оптимизация', 'Хостинг', 'Техподдержка'],
        designPreferences: 'Минималистичный дизайн в современном стиле, использование корпоративных цветов - синий и белый. Адаптивность для всех устройств обязательна.',
        existingAssets: 'Есть логотип, фирменный стиль и каталог товаров в Excel. Также есть существующий сайт на WordPress, который нужно заменить.',
        inspiration: 'Нравится дизайн apple.com и shop.tesla.com - чистый, современный, с хорошими фото товаров.',
        additionalNotes: 'Проект срочный, хотелось бы начать работу как можно скорее. Готовы обсудить детали на встрече.'
    };

    try {
        // Используем ту же логику форматирования что и для реальных заявок
        const formatArray = (array, emptyText = 'Не выбрано') => {
            if (!array || !Array.isArray(array) || array.length === 0) {
                return emptyText;
            }
            return array.map(item => `• ${item}`).join('\n');
        };

        const getProjectTypeInfo = (projectType) => {
            const types = {
                'website': '🌐 Веб-сайт',
                'mobile': '📱 Мобильное приложение', 
                'telegram': '🤖 Telegram бот',
                'custom': '⚙️ Кастомное решение'
            };
            return types[projectType] || projectType || 'Не указан';
        };

        const message = `
🚀 *ТЕСТОВАЯ ЗАЯВКА НА РАЗРАБОТКУ*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *ИНФОРМАЦИЯ О КЛИЕНТЕ*
• *Имя:* ${testOrder.fullName || 'Не указано'}
• *Email:* ${testOrder.email || 'Не указан'}
• *Телефон:* ${testOrder.phone || 'Не указан'}
• *Компания:* ${testOrder.company || 'Не указана'}

📋 *ДЕТАЛИ ПРОЕКТА*
• *Тип проекта:* ${getProjectTypeInfo(testOrder.projectType)}
• *Название:* ${testOrder.projectTitle || 'Не указано'}
• *Описание:* 
${testOrder.projectDescription || 'Описание не предоставлено'}

💰 *БЮДЖЕТ И СРОКИ*
• *Бюджет:* ${testOrder.budget || 'Не указан'}
• *Временные рамки:* ${testOrder.timeline || 'Не указаны'}

🔧 *ТРЕБУЕМЫЕ ФУНКЦИИ*
${formatArray(testOrder.features, 'Функции не выбраны')}

🛠 *ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ*
${formatArray(testOrder.additionalServices, 'Доп. услуги не выбраны')}

💻 *ДИЗАЙН И ПРЕДПОЧТЕНИЯ*
${testOrder.designPreferences ? `${testOrder.designPreferences}` : 'Предпочтения не указаны'}

📎 *ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ*
${testOrder.existingAssets ? `*Существующие материалы:*\n${testOrder.existingAssets}\n` : ''}
${testOrder.inspiration ? `*Источники вдохновения:*\n${testOrder.inspiration}\n` : ''}
${testOrder.additionalNotes ? `*Дополнительные заметки:*\n${testOrder.additionalNotes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ *Получено:* ${new Date().toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})}
🌐 *Источник:* eda-tech.ru (ТЕСТ)
🎯 *Статус:* Тестовая заявка

🎬 *БЫСТРЫЕ ДЕЙСТВИЯ:*
• Ответить на email: ${testOrder.email || 'Email не указан'}
${testOrder.phone ? `• Позвонить: ${testOrder.phone}` : ''}
• Оценить проект и составить предложение
• Добавить в CRM систему

Теги: тест, заявка, новый_клиент, ${testOrder.projectType || 'проект'}
        `.trim();

        const result = await sendToTelegram(message);
        
        if (result.success) {
            res.json({ 
                success: true, 
                message: 'Тестовая заявка отправлена в Telegram!' 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                error: 'Ошибка отправки тестовой заявки' 
            });
        }
    } catch (error) {
        console.error('❌ Ошибка тестирования:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Внутренняя ошибка сервера' 
        });
    }
});

// === ЗДОРОВЬЕ СЕРВЕРА ===
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        bot: 'EDA-TECH Support Bot',
        time: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// === ЗАПУСК СЕРВЕРА ===
app.listen(PORT, () => {
    console.log(`🚀 EDA-TECH Support Bot запущен на порту ${PORT}`);
    console.log(`🌐 Webhook: https://eda-tech.ru/webhook/telegram`);
    console.log(`💊 Health: https://eda-tech.ru/health`);
    console.log(`🔑 Bot Token: ${BOT_TOKEN.substring(0, 10)}...`);
    console.log(`👤 Admin Chat ID: ${ADMIN_CHAT_ID}`);
});

module.exports = app;
