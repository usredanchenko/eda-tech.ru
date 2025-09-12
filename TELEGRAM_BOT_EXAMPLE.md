# 🤖 EDA-TECH TELEGRAM BOT - Заполненный пример

## 📋 ЗАПОЛНЕННЫЕ ДАННЫЕ БОТА

```yaml
# === ДАННЫЕ БОТА (ЗАПОЛНЕНО) ===
BOT_NAME: "EDA-TECH Support Bot"
BOT_USERNAME: "@eda_tech_support_bot"  
BOT_PURPOSE: "Прием заявок с сайта eda-tech.ru и уведомления для команды"
BOT_TOKEN: "8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk"  # ЗАМЕНИ НА СВОЙ!
ADMIN_CHAT_ID: "https://t.me/+Zfl1y9kW9UxkMTli"                   # ЗАМЕНИ НА СВОЙ ID!
GROUP_CHAT_ID: "-1001234567890"             # ID группы команды (опционально)
WEBHOOK_URL: "https://eda-tech.ru/webhook/telegram"
SERVER_PORT: "3001"

# === ФУНКЦИИ БОТА (ВЫБРАНО) ===
FUNCTIONS:
  - ✅ Прием заявок с сайта
  - ✅ Отправка уведомлений админу
  - ❌ Обработка команд пользователей      # Только базовые команды
  - ❌ База данных заявок                  # Пока не нужно
  - ❌ Интеграция с CRM                    # В будущем
  - ❌ Файлы и медиа                       # Не требуется

# === СЕРВЕР И ДЕПЛОЙ ===
SERVER_TYPE: "VPS"                          # У тебя VPS сервер
DOMAIN: "eda-tech.ru" 
SSL_ENABLED: true
```

---

# 🚀 ГОТОВЫЕ КОМАНДЫ ДЛЯ ВЫПОЛНЕНИЯ

## ЭТАП 1: Создание бота (уже сделано?)
```
Если еще не создал:
1. Иди к @BotFather
2. /newbot
3. EDA-TECH Support Bot
4. @eda_tech_support_bot
5. Получи токен
```

## ЭТАП 2: Файл telegram-bot.js для твоего сервера

```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// === ТВОИ ДАННЫЕ ===
const BOT_TOKEN = '7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw'; // ЗАМЕНИ!
const ADMIN_CHAT_ID = '123456789'; // ЗАМЕНИ НА СВОЙ ID!
const GROUP_CHAT_ID = '-1001234567890'; // ID группы команды (опционально)
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: ['https://eda-tech.ru', 'https://www.eda-tech.ru'],
    credentials: true
}));
app.use(express.json());

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
    
    const message = `
🚀 *НОВАЯ ЗАЯВКА - EDA-TECH STUDIO*

👤 *Клиент:*
• Имя: ${orderData.fullName || 'Не указано'}
• Email: ${orderData.email || 'Не указан'}
• Телефон: ${orderData.phone || 'Не указан'}
• Компания: ${orderData.company || 'Не указана'}

📋 *Проект:*
• Тип: ${orderData.projectType || 'Не указан'}
• Название: ${orderData.projectTitle || 'Не указано'}
• Описание: ${orderData.projectDescription || 'Не указано'}

💰 *Бюджет:* ${orderData.budget || 'Не указан'}
⏱ *Сроки:* ${orderData.timeline || 'Не указаны'}

🔧 *Функции:* ${orderData.features?.join(', ') || 'Не выбраны'}
🛠 *Доп. услуги:* ${orderData.additionalServices?.join(', ') || 'Не выбраны'}

📝 *Дополнительно:*
${orderData.additionalNotes || 'Нет дополнительной информации'}

---
⏰ Получено: ${new Date().toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})}
🌐 Источник: eda-tech.ru
    `.trim();

    try {
        // Отправить админу
        const result = await sendToTelegram(message);
        
        // Если есть группа команды - отправить и туда
        if (GROUP_CHAT_ID) {
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
                `❓ *Помощь по EDA-TECH Support Bot*\n\n📋 *Доступные команды:*\n/start - Запуск бота\n/help - Эта справка\n/status - Статус системы\n\n🌐 Сайт: https://eda-tech.ru\n💼 Студия разработки программного обеспечения`,
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
                `🆔 *Твой Chat ID:* \`${chatId}\`\n\nИспользуй этот ID для настройки уведомлений.`,
                chatId
            );
        }
    }
    
    res.sendStatus(200);
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
});

module.exports = app;
```

## ЭТАП 3: package.json для твоего проекта

```json
{
  "name": "eda-tech-telegram-bot",
  "version": "1.0.0",
  "description": "EDA-TECH Support Bot для обработки заявок с сайта",
  "main": "telegram-bot.js",
  "scripts": {
    "start": "node telegram-bot.js",
    "dev": "nodemon telegram-bot.js",
    "pm2": "pm2 start ecosystem.config.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["telegram", "bot", "eda-tech", "webhook"],
  "author": "EDA-TECH Studio",
  "license": "MIT"
}
```

## ЭТАП 4: ecosystem.config.js для PM2

```javascript
module.exports = {
    apps: [{
        name: 'eda-tech-telegram-bot',
        script: 'telegram-bot.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production',
            PORT: 3001
        },
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        error_file: '/var/log/pm2/eda-tech-bot-error.log',
        out_file: '/var/log/pm2/eda-tech-bot-out.log'
    }]
};
```

## ЭТАП 5: Команды для деплоя на твоем VPS

```bash
# 1. Создать директорию
sudo mkdir -p /var/www/eda-tech-bot
cd /var/www/eda-tech-bot

# 2. Создать файлы
sudo nano telegram-bot.js    # Вставить код выше
sudo nano package.json      # Вставить код выше  
sudo nano ecosystem.config.js # Вставить код выше

# 3. Установить зависимости
sudo npm install

# 4. Запустить бота
sudo pm2 start ecosystem.config.js
sudo pm2 save
sudo pm2 startup

# 5. Настроить webhook (ЗАМЕНИ НА СВОЙ ТОКЕН!)
curl -X POST "https://api.telegram.org/bot7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://eda-tech.ru/webhook/telegram"}'
```

## ЭТАП 6: Обновить Nginx для eda-tech.ru

Добавь в конфиг nginx (`/etc/nginx/sites-available/eda-tech.ru`):

```nginx
# Добавить в существующий server block
    
    # API для Telegram бота
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Webhook для Telegram
    location /webhook/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Health check
    location /health {
        proxy_pass http://localhost:3001;
    }
```

Затем:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

# 🎯 ТЕСТИРОВАНИЕ EDA-TECH БОТА

## 1. Получить свой Chat ID
```
1. Найди @eda_tech_support_bot в Telegram
2. Отправь /chatid
3. Скопируй полученный ID
4. Замени в коде ADMIN_CHAT_ID на свой ID
```

## 2. Тест заявок
```
1. Открой eda-tech.ru
2. Заполни форму заказа  
3. Проверь - пришло ли сообщение в Telegram
```

## 3. Тест API
```bash
# Проверить здоровье
curl https://eda-tech.ru/health

# Тест заявки
curl -X POST https://eda-tech.ru/api/submit-order \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Тест","email":"test@test.com","projectTitle":"Тестовый проект"}'
```

---

**✅ РЕЗУЛЬТАТ: Готовый Telegram бот для EDA-TECH!**

Все заявки с сайта будут приходить к тебе в Telegram с красивым форматированием и всей необходимой информацией.
