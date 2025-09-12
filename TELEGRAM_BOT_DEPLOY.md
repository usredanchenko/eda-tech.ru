# 🚀 Инструкции по деплою EDA-TECH Telegram Bot

## ⚠️ ВАЖНО: Получи свой Chat ID

**Проблема:** В файле `telegram-bot.js` указан пример `ADMIN_CHAT_ID = '123456789'`, но нужен твой реальный ID.

### Как получить Chat ID:

**Метод 1: Через бота (рекомендуется)**
1. Найди `@eda_tech_support_bot` в Telegram
2. Отправь `/start`
3. Отправь `/chatid`  
4. Скопируй полученный числовой ID
5. Замени в `telegram-bot.js` строку 6: `const ADMIN_CHAT_ID = 'ТВОЙ_ID';`

**Метод 2: Через API**
1. Отправь любое сообщение боту
2. Открой: `https://api.telegram.org/bot8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk/getUpdates`
3. Найди `"chat":{"id":123456789` - это твой ID

---

# 📋 ДЕПЛОЙ НА VPS

## Шаг 1: Подготовка сервера

```bash
# Подключиться к серверу  
ssh your_user@your_server_ip

# Создать директорию для бота
sudo mkdir -p /var/www/eda-tech-bot
cd /var/www/eda-tech-bot

# Скопировать файлы (создай их через nano или загрузи через scp)
sudo nano telegram-bot.js     # Скопируй содержимое из созданного файла
sudo nano package.json        # Скопируй содержимое из созданного файла  
sudo nano ecosystem.config.js # Скопируй содержимое из созданного файла
```

## Шаг 2: Установка зависимостей

```bash
# Установить Node.js (если не установлен)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установить PM2 глобально
sudo npm install -g pm2

# Установить зависимости проекта
cd /var/www/eda-tech-bot
sudo npm install
```

## Шаг 3: Обновить ADMIN_CHAT_ID

```bash
# Отредактировать telegram-bot.js
sudo nano telegram-bot.js

# Найти строку 6 и заменить:
# const ADMIN_CHAT_ID = '123456789'; // ЗАМЕНИ НА ЧИСЛОВОЙ ID ИЗ /chatid
# на твой реальный ID:
# const ADMIN_CHAT_ID = '987654321'; // Твой реальный ID
```

## Шаг 4: Запустить бота

```bash
# Запустить через PM2
sudo pm2 start ecosystem.config.js

# Сохранить конфигурацию PM2
sudo pm2 save

# Настроить автозапуск при перезагрузке
sudo pm2 startup

# Проверить статус
sudo pm2 status
sudo pm2 logs eda-tech-telegram-bot
```

## Шаг 5: Настроить Nginx

Добавь в конфиг nginx (`/etc/nginx/sites-available/eda-tech.ru`):

```nginx
server {
    server_name eda-tech.ru www.eda-tech.ru;
    
    # Добавить эти location блоки в существующий server
    
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
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
    
    # Остальные настройки для основного сайта
    location / {
        root /var/www/eda-tech.ru/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }
    
    # SSL настройки (если есть)
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/eda-tech.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/eda-tech.ru/privkey.pem;
}
```

Применить изменения:
```bash
# Проверить конфиг
sudo nginx -t

# Перезагрузить nginx  
sudo systemctl reload nginx
```

## Шаг 6: Настроить webhook Telegram

```bash
# Установить webhook (ОБЯЗАТЕЛЬНО!)
curl -X POST "https://api.telegram.org/bot8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://eda-tech.ru/webhook/telegram"}'

# Проверить статус webhook
curl "https://api.telegram.org/bot8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk/getWebhookInfo"

# Должен вернуть:
# {"ok":true,"result":{"url":"https://eda-tech.ru/webhook/telegram","has_custom_certificate":false,"pending_update_count":0}}
```

---

# 🧪 ТЕСТИРОВАНИЕ

