#!/bin/bash

# 🚀 Автоматический деплой EDA-TECH на VPS
# Использование: ./deploy-to-vps.sh

set -e  # Остановка при первой ошибке

# Цвета для красивого вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Начинаем деплой EDA-TECH на VPS${NC}"

# Проверка что мы в правильной директории
if [ ! -f "telegram-bot.js" ]; then
    echo -e "${RED}❌ Ошибка: файл telegram-bot.js не найден. Запустите скрипт из корня проекта.${NC}"
    exit 1
fi

# Функция для логирования
log() {
    echo -e "${GREEN}✅ $1${NC}"
}

warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# 1. Обновление кода с GitHub
echo -e "${BLUE}📦 Обновляем код с GitHub...${NC}"
git pull origin master || {
    error "Не удалось обновить код с GitHub"
    exit 1
}
log "Код обновлен с GitHub"

# 2. Установка зависимостей для бота
echo -e "${BLUE}📦 Устанавливаем зависимости для Telegram бота...${NC}"
npm install || {
    error "Не удалось установить зависимости для бота"
    exit 1
}
log "Зависимости бота установлены"

# 3. Сборка фронтенда
echo -e "${BLUE}🏗️  Собираем React фронтенд...${NC}"
cd "Design Eda-Tech Website"
npm install || {
    error "Не удалось установить зависимости для фронтенда"
    exit 1
}
npm run build || {
    error "Не удалось собрать фронтенд"
    exit 1
}
cd ..
log "Фронтенд успешно собран"

# 4. Остановка старого процесса PM2 (если существует)
echo -e "${BLUE}🔄 Управление PM2 процессами...${NC}"
if pm2 list | grep -q "eda-tech-telegram-bot"; then
    pm2 stop eda-tech-telegram-bot || warn "Не удалось остановить старый процесс"
    pm2 delete eda-tech-telegram-bot || warn "Не удалось удалить старый процесс"
fi

# 5. Запуск нового процесса через PM2
pm2 start ecosystem.config.js || {
    error "Не удалось запустить бота через PM2"
    exit 1
}
pm2 save
log "Telegram бот запущен через PM2"

# 6. Обновление Nginx конфигурации
echo -e "${BLUE}🌐 Обновляем Nginx конфигурацию...${NC}"
if [ -f "nginx-eda-tech.conf" ]; then
    sudo cp nginx-eda-tech.conf /etc/nginx/sites-available/eda-tech.ru || {
        warn "Не удалось скопировать конфигурацию Nginx. Сделайте это вручную."
    }
    
    # Включение сайта
    sudo ln -sf /etc/nginx/sites-available/eda-tech.ru /etc/nginx/sites-enabled/ || {
        warn "Не удалось создать символическую ссылку для сайта"
    }
    
    # Тест конфигурации
    sudo nginx -t && {
        log "Nginx конфигурация корректна"
        sudo systemctl reload nginx
        log "Nginx перезагружен"
    } || {
        error "Ошибка в конфигурации Nginx. Проверьте файл вручную."
    }
else
    warn "Файл nginx-eda-tech.conf не найден. Настройте Nginx вручную."
fi

# 7. Ожидание запуска бота
echo -e "${BLUE}⏳ Ожидаем запуска бота (5 секунд)...${NC}"
sleep 5

# 8. Проверка health endpoint
echo -e "${BLUE}🏥 Проверяем health endpoint...${NC}"
if curl -s http://localhost:3001/health | grep -q "OK"; then
    log "Health check прошел успешно"
else
    warn "Health check не прошел. Проверьте логи PM2."
fi

# 9. Установка Telegram webhook
echo -e "${BLUE}🔗 Настраиваем Telegram webhook...${NC}"
BOT_TOKEN="8346452116:AAFq5oOG_e-zF4A1Tmw_faWlP2WTspxw1Jk"
WEBHOOK_URL="https://eda-tech.ru/webhook/telegram"

WEBHOOK_RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
     -H "Content-Type: application/json" \
     -d "{\"url\": \"${WEBHOOK_URL}\"}")

if echo "$WEBHOOK_RESPONSE" | grep -q '"ok":true'; then
    log "Telegram webhook установлен успешно"
else
    error "Не удалось установить Telegram webhook"
    echo "Ответ: $WEBHOOK_RESPONSE"
fi

# 10. Финальное тестирование
echo -e "${BLUE}🧪 Финальное тестирование...${NC}"

# Тест API
echo "Тестируем API endpoint..."
API_RESPONSE=$(curl -s -w "%{http_code}" -X POST https://eda-tech.ru/api/test-order-format \
    -H "Content-Type: application/json")

HTTP_CODE="${API_RESPONSE: -3}"
if [ "$HTTP_CODE" = "200" ]; then
    log "API endpoint работает корректно"
else
    warn "API endpoint вернул код: $HTTP_CODE"
    echo "Возможно нужно время для загрузки или проверить Nginx конфигурацию"
fi

# Тест Telegram webhook
echo "Проверяем Telegram webhook..."
WEBHOOK_INFO=$(curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo")
if echo "$WEBHOOK_INFO" | grep -q "\"url\":\"${WEBHOOK_URL}\""; then
    log "Telegram webhook настроен правильно"
else
    warn "Проблема с настройкой Telegram webhook"
fi

# 11. Показать статус
echo -e "${BLUE}📊 Статус развертывания:${NC}"
echo "PM2 процессы:"
pm2 list
echo ""
echo "Nginx статус:"
sudo systemctl status nginx --no-pager -l
echo ""

# 12. Полезная информация
echo -e "${GREEN}🎉 Деплой завершен!${NC}"
echo ""
echo -e "${BLUE}📋 Полезная информация:${NC}"
echo "• Сайт: https://eda-tech.ru"
echo "• API Health: https://eda-tech.ru/health"  
echo "• Telegram бот: @eda_tech_support_bot"
echo "• PM2 логи: pm2 logs eda-tech-telegram-bot"
echo "• Nginx логи: sudo tail -f /var/log/nginx/error.log"
echo ""
echo -e "${YELLOW}🔍 Для отладки:${NC}"
echo "• pm2 status"
echo "• pm2 logs eda-tech-telegram-bot"
echo "• sudo nginx -t"
echo "• curl https://eda-tech.ru/health"
echo ""
echo -e "${GREEN}✨ Проект EDA-TECH успешно развернут!${NC}"
