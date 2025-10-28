# @nan0web/html

HTML утиліти для екосистеми nan0web.

## Встановлення

Як встановити з npm?
```bash
npm install @nan0web/html
```

Як встановити з pnpm?
```bash
pnpm add @nan0web/html
```

Як встановити з yarn?
```bash
yarn add @nan0web/html
```

## Базове використання – перетворення nano на HTML

Як закодувати простий nano-об'єкт?
```js
import { HTMLTransformer } from "@nan0web/html"
const transformer = new HTMLTransformer({ eol: "\n", tab: "\t" })
const nano = {
  div: {
    h1: "Привіт, світе",
    p: "Це абзац"
  }
}
const result = await transformer.encode(nano)
console.info(result)
// <div>\n\t<h1>Привіт, світе</h1>\n\t<p>Це абзац</p>\n</div>
```
## Атрибути тегів – скорочення class та id

Як рендерити елементи зі скороченнями class та id?
```js
import { HTMLTransformer } from "@nan0web/html"
const data = [
  {
    "div.d-flex#main": [
      { "a.btn.btn-primary": "Кнопка" },
      { "a#more": "Більше" },
      { "a.btn#detail.btn-success": "Деталі" }
    ]
  }
]
const transformer = new HTMLTransformer({ eol: "", tab: "" })
const result = await transformer.encode(data)
console.info(result)
// <div id="main" class="d-flex"><a class="btn btn-primary">Кнопка</a><a id="more">Більше</a><a id="detail" class="btn btn-success">Деталі</a></div>
```
## Списки – впорядковані та невпорядковані

Як відобразити впорядкований список з класами?
```js
import { HTMLTransformer } from "@nan0web/html"
const data = [
  {
    $class: "list-group",
    ol: [
      { $class: "list-group-item", li: "Елемент 1" },
      { $class: "list-group-item", li: "Елемент 2" }
    ]
  }
]
const transformer = new HTMLTransformer({ eol: "", tab: "" })
const html = await transformer.encode(data)
console.info(html)
// <ol class="list-group"><li class="list-group-item">Елемент 1</li><li class="list-group-item">Елемент 2</li></ol>
```
## Екранування необробленого HTML

Хелпер `escape` з `@nan0web/xml` можна використовувати для безпечного
вбудовування тексту, що містить символи з особливим значенням у HTML.

Як екранувати необроблені HTML-рядки?
```js
import { escape } from "@nan0web/html"
const raw = "<script>alert('xss')</script>"
const escaped = escape(raw)
// &lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;
```
## Посилання на стандартні HTML5 теги

* `defaultHTML5Tags` надає готовий екземпляр `HTMLTags`
* з типовими значеннями (наприклад, `$default = 'p'`, обробка `$selfClosed`, ...).
*/

Як отримати доступ до типових визначень HTML5 тегів?
```js
import { defaultHTML5Tags } from "@nan0web/html"
console.info(defaultHTML5Tags)
// HTMLTags {
//   '$attrTrue': '',
//   '$default': 'p',
//   '$nonEmptyTags': [
//     'script',
//     'style'
//   ],
//   '$singleChild': [
//     'tbody'
//   ],
//   '$tagAttrs': {
//     '#': 'id',
//     '.': 'class'
//   },
//   dl: 'dt',
//   ol: 'li',
//   select: 'option',
//   table: 'tr',
//   tr: 'td',
//   ul: 'li'
// }
```
## Оголошення TypeScript

Пакет поставляється з файлами оголошення для кращого досвіду роботи в редакторі.

Використовує `d.ts` файли для автозаповнення

## Інтерактивна консоль (CLI)

Запустіть інтерактивний скрипт, щоб побачити демонстрацію у реальному часі.

Як запустити інтерактивний скрипт?

## Внесок у проект

Як зробити внесок? – [дивіться тут](./CONTRIBUTING.md)

## Ліцензія

Як ліцензувати ISC? – [дивіться тут](./LICENSE)
