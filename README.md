# @nan0web/html

**HTML transformer and utilities** – a lightweight library for converting nano‑style JavaScript objects to HTML, handling attributes, class & id shortcuts, and more.

## Table of Contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [API reference](#api-reference)
  - [HTMLTags](#htmltags)
  - [HTMLTransformer](#htmltransformer)
  - [escape](#escape)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm i @nan0web/html
```

The package is ESM‑only (`"type": "module"`).

## Quick start

```js
import HTMLTransformer from "@nan0web/html"

const transformer = new HTMLTransformer()
const nano = {
	'div.container': [
		{ 'h1.title': 'Hello World' },
		{ p: 'Lorem ipsum dolor sit amet.' },
	],
}
const html = await transformer.encode(nano)
console.log(html)
/*
<div class="container">
	<h1 class="title">Hello World</h1>
	<p>Lorem ipsum dolor sit amet.</p>
</div>
*/
```

## API reference

### `HTMLTags`

Container for default HTML tag names and shortcuts.

```js
import { HTMLTags } from "@nan0web/html"

const tags = new HTMLTags()
tags.$default // "p"
tags.ul // "li"
tags.$selfClosed("script") // "></script>"
tags.$selfClosed("br") // ">"
```

### `HTMLTransformer`

HTML transformer class that extends the base XML transformer.

```js
import { HTMLTransformer } from "@nan0web/html"

const transformer = new HTMLTransformer({
	tab: "\t",
	eol: "\n",
	defaultTags: new HTMLTags(),
})

// Encode nano → HTML
const html = await transformer.encode({ div: { p: "Text" } })
console.log(html) // <div><p>Text</p></div>

// Decode HTML → nano (not implemented yet)
try {
	await transformer.decode("<div></div>")
} catch (e) {
	console.error(e.message) // HTMLTransformer.decode() is not implemented yet
}
```

### `escape`

Escapes HTML entities.

```js
import { escape } from "@nan0web/html"

escape("&<>\"'") // "&amp;&lt;&gt;&quot;&#039;"
escape("&<>\"'", ["<", ">"]) // "&amp;<>&quot;&#039;"
escape(123) // "123"
```

## Testing

The repository ships with a full test suite using Node's built‑in test runner.

```bash
npm test
```

All source files have a corresponding `*.test.js` file under `src/`. The tests cover:

- Tag name shortcuts
- Self‑closing tag handling
- Attribute and class/id shortcuts
- Full nano→HTML conversion
- Error handling for the not‑implemented `decode` method

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on submitting pull requests, code of conduct, and versioning policy.

## License

See the [LICENSE](./LICENSE) file for details.
