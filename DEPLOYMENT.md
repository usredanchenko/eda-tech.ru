# Инструкция по развертыванию на VK Cloud

## Предварительные требования

1. SSH ключ для доступа к серверу VK Cloud
2. Настроенные DNS записи для домена eda-tech.ru:
   - A запись: eda-tech.ru → 109.120.191.172
   - A запись: www.eda-tech.ru → 109.120.191.172

## Автоматическое развертывание

### 1. Настройка SSH ключа

Убедитесь, что у вас есть SSH ключ и настройте путь в `deploy.sh`:

```bash
SSH_KEY="<путь к ключу id_rsa_vkc>"
```

### 2. Настройка email для SSL

Отредактируйте `init-ssl.sh` и укажите ваш email:

```bash
EMAIL="admin@eda-tech.ru"
```

### 3. Запуск развертывания

```bash
chmod +x deploy.sh
./deploy.sh
```

Скрипт автоматически:
- Создаст нужные директории на сервере
- Скопирует все файлы проекта
- Установит Docker и Docker Compose (если не установлены)
- Соберет и запустит контейнеры
- Получит SSL сертификат от Let's Encrypt
- Настроит автоматическое обновление сертификатов

## Ручное развертывание

### 1. Подключение к серверу

```bash
ssh -i <ключ id_rsa_vkc> ubuntu@109.120.191.172
```

### 2. Установка Docker (если не установлен)

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### 3. Установка Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 4. Копирование файлов на сервер

Из локальной машины:

```bash
scp -i <ключ id_rsa_vkc> -r ./* ubuntu@109.120.191.172:~/eda-tech.ru/
```

### 5. Запуск на сервере

```bash
cd ~/eda-tech.ru

# Создаем директории для SSL
mkdir -p certbot/conf certbot/www

# Запускаем контейнер с приложением
docker-compose up -d --build web

# Инициализируем SSL (первый раз)
chmod +x init-ssl.sh
./init-ssl.sh

# Запускаем все контейнеры с SSL
docker-compose up -d
```

## Управление

### Просмотр логов

```bash
docker-compose logs -f
docker-compose logs -f web
docker-compose logs -f nginx-proxy
docker-compose logs -f certbot
```

### Перезапуск

```bash
docker-compose restart
```

### Остановка

```bash
docker-compose down
```

### Обновление кода

```bash
# На локальной машине
./deploy.sh

# Или на сервере
cd ~/eda-tech.ru
git pull  # если используете git
docker-compose up -d --build
```

### Ручное обновление SSL сертификата

```bash
docker-compose run --rm certbot renew
docker-compose restart nginx-proxy
```

## Проверка работоспособности

1. HTTP → HTTPS редирект: http://eda-tech.ru
2. HTTPS: https://eda-tech.ru
3. WWW версия: https://www.eda-tech.ru

## Мониторинг

### Проверка статуса контейнеров

```bash
docker-compose ps
```

### Проверка SSL сертификата

```bash
docker-compose exec certbot certbot certificates
```

### Проверка срока действия сертификата

```bash
echo | openssl s_client -servername eda-tech.ru -connect eda-tech.ru:443 2>/dev/null | openssl x509 -noout -dates
```

## Firewall (UFW)

На сервере должны быть открыты порты:

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Troubleshooting

### SSL сертификат не получен

```bash
# Проверьте DNS записи
nslookup eda-tech.ru
nslookup www.eda-tech.ru

# Проверьте логи certbot
docker-compose logs certbot

# Попробуйте получить сертификат вручную
docker-compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot --email admin@eda-tech.ru --agree-tos --no-eff-email -d eda-tech.ru -d www.eda-tech.ru
```

### Nginx не запускается

```bash
# Проверьте конфигурацию
docker-compose exec nginx-proxy nginx -t

# Проверьте логи
docker-compose logs nginx-proxy
```

### Сайт не открывается

```bash
# Проверьте, что контейнеры запущены
docker-compose ps

# Проверьте порты
netstat -tulpn | grep -E ':(80|443)'

# Проверьте firewall
sudo ufw status
```

## Архитектура

```
Internet
   ↓
nginx-proxy (порты 80, 443) 
   ↓ [SSL termination]
   ↓
web (внутренний порт 80)
   ↓
Статические файлы React

certbot - автоматическое обновление SSL каждые 12 часов
```

## Безопасность

- SSL/TLS сертификаты от Let's Encrypt
- Автоматический редирект HTTP → HTTPS
- Security headers (HSTS, X-Frame-Options, CSP)
- TLS 1.2+ только
- Регулярное автообновление сертификатов

## Производительность

- Gzip сжатие
- Кэширование статических файлов (1 год)
- HTTP/2
- Multi-stage Docker build для минимального размера образа




