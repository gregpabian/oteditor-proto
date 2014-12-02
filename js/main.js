var Delta = require( 'rich-text' ).Delta,
	Document = require( './document' ),
	Converter = require('./converter');

var editor = document.getElementById( 'editor' );

var doc = new Document( editor );

/* source HTML
<p>Foo <strong>bar</strong> baz</p>
<ul>
	<li>foo<ul>
			<li>qux</li>
			<li>quux</li>
		</ul>
	</li>
	<li>bar</li>
	<li>baz</li>
</ul>
<p>Lorem ipsum dolor sit amet.</p>
 */

// deltas for the above source
var input = new Delta( [
	{ insert: 1, attributes: { tag: 'p', open: true } },		// 1
	{ insert: 'Foo ' },											// 4
	{ insert: 'bar', attributes: { bold: true } },				// 3
	{ insert: ' baz', attributes: {bold: true, italic: true } }, // 4
	{ insert: 1, attributes: { tag: 'p', close: true } },		// 1
	{ insert: 1, attributes: { tag: 'ul', open: true } },		// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },		// 1
	{ insert: 'foo' },											// 3
	{ insert: 1, attributes: { tag: 'ul', open: true } },		// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },		// 1
	{ insert: 'qux' },											// 3
	{ insert: 1, attributes: { tag: 'li', close: true } },		// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },		// 1
	{ insert: 'quux' },											// 4
	{ insert: 1, attributes: { tag: 'li', close: true } },		// 1
	{ insert: 1, attributes: { tag: 'ul', close: true } },		// 1
	{ insert: 1, attributes: { tag: 'li', close: true } },		// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },		// 1
	{ insert: 'bar' },											// 3
	{ insert: 1, attributes: { tag: 'li', close: true } },		// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },		// 1
	{ insert: 'baz' },											// 3
	{ insert: 1, attributes: { tag: 'li', close: true } },		// 1
	{ insert: 1, attributes: { tag: 'ul', close: true } },		// 1
	{ insert: 1, attributes: { tag: 'p', open: true } },		// 1
	{ insert: 'Lorem ipsum dolor sit amet.' },					// 27
	{ insert: 1, attributes: { tag: 'p', close: true } },		// 1
	{ insert: 1, attributes: { tag: 'p', open: true } },		// 1
	{ insert: 1, attributes: { tag: 'img', open:true, close: true, src: 'img/doge.jpg' } }, // 1
	{ insert: 1, attributes: { tag: 'p', close: true } }		// 1
] );

doc.setDelta( input );

var converter = new Converter();
var output = converter.domToDelta( editor );

console.log( output );
