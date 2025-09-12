# 🚀 EDA-TECH - Студия разработки программного обеспечения

Полнофункциональный веб-сайт с интегрированным Telegram ботом для обработки заявок.

## 📋 Структура проекта

```
eda-tech.ru/
├── Design Eda-Tech Website/     # React фронтенд
│   ├── src/
│   │   ├── components/          # React компоненты
│   │   ├── hooks/               # Кастомные хуки (локализация)
│   │   └── styles/              # Стили
│   ├── package.json
│   └── vite.config.ts
│
├── telegram-bot.js              # Telegram бот сервер
├── package.json                 # Зависимости бота
├── ecosystem.config.js          # PM2 конфигурация
│
├── TELEGRAM_BOT_DEPLOY.md       # Инструкции по деплою
├── QUICK_START.md               # Быстрый старт
└── TELEGRAM_FORMATTING_TEST.md  # Тестирование форматирования
```

## ✨ Возможности

### 🌐 Frontend (React + TypeScript)
- ✅ Современный дизайн с анимациями (Motion)
- ✅ Двуязычность (EN/RU) с переключателем
- ✅ Адаптивный дизайн для всех устройств
- ✅ Форма заказа из 4 шагов
- ✅ Контактная форма
- ✅ Портфолио и история компании
- ✅ Интеграция с Telegram ботом

### 🤖 Telegram Bot
- ✅ Прием заявок с сайта в красивом формате
- ✅ Обработка контактных форм
- ✅ Команды: `/start`, `/help`, `/status`, `/chatid`
- ✅ Webhook поддержка
- ✅ Автоматическое форматирование сообщений
- ✅ Быстрые действия для менеджера

## 🚀 Быстрый запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/edanchenko-eda-tech/eda-tech.ru.git
cd eda-tech.ru
```

### 2. Настройка Telegram бота
```bash
# Установить зависимости
npm install

# Настроить токен бота и Chat ID в telegram-bot.js
# BOT_TOKEN = 'ваш_токен'
# ADMIN_CHAT_ID = 'ваш_chat_id'

# Запустить бота
npm start
```

### 3. Настройка фронтенда
```bash
cd "Design Eda-Tech Website"
npm install
npm run dev
```

## 📦 Деплой в продакшн

### На VPS сервере:
```bash
# Клонировать и настроить бота
git clone https://github.com/edanchenko-eda-tech/eda-tech.ru.git
cd eda-tech.ru
npm install
pm2 start ecosystem.config.js

# Собрать фронтенд
cd "Design Eda-Tech Website"
npm install
npm run build

# Настроить Nginx для проксирования API
# См. TELEGRAM_BOT_DEPLOY.md для подробностей
```

### Webhook для Telegram:
```bash
curl -X POST "https://api.telegram.org/bot[TOKEN]/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://eda-tech.ru/webhook/telegram"}'
```

## 🧪 Тестирование

### Тест форматирования заявки:
```bash
curl -X POST https://eda-tech.ru/api/test-order-format
```

### Health check:
```bash
curl https://eda-tech.ru/health
```

## 📱 Пример сообщения в Telegram

```
🚀 НОВАЯ ЗАЯВКА НА РАЗРАБОТКУ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 ИНФОРМАЦИЯ О КЛИЕНТЕ
• Имя: Иван Петров
• Email: ivan@example.com
• Телефон: +7 (915) 123-45-67
• Компания: ООО "Инновации"

📋 ДЕТАЛИ ПРОЕКТА
• Тип проекта: 🌐 Веб-сайт
• Название: Интернет-магазин
• Описание: Современный магазин...

💰 БЮДЖЕТ И СРОКИ
• Бюджет: ₽300,000 - ₽500,000
• Временные рамки: 2-3 месяца

🔧 ТРЕБУЕМЫЕ ФУНКЦИИ
• Авторизация пользователей
• Система оплаты
• Админ-панель

🎬 БЫСТРЫЕ ДЕЙСТВИЯ:
• Ответить на email: ivan@example.com
• Позвонить: +7 (915) 123-45-67
• Оценить проект и составить предложение

#заявка #новый_клиент #website
```

## 🛠 Технологии

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS
- Motion/React (анимации)
- Radix UI + shadcn/ui

**Backend:**
- Node.js + Express
- Telegram Bot API
- PM2 (процесс-менеджер)

**DevOps:**
- Nginx (reverse proxy)
- GitHub Actions (CI/CD)
- SSL/HTTPS

## 🔧 API Endpoints

- `POST /api/submit-order` - Отправка заявки на разработку
- `POST /api/submit-contact` - Отправка контактного сообщения
- `POST /api/test-order-format` - Тест форматирования заявки
- `GET /health` - Проверка здоровья сервиса
- `POST /webhook/telegram` - Webhook для Telegram

## 📞 Контакты

- **Сайт:** https://eda-tech.ru
- **Telegram:** @eda_tech_support_bot
- **Email:** hello@eda-tech.dev

## 📄 Лицензия

MIT License - см. файл LICENSE для деталей.

---

**🎯 EDA-TECH Studio - Превращаем идеи в реальность!**
