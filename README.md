# @nan0web/html

Transform nano objects into valid HTML with ease.

|[Status](https://github.com/nan0web/monorepo/blob/main/system.md#написання-сценаріїв)|Documentation|Test coverage|Features|Npm version|
|---|---|---|---|---|
 |🟢 `99.7%` |🧪 [English 🏴󠁧󠁢󠁥󠁮󠁧󠁿](https://github.com/nan0web/html/blob/main/README.md) |🟢 `100.0%` |✅ d.ts 📜 system.md 🕹️ playground |— |

## Description

The `@nan0web/html` package provides a minimal yet powerful transformation layer
for generating clean, valid, and readable HTML from structured nano objects.

It supports:

- **Nested structures** — arrays and objects map directly to element trees.
- **Attribute shortcuts** — `.class` and `#id` syntax.
- **List handling** — automatic `li` wrapping for `ul` and `ol`.
- **Self-closed tags** — proper handling of void elements like `meta`, `link`.
- **Comment support** — inline comments via `{ '#Comment': 'text' }`.
- **DOCTYPES** — special `!DOCTYPE` key enables HTML declarations.
- **Escaping** — ensure safety by default using `escape()` utility.

Perfect for building UIs without templating languages,
creating email templates, rendering static pages,
or working with configuration-driven markup.

## Installation

How to install with npm?
```bash
npm install @nan0web/html
```

How to install with pnpm?
```bash
pnpm add @nan0web/html
```

How to install with yarn?
```bash
yarn add @nan0web/html
```

## Usage

### Basic HTML Transformation

Transform a simple object into formatted HTML.

How to transform nano object to pretty HTML?
```js
import { HTMLTransformer } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "\n", tab: "\t" })
const nanoData = {
	div: {
		h1: 'Hello Universe',
		p: 'This is a simple paragraph using nano to HTML transformation'
	}
}

const html = await tr.encode(nanoData)
console.info(html)

```

How to transform nano to minimal HTML (no formatting)?
```js
import { HTMLTransformer } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "", tab: "" })
const nanoData = {
	'div.d-flex#container': [
		{ 'span.text-bold': 'Bold text' },
		{ 'a.btn.btn-primary': 'Primary Button', $href: '#', $target: '_blank' }
	]
}

const html = await tr.encode(nanoData)
console.info(html)

```
### Attributes & Classes

Use shorthand `.class` and `#id` syntax to define attributes.

How to add classes and IDs using dot and hash shortcuts?
```js
import { HTMLTransformer } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "", tab: "" })
const data = { 'div.header.main#app': 'Content' }

const html = await tr.encode(data)
console.info(html)

```

How to set any HTML attribute using `$attr` keys?
```js
import { HTMLTransformer } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "", tab: "" })
const data = [
	{ img: "", $src: 'image.png', $alt: 'An image', $loading: 'lazy' }
]

const html = await tr.encode(data)
console.info(html)

```
### Lists (ul/ol)

Automatically wrap array items in `li` when parent is `ul` or `ol`.

How to render an unordered list with items?
```js
import { HTMLTransformer } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "", tab: "" })
const data = [
	{
		ul: [
			"First item",
			"Second item",
			{
				li: [
					"Nested item",
					{ strong: "with bold text" }
				]
			},
			"Fourth item"
		]
	}
]

const html = await tr.encode(data)
console.info(html)

```

How to render an ordered list with mixed content?
```js
import { HTMLTransformer } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "", tab: "" })
const data = [
	{
		ol: [
			"First step",
			"Second step",
			{
				li: [
					"Sub-step",
					{ em: "with emphasis" }
				]
			},
			"Final step"
		]
	}
]

const html = await tr.encode(data)
console.info(html)

```
### Escaping Content

Use `escape()` utility to prevent XSS and render safe content.

How to escape untrusted HTML content safely?
```js
import { escape } from '@nan0web/html'
const unsafe = '<script>alert("xss")</script>'
const safe = escape(unsafe)
console.info(safe)

```

How to mix escaped and raw text in structure?
```js
import { HTMLTransformer, escape } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "", tab: "" })
const data = {
	p: [
		"User input: <malicious> is now safe."
	]
}

const html = await tr.encode(data)
console.info(html)

```
### Special Tags and DOCTYPE

Handle special elements like `!DOCTYPE`, `script`, `style`, and comments.

How to include DOCTYPE and lang attribute properly?
```js
import { HTMLTransformer } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "\n", tab: "" })
const data = [
	{ '!DOCTYPE': true, $html: true },
	{
		$lang: 'en', html: [
			{ head: [{ title: 'Page' }] },
			{ body: [{ h1: 'Hello' }] }
		]
	}
]

const html = await tr.encode(data)
console.info(html)

```

@todo fix escaping or non escaping elements such as scripts, styles.

it.todo("How to render inline script and style tags correctly?", async () => {
import { HTMLTransformer } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "", tab: "" })
const data = [
{ script: 'console.log("hello");' },
{ style: '.my-class { color: red; }' },
]

const html = await tr.encode(data)
console.info(html)

How to insert HTML comments into output?
```js
import { HTMLTransformer } from '@nan0web/html'
const tr = new HTMLTransformer({ eol: "", tab: "" })
const data = [
	{ p: 'Before comment' },
	{ '#Debug mode enabled': true },
	{ p: 'After comment' }
]

const html = await tr.encode(data)
console.info(html)

```
## API

### HTMLTransformer

Transforms nano structures into HTML strings.

* **Constructor options**
  * `tab` — string used for indentation (default: `\t`).
  * `eol` — string used for line breaks (default: `\n`).
  * `defaultTags` — custom tag mapping instance (default: `HTMLTags`).

* **Methods**
  * `encode(data)` — async function that returns HTML string.
  * `decode(str)` — not implemented yet (future parser).

### HTMLTags

Default tag configuration.

* **Properties**
  * `$default` — fallback tag (default: `p`).
  * `$nonEmptyTags` — tags that must have closing (e.g., `script`, `style`).
  * `$attrTrue` — value for boolean attributes (default: `""`).
  * `$singleChild` — tags that collapse when solitary (e.g., `tbody`).
  * `$tagAttrs` — map of shortcut symbols (`.class`, `#id`).
  * `ul`, `ol`, `dl`, `table`, `tr`, `select` — default child tags.

* **Methods**
  * `$selfClosed(tag)` — returns `></tag>` if required, otherwise `>`.

### escape(input)

Utility function to escape unsafe HTML characters.

* `<` → `&lt;`
* `>` → `&gt;`
* `&` → `&amp;`
* `"` → `&quot;`

All exports should be available and functional

## Java•Script

Uses `d.ts` files for autocompletion

## CLI Playground

Explore features interactively using the built-in demo.

How to run playground script?
```bash
# Run the interactive playground
npm run play
```

## Contributing

How to contribute? - [check here](./CONTRIBUTING.md)

## License

How to license ISC? - [check here](./LICENSE)
