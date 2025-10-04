<div align="center">

# 🚀 Егор Данченко - Портфолио

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://eda-tech.ru)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![SSL](https://img.shields.io/badge/SSL-secured-green?style=for-the-badge&logo=letsencrypt)](https://letsencrypt.org/)

**Современный одностраничный сайт-портфолио с плавными анимациями и эффектным дизайном**

[Живое демо](https://eda-tech.ru) • [Сообщить об ошибке](https://github.com/usredanchenko/eda-tech.ru/issues) • [Предложить функцию](https://github.com/usredanchenko/eda-tech.ru/issues)

</div>

---

## 📋 Содержание

- [О проекте](#-о-проекте)
- [Особенности](#-особенности)
- [Технологии](#-технологии)
- [Быстрый старт](#-быстрый-старт)
- [Развертывание](#-развертывание)
- [Структура проекта](#-структура-проекта)
- [Контакты](#-контакты)

---

## 🎯 О проекте

Современный сайт-портфолио с минималистичным дизайном, плавными анимациями и интерактивными элементами. Создан для демонстрации профессионального опыта, проектов и навыков.

### 🌟 Живое демо
**[https://eda-tech.ru](https://eda-tech.ru)**

### ✨ Основные секции
- 🏠 **Hero** - Приветствие с эффектом печатающейся машинки
- 💼 **Опыт работы** - Карьерный путь в ведущих IT-компаниях
- 🎓 **Образование** - Академический бэкграунд
- 🚀 **Проекты** - Портфолио реализованных проектов с живыми ссылками
- 📧 **Контакты** - Социальные сети и способы связи

---

## 🎨 Особенности

### 🎭 Дизайн и UX
- ✅ **Современный UI** с градиентами и glassmorphism эффектами
- ✅ **Плавные анимации** на базе Framer Motion
- ✅ **Эффект печатающейся машинки** для текста
- ✅ **Анимация змейки** на фоне
- ✅ **Адаптивный дизайн** для всех устройств
- ✅ **Темная тема** с неоновыми акцентами

### ⚡ Производительность
- ✅ **Быстрая загрузка** - оптимизированная сборка Vite
- ✅ **Lazy loading** изображений
- ✅ **Code splitting** для оптимальной производительности
- ✅ **Минификация** CSS и JS

### 🔧 Технические особенности
- ✅ **TypeScript** - типизация для надежности кода
- ✅ **Component-based architecture** - модульная структура
- ✅ **shadcn/ui** - готовые компоненты UI
- ✅ **Tailwind CSS** - утилитарный CSS фреймворк
- ✅ **Docker deployment** - контейнеризация
- ✅ **SSL сертификаты** - автоматическое обновление от Let's Encrypt
- ✅ **Nginx reverse proxy** - производительный веб-сервер

---

## 🛠 Технологии

### Frontend
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)

### UI библиотеки
- **Framer Motion** - анимации и переходы
- **shadcn/ui** - компоненты UI на базе Radix UI
- **Lucide React** - современные иконки
- **Tailwind Merge** - объединение CSS классов

### DevOps & Deployment
![Docker](https://img.shields.io/badge/Docker-latest-2496ED?style=flat-square&logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-alpine-009639?style=flat-square&logo=nginx)
![Let's Encrypt](https://img.shields.io/badge/Let's_Encrypt-SSL-003A70?style=flat-square&logo=letsencrypt)

---

## 🚀 Быстрый старт

### Предварительные требования

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Установка и запуск

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/usredanchenko/eda-tech.ru.git
cd eda-tech.ru
```

2. **Установите зависимости**
```bash
npm install
```

3. **Запустите dev сервер**
```bash
npm run dev
```

4. **Откройте в браузере**
```
http://localhost:3000
```

### 📦 Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в директории `build/`

---

## 🐳 Развертывание

### Docker

Проект готов к развертыванию в Docker с автоматическим SSL:

```bash
# Сборка образа
docker build -t eda-tech-portfolio .

# Запуск контейнера
docker run -d -p 80:80 eda-tech-portfolio
```

### Docker Compose (с SSL)

```bash
docker-compose up -d
```

Включает:
- ✅ Web приложение (React + Nginx)
- ✅ Nginx reverse proxy с SSL
- ✅ Certbot для автоматического обновления SSL

Подробная инструкция: [DEPLOYMENT.md](DEPLOYMENT.md)

### Автоматическое развертывание на VK Cloud

```bash
./deploy.sh
```

Скрипт автоматически:
1. Копирует файлы на сервер
2. Устанавливает Docker (если нужно)
3. Собирает и запускает контейнеры
4. Получает SSL сертификат от Let's Encrypt
5. Настраивает автообновление сертификатов

---

## 📁 Структура проекта

```
eda-tech.ru/
├── 📂 src/
│   ├── 📂 components/          # React компоненты
│   │   ├── HeroSection.tsx     # Главная секция
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── TypewriterText.tsx  # Эффект печати
│   │   ├── SnakeAnimation.tsx  # Анимация фона
│   │   └── 📂 ui/              # shadcn/ui компоненты
│   ├── 📂 styles/
│   │   └── globals.css         # Глобальные стили
│   ├── App.tsx                 # Главный компонент
│   └── main.tsx                # Entry point
├── 📂 nginx/                   # Конфигурация Nginx
├── 📂 public/                  # Статические файлы
├── Dockerfile                  # Docker образ
├── docker-compose.yml          # Docker Compose конфиг
├── vite.config.ts             # Vite конфигурация
└── package.json

```

---

## 🎨 Кастомизация

### Изменение контента

Основной контент находится в компонентах:

**Личная информация:**
```typescript
// src/components/HeroSection.tsx
const name = "Ваше Имя"
const description = "Ваше описание"
```

**Проекты:**
```typescript
// src/components/ProjectsSection.tsx
const projects = [
  {
    name: "Название проекта",
    description: "Описание",
    technologies: ["Tech1", "Tech2"],
    link: "https://project.com"
  }
]
```

### Изменение стилей

Проект использует Tailwind CSS. Кастомные цвета и градиенты:

```typescript
// Gradient backgrounds
className="bg-gradient-to-r from-blue-600 to-purple-600"

// Hover effects
whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 20px rgba(0, 255, 136, 0.5))" }}
```

---

## 🔧 Конфигурация

### Vite

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
  }
})
```

### Docker

Multi-stage сборка для оптимального размера образа:
1. **Builder stage**: установка зависимостей и сборка
2. **Production stage**: Nginx Alpine с собранными файлами

---

## 📈 Производительность

### Метрики

- ⚡ **First Contentful Paint**: < 1.5s
- ⚡ **Time to Interactive**: < 2.5s
- ⚡ **Lighthouse Score**: 95+

### Оптимизации

- Gzip сжатие статических файлов
- HTTP/2 для параллельной загрузки
- Кэширование статики (1 год)
- Lazy loading компонентов
- Code splitting

---

## 🔐 Безопасность

- ✅ **HTTPS** - все соединения защищены SSL/TLS
- ✅ **HSTS** - принудительное использование HTTPS
- ✅ **Security Headers** - X-Frame-Options, CSP, X-Content-Type-Options
- ✅ **Автообновление SSL** - сертификаты обновляются автоматически
- ✅ **Rate limiting** на уровне Nginx

---

## 🤝 Контрибьюция

Буду рад вашим предложениям и улучшениям!

1. Форкните репозиторий
2. Создайте feature ветку (`git checkout -b feature/AmazingFeature`)
3. Закоммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

---

## 📝 Лицензия

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Контакты

**Егор Данченко**

[![GitHub](https://img.shields.io/badge/GitHub-usredanchenko-181717?style=for-the-badge&logo=github)](https://github.com/usredanchenko)
[![Website](https://img.shields.io/badge/Website-eda--tech.ru-4285F4?style=for-the-badge&logo=google-chrome)](https://eda-tech.ru)

---

## 🙏 Благодарности

- [Framer Motion](https://www.framer.com/motion/) - анимации
- [shadcn/ui](https://ui.shadcn.com/) - UI компоненты
- [Tailwind CSS](https://tailwindcss.com/) - CSS фреймворк
- [Lucide Icons](https://lucide.dev/) - иконки
- [Vite](https://vitejs.dev/) - сборщик

---

<div align="center">

**⭐ Если проект понравился - поставьте звезду! ⭐**

Made with ❤️ by [Егор Данченко](https://github.com/usredanchenko)

</div>