# 🚀 EDA-Tech Website Deployment Guide

Полное руководство по деплою EDA-Tech Website на VK Cloud с использованием современных DevOps практик.

## 📋 Содержание

1. [Быстрый старт](#быстрый-старт)
2. [Подготовка GitHub](#подготовка-github)
3. [Деплой на VK Cloud](#деплой-на-vk-cloud)
4. [Мониторинг и обслуживание](#мониторинг-и-обслуживание)
5. [Troubleshooting](#troubleshooting)

## 🚀 Быстрый старт

### Предварительные требования

- SSH ключ для VK Cloud
- GitHub CLI установлен
- Docker и Docker Compose на сервере
- Доступ к серверу: `ubuntu@109.120.191.172`

### Автоматический деплой

```bash
# 1. Настройка GitHub репозитория и создание MR
./setup-github.sh

# 2. Деплой на VK Cloud
./vk-cloud-deploy.sh
```

## 🐙 Подготовка GitHub

### Установка GitHub CLI

```bash
# macOS
brew install gh

# Ubuntu/Debian
sudo apt install gh

# Windows
winget install GitHub.cli
```

### Создание репозитория и MR

```bash
# Запуск автоматической настройки
./setup-github.sh
```

Скрипт выполнит:
- ✅ Аутентификацию в GitHub
- ✅ Создание репозитория `eda-tech/eda-tech`
- ✅ Push кода в репозиторий
- ✅ Создание Pull Request
- ✅ Настройку всех необходимых метаданных

### Ручная настройка GitHub

```bash
# Аутентификация
gh auth login

# Создание репозитория
gh repo create eda-tech/eda-tech --public

# Настройка remote
git remote add origin https://github.com/eda-tech/eda-tech.git

# Push кода
git push -u origin main

# Создание PR
gh pr create --title "feat: Production deployment" --body "Ready for production deployment"
```

## ☁️ Деплой на VK Cloud

### Подготовка SSH ключа

```bash
# Создание SSH ключа для VK Cloud
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_vkc

# Добавление публичного ключа в VK Cloud
cat ~/.ssh/id_rsa_vkc.pub
# Скопировать и добавить в VK Cloud Console -> Compute -> Key Pairs
```

### Автоматический деплой

```bash
# Полный автоматический деплой
./vk-cloud-deploy.sh
```

### Ручной деплой

#### Шаг 1: Подключение к серверу

```bash
ssh -i ~/.ssh/id_rsa_vkc ubuntu@109.120.191.172
```

#### Шаг 2: Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker ubuntu

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Установка Nginx
sudo apt install -y nginx
```

#### Шаг 3: Клонирование репозитория

```bash
# Клонирование
git clone https://github.com/eda-tech/eda-tech.git /var/www/eda-tech
cd /var/www/eda-tech

# Настройка прав
sudo chown -R ubuntu:ubuntu /var/www/eda-tech
```

#### Шаг 4: Запуск приложения

```bash
# Сборка и запуск
docker-compose up -d

# Проверка статуса
docker-compose ps
```

#### Шаг 5: Настройка Nginx

```bash
# Создание конфигурации
sudo cp nginx.conf /etc/nginx/sites-available/eda-tech
sudo ln -s /etc/nginx/sites-available/eda-tech /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Перезапуск Nginx
sudo nginx -t
sudo systemctl restart nginx
```

## 🔒 Настройка SSL

### Let's Encrypt

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d eda-tech.ru -d www.eda-tech.ru

# Автоматическое обновление
sudo crontab -e
# Добавить: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Мониторинг и обслуживание

### Доступ к мониторингу

- **Grafana**: http://109.120.191.172:3000 (admin/admin123)
- **Prometheus**: http://109.120.191.172:9090
- **Website**: http://109.120.191.172

### Основные команды

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск сервисов
docker-compose restart

# Обновление приложения
git pull origin main
docker-compose build --no-cache
docker-compose up -d

# Бэкап
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/eda-tech
```

### Health Checks

```bash
# Проверка здоровья приложения
curl http://109.120.191.172/health

# Проверка Nginx
curl http://109.120.191.172/nginx-health

# Проверка Docker контейнеров
docker-compose ps
```

## 🔧 Troubleshooting

### Проблемы с Docker

```bash
# Очистка Docker
docker system prune -a

# Пересборка образов
docker-compose build --no-cache

# Просмотр логов
docker-compose logs [service_name]
```

### Проблемы с Nginx

```bash
# Проверка конфигурации
sudo nginx -t

# Просмотр логов
sudo tail -f /var/log/nginx/error.log

# Перезапуск
sudo systemctl restart nginx
```

### Проблемы с SSL

```bash
# Проверка сертификата
sudo certbot certificates

# Принудительное обновление
sudo certbot renew --force-renewal

# Тест конфигурации
sudo nginx -t
```

### Проблемы с производительностью

```bash
# Мониторинг ресурсов
htop
df -h
free -h

# Анализ логов Nginx
sudo tail -f /var/log/nginx/access.log

# Проверка Docker ресурсов
docker stats
```

## 🔄 CI/CD Pipeline

### GitHub Actions (рекомендуется)

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VK Cloud

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to VK Cloud
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: 109.120.191.172
          username: ubuntu
          key: ${{ secrets.VK_CLOUD_SSH_KEY }}
          script: |
            cd /var/www/eda-tech
            git pull origin main
            docker-compose build --no-cache
            docker-compose up -d
```

### Настройка секретов

```bash
# Добавить SSH ключ в GitHub Secrets
gh secret set VK_CLOUD_SSH_KEY < ~/.ssh/id_rsa_vkc
```

## 📈 Оптимизация производительности

### Nginx оптимизации

- Gzip сжатие включено
- Кэширование статических файлов (1 год)
- Rate limiting настроен
- Security headers добавлены

### Docker оптимизации

- Multi-stage build для уменьшения размера образа
- Health checks для мониторинга
- Restart policies настроены

### Мониторинг метрик

- HTTP запросы и ответы
- Время отклика
- Использование CPU/Memory
- Дисковое пространство

## 🆘 Поддержка

При возникновении проблем:

1. Проверьте логи: `docker-compose logs`
2. Проверьте статус сервисов: `docker-compose ps`
3. Проверьте Nginx: `sudo nginx -t`
4. Обратитесь к команде: hello@eda-tech.dev

---

**EDA-Tech DevOps Team** 🚀
