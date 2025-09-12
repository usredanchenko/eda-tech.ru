# 🤖 TELEGRAM BOT ROADMAP - Универсальный промпт

## 📋 ШАБЛОН ДАННЫХ БОТА
**Заполни эти данные перед началом работы:**

```yaml
# === ДАННЫЕ БОТА (ЗАПОЛНИ!) ===
BOT_NAME: "[ВставьИмяБота]"                    # Например: EDA-TECH Support Bot
BOT_USERNAME: "[ВставьЮзернеймБота]"           # Например: @eda_tech_support_bot
BOT_PURPOSE: "[ОписаниеНазначенияБота]"        # Например: Обработка заявок с сайта и техподдержка
BOT_TOKEN: "[8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk]"                # Например: 7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
ADMIN_CHAT_ID: "[https://t.me/+Zfl1y9kW9UxkMTli]"                # Например: 123456789
GROUP_CHAT_ID: "[IdГруппыКомандыОпционально]"  # Например: -1001234567890
WEBHOOK_URL: "[УрлВебхука]"                    # Например: https://eda-tech.ru/webhook/telegram
SERVER_PORT: "[ПортСервера]"                  # Например: 3001

# === ФУНКЦИИ БОТА (ВЫБЕРИ НУЖНЫЕ) ===
FUNCTIONS:
  - ✅ Прием заявок с сайта
  - ✅ Отправка уведомлений админу
  - ⚠️  Обработка команд пользователей      # Включить если нужно
  - ⚠️  База данных заявок                  # Включить если нужно
  - ⚠️  Интеграция с CRM                    # Включить если нужно
  - ⚠️  Файлы и медиа                       # Включить если нужно

# === СЕРВЕР И ДЕПЛОЙ ===
SERVER_TYPE: "[ТипСервера]"                   # VPS / Vercel / Heroku / Railway
DOMAIN: "[ДоменСайта]"                         # Например: eda-tech.ru
SSL_ENABLED: true                              # true / false
```

---

# 🚀 ПОСЛЕДОВАТЕЛЬНОСТЬ ВЫПОЛНЕНИЯ

## ЭТАП 1: Создание и настройка бота (30 мин)

### 🔥 Промпт для выполнения:
```
РОЛЬ: Backend Developer + DevOps Engineer

ЗАДАЧА: Создать Telegram бота для [BOT_PURPOSE]

ДАННЫЕ БОТА:
- Имя: [BOT_NAME]
- Username: [BOT_USERNAME] 
- Назначение: [BOT_PURPOSE]

ШАГИ СОЗДАНИЯ:
1. Иди к @BotFather в Telegram
2. Отправь /newbot
3. Укажи имя: [BOT_NAME]
4. Укажи username: [BOT_USERNAME]
5. Получи токен и сохрани: [BOT_TOKEN]
6. Настрой описание бота: /setdescription
7. Настрой команды: /setcommands

КОМАНДЫ ДЛЯ НАСТРОЙКИ:
/setcommands
start - 🚀 Запуск бота
help - ❓ Помощь
status - 📊 Статус системы

/setdescription
[BOT_NAME] - бот для [BOT_PURPOSE]. Автоматически обрабатывает заявки и уведомления.

РЕЗУЛЬТАТ: Готовый бот с токеном [BOT_TOKEN]
```

---

## ЭТАП 2: Backend сервер (45 мин)

### 🔥 Промпт для выполнения:
```
РОЛЬ: Node.js Developer + API Specialist

ЗАДАЧА: Создать webhook сервер для Telegram бота

ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ:
- Express.js сервер на порту [SERVER_PORT]
- Обработка webhook от Telegram
- Отправка заявок с сайта в чат [ADMIN_CHAT_ID]
- CORS для домена [DOMAIN]

СОЗДАЙ ФАЙЛ: telegram-bot.js
```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// === КОНФИГУРАЦИЯ БОТА ===
const BOT_TOKEN = '[BOT_TOKEN]';
const ADMIN_CHAT_ID = '[ADMIN_CHAT_ID]';
const GROUP_CHAT_ID = '[GROUP_CHAT_ID]'; // опционально
const PORT = process.env.PORT || [SERVER_PORT];

