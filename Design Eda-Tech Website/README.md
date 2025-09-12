# EDA-Tech Website 🚀

Современный веб-сайт для EDA-Tech, созданный с использованием React, TypeScript и Tailwind CSS.

## 🌟 Особенности

- ⚡ **Быстрая загрузка** - оптимизированная сборка с Vite
- 📱 **Адаптивный дизайн** - идеально работает на всех устройствах
- 🎨 **Современный UI** - красивые анимации и градиенты
- 🌐 **Мультиязычность** - поддержка русского и английского языков
- 🔒 **Безопасность** - настроенные security headers
- 📊 **Мониторинг** - интеграция с Prometheus и Grafana

## 🛠 Технологический стек

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Анимации**: Motion (Framer Motion)
- **Иконки**: Lucide React
- **Сборка**: Vite
- **Контейнеризация**: Docker
- **Веб-сервер**: Nginx
- **Мониторинг**: Prometheus, Grafana

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Клонирование репозитория
git clone https://github.com/eda-tech/eda-tech.git
cd eda-tech

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

### Docker развертывание

```bash
# Сборка и запуск с Docker Compose
docker-compose up -d

# Только веб-приложение
docker build -t eda-tech-website .
docker run -p 80:80 eda-tech-website
```

## 🌐 Деплой на VK Cloud

### Автоматический деплой

```bash
# Убедитесь, что SSH ключ настроен
cp ~/.ssh/your_key ~/.ssh/id_rsa_vkc
chmod 600 ~/.ssh/id_rsa_vkc

# Запуск автоматического деплоя
./deploy.sh
```

### Ручной деплой

```bash
# 1. Подключение к серверу
ssh -i ~/.ssh/id_rsa_vkc ubuntu@109.120.191.172

# 2. Обновление системы
sudo apt update && sudo apt upgrade -y

# 3. Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker ubuntu

# 4. Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 5. Клонирование и запуск
git clone https://github.com/eda-tech/eda-tech.git
cd eda-tech
docker-compose up -d
```

## 📁 Структура проекта

```
eda-tech/
├── src/
│   ├── components/          # React компоненты
│   │   ├── ui/             # UI компоненты
│   │   ├── Header.tsx      # Шапка сайта
│   │   ├── Hero.tsx        # Главный экран
│   │   ├── Services.tsx    # Услуги
│   │   ├── Portfolio.tsx   # Портфолио
│   │   ├── History.tsx     # История компании
│   │   ├── Contact.tsx     # Контакты
│   │   └── OrderForm.tsx   # Форма заказа
│   ├── hooks/              # React хуки
│   ├── styles/             # Стили
│   └── assets/             # Статические файлы
├── public/                 # Публичные файлы
├── deploy.sh              # Скрипт деплоя
├── Dockerfile             # Docker конфигурация
├── docker-compose.yml     # Docker Compose
├── nginx.conf             # Nginx конфигурация
└── vite.config.ts         # Vite конфигурация
```

## 🔧 Конфигурация

### Переменные окружения

```bash
# .env.local
NODE_ENV=production
VITE_API_URL=https://api.eda-tech.ru
VITE_ANALYTICS_ID=your_analytics_id
```

### Nginx конфигурация

Основные настройки в `nginx.conf`:
- Gzip сжатие
- Security headers
- Кэширование статических файлов
- Rate limiting
- Health checks

## 📊 Мониторинг

### Prometheus метрики

- HTTP запросы и ответы
- Время отклика
- Использование ресурсов
- Ошибки приложения

### Grafana дашборды

- Веб-трафик
- Производительность
- Системные метрики
- Алерты

Доступ: `http://your-server:3000` (admin/admin123)

## 🔒 Безопасность

### Настроенные security headers

- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer-when-downgrade
- Content-Security-Policy

### Rate limiting

- API: 10 запросов/сек
- Login: 1 запрос/сек

## 🚀 CI/CD Pipeline

### GitHub Actions (рекомендуется)

```yaml
# .github/workflows/deploy.yml
name: Deploy to VK Cloud
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        run: ./deploy.sh
```

## 📈 Производительность

### Оптимизации

- Code splitting по маршрутам
- Lazy loading компонентов
- Оптимизация изображений
- Минификация CSS/JS
- Gzip сжатие

### Метрики

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🌍 Мультиязычность

Поддерживаемые языки:
- 🇷🇺 Русский (по умолчанию)
- 🇺🇸 English

Переключение языка через хук `useLanguage`.

## 📞 Поддержка

- **Email**: hello@eda-tech.dev
- **Telegram**: @eda_tech
- **GitHub Issues**: [Создать issue](https://github.com/eda-tech/eda-tech/issues)

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл.

## 🤝 Участие в разработке

1. Fork репозитория
2. Создайте feature ветку (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в ветку (`git push origin feature/amazing-feature`)
5. Создайте Pull Request

---

**EDA-Tech** - Создаем цифровое будущее 🚀