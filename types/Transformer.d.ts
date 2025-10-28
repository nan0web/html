export default HTMLTransformer;
/**
 * Class representing an HTML transformer.
 * Encodes nano objects to HTML format, and decodes HTML strings to nano objects.
 */
declare class HTMLTransformer extends XMLTransformer {
    /**
     * Creates a new HTMLTransformer instance.
     * @param {Object} [options={}] - Options for HTML conversion.
     * @param {string} [options.tab='\t'] - The string to use for indentation.
     * @param {string} [options.eol='\n'] - The string to use for new lines.
     * @param {Object} [options.defaultTags] - The default tag mappings for conversion.
     */
    constructor(options?: {
        tab?: string | undefined;
        eol?: string | undefined;
        defaultTags?: any;
    } | undefined);
}
import XMLTransformer from "@nan0web/xml";
