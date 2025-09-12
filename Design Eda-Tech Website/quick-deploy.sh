#!/bin/bash

# Quick Deploy Script для продолжения деплоя
# После того как сервер станет доступен

set -e

VK_HOST="109.120.191.172"
VK_USER="ubuntu"
SSH_KEY="~/.ssh/id_rsa_vkc"
REPO_URL="https://github.com/usredanchenko/eda-tech-website.git"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Quick Deploy - продолжение деплоя EDA-Tech Website${NC}"

# Проверка доступности сервера
echo -e "${BLUE}🔍 Проверка доступности сервера...${NC}"
for i in {1..10}; do
    if ssh -i "$SSH_KEY" -o ConnectTimeout=5 -o StrictHostKeyChecking=no "$VK_USER@$VK_HOST" "echo 'Server is up'" 2>/dev/null; then
        echo -e "${GREEN}✅ Сервер доступен${NC}"
        break
    else
        echo -e "${YELLOW}⏳ Попытка $i/10 - сервер недоступен, ждем 10 сек...${NC}"
        sleep 10
    fi
    
    if [ $i -eq 10 ]; then
        echo -e "${YELLOW}⚠️  Сервер недоступен. Попробуйте позже или проверьте:${NC}"
        echo "1. Статус VM в VK Cloud Console"
        echo "2. SSH ключ: $SSH_KEY"
        echo "3. Сетевые настройки"
        exit 1
    fi
done

echo -e "${BLUE}📋 Продолжение деплоя...${NC}"

ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$VK_USER@$VK_HOST" << 'EOF'
    echo "🔍 Проверка установленного ПО..."
    
    # Проверка Docker
    if command -v docker &> /dev/null; then
        echo "✅ Docker установлен: $(docker --version)"
    else
        echo "❌ Docker не найден"
        exit 1
    fi
    
    # Проверка Docker Compose
    if command -v docker-compose &> /dev/null; then
        echo "✅ Docker Compose установлен: $(docker-compose --version)"
    elif docker compose version &> /dev/null; then
        echo "✅ Docker Compose (plugin) установлен: $(docker compose version)"
    else
        echo "❌ Docker Compose не найден"
        exit 1
    fi
    
    # Добавление пользователя в группу docker
    sudo usermod -aG docker ubuntu
    
    echo "📁 Создание директорий..."
    sudo mkdir -p /var/www/eda-tech
    sudo chown -R ubuntu:ubuntu /var/www/eda-tech
    mkdir -p ~/backups
    
    echo "📥 Клонирование репозитория..."
    cd /var/www
    rm -rf eda-tech
    git clone https://github.com/usredanchenko/eda-tech-website.git eda-tech
    cd eda-tech
    
    echo "🔧 Настройка окружения..."
    cat > .env << 'ENV_EOF'
NODE_ENV=production
VITE_API_URL=https://api.eda-tech.ru
ENV_EOF
    
    echo "🐳 Запуск Docker контейнеров..."
    # Используем newgrp для применения группы docker
    newgrp docker << 'DOCKER_EOF'
        cd /var/www/eda-tech
        docker-compose down || true
        docker-compose build --no-cache
        docker-compose up -d
        
        echo "⏳ Ожидание запуска сервисов..."
        sleep 30
        
        echo "🏥 Проверка здоровья сервисов..."
        docker-compose ps
        
        if curl -f http://localhost/health 2>/dev/null; then
            echo "✅ Приложение работает"
        else
            echo "⚠️  Приложение может быть еще не готово"
            docker-compose logs --tail=20
        fi
DOCKER_EOF
    
    echo "⚙️  Настройка Nginx..."
    sudo tee /etc/nginx/sites-available/eda-tech > /dev/null << 'NGINX_EOF'
server {
    listen 80;
    listen [::]:80;
    
    server_name eda-tech.ru www.eda-tech.ru 109.120.191.172;
    
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /health {
        proxy_pass http://localhost:80/health;
    }
}
NGINX_EOF
    
    # Активация сайта
    sudo ln -sf /etc/nginx/sites-available/eda-tech /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Проверка и перезапуск Nginx
    sudo nginx -t
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    echo "🔥 Настройка firewall..."
    sudo ufw --force reset
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow ssh
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw --force enable
    
    echo "✅ Деплой завершен!"
EOF

echo ""
echo -e "${GREEN}🎉 Деплой завершен успешно!${NC}"
echo ""
echo -e "${BLUE}🌐 Доступные URL:${NC}"
echo "• Website: http://$VK_HOST"
echo "• Health Check: http://$VK_HOST/health"
echo ""
echo -e "${YELLOW}📋 Следующие шаги:${NC}"
echo "1. Настроить DNS: eda-tech.ru -> $VK_HOST"
echo "2. Установить SSL сертификат"
echo "3. Настроить мониторинг"
echo ""
echo -e "${GREEN}✅ EDA-Tech Website развернут! 🚀${NC}"
