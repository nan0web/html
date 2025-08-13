import XMLTransformer, { nano2xml } from "@nan0web/xml"
import HTMLTags from "./HTMLTags.js"

/**
 * Class representing an HTML transformer.
 * Encodes nano objects to HTML format, and decodes HTML strings to nano objects.
 */
class HTMLTransformer extends XMLTransformer {
	/**
	 * Creates a new HTMLTransformer instance.
	 * @param {Object} [options={}] - Options for HTML conversion.
	 * @param {string} [options.tab='\t'] - The string to use for indentation.
	 * @param {string} [options.eol='\n'] - The string to use for new lines.
	 * @param {Object} [options.defaultTags] - The default tag mappings for conversion.
	 */
	constructor(options = {}) {
		const {
			defaultTags = new HTMLTags(),
		} = options
		super({ ...options, defaultTags })
	}

	/**
	 * Encodes a nano object to HTML format.
	 * @param {Object|Array} data - The nano object or array to encode.
	 * @returns {Promise<string>} - The HTML string representation.
	 */
	async encode(data) {
		return nano2xml(data, {
			indent: this.tab, newLine: this.eol, defaultTags: this.defaultTags
		})
	}

	/**
	 * Decodes an HTML string to a nano object.
	 * Note: This method is a placeholder and should be implemented with actual HTML parsing logic.
	 * @param {string} str - The HTML string to decode.
	 * @returns {Promise<Object|Array>} - The decoded nano object or array.
	 */
	async decode(str) {
		throw new Error('HTMLTransformer.decode() is not implemented yet')
	}
}

export default HTMLTransformer
