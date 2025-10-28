export default class HTMLTags {
    $default: string;
    $nonEmptyTags: string[];
    $attrTrue: string;
    /**
     * Used in xml2nano to conver elements such as table > tbody > tr => table > tr
     * if such child is a single, so only tbody, if there are tbody with thead or
     * tfoot it won't remove the layer.
     */
    $singleChild: string[];
    /**
     * Transform tag into nano with the attributes right from its definition.
     * @example
     *   { '.': 'class' } => div.d-flex.flex-wrap => <div class="d-flex flex-wrap">
     *   { '#': 'id } => div#main => <div id="main">
     *   { '.': 'class', '#': 'id } => div.d-flex#main.flex-wrap => <div class="d-flex flex-wrap" id="main">
     */
    $tagAttrs: {
        '.': string;
        '#': string;
    };
    ul: string;
    ol: string;
    dl: string;
    table: string;
    tr: string;
    select: string;
    $selfClosed(tag: any): string;
}
