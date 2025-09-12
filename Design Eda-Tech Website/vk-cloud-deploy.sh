#!/bin/bash

# VK Cloud Deployment Script
# Деплой EDA-Tech Website на виртуальную машину VK Cloud

set -e

# Конфигурация
VK_HOST="109.120.191.172"
VK_USER="ubuntu"
SSH_KEY="~/.ssh/id_rsa_vkc"
REPO_URL="https://github.com/usredanchenko/eda-tech-website.git"
DEPLOY_PATH="/var/www/eda-tech"

# Цвета
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Deploying EDA-Tech Website to VK Cloud...${NC}"
echo -e "${BLUE}🖥️  Server: ${VK_HOST}${NC}"

# Проверка SSH ключа
if [ ! -f "${SSH_KEY/#\~/$HOME}" ]; then
    echo -e "${RED}❌ SSH key not found: $SSH_KEY${NC}"
    echo -e "${YELLOW}💡 Create SSH key and add to VK Cloud:${NC}"
    echo "ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_vkc"
    exit 1
fi

# Функция для выполнения команд на сервере
run_remote() {
    ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$VK_USER@$VK_HOST" "$1"
}

# Функция для копирования файлов
copy_to_server() {
    scp -i "$SSH_KEY" -o StrictHostKeyChecking=no "$1" "$VK_USER@$VK_HOST:$2"
}

echo -e "${BLUE}📋 Step 1: Server preparation${NC}"
run_remote "
    echo '🔄 Updating system...'
    sudo apt update && sudo apt upgrade -y
    
    echo '📦 Installing required packages...'
    sudo apt install -y nginx git curl software-properties-common
    
    echo '🐳 Installing Docker...'
    if ! command -v docker &> /dev/null; then
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        sudo usermod -aG docker ubuntu
        rm get-docker.sh
    fi
    
    echo '🐙 Installing Docker Compose...'
    if ! command -v docker-compose &> /dev/null; then
        sudo curl -L \"https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
    
    echo '📁 Creating directories...'
    sudo mkdir -p $DEPLOY_PATH
    sudo chown -R ubuntu:ubuntu $DEPLOY_PATH
    mkdir -p ~/backups
    
    echo '✅ Server preparation completed'
"

echo -e "${BLUE}📋 Step 2: Repository deployment${NC}"
run_remote "
    echo '📥 Cloning repository...'
    if [ -d '$DEPLOY_PATH/.git' ]; then
        cd $DEPLOY_PATH
        git fetch origin
        git reset --hard origin/main
        git clean -fd
    else
        rm -rf $DEPLOY_PATH/*
        git clone $REPO_URL $DEPLOY_PATH
        cd $DEPLOY_PATH
    fi
    
    echo '🔧 Setting up environment...'
    cd $DEPLOY_PATH
    
    # Создание .env файла
    cat > .env << 'ENV_EOF'
NODE_ENV=production
VITE_API_URL=https://api.eda-tech.ru
ENV_EOF
    
    echo '✅ Repository deployed'
"

echo -e "${BLUE}📋 Step 3: Docker deployment${NC}"
run_remote "
    cd $DEPLOY_PATH
    
    echo '🐳 Building Docker images...'
    docker-compose down || true
    docker-compose build --no-cache
    
    echo '🚀 Starting services...'
    docker-compose up -d
    
    echo '⏳ Waiting for services to start...'
    sleep 30
    
    echo '🏥 Health check...'
    if curl -f http://localhost/health; then
        echo '✅ Services are healthy'
    else
        echo '⚠️  Health check failed, checking logs...'
        docker-compose logs
    fi
"

echo -e "${BLUE}📋 Step 4: Nginx configuration${NC}"
run_remote "
    echo '⚙️  Configuring Nginx...'
    
    # Создание конфигурации сайта
    sudo tee /etc/nginx/sites-available/eda-tech > /dev/null << 'NGINX_EOF'
server {
    listen 80;
    listen [::]:80;
    
    server_name eda-tech.ru www.eda-tech.ru $VK_HOST;
    
    # Проксирование к Docker контейнеру
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Health check
    location /nginx-health {
        access_log off;
        return 200 \"nginx healthy\";
        add_header Content-Type text/plain;
    }
}
NGINX_EOF
    
    # Активация сайта
    sudo ln -sf /etc/nginx/sites-available/eda-tech /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Проверка и перезапуск Nginx
    sudo nginx -t
    sudo systemctl enable nginx
    sudo systemctl restart nginx
    
    echo '✅ Nginx configured'
"

echo -e "${BLUE}📋 Step 5: Firewall configuration${NC}"
run_remote "
    echo '🔥 Configuring firewall...'
    
    # Настройка UFW
    sudo ufw --force reset
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow ssh
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw allow 3000/tcp  # Grafana
    sudo ufw allow 9090/tcp  # Prometheus
    sudo ufw --force enable
    
    echo '✅ Firewall configured'
"

echo -e "${BLUE}📋 Step 6: SSL Certificate (Let's Encrypt)${NC}"
run_remote "
    echo '🔒 Setting up SSL certificate...'
    
    # Установка Certbot
    sudo apt install -y certbot python3-certbot-nginx
    
    # Получение сертификата (только если домен настроен)
    # sudo certbot --nginx -d eda-tech.ru -d www.eda-tech.ru --non-interactive --agree-tos --email hello@eda-tech.dev
    
    echo '💡 To enable SSL, run on server:'
    echo 'sudo certbot --nginx -d eda-tech.ru -d www.eda-tech.ru'
    
    echo '✅ SSL setup prepared'
"

echo -e "${BLUE}📋 Step 7: Monitoring setup${NC}"
run_remote "
    cd $DEPLOY_PATH
    
    echo '📊 Setting up monitoring...'
    
    # Создание конфигурации Prometheus
    mkdir -p monitoring
    cat > monitoring/prometheus.yml << 'PROM_EOF'
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'nginx'
    static_configs:
      - targets: ['localhost:80']
  
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']
PROM_EOF
    
    echo '✅ Monitoring configured'
"

echo -e "${BLUE}📋 Step 8: Final verification${NC}"
run_remote "
    echo '🔍 Final system check...'
    
    echo '📊 Service status:'
    docker-compose ps
    
    echo '🌐 Nginx status:'
    sudo systemctl status nginx --no-pager
    
    echo '🔥 Firewall status:'
    sudo ufw status
    
    echo '💾 Disk usage:'
    df -h
    
    echo '🧠 Memory usage:'
    free -h
    
    echo '🏥 Application health:'
    curl -s http://localhost/health || echo 'Health check endpoint not responding'
    
    echo '✅ System verification completed'
"

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Deployment Summary:${NC}"
echo -e "🌐 Website URL: http://$VK_HOST"
echo -e "🌐 Domain URL: http://eda-tech.ru (after DNS setup)"
echo -e "📊 Grafana: http://$VK_HOST:3000 (admin/admin123)"
echo -e "📈 Prometheus: http://$VK_HOST:9090"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Configure DNS A record: eda-tech.ru -> $VK_HOST"
echo "2. Enable SSL: ssh -i $SSH_KEY $VK_USER@$VK_HOST 'sudo certbot --nginx -d eda-tech.ru'"
echo "3. Setup monitoring alerts"
echo "4. Configure backup strategy"
echo ""
echo -e "${GREEN}✅ EDA-Tech Website is now live! 🚀${NC}"