## Тест 1: Health Check
```bash
curl https://eda-tech.ru/health
# Ожидаем: {"status":"OK","bot":"EDA-TECH Support Bot",...}
```

## Тест 2: Команды бота
1. Открой @eda_tech_support_bot в Telegram
2. Отправь `/start` - должен ответить приветствием
3. Отправь `/chatid` - получи свой Chat ID
4. Отправь `/status` - проверь статус системы

## Тест 3: Заявка с сайта
```bash
# Тест API заявки
curl -X POST https://eda-tech.ru/api/submit-order \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Тестовый Пользователь",
    "email": "test@example.com",
    "projectTitle": "Тестовый проект",
    "projectDescription": "Описание тестового проекта",
    "budget": "₽100,000 - ₽300,000",
    "timeline": "1-2 месяца"
  }'

# Должен вернуть: {"success":true,"message":"Заявка отправлена в EDA-TECH!"}
# И прийти сообщение в Telegram
```

## Тест 4: Контактная форма
```bash
# Тест контактной формы
curl -X POST https://eda-tech.ru/api/submit-contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тест Контакт",
    "email": "contact@test.com",
    "subject": "Тестовая тема",
    "message": "Тестовое сообщение"
  }'
```

## Тест 5: Форма на сайте
1. Открой https://eda-tech.ru
2. Заполни форму заказа - должна отправиться в Telegram
3. Заполни контактную форму - должна отправиться в Telegram

---

# 🛠 УПРАВЛЕНИЕ БОТОМ

## Полезные команды PM2:
```bash
# Статус бота
sudo pm2 status

# Логи в реальном времени
sudo pm2 logs eda-tech-telegram-bot

# Перезапуск
sudo pm2 restart eda-tech-telegram-bot

# Остановка
sudo pm2 stop eda-tech-telegram-bot

# Удаление из PM2
sudo pm2 delete eda-tech-telegram-bot
```

## Мониторинг:
```bash
# Проверить, работает ли порт 3001
netstat -tlnp | grep 3001

# Проверить процессы Node.js
ps aux | grep node

# Логи системы
sudo journalctl -u nginx -f
```

---

# 🚨 TROUBLESHOOTING

## Проблема: Бот не отвечает на команды
**Решение:** Проверить webhook
```bash
curl "https://api.telegram.org/bot8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk/getWebhookInfo"
# Если url пустой - установить webhook заново
```

## Проблема: Заявки не приходят в Telegram
**Решение:** Проверить ADMIN_CHAT_ID
```bash
# Проверить логи
sudo pm2 logs eda-tech-telegram-bot
# Найти ошибки типа "chat not found" или "Bad Request: chat not found"
```

## Проблема: Nginx 502 Bad Gateway
**Решение:** Проверить, запущен ли бот
```bash
sudo pm2 status
curl http://localhost:3001/health
```

## Проблема: SSL ошибки
```bash
sudo certbot renew
sudo systemctl reload nginx
```

---

# ✅ CHECKLIST ГОТОВНОСТИ

- [ ] ✅ Бот создан у @BotFather с токеном `8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk`
- [ ] 🔄 **ADMIN_CHAT_ID заменен на реальный числовой ID**
- [ ] ✅ Файлы созданы: `telegram-bot.js`, `package.json`, `ecosystem.config.js`
- [ ] 🔄 Зависимости установлены: `npm install`
- [ ] 🔄 Бот запущен через PM2: `pm2 start ecosystem.config.js`
- [ ] 🔄 Nginx настроен для проксирования `/api/` и `/webhook/`
- [ ] 🔄 Webhook установлен в Telegram
- [ ] 🔄 Health check работает: `curl https://eda-tech.ru/health`
- [ ] 🔄 Бот отвечает на команды в Telegram
- [ ] 🔄 Заявки с сайта приходят в Telegram

---

**🎉 После выполнения всех пунктов Telegram бот готов к работе!**

Все заявки с eda-tech.ru будут автоматически приходить в твой Telegram с полной информацией о клиенте и проекте.
