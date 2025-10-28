#!/usr/bin/env node

import process from "node:process"
import { select } from "@nan0web/ui-cli"
import Logger from "@nan0web/log"

// Import individual demo functions
import { runHTMLTransformationDemo } from "./transformation.js"
import { runHTMLAttributesDemo } from "./attributes.js"
import { runHTMLListRenderingDemo } from "./lists.js"
import { runHTMLBootstrapDemo } from "./bootstrap.js"

const console = new Logger({ level: "info" })

// Clear screen and show logo initially
console.clear()
console.info(Logger.style(Logger.LOGO, { color: "magenta" }))

/**
 * Presents menu options for available HTML demos
 * @returns {Promise<string>} Selected demo type
 */
async function chooseDemo() {
	const demos = [
		{ name: "Basic HTML Transformation", value: "transformation" },
		{ name: "Attributes & Classes Rendering", value: "attributes" },
		{ name: "List Rendering (ul/ol)", value: "lists" },
		{ name: "Bootstrap Layout Example", value: "bootstrap" },
		{ name: "← Exit", value: "exit" }
	]

	const choice = await select({
		title: "Select HTML demo to run:",
		prompt: "[me]: ",
		invalidPrompt: Logger.style("[me invalid]", { color: "red" }) + ": ",
		options: demos.map(d => d.name),
		console
	})

	return demos[choice.index].value
}

/**
 * Shows return message after demo completion
 */
async function showMenu() {
	console.info("\n" + "=".repeat(50))
	console.info("Demo completed. Returning to menu...")
	console.info("=".repeat(50) + "\n")
}

/**
 * Main playground loop
 */
async function main() {
	while (true) {
		try {
			const demoType = await chooseDemo()

			switch (demoType) {
				case "transformation":
					await runHTMLTransformationDemo(console)
					break
				case "attributes":
					await runHTMLAttributesDemo(console)
					break
				case "lists":
					await runHTMLListRenderingDemo(console)
					break
				case "bootstrap":
					await runHTMLBootstrapDemo(console)
					break
				case "exit":
					process.exit(0)
					break
				default:
					console.warn("Unknown demo type selected")
			}

			await showMenu()
		} catch (error) {
			if (error.message && error.message.includes("cancel")) {
				console.warn("\nDemo selection cancelled. Returning to menu...")
				await showMenu()
			} else {
				throw error
			}
		}
	}
}

main().then(() => {
	process.exit(0)
}).catch(err => {
	console.error(err)
	process.exit(1)
})