---
# 🔧 ЗМІННІ
PROJECT_NAME: "@nan0web/html"
VERSION: "1.0.0"
CORE_PRINCIPLE: "HTML – перетворення nano ↔ HTML без зайвих кроків."
VALIDATION_PHRASE: "HTML‑модуль відповідає"
FAILURE_RESPONSE: "Контекст загублено. Я не спроможний на це. Обери більшу модель."
IDENTITY_MODEL: "Я / тИ / мИ / вИ"
LOGIC_BASE: "Дія → Перетворення → Перевірка → Випуск"
ETIMOLOGY: "HTML – мова розмітки, nano – легка структура даних."
---

# ✨ @nan0web/html – Система трансформера HTML

> **Мета** – надати легкий, типізований інструмент для перетворення
> nano‑об’єктів у валідний HTML і навпаки, без зайвих залежностей.
> Дотримуючись принципу **мінімальної функціональності** та **повної тестової покриття**.

## 🎯 Основні функції

| Функція | Опис |
|--------|------|
| **HTMLTransformer** | Клас, що успадковується від `XMLTransformer`. Метод `encode` → nano → HTML. |
| **HTMLTags** | Визначення типових HTML‑тегів, їх атрибутів, автозакриття та спрощень. |
| **escape** | Екранування небезпечних символів у рядках (XSS‑захист). |
| **defaultHTML5Tags** | готовий екземпляр `HTMLTags` з типово встановленими параметрами. |

## 📦 Пакетна структура

```
/packages/html/
│
├─ src/
│   ├─ HTMLTags.js          ← визначення тегів
│   ├─ Transformer.js       ← реалізація трансформера
│   ├─ index.js             ← експорт API
│   └─ README.md.js         ← тест‑документ, генерує README.md
│
├─ types/                   ← .d.ts файли (генерується tsc)
├─ test/ (в src/*.test.js)  ← unit‑тести (node:test)
├─ tsconfig.json            ← налаштування TypeScript‑declarations
└─ package.json             ← метадані, скрипти, залежності
```

## 🛠️ Команди розробника

| npm script | Опис |
|------------|------|
| `npm run build` | Генерує *.d.ts* в `./types`. |
| `npm test` | Запускає усі `*.test.js` через `node --test`. |
| `npm run test:coverage` | Тестове покриття ≥ 90 % (experimental). |
| `npm run test:docs` | Генерує `README.md` з `src/README.md.js`. |
| `npm run test:release` | Перевірка релізних тестів в `releases/`. |
| `npm run test:status` | Перевірка статусу пакету (`nan0test status`). |
| `npm run play` | Запуск `play/main.js` – демо‑скрипт. |
| `npm run clean` | Очищення кешу та `dist/`. |
| `npm run release` | Публікація через `nan0release`. |

## 📚 Використання у коді

```js
import {
	HTMLTransformer,
	HTMLTags,
	defaultHTML5Tags,
	escape,
} from '@nan0web/html'

// --- трансформація nano → HTML
const tr = new HTMLTransformer({ eol: '\n', tab: '\t' })
const nano = { div: { h1: 'Hello', p: 'World' } }
const html = await tr.encode(nano)
// <div>\n\t<h1>Hello</h1>\n\t<p>World</p>\n</div>

// --- екранування рядка
const raw = "<script>alert('xss')</script>"
const safe = escape(raw)
// &lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;

// --- доступ до дефолтних тегів
console.log(defaultHTML5Tags.$default) // 'p'
```

## ✅ Критерії готовності (гарантія «НаМір»)

1. **Тести** – усі `*.test.js` проходять без помилок.  
2. **Покриття** – `npm run test:coverage` ≥ 90 %.  
3. **Документація** – `npm run test:docs` успішно генерує `README.md`.  
4. **Типи** – `npm run build` створює коректні декларації в `./types`.  
5. **CLI** – `npm run play` виводить «HTML Playground Demo».  

Якщо хоча б один пункт не виконується → відповідь **FAIL** та вказати недостачу.

## 🧭 Додаткова інформація

- **Логіка**: система відповідає лише на запити, що стосуються трансформації, типізації, тестування та інтеграції в проєкт.  
- **Відмова**: при некоректному контексті або відсутності запиту – повернути `FAILURE_RESPONSE`.  
- **Валідація**: кожен `it` блок у тестах містить `@docs`‑коментар, що автоматично формує користувацьку документацію.  
