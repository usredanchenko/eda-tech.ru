# 🚀 Последовательность выполнения промптов EDA-TECH

## 📋 Критический путь: Локализация → Шрифты → Контент → Production

---

## 🎯 ПРОМТ #1: Полная локализация (СТАРТ ЗДЕСЬ!)
**Файлы для работы:** `src/hooks/useLanguage.tsx` + все компоненты
**Время:** 2-3 дня
**Исполнитель:** Senior i18n Specialist + Frontend Developer

### 🔥 Готовый промпт для выполнения:
```
РОЛЬ: Ты Senior i18n Specialist + React Developer

ЗАДАЧА: Завершить полную локализацию сайта EDA-TECH на русский язык

ПРОБЛЕМА: В проекте есть система переводов (useLanguage hook), но ~40% текстов еще hardcoded на английском

ФАЙЛЫ ДЛЯ АНАЛИЗА И ИЗМЕНЕНИЯ:
1. src/hooks/useLanguage.tsx - основной файл с переводами
2. src/components/Contact.tsx - НЕ использует переводы
3. src/components/Footer.tsx - частично hardcoded
4. src/components/History.tsx - статистика не переведена  
5. src/components/OrderForm.tsx - некоторые поля без переводов

НАЙДЕННЫЕ ПРОБЛЕМЫ:
- Contact.tsx: "Get In Touch", "Send us a message", "Reach us directly" - hardcoded
- Footer.tsx: quickLinks и services массивы не используют t()
- History.tsx: milestones описания частично на английском
- OrderForm.tsx: step titles, placeholders не все переведены

ПЛАН ДЕЙСТВИЙ:
1. Открой src/hooks/useLanguage.tsx
2. Найди все hardcoded тексты в компонентах (grep по "строкам")
3. Добавь недостающие ключи в translations.ru объект
4. Замени hardcoded тексты на t('ключ') вызовы  
5. Проверь что переключение EN/RU работает везде

ПРИМЕР ЗАМЕНЫ:
❌ БЫЛО: <h2>Get In Touch</h2>
✅ НАДО: <h2>{t('contact.title')}</h2>

И добавить в translations.ru:
'contact.title': 'Свяжитесь с нами',

ТРЕБОВАНИЯ:
- Сохранить архитектуру useLanguage hook
- Русские тексты должны звучать естественно
- Все тексты должны переключаться EN/RU
- Использовать существующие ключи где возможно

КРИТЕРИЙ ГОТОВНОСТИ: 100% текстов переключается между языками
```

**Файлы для редактирования:**
- ✏️ `src/hooks/useLanguage.tsx` (добавить ключи)
- ✏️ `src/components/Contact.tsx`
- ✏️ `src/components/Footer.tsx`  
- ✏️ `src/components/History.tsx`
- ✏️ `src/components/OrderForm.tsx`

---

## 🎨 ПРОМТ #2: Красивые шрифты для кириллицы
**Файлы для работы:** `index.html`, `src/styles/globals.css`
**Время:** 1 день
**Исполнитель:** UI Designer + Frontend Developer

### 🔥 Готовый промпт для выполнения:
```
РОЛЬ: Ты UI Designer со специализацией на типографике + Frontend Developer

ЗАДАЧА: Заменить скучные системные шрифты на красивые Google Fonts для кириллицы

ПРОБЛЕМА: Сейчас используются ui-sans-serif, system-ui - выглядят скучно для русского текста

РЕКОМЕНДУЕМЫЕ ШРИФТЫ (выбери 1-2):
1. Inter - универсальный, популярный
2. Manrope - современный, стильный  
3. Onest - специально для кириллицы
4. Golos Text - российский шрифт

ФАЙЛЫ ДЛЯ ИЗМЕНЕНИЯ:
1. Design Eda-Tech Website/index.html - добавить <link> для Google Fonts
2. Design Eda-Tech Website/src/styles/globals.css - обновить CSS переменные

ТЕКУЩИЕ НАСТРОЙКИ ШРИФТОВ:
В globals.css найди:
- --default-font-family: var(--font-sans);
- font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif...

ПЛАН ДЕЙСТВИЙ:
1. Выбери 2 шрифта: основной (для текста) + акцентный (для заголовков)
2. В index.html добавь:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

3. В globals.css обновить переменные:
```css
:root {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}
```

ВАЖНО:
- font-display: swap для быстрой загрузки
- Загружай только нужные веса (400, 500, 600, 700)
- НЕ ломай существующий дизайн
- Проверь на всех размерах текста

ПРОВЕРКА:
Убедись что красиво выглядят:
- Заголовки (Hero, Services, Portfolio)
- Обычный текст  
- Кнопки
- Формы

КРИТЕРИЙ ГОТОВНОСТИ: Вся кириллица выглядит современно и стильно
```

