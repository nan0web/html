import { describe, it, before, after } from "node:test"
import { NoLogger } from "@nan0web/log"
import DB from "@nan0web/db-fs"
import assert from "node:assert/strict"
import { HTMLTags, HTMLTransformer, escape } from "../src/index.js"

/**
 * @docs
 * # @nan0web/html
 *
 * **HTML transformer and utilities** – a lightweight library for converting nano‑style JavaScript objects to HTML, handling attributes, class & id shortcuts, and more.
 *
 * ## Table of Contents
 *
 * - [Installation](#installation)
 * - [Quick start](#quick-start)
 * - [API reference](#api-reference)
 *   - [HTMLTags](#htmltags)
 *   - [HTMLTransformer](#htmltransformer)
 *   - [escape](#escape)
 * - [Testing](#testing)
 * - [Contributing](#contributing)
 * - [License](#license)
 *
 * ## Installation
 *
 * ```bash
 * npm i @nan0web/html
 * ```
 *
 * The package is ESM‑only (`"type": "module"`).
 *
 * ## Quick start
 */
describe("README.md", () => {
	let originalConsole
	/** @type {DB} */
	let db

	before(() => {
		originalConsole = console
		console = new NoLogger({ level: "debug" })
		db = new DB()
	})

	after(() => {
		console = originalConsole
	})

	it("Generating HTML from NAN0 object with class and id shortcuts", async () => {
		// import HTMLTransformer from '@nan0web/html'

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
		assert.equal(html, [
			'<div class="container">',
			'	<h1 class="title">Hello World</h1>',
			'	<p>Lorem ipsum dolor sit amet.</p>',
			'</div>',
		].join("\n"))
	})

	/**
	 * @docs
	 * ## API reference
	 *
	 * ### `HTMLTags`
	 *
	 * Container for default HTML tag names and shortcuts.
	 */
	it("Default HTML tag mappings and self-closing helpers.", () => {
		// import { HTMLTags } from "@nan0web/html"

		const tags = new HTMLTags()
		tags.$default // "p"
		tags.ul // "li"
		tags.$selfClosed("script") // "></script>"
		tags.$selfClosed("br") // ">"

		assert.equal(tags.$default, "p")
		assert.equal(tags.ul, "li")
		assert.equal(tags.$selfClosed("script"), "></script>")
		assert.equal(tags.$selfClosed("br"), ">")
	})

	/**
	 * @docs
	 * ### `HTMLTransformer`
	 *
	 * HTML transformer class that extends the base XML transformer.
	 */
	it("Encodes nano objects to HTML and throws on decode attempt.", async () => {
		// import { HTMLTransformer } from "@nan0web/html"

		const transformer = new HTMLTransformer({
			tab: "\t",
			eol: "\n",
		})

		// // Encode nano → HTML
		const html = await transformer.encode({ div: { p: "Text" } })
		console.log(html) // <div><p>Text</p></div>
		assert.equal(html, '<div>\n	<p>Text</p>\n</div>')

		// // Decode HTML → nano (not implemented yet)
		try {
			await transformer.decode("<div></div>")
		} catch (e) {
			console.error(e.message) // HTMLTransformer.decode() is not implemented yet
		// }
			assert.equal(e.message, "HTMLTransformer.decode() is not implemented yet")
		}
	})

	/**
	 * @docs
	 * ### `escape`
	 *
	 * Escapes HTML entities.
	 */
	it("Escape HTML characters for safe output.", () => {
		// import { escape } from "@nan0web/html"

		escape("&<>\"'") // "&amp;&lt;&gt;&quot;&#039;"
		escape("&<>\"'", ["<", ">"]) // "&amp;<>&quot;&#039;"
		escape(123) // "123"

		assert.equal(escape("&<>\"'"), "&amp;&lt;&gt;&quot;&#039;")
		assert.equal(escape("&<>\"'", ["<", ">"]), "&amp;<>&quot;&#039;")
		assert.equal(escape(123), "123")
	})

	/**
	 * @docs
	 * ## Testing
	 *
	 * The repository ships with a full test suite using Node's built‑in test runner.
	 *
	 * ```bash
	 * npm test
	 * ```
	 *
	 * All source files have a corresponding `*.test.js` file under `src/`. The tests cover:
	 *
	 * - Tag name shortcuts
	 * - Self‑closing tag handling
	 * - Attribute and class/id shortcuts
	 * - Full nano→HTML conversion
	 * - Error handling for the not‑implemented `decode` method
	 * @stopdocs
	 */
	it("should have test and build scripts in package.json", async () => {
		const data = await db.loadDocument("package.json")
		assert.ok(data.scripts.test)
		assert.ok(data.scripts.build)
	})

	/**
	 * @docs
	 * ## Contributing
	 *
	 * Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on submitting pull requests, code of conduct, and versioning policy.
	 * @stopdocs
	 */
	it("should contain Contributing section", async () => {
		const data = await db.loadDocument("CONTRIBUTING.md")
		assert.ok(data.includes("# Contributing"))
	})

	/**
	 * @docs
	 * ## License
	 *
	 * See the [LICENSE](./LICENSE) file for details.
	 * @stopdocs
	 */
	it("should contain License section", async () => {
		const data = await db.loadDocument("LICENSE")
		assert.ok(data.includes("ISC License"))
	})
})