app.use(cors({
    origin: ['https://[DOMAIN]', 'https://www.[DOMAIN]'],
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

// === ОБРАБОТКА ЗАЯВОК С САЙТА ===
app.post('/api/submit-order', async (req, res) => {
    const orderData = req.body;
    
    const message = `
🚀 *НОВАЯ ЗАЯВКА - [BOT_NAME]*

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
🌐 Источник: [DOMAIN]
    `.trim();

    try {
        const result = await sendToTelegram(message);
        
        if (result.success) {
            res.json({ 
                success: true, 
                message: 'Заявка отправлена в Telegram!' 
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
                `👋 Привет, ${userName}! \n\n🤖 Это [BOT_NAME]\n📋 Назначение: [BOT_PURPOSE]\n\n💡 Используй /help для справки`,
                chatId
            );
        }
        else if (text === '/help') {
            await sendToTelegram(
                `❓ *Помощь по боту [BOT_NAME]*\n\n📋 *Доступные команды:*\n/start - Запуск бота\n/help - Эта справка\n/status - Статус системы\n\n🌐 Сайт: https://[DOMAIN]`,
                chatId
            );
        }
        else if (text === '/status') {
            await sendToTelegram(
                `📊 *Статус системы*\n\n✅ Бот работает\n🌐 Сервер активен\n⏰ ${new Date().toLocaleString('ru-RU')}`,
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
        bot: '[BOT_NAME]',
        time: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// === ЗАПУСК СЕРВЕРА ===
app.listen(PORT, () => {
    console.log(`🚀 [BOT_NAME] запущен на порту ${PORT}`);
    console.log(`🌐 Webhook: https://[DOMAIN]/webhook/telegram`);
    console.log(`💊 Health: https://[DOMAIN]/health`);
});

module.exports = app;
```

СОЗДАЙ ФАЙЛ: package.json
```json
{
  "name": "telegram-bot-[ЗАМЕНИТЬ_НА_ПРОСТОЕ_ИМЯ]",
  "version": "1.0.0",
  "description": "[BOT_NAME] для [BOT_PURPOSE]",
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
  }
}
```

КРИТЕРИЙ ГОТОВНОСТИ: Сервер отвечает на /health и принимает заявки
```

---

## ЭТАП 3: Интеграция с фронтендом (20 мин)

### 🔥 Промпт для выполнения:
```
РОЛЬ: Frontend Developer + React Specialist

ЗАДАЧА: Подключить форму заявки к Telegram боту

ФАЙЛ ДЛЯ ИЗМЕНЕНИЯ: Design Eda-Tech Website/src/components/OrderForm.tsx

НАЙДИ ФУНКЦИЮ handleSubmit И ЗАМЕНИ НА:
```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
        // Отправляем на наш Telegram webhook
        const response = await fetch('/api/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Заявка отправлена в Telegram');
            setIsSubmitted(true);
        } else {
            console.error('❌ Ошибка:', result.error);
            alert('Ошибка отправки заявки. Попробуйте позже.');
        }
    } catch (error) {
        console.error('❌ Ошибка сети:', error);
        alert('Ошибка подключения. Проверьте интернет.');
    } finally {
        setIsSubmitting(false);
    }
};
```

ОБНОВИ КНОПКУ ОТПРАВКИ:
```typescript
<Button
    onClick={handleSubmit}
    disabled={!formData.fullName || !formData.email || !formData.projectTitle || !formData.projectDescription || isSubmitting}
    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
>
    {isSubmitting ? (
        <>
            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Отправляем в Telegram...
        </>
    ) : (
        <>
            <Send className="w-4 h-4 mr-2" />
            Отправить заявку
        </>
    )}
</Button>
```

КРИТЕРИЙ ГОТОВНОСТИ: Заявки с формы попадают в Telegram чат [ADMIN_CHAT_ID]
```

---

## ЭТАП 4: Деплой и настройка (60 мин)

### 🔥 Промпт для выполнения:
```
РОЛЬ: DevOps Engineer + System Administrator

ЗАДАЧА: Развернуть Telegram бота на продакшене

СЕРВЕР: [SERVER_TYPE]
ДОМЕН: [DOMAIN]

=== ДЛЯ VPS ===
1. УСТАНОВКА ЗАВИСИМОСТЕЙ:
```bash
# Подключиться к серверу
ssh user@[IP_СЕРВЕРА]

# Установить Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установить PM2
sudo npm install -g pm2

# Клонировать проект
git clone [РЕПОЗИТОРИЙ] /var/www/telegram-bot
cd /var/www/telegram-bot

# Установить зависимости
npm install
```

2. СОЗДАТЬ ecosystem.config.js:
```javascript
module.exports = {
    apps: [{
        name: '[BOT_NAME]',
        script: 'telegram-bot.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production',
            PORT: [SERVER_PORT]
        }
    }]
};
```

3. НАСТРОИТЬ NGINX:
```nginx
# /etc/nginx/sites-available/[DOMAIN]
server {
    server_name [DOMAIN] www.[DOMAIN];
    
    # API для бота
    location /api/ {
        proxy_pass http://localhost:[SERVER_PORT];
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
        proxy_pass http://localhost:[SERVER_PORT];
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Основной сайт
    location / {
        root /var/www/[DOMAIN]/dist;
        try_files $uri $uri/ /index.html;
    }
    
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/[DOMAIN]/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/[DOMAIN]/privkey.pem;
}
```

4. ЗАПУСК:
```bash
# Запустить бота
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Настроить автозапуск
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u [USER] --hp /home/[USER]

# Перезапустить nginx
sudo systemctl reload nginx
```

=== НАСТРОЙКА WEBHOOK ===
```bash
# Установить webhook для бота
curl -X POST "https://api.telegram.org/bot[BOT_TOKEN]/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "[WEBHOOK_URL]"}'

# Проверить статус webhook
curl "https://api.telegram.org/bot[BOT_TOKEN]/getWebhookInfo"
```

КРИТЕРИЙ ГОТОВНОСТИ: 
- ✅ Бот отвечает на команды в Telegram
- ✅ Webhook настроен и работает  
- ✅ Заявки с сайта приходят в чат
- ✅ /health возвращает статус OK
```

---

## ЭТАП 5: Тестирование (30 мин)

### 🔥 Промпт для выполнения:
```
РОЛЬ: QA Engineer + System Tester

ЗАДАЧА: Протестировать работу Telegram бота

ТЕСТОВЫЕ СЦЕНАРИИ:

=== ТЕСТ 1: Команды бота ===
1. Открой Telegram и найди @[BOT_USERNAME]
2. Отправь /start
   ✅ Ожидаем: Приветственное сообщение с описанием
3. Отправь /help  
   ✅ Ожидаем: Список команд и помощь
4. Отправь /status
   ✅ Ожидаем: Статус системы с временем

=== ТЕСТ 2: Заявки с сайта ===
1. Открой https://[DOMAIN]
2. Заполни и отправь форму заказа
3. Проверь чат [ADMIN_CHAT_ID]
   ✅ Ожидаем: Сообщение с данными заявки
4. Повтори тест с разными типами проектов
   ✅ Ожидаем: Все поля корректно отображаются

=== ТЕСТ 3: API эндпоинты ===
1. Открой https://[DOMAIN]/health
   ✅ Ожидаем: {"status":"OK","bot":"[BOT_NAME]",...}
2. Проверь webhook:
   ```bash
   curl "https://api.telegram.org/bot[BOT_TOKEN]/getWebhookInfo"
   ```
   ✅ Ожидаем: url=[WEBHOOK_URL], has_custom_certificate=false

=== ТЕСТ 4: Нагрузочный тест ===
1. Отправь 5 заявок подряд с сайта
   ✅ Ожидаем: Все заявки доходят в Telegram
2. Отправь 10 команд боту подряд
   ✅ Ожидаем: Бот отвечает на все команды

КРИТЕРИЙ УСПЕШНОСТИ: Все тесты прошли ✅

ЕСЛИ ЕСТЬ ОШИБКИ:
1. Проверь логи: pm2 logs [BOT_NAME]
2. Проверь статус: pm2 status
3. Перезапусти: pm2 restart [BOT_NAME]
```

---

# 🎯 CHECKLIST ГОТОВНОСТИ

## ✅ Технические требования
- [ ] Бот создан у @BotFather с токеном [BOT_TOKEN]
- [ ] Сервер запущен на порту [SERVER_PORT]
- [ ] Webhook настроен на [WEBHOOK_URL]  
- [ ] Nginx проксирует запросы к боту
- [ ] SSL сертификат работает для [DOMAIN]
- [ ] PM2 автоматически перезапускает бота

## ✅ Функциональные требования  
- [ ] Бот отвечает на команды /start, /help, /status
- [ ] Заявки с сайта попадают в чат [ADMIN_CHAT_ID]
- [ ] Форма показывает loading при отправке
- [ ] Все поля заявки корректно отображаются в Telegram
- [ ] Health endpoint возвращает статус сервера

## ✅ Мониторинг и поддержка
- [ ] Логи бота доступны через pm2 logs
- [ ] Уведомления об ошибках настроены (опционально)  
- [ ] Backup конфигурации выполнен
- [ ] Документация по использованию создана

---

# 🔧 TROUBLESHOOTING

## Проблема: Бот не отвечает
```bash
# Проверить статус
pm2 status
pm2 logs [BOT_NAME] --lines 50

# Проверить webhook
curl "https://api.telegram.org/bot[BOT_TOKEN]/getWebhookInfo"
```

## Проблема: Заявки не доходят
```bash
# Проверить API
curl -X POST https://[DOMAIN]/api/submit-order -H "Content-Type: application/json" -d '{"test":"data"}'

# Проверить порт
netstat -tlnp | grep [SERVER_PORT]
```

## Проблема: SSL ошибки
```bash
# Обновить сертификат
sudo certbot renew
sudo systemctl reload nginx
```

---

**🎉 РЕЗУЛЬТАТ: Готовый Telegram бот [BOT_NAME] для [BOT_PURPOSE]!**

*Время выполнения: ~3 часа*
*Сложность: Средняя*
*Подходит для: Production использования*
