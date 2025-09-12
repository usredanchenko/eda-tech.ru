#!/bin/bash

# EDA-Tech Website Deployment Script for VK Cloud
# DevOps Pipeline для деплоя React приложения

set -e

echo "🚀 Starting EDA-Tech Website Deployment..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Конфигурация
PROJECT_NAME="eda-tech-website"
BUILD_DIR="build"
DEPLOY_USER="ubuntu"
DEPLOY_HOST="109.120.191.172"
DEPLOY_PATH="/var/www/eda-tech"
SSH_KEY="~/.ssh/id_rsa_vkc"
NGINX_CONFIG="/etc/nginx/sites-available/eda-tech"

echo -e "${BLUE}📋 Configuration:${NC}"
echo -e "  Project: ${PROJECT_NAME}"
echo -e "  Host: ${DEPLOY_HOST}"
echo -e "  User: ${DEPLOY_USER}"
echo -e "  Path: ${DEPLOY_PATH}"

# Функция для логирования
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Проверка зависимостей
check_dependencies() {
    log "🔍 Checking dependencies..."
    
    command -v node >/dev/null 2>&1 || error "Node.js is not installed"
    command -v npm >/dev/null 2>&1 || error "npm is not installed"
    command -v git >/dev/null 2>&1 || error "git is not installed"
    
    if [ ! -f "$SSH_KEY" ]; then
        error "SSH key not found: $SSH_KEY"
    fi
    
    log "✅ All dependencies are available"
}

# Установка зависимостей
install_dependencies() {
    log "📦 Installing dependencies..."
    npm ci --production=false
    log "✅ Dependencies installed"
}

# Сборка проекта
build_project() {
    log "🔨 Building project..."
    
    # Очистка предыдущей сборки
    rm -rf $BUILD_DIR
    
    # Сборка
    npm run build
    
    if [ ! -d "$BUILD_DIR" ]; then
        error "Build failed - $BUILD_DIR directory not found"
    fi
    
    log "✅ Project built successfully"
}

# Создание архива для деплоя
create_deployment_archive() {
    log "📦 Creating deployment archive..."
    
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    ARCHIVE_NAME="${PROJECT_NAME}_${TIMESTAMP}.tar.gz"
    
    tar -czf $ARCHIVE_NAME -C $BUILD_DIR .
    
    if [ ! -f "$ARCHIVE_NAME" ]; then
        error "Failed to create deployment archive"
    fi
    
    echo $ARCHIVE_NAME
}

# Подготовка сервера
prepare_server() {
    log "🖥️  Preparing server..."
    
    ssh -i $SSH_KEY $DEPLOY_USER@$DEPLOY_HOST << 'EOF'
        # Обновление системы
        sudo apt update
        
        # Установка Nginx если не установлен
        if ! command -v nginx &> /dev/null; then
            echo "Installing Nginx..."
            sudo apt install -y nginx
        fi
        
        # Установка Node.js если не установлен (для возможных SSR задач)
        if ! command -v node &> /dev/null; then
            echo "Installing Node.js..."
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
        fi
        
        # Создание директории для проекта
        sudo mkdir -p /var/www/eda-tech
        sudo chown -R ubuntu:ubuntu /var/www/eda-tech
        
        # Создание директории для бэкапов
        mkdir -p ~/backups/eda-tech
        
        echo "✅ Server prepared"
EOF
    
    log "✅ Server preparation completed"
}

# Создание конфигурации Nginx
create_nginx_config() {
    log "⚙️  Creating Nginx configuration..."
    
    ssh -i $SSH_KEY $DEPLOY_USER@$DEPLOY_HOST << 'EOF'
        sudo tee /etc/nginx/sites-available/eda-tech > /dev/null << 'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    
    server_name eda-tech.ru www.eda-tech.ru 109.120.191.172;
    root /var/www/eda-tech;
    index index.html index.htm;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Cache HTML files for shorter time
    location ~* \.(html)$ {
        expires 1h;
        add_header Cache-Control "public";
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
NGINX_CONFIG
        
        # Активация сайта
        sudo ln -sf /etc/nginx/sites-available/eda-tech /etc/nginx/sites-enabled/
        
        # Удаление дефолтного сайта если есть
        sudo rm -f /etc/nginx/sites-enabled/default
        
        # Проверка конфигурации
        sudo nginx -t
        
        echo "✅ Nginx configuration created"
EOF
    
    log "✅ Nginx configuration completed"
}

# Деплой приложения
deploy_application() {
    local archive_name=$1
    log "🚀 Deploying application..."
    
    # Копирование архива на сервер
    scp -i $SSH_KEY $archive_name $DEPLOY_USER@$DEPLOY_HOST:~/
    
    # Деплой на сервере
    ssh -i $SSH_KEY $DEPLOY_USER@$DEPLOY_HOST << EOF
        # Создание бэкапа текущей версии
        if [ -d "$DEPLOY_PATH" ] && [ "\$(ls -A $DEPLOY_PATH)" ]; then
            BACKUP_NAME="backup_\$(date +%Y%m%d_%H%M%S)"
            echo "Creating backup: \$BACKUP_NAME"
            tar -czf ~/backups/eda-tech/\$BACKUP_NAME.tar.gz -C $DEPLOY_PATH .
        fi
        
        # Очистка директории деплоя
        sudo rm -rf $DEPLOY_PATH/*
        
        # Распаковка нового релиза
        tar -xzf ~/$archive_name -C $DEPLOY_PATH
        
        # Установка правильных прав
        sudo chown -R www-data:www-data $DEPLOY_PATH
        sudo chmod -R 755 $DEPLOY_PATH
        
        # Перезапуск Nginx
        sudo systemctl reload nginx
        
        # Проверка статуса
        sudo systemctl status nginx --no-pager
        
        # Очистка временных файлов
        rm ~/$archive_name
        
        echo "✅ Application deployed successfully"
EOF
    
    # Очистка локального архива
    rm $archive_name
    
    log "✅ Deployment completed"
}

# Проверка деплоя
verify_deployment() {
    log "🔍 Verifying deployment..."
    
    # Проверка HTTP ответа
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$DEPLOY_HOST/health || echo "000")
    
    if [ "$HTTP_STATUS" = "200" ]; then
        log "✅ Health check passed (HTTP $HTTP_STATUS)"
    else
        warning "Health check failed (HTTP $HTTP_STATUS)"
    fi
    
    # Проверка основной страницы
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$DEPLOY_HOST/ || echo "000")
    
    if [ "$HTTP_STATUS" = "200" ]; then
        log "✅ Main page accessible (HTTP $HTTP_STATUS)"
    else
        error "Main page not accessible (HTTP $HTTP_STATUS)"
    fi
    
    log "🎉 Deployment verification completed"
}

# Основная функция деплоя
main() {
    log "🚀 Starting EDA-Tech deployment pipeline..."
    
    check_dependencies
    install_dependencies
    build_project
    
    archive_name=$(create_deployment_archive)
    
    prepare_server
    create_nginx_config
    deploy_application $archive_name
    verify_deployment
    
    echo ""
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${BLUE}🌐 Website URL: http://$DEPLOY_HOST${NC}"
    echo -e "${BLUE}🌐 Website URL: http://eda-tech.ru${NC}"
    echo ""
    echo -e "${YELLOW}📋 Next steps:${NC}"
    echo -e "  1. Configure DNS A record: eda-tech.ru -> $DEPLOY_HOST"
    echo -e "  2. Setup SSL certificate with Let's Encrypt"
    echo -e "  3. Configure monitoring and alerts"
    echo ""
}

# Запуск если скрипт вызван напрямую
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
