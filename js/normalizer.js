function toObject( array ) {
	return array.reduce( function( obj, key ) {
		obj[ key ] = 1;
		return obj;
	}, {} );
}

var INLINE = toObject( [
	'a', 'abbr', 'acronym', 'b', 'bdo', 'big', 'br', 'button', 'cite', 'code', 'dfn',
	'em', 'i', 'img', 'input', 'kbd', 'label', 'map', 'object', 'q', 'samp', 'script',
	'select', 'small', 'span', 'strong', 'sub', 'sup', 'textarea', 'tt', 'var'
] );

var BLOCK = toObject( [
	'address', 'article', 'aside', 'audio', 'blockquote', 'canvas', 'dd', 'div', 'dl', 'fieldset',
	'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup',
	'hr', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table', 'tfoot', 'ul', 'video'
] );

var EMPTY = toObject( [
	'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
	'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
] );

function Normalizer( allowedElements ) {
	this.allowedElements = allowedElements;
}

Normalizer.INLINE = INLINE;
Normalizer.BLOCK = BLOCK;
Normalizer.EMPTY = EMPTY;

Normalizer.prototype = {
	normalize: function( html ) {
		// TODO: strip disallowed content

		return html;
	}
};

module.exports = Normalizer;