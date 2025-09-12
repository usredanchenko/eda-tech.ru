#!/bin/bash

# GitHub Setup и создание MR для EDA-Tech Website
# Требует установленного GitHub CLI (gh)

set -e

echo "🚀 Setting up GitHub repository and creating MR..."

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Проверка GitHub CLI
if ! command -v gh &> /dev/null; then
    echo -e "${RED}GitHub CLI не установлен. Установите его:${NC}"
    echo "macOS: brew install gh"
    echo "Ubuntu: sudo apt install gh"
    echo "Windows: winget install GitHub.cli"
    exit 1
fi

# Аутентификация в GitHub
echo -e "${BLUE}🔐 Checking GitHub authentication...${NC}"
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}Необходима аутентификация в GitHub${NC}"
    gh auth login
fi

# Создание репозитория
echo -e "${BLUE}📁 Creating GitHub repository...${NC}"
gh repo create eda-tech/eda-tech \
    --public \
    --description "EDA-Tech Website - Современный веб-сайт для IT-компании" \
    --homepage "https://eda-tech.ru" \
    --clone=false

# Обновление remote URL
echo -e "${BLUE}🔗 Updating remote URL...${NC}"
git remote set-url origin https://github.com/eda-tech/eda-tech.git

# Push main ветки
echo -e "${BLUE}⬆️  Pushing main branch...${NC}"
git checkout main
git push -u origin main

# Push feature ветки
echo -e "${BLUE}⬆️  Pushing feature branch...${NC}"
git checkout feature/production-deployment
git push -u origin feature/production-deployment

# Создание Pull Request
echo -e "${BLUE}🔄 Creating Pull Request...${NC}"
gh pr create \
    --title "feat: Add production deployment infrastructure" \
    --body "## 🚀 Production Deployment Setup

### ✨ Новые возможности
- 📦 **Автоматический деплой** на VK Cloud с помощью \`deploy.sh\`
- 🐳 **Docker контейнеризация** с multi-stage build
- 🌐 **Nginx конфигурация** с security headers и кэшированием
- 📊 **Мониторинг** с Prometheus и Grafana
- 🔒 **Безопасность** с rate limiting и CORS
- 🏥 **Health checks** для контроля состояния

### 📁 Добавленные файлы
- \`deploy.sh\` - Скрипт автоматического деплоя
- \`Dockerfile\` - Конфигурация Docker образа
- \`docker-compose.yml\` - Оркестрация контейнеров
- \`nginx.conf\` - Конфигурация веб-сервера
- \`.gitignore\` - Исключения для Git
- \`README.md\` - Обновленная документация

### 🛠 Технические детали
- **Сервер**: VK Cloud VM (109.120.191.172)
- **Веб-сервер**: Nginx с оптимизациями
- **Контейнеры**: Docker + Docker Compose
- **Мониторинг**: Prometheus + Grafana
- **Безопасность**: Security headers, rate limiting

### 🚀 Деплой
\`\`\`bash
# Автоматический деплой
./deploy.sh

# Или через Docker
docker-compose up -d
\`\`\`

### ✅ Готово к продакшену
- [x] Оптимизированная сборка
- [x] Security headers
- [x] Gzip сжатие
- [x] Health checks
- [x] Мониторинг
- [x] Документация

**Готово к мержу в main для деплоя на продакшен! 🎉**" \
    --head feature/production-deployment \
    --base main

echo -e "${GREEN}✅ GitHub repository and Pull Request created successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo "1. Review the Pull Request: $(gh pr view --web)"
echo "2. Merge the PR when ready"
echo "3. Deploy to VK Cloud: ./deploy.sh"
echo ""
echo -e "${YELLOW}🔗 Repository URL: https://github.com/eda-tech/eda-tech${NC}"