**Файлы для редактирования:**
- ✏️ `Design Eda-Tech Website/index.html`
- ✏️ `Design Eda-Tech Website/src/styles/globals.css`

---

## 📝 ПРОМТ #3: Контентная адаптация (ПОСЛЕ локализации!)
**Файлы для работы:** Все компоненты с текстом
**Время:** 2 дня  
**Исполнитель:** Content Manager + Marketing Specialist

### 🔥 Готовый промпт для выполнения:
```
РОЛЬ: Ты Content Strategist + Marketing Specialist для российского IT-рынка

ЗАДАЧА: Адаптировать контент под российскую аудиторию (ПОСЛЕ завершения локализации)

ПРЕДУСЛОВИЕ: Промпт #1 (локализация) должен быть выполнен!

ФАЙЛЫ С КОНТЕНТОМ:
1. src/hooks/useLanguage.tsx - все русские переводы в translations.ru
2. src/components/OrderForm.tsx - ценовые диапазоны в долларах

ПРОБЛЕМЫ КОНТЕНТА:
- Тексты переведены дословно, не адаптированы
- Цены в долларах вместо рублей
- Нет российской специфики
- Слишком "западный" подход

ПЛАН АДАПТАЦИИ:

1. ЦЕНОВАЯ ПОЛИТИКА (OrderForm.tsx):
❌ БЫЛО: '$1,000 - $3,000'
✅ НАДО: '₽100,000 - ₽300,000'

2. HERO СЕКЦИЯ:
Улучши translation.ru['hero.subtitle']:
❌ "Software Development Studio crafting cutting-edge digital solutions"
✅ "Студия разработки современных IT-решений для российского бизнеса"

3. SERVICES:
Добавь российскую специфику:
- Интеграции с российскими сервисами
- Соответствие российским стандартам
- Работа с НДС

4. КОНТАКТЫ:
- Российский номер: +7 (XXX) XXX-XX-XX
- Часовой пояс МСК
- Российский подход к клиентам

5. PORTFOLIO:
Подчеркни работу с российскими проектами

СТИЛЬ ТЕКСТОВ:
- Профессионально, но по-русски
- Избегать калек с английского
- Современная IT-лексика
- Подчеркивать надежность

ФАЙЛЫ ДЛЯ РЕДАКТИРОВАНИЯ:
- src/hooks/useLanguage.tsx (translations.ru объект)
- src/components/OrderForm.tsx (budgetRanges массив)

КРИТЕРИЙ ГОТОВНОСТИ: Тексты звучат как написанные для русских клиентов
```

**Файлы для редактирования:**
- ✏️ `src/hooks/useLanguage.tsx` (улучшить переводы)
- ✏️ `src/components/OrderForm.tsx` (цены в рублях)

---

## ⚡ ПРОМТ #4: Production Build (ТЕХНИЧЕСКАЯ ОПТИМИЗАЦИЯ)
**Файлы для работы:** `vite.config.ts`, `package.json`
**Время:** 1 день
**Исполнитель:** DevOps Engineer

### 🔥 Готовый промпт для выполнения:
```
РОЛЬ: Ты DevOps Engineer + Performance Specialist

ЗАДАЧА: Подготовить production-ready сборку с максимальной производительностью

ТЕКУЩИЕ ФАЙЛЫ:
- Design Eda-Tech Website/vite.config.ts - базовая конфигурация
- Design Eda-Tech Website/package.json - зависимости

ПРОБЛЕМА: Нет оптимизаций для production сборки

ПЛАН ОПТИМИЗАЦИИ:

1. ОБНОВИТЬ vite.config.ts:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-accordion'],
          motion: ['motion/react'],
          lucide: ['lucide-react']
        }
      }
    },
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  preview: {
    port: 3000,
    host: true
  }
})
```

