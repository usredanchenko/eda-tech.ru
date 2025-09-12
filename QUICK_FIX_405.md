# ⚡ БЫСТРОЕ ИСПРАВЛЕНИЕ 405 ОШИБКИ

## 🚨 ПРОБЛЕМА:
```
POST https://eda-tech.ru/api/submit-order 405 (Method Not Allowed)
❌ Ошибка сети: SyntaxError: Unexpected token '<', "<html><h"...
```

**Причина:** Nginx не настроен для проксирования API запросов к Telegram боту.

---

## 🚀 БЫСТРОЕ РЕШЕНИЕ (2 способа):

### Способ 1: Автоматический деплой (РЕКОМЕНДУЕТСЯ)
```bash
# На VPS сервере:
cd /var/www/eda-tech.ru
git pull origin master
./deploy-to-vps.sh
```

### Способ 2: Ручная настройка
```bash
# 1. Обновить код
cd /var/www/eda-tech.ru
git pull origin master

# 2. Скопировать Nginx конфиг
sudo cp nginx-eda-tech.conf /etc/nginx/sites-available/eda-tech.ru
sudo ln -sf /etc/nginx/sites-available/eda-tech.ru /etc/nginx/sites-enabled/

# 3. Проверить и перезагрузить Nginx
sudo nginx -t
sudo systemctl reload nginx

# 4. Запустить/перезапустить бота
pm2 restart eda-tech-telegram-bot || pm2 start ecosystem.config.js

# 5. Установить webhook
curl -X POST "https://api.telegram.org/bot8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://eda-tech.ru/webhook/telegram"}'
```

---

## 🧪 ПРОВЕРКА ИСПРАВЛЕНИЯ:

### 1. Health Check:
```bash
curl https://eda-tech.ru/health
# Ожидаем: {"status":"OK","bot":"EDA-TECH Support Bot",...}
```

### 2. API Test:
```bash
curl -X POST https://eda-tech.ru/api/test-order-format \
  -H "Content-Type: application/json"
# Ожидаем: {"success":true,"message":"Тестовая заявка отправлена в Telegram!"}
```

### 3. Проверка в браузере:
- Открой https://eda-tech.ru
- Заполни форму "Начать проект"
- Отправь заявку
- Проверь Telegram - должно прийти сообщение

---

## 🔍 ДИАГНОСТИКА ПРОБЛЕМ:

### Если API все еще не работает:
```bash
# Проверить статус бота
pm2 status
pm2 logs eda-tech-telegram-bot

# Проверить Nginx конфиг
sudo nginx -t
sudo systemctl status nginx

# Проверить какой процесс слушает порт 3001
sudo netstat -tulpn | grep 3001

# Проверить webhook
curl "https://api.telegram.org/bot8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk/getWebhookInfo"
```

### Если бот не запускается:
```bash
# Установить зависимости
npm install

# Проверить ошибки
node telegram-bot.js

# Если ошибка с портом - убить процесс
sudo fuser -k 3001/tcp
```

---

## ⚡ КРИТИЧНЫЕ НАСТРОЙКИ NGINX:

Убедись что в `/etc/nginx/sites-available/eda-tech.ru` есть:
```nginx
# КРИТИЧНО для API
location /api/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Для webhook
location /webhook/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
}

# Для фронтенда
location / {
    root /var/www/eda-tech.ru/Design Eda-Tech Website/dist;
    try_files $uri $uri/ /index.html;
}
```

---

## 🎯 ОЖИДАЕМЫЙ РЕЗУЛЬТАТ:

После исправления:
- ✅ **405 ошибка исчезнет**
- ✅ **Заявки будут отправляться в Telegram**
- ✅ **Форма покажет "Заявка отправлена!"**
- ✅ **В Telegram придет красиво оформленное сообщение**

---

**⚡ ВРЕМЯ ИСПРАВЛЕНИЯ: ~5 минут**
**🎯 СЛОЖНОСТЬ: Легкая**
**📋 СТАТУС: Готово к применению**
