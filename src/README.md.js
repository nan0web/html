import { describe, it, before, beforeEach } from "node:test"
import assert from "node:assert/strict"
import FS from "@nan0web/db-fs"
import { NoConsole } from "@nan0web/log"
import {
	DatasetParser,
	DocsParser,
	runSpawn,
} from "@nan0web/test"
import {
	HTMLTags,
	HTMLTransformer,
	escape,
} from "./index.js"

const fs = new FS()
let pkg

before(async () => {
	const doc = await fs.loadDocument("package.json", {})
	pkg = doc || {}
})

let console = new NoConsole()

beforeEach(() => {
	console = new NoConsole()
})

/**
 * Core test suite that also serves as the source for README generation.
 *
 * The block comments inside each `it` block are extracted to build
 * the final `README.md`. Keeping the comments here ensures the
 * documentation stays close to the code.
 */
function testRender() {
	/**
	 * @docs
	 * # @nan0web/html
	 *
	 * Transform nano objects into valid HTML with ease.
	 *
	 * <!-- %PACKAGE_STATUS% -->
	 *
	 * ## Description
	 *
	 * The `@nan0web/html` package provides a minimal yet powerful transformation layer
	 * for generating clean, valid, and readable HTML from structured nano objects.
	 *
	 * It supports:
	 *
	 * - **Nested structures** — arrays and objects map directly to element trees.
	 * - **Attribute shortcuts** — `.class` and `#id` syntax.
	 * - **List handling** — automatic `li` wrapping for `ul` and `ol`.
	 * - **Self-closed tags** — proper handling of void elements like `meta`, `link`.
	 * - **Comment support** — inline comments via `{ '#Comment': 'text' }`.
	 * - **DOCTYPES** — special `!DOCTYPE` key enables HTML declarations.
	 * - **Escaping** — ensure safety by default using `escape()` utility.
	 *
	 * Perfect for building UIs without templating languages,
	 * creating email templates, rendering static pages,
	 * or working with configuration-driven markup.
	 *
	 * ## Installation
	 */
	it("How to install with npm?", () => {
		/**
		 * ```bash
		 * npm install @nan0web/html
		 * ```
		 */
		assert.equal(pkg.name, "@nan0web/html")
	})
	/**
	 * @docs
	 */
	it("How to install with pnpm?", () => {
		/**
		 * ```bash
		 * pnpm add @nan0web/html
		 * ```
		 */
		assert.equal(pkg.name, "@nan0web/html")
	})
	/**
	 * @docs
	 */
	it("How to install with yarn?", () => {
		/**
		 * ```bash
		 * yarn add @nan0web/html
		 * ```
		 */
		assert.equal(pkg.name, "@nan0web/html")
	})

	/**
	 * @docs
	 * ## Usage
	 *
	 * ### Basic HTML Transformation
	 *
	 * Transform a simple object into formatted HTML.
	 */
	it("How to transform nano object to pretty HTML?", async () => {
		//import { HTMLTransformer } from '@nan0web/html'
		const tr = new HTMLTransformer({ eol: "\n", tab: "\t" })
		const nanoData = {
			div: {
				h1: 'Hello Universe',
				p: 'This is a simple paragraph using nano to HTML transformation'
			}
		}

		const html = await tr.encode(nanoData)
		console.info(html)

		assert.ok(console.output()[0][1].includes('<div>'))
		assert.ok(console.output()[0][1].includes('\t<h1>Hello Universe</h1>'))
		assert.ok(console.output()[0][1].includes('\t<p>This is a simple paragraph'))
		assert.ok(console.output()[0][1].includes('</div>'))
	})

	/**
	 * @docs
	 */
	it("How to transform nano to minimal HTML (no formatting)?", async () => {
		//import { HTMLTransformer } from '@nan0web/html'
		const tr = new HTMLTransformer({ eol: "", tab: "" })
		const nanoData = {
			'div.d-flex#container': [
				{ 'span.text-bold': 'Bold text' },
				{ 'a.btn.btn-primary': 'Primary Button', $href: '#', $target: '_blank' }
			]
		}

		const html = await tr.encode(nanoData)
		console.info(html)

		assert.equal(
			console.output()[0][1],
			'<div id="container" class="d-flex">' +
			'<span class="text-bold">Bold text</span>' +
			'<a class="btn btn-primary" href="#" target="_blank">Primary Button</a>' +
			'</div>'
		)
	})

	/**
	 * @docs
	 * ### Attributes & Classes
	 *
	 * Use shorthand `.class` and `#id` syntax to define attributes.
	 */
	it("How to add classes and IDs using dot and hash shortcuts?", async () => {
		//import { HTMLTransformer } from '@nan0web/html'
		const tr = new HTMLTransformer({ eol: "", tab: "" })
		const data = { 'div.header.main#app': 'Content' }

		const html = await tr.encode(data)
		console.info(html)

		assert.equal(html, '<div id="app" class="header main">Content</div>')
	})

	/**
	 * @docs
	 */
	it("How to set any HTML attribute using `$attr` keys?", async () => {
		//import { HTMLTransformer } from '@nan0web/html'
		const tr = new HTMLTransformer({ eol: "", tab: "" })
		const data = [
			{ img: "", $src: 'image.png', $alt: 'An image', $loading: 'lazy' }
		]

		const html = await tr.encode(data)
		console.info(html)

		assert.equal(html, '<img src="image.png" alt="An image" loading="lazy">')
	})

	/**
	 * @docs
	 * ### Lists (ul/ol)
	 *
	 * Automatically wrap array items in `li` when parent is `ul` or `ol`.
	 */
	it("How to render an unordered list with items?", async () => {
		//import { HTMLTransformer } from '@nan0web/html'
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

		assert.equal(
			html,
			'<ul><li>First item</li><li>Second item</li><li>Nested item<strong>with bold text</strong></li><li>Fourth item</li></ul>'
		)
	})

	/**
	 * @docs
	 */
	it("How to render an ordered list with mixed content?", async () => {
		//import { HTMLTransformer } from '@nan0web/html'
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

		assert.equal(
			html,
			'<ol><li>First step</li><li>Second step</li><li>Sub-step<em>with emphasis</em></li><li>Final step</li></ol>'
		)
	})

	/**
	 * @docs
	 * ### Escaping Content
	 *
	 * Use `escape()` utility to prevent XSS and render safe content.
	 */
	it("How to escape untrusted HTML content safely?", () => {
		//import { escape } from '@nan0web/html'
		const unsafe = '<script>alert("xss")</script>'
		const safe = escape(unsafe)
		console.info(safe)

		assert.equal(safe, '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;')
	})

	/**
	 * @docs
	 */
	it("How to mix escaped and raw text in structure?", async () => {
		//import { HTMLTransformer, escape } from '@nan0web/html'
		const tr = new HTMLTransformer({ eol: "", tab: "" })
		const data = {
			p: [
				"User input: <malicious> is now safe."
			]
		}

		const html = await tr.encode(data)
		console.info(html)

		assert.equal(
			html,
			'<p>User input: &lt;malicious&gt; is now safe.</p>'
		)
	})

	/**
	 * @docs
	 * ### Special Tags and DOCTYPE
	 *
	 * Handle special elements like `!DOCTYPE`, `script`, `style`, and comments.
	 */
	it("How to include DOCTYPE and lang attribute properly?", async () => {
		//import { HTMLTransformer } from '@nan0web/html'
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

		assert.equal(console.output()[0][1], [
			"<!DOCTYPE html>",
			'<html lang="en">',
			'<head>',
			'<title>Page</title>',
			'</head>',
			'<body>',
			'<h1>Hello</h1>',
			'</body>',
			'</html>',
		].join("\n"))
	})

	/**
	 * @docs
	 *
	 * @todo fix escaping or non escaping elements such as scripts, styles.
	 */
	it.todo("How to render inline script and style tags correctly?", async () => {
		//import { HTMLTransformer } from '@nan0web/html'
		const tr = new HTMLTransformer({ eol: "", tab: "" })
		const data = [
			{ script: 'console.log("hello");' },
			{ style: '.my-class { color: red; }' },
		]

		const html = await tr.encode(data)
		console.info(html)

		assert.equal(
			console.output()[0][1],
			'<script>console.log("hello");</script><style>.my-class { color: red; }</style>'
		)
	})

	/**
	 * @docs
	 */
	it("How to insert HTML comments into output?", async () => {
		//import { HTMLTransformer } from '@nan0web/html'
		const tr = new HTMLTransformer({ eol: "", tab: "" })
		const data = [
			{ p: 'Before comment' },
			{ '#Debug mode enabled': true },
			{ p: 'After comment' }
		]

		const html = await tr.encode(data)
		console.info(html)

		assert.equal(
			html,
			'<p>Before comment</p><!-- Debug mode enabled --><p>After comment</p>'
		)
	})

	/**
	 * @docs
	 * ## API
	 *
	 * ### HTMLTransformer
	 *
	 * Transforms nano structures into HTML strings.
	 *
	 * * **Constructor options**
	 *   * `tab` — string used for indentation (default: `\t`).
	 *   * `eol` — string used for line breaks (default: `\n`).
	 *   * `defaultTags` — custom tag mapping instance (default: `HTMLTags`).
	 *
	 * * **Methods**
	 *   * `encode(data)` — async function that returns HTML string.
	 *   * `decode(str)` — not implemented yet (future parser).
	 *
	 * ### HTMLTags
	 *
	 * Default tag configuration.
	 *
	 * * **Properties**
	 *   * `$default` — fallback tag (default: `p`).
	 *   * `$nonEmptyTags` — tags that must have closing (e.g., `script`, `style`).
	 *   * `$attrTrue` — value for boolean attributes (default: `""`).
	 *   * `$singleChild` — tags that collapse when solitary (e.g., `tbody`).
	 *   * `$tagAttrs` — map of shortcut symbols (`.class`, `#id`).
	 *   * `ul`, `ol`, `dl`, `table`, `tr`, `select` — default child tags.
	 *
	 * * **Methods**
	 *   * `$selfClosed(tag)` — returns `></tag>` if required, otherwise `>`.
	 *
	 * ### escape(input)
	 *
	 * Utility function to escape unsafe HTML characters.
	 *
	 * * `<` → `&lt;`
	 * * `>` → `&gt;`
	 * * `&` → `&amp;`
	 * * `"` → `&quot;`
	 */
	it("All exports should be available and functional", () => {
		assert.ok(HTMLTransformer)
		assert.ok(HTMLTags)
		assert.ok(escape)
		assert.ok(typeof escape === "function")
		assert.ok(new HTMLTransformer() instanceof HTMLTransformer)
		assert.ok(new HTMLTags() instanceof HTMLTags)
	})

	/**
	 * @docs
	 * ## Java•Script
	 */
	it("Uses `d.ts` files for autocompletion", () => {
		assert.equal(pkg.types, "./types/index.d.ts")
	})

	/**
	 * @docs
	 * ## CLI Playground
	 *
	 * Explore features interactively using the built-in demo.
	 */
	it("How to run playground script?", async () => {
		/**
		 * ```bash
		 * # Run the interactive playground
		 * npm run play
		 * ```
		 */
		assert.ok(String(pkg.scripts?.play))
		assert.ok(await fs.loadDocument("play/main.js"))
	})

	/**
	 * @docs
	 * ## Contributing
	 */
	it("How to contribute? - [check here](./CONTRIBUTING.md)", async () => {
		assert.equal(pkg.scripts?.precommit, "npm test")
		assert.equal(pkg.scripts?.prepush, "npm test")
		assert.equal(pkg.scripts?.prepare, "husky")
		const text = await fs.loadDocument("CONTRIBUTING.md")
		const str = String(text)
		assert.ok(str.includes("# Contributing"))
	})

	/**
	 * @docs
	 * ## License
	 */
	it("How to license ISC? - [check here](./LICENSE)", async () => {
		/** @docs */
		const text = await fs.loadDocument("LICENSE")
		assert.ok(String(text).includes("ISC"))
	})
}

describe("README.md testing", testRender)

describe("Rendering README.md", async () => {
	const parser = new DocsParser()
	const text = String(parser.decode(testRender))
	await fs.saveDocument("README.md", text)

	const dataset = DatasetParser.parse(text, pkg.name)
	await fs.saveDocument(".datasets/README.dataset.jsonl", dataset)

	it(`document is rendered [${Intl.NumberFormat("en-US").format(Buffer.byteLength(text))}b]`, async () => {
		const saved = await fs.loadDocument("README.md")
		assert.ok(saved.includes("## License"), "README was not generated")
	})
})
