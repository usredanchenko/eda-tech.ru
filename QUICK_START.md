# ⚡ QUICK START: EDA-TECH Telegram Bot

## 🚨 КРИТИЧЕСКИ ВАЖНО!

**⚠️ Перед запуском:** Замени `ADMIN_CHAT_ID = '123456789'` на свой реальный ID!

**Как получить свой Chat ID:**
1. Найди @eda_tech_support_bot в Telegram  
2. Отправь `/chatid`
3. Скопируй число и замени в `telegram-bot.js` строку 6

---

# 🚀 Быстрый деплой (5 минут)

## На VPS сервере:

```bash
# 1. Создать директорию
cd /var/www && sudo mkdir eda-tech-bot && cd eda-tech-bot

# 2. Создать файлы (скопируй содержимое из созданных файлов)
sudo nano telegram-bot.js     # Вставь код из файла
sudo nano package.json        # Вставь код из файла  
sudo nano ecosystem.config.js # Вставь код из файла

# 3. Установить и запустить
sudo npm install
sudo pm2 start ecosystem.config.js
sudo pm2 save

# 4. Настроить webhook
curl -X POST "https://api.telegram.org/bot8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://eda-tech.ru/webhook/telegram"}'
```

## В Nginx конфиге:

Добавь в `/etc/nginx/sites-available/eda-tech.ru`:

```nginx
# Добавить в server блок
location /api/ {
    proxy_pass http://localhost:3001;
    proxy_set_header Host $host;
}

location /webhook/ {
    proxy_pass http://localhost:3001;
    proxy_set_header Host $host;
}
```

Применить:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

# ✅ Проверка работы

## 1. Health Check
```bash
curl https://eda-tech.ru/health
# Ожидаем: {"status":"OK",...}
```

## 2. Команды бота
- Отправь @eda_tech_support_bot команду `/start`
- Должен ответить приветствием

## 3. Тест заявки
- Заполни форму на eda-tech.ru
- Проверь - пришло ли сообщение в Telegram

---

# 🔧 Управление

```bash
# Статус
sudo pm2 status

# Логи  
sudo pm2 logs eda-tech-telegram-bot

# Перезапуск
sudo pm2 restart eda-tech-telegram-bot
```

---

**🎉 ГОТОВО!** Все заявки с сайта теперь приходят в твой Telegram!

📖 **Подробные инструкции:** `TELEGRAM_BOT_DEPLOY.md`
