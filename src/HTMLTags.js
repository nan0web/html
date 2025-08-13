class HTMLTags {
	$default = 'p'
	$nonEmptyTags = ['script', 'style']
	$attrTrue = ''
	/**
	 * Used in xml2nano to conver elements such as table > tbody > tr => table > tr
	 * if such child is a single, so only tbody, if there are tbody with thead or
	 * tfoot it won't remove the layer.
	 */
	$singleChild = ['tbody']
	/**
	 * Transform tag into nano with the attributes right from its definition.
	 * @example
	 *   { '.': 'class' } => div.d-flex.flex-wrap => <div class="d-flex flex-wrap">
	 *   { '#': 'id } => div#main => <div id="main">
	 *   { '.': 'class', '#': 'id } => div.d-flex#main.flex-wrap => <div class="d-flex flex-wrap" id="main">
	 */
	$tagAttrs = {
		'.': 'class',
		'#': 'id',
	}
	ul = 'li'
	ol = 'li'
	dl = 'dt'
	table = 'tr'
	tr = 'td'
	select = 'option'

	$selfClosed(tag) {
		if (this.$nonEmptyTags.includes(tag)) return `></${tag}>`
		return '>'
	}
}

export default HTMLTags
