# Автопродление SSL сертификатов

## Настроенные механизмы автопродления

### 1. Docker контейнер certbot
**Автоматическое обновление каждые 12 часов**

Контейнер `certbot` в `docker-compose.yml` настроен на автоматическую проверку и обновление сертификатов:
```yaml
certbot:
  image: certbot/certbot
  container_name: certbot
  restart: unless-stopped
  entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew --quiet --deploy-hook \"echo Renewed\"; sleep 12h & wait $${!}; done;'"
```

### 2. Cron задача на хосте
**Проверка сертификатов 2 раза в день: 03:00 и 15:00**

```bash
0 3,15 * * * /home/ubuntu/eda-tech.ru/renew-ssl.sh
```

Скрипт `/home/ubuntu/eda-tech.ru/renew-ssl.sh`:
- Проверяет необходимость обновления сертификатов
- Обновляет сертификаты если срок истекает < 30 дней
- Перезагружает nginx после успешного обновления
- Логирует все операции в `~/ssl-renewal.log`

### 3. Автоматическая перезагрузка nginx
**Nginx перезагружается каждые 6 часов**

Контейнер `nginx-proxy` настроен на автоматическую перезагрузку конфигурации:
```yaml
command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
```

## Проверка статуса сертификатов

### На сервере:
```bash
ssh -i <ключ> ubuntu@109.120.191.172
cd ~/eda-tech.ru
docker-compose exec certbot certbot certificates
```

### С локальной машины:
```bash
echo | openssl s_client -servername eda-tech.ru -connect eda-tech.ru:443 2>/dev/null | openssl x509 -noout -dates
```

## Текущий сертификат

- **Домены:** eda-tech.ru, www.eda-tech.ru
- **Срок действия:** до 30 декабря 2025 (89 дней)
- **Тип ключа:** ECDSA
- **Выпущен:** Let's Encrypt

## Ручное обновление

Если нужно обновить сертификаты вручную:

```bash
ssh -i <ключ> ubuntu@109.120.191.172
cd ~/eda-tech.ru

# Запуск скрипта обновления
./renew-ssl.sh

# Или через docker-compose
docker-compose run --rm certbot renew
docker-compose restart nginx-proxy
```

## Мониторинг

### Просмотр логов автообновления:
```bash
ssh -i <ключ> ubuntu@109.120.191.172
tail -f ~/ssl-renewal.log
```

### Просмотр логов certbot:
```bash
ssh -i <ключ> ubuntu@109.120.191.172
cd ~/eda-tech.ru
docker-compose logs -f certbot
```

### Проверка cron задач:
```bash
ssh -i <ключ> ubuntu@109.120.191.172
crontab -l
```

## Резервное копирование сертификатов

Сертификаты хранятся в:
```
~/eda-tech.ru/certbot/conf/live/eda-tech.ru/
~/eda-tech.ru/certbot/conf/archive/eda-tech.ru/
```

Рекомендуется периодически делать бэкап:
```bash
cd ~/eda-tech.ru
tar -czf ssl-backup-$(date +%Y%m%d).tar.gz certbot/conf/
```

## Troubleshooting

### Сертификат не обновился автоматически

1. Проверьте логи:
```bash
docker-compose logs certbot
cat ~/ssl-renewal.log
```

2. Проверьте что контейнеры запущены:
```bash
docker-compose ps
```

3. Запустите обновление вручную:
```bash
./renew-ssl.sh
```

### Nginx не подхватил новый сертификат

```bash
docker-compose restart nginx-proxy
docker-compose logs nginx-proxy
```

### Rate limit Let's Encrypt

Let's Encrypt имеет лимиты:
- 5 неудачных попыток в час
- 50 сертификатов в неделю на домен

При превышении подождите несколько часов/дней.

## Безопасность

- Сертификаты хранятся с правами root
- Приватные ключи не копируются и не передаются
- Автоматическое обновление минимизирует риск истечения срока
- Двойная защита: Docker + Cron