2. ОБНОВИТЬ package.json scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "build:analyze": "vite build && npx vite-bundle-analyzer dist/stats.html"
  }
}
```

3. ДОБАВИТЬ .env файлы:
- .env.production с PROD переменными
- .env.development с DEV переменными

ЦЕЛИ:
- Bundle size < 1MB
- Lighthouse Score > 90
- First Load < 3 seconds

ФАЙЛЫ ДЛЯ СОЗДАНИЯ/ИЗМЕНЕНИЯ:
- vite.config.ts (оптимизации)
- package.json (скрипты)
- .env.production (новый файл)

ПРОВЕРКА:
npm run build && npm run preview
Lighthouse audit должен показать > 90 баллов

КРИТЕРИЙ ГОТОВНОСТИ: Production build оптимизирован для скорости
```

**Файлы для редактирования:**
- ✏️ `Design Eda-Tech Website/vite.config.ts`
- ✏️ `Design Eda-Tech Website/package.json`
- ➕ `.env.production` (новый)

---

## 🧪 ПРОМТ #5: Финальное тестирование
**Время:** 1-2 дня
**Исполнитель:** QA Engineer

### 🔥 Готовый промпт для выполнения:
```
РОЛЬ: Ты QA Engineer + UX Tester

ЗАДАЧА: Протестировать сайт EDA-TECH перед production запуском

ПРЕДУСЛОВИЕ: Промпты #1-4 выполнены!

ТЕСТОВЫЕ СЦЕНАРИИ:

1. ЛОКАЛИЗАЦИЯ ТЕСТ:
□ Открыть сайт на /
□ Переключить язык EN → RU
□ Проверить ВСЕ секции: Header, Hero, Services, Portfolio, History, Contact, Footer
□ Убедиться что НЕТ английских текстов на RU версии
□ Проверить форму заказа на 4 шагах

2. АДАПТИВНОСТЬ:
□ 320px - мобильная версия
□ 768px - планшет  
□ 1920px - десктоп
Все элементы должны корректно отображаться

3. ФОРМЫ:
□ Contact форма - заполнить и отправить
□ Order форма - пройти все 4 шага
□ Валидация полей работает
□ Success страницы показываются

4. ПРОИЗВОДИТЕЛЬНОСТЬ:
□ Открыть Chrome DevTools → Lighthouse
□ Запустить audit для Production
□ Проверить Core Web Vitals
ЦЕЛЬ: все метрики > 85 баллов

5. ШРИФТЫ:
□ Все кириллические тексты используют новые шрифты
□ Тексты читаемы на всех размерах
□ Нет "сырых" fallback шрифтов

БАГ РЕПОРТ:
Если найдешь проблемы - опиши:
- Что не работает
- Как воспроизвести  
- На каком устройстве/браузере
- Скриншот

КРИТЕРИЙ ГОТОВНОСТИ: Все тесты пройдены, баги исправлены
```

**Файлы для проверки:** Все компоненты проекта

---

## 🎯 ПОСЛЕДОВАТЕЛЬНОСТЬ ВЫПОЛНЕНИЯ (ВАЖНО!)

### Этап 1: Критические задачи (Неделя 1)
1. **ПРОМТ #1** - Локализация ← **НАЧАТЬ ОТСЮДА!**
2. **ПРОМТ #2** - Шрифты (после локализации)

### Этап 2: Контент и оптимизация (Неделя 2)  
3. **ПРОМТ #3** - Контентная адаптация
4. **ПРОМТ #4** - Production build

### Этап 3: Финал (Неделя 3)
5. **ПРОМТ #5** - Тестирование и багфиксы

---

## ⚠️ КРИТИЧЕСКИ ВАЖНО!

### 🚨 НЕ НАРУШАЙ ПОРЯДОК!
- **Локализация ПЕРВОЙ** - без неё нельзя тестировать контент
- **Шрифты ВТОРЫМИ** - влияют на весь визуал
- **Production build ТОЛЬКО после контента** - иначе придется пересобирать

### 🎯 Критерий готовности каждого этапа:
✅ **Этап 1:** Все тексты переключаются EN/RU + красивые шрифты
✅ **Этап 2:** Контент адаптирован + production build работает  
✅ **Этап 3:** Все тесты зеленые + готов к деплою

### 🔥 Emergency Fix:
Если что-то сломается - откатывайся к предыдущему рабочему состоянию и исправляй по одной проблеме!

**🚀 После выполнения всех промптов → сайт готов к production запуску!**
