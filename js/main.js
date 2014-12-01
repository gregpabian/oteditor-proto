var Delta = require( 'rich-text' ).Delta,
	Writer = require( './writer' ),
	Observer = require( './observer' ),
	KeyHandler = require( './keyhandler' ),
	Document = require( './document' );

var editor = document.getElementById( 'editor' );

var doc = new Document( editor );
var writer = new Writer( editor );
var observer = new Observer( editor );
var keyhandler = new KeyHandler( editor );

keyhandler.addHandler( 'ENTER', function breakLine( event ) {
	event.preventDefault();
} );

keyhandler.addHandler( 'CTRL+Z', function undo( event ) {
	event.preventDefault();
} );

keyhandler.addHandler( 'CTRL+Y', function redo( event ) {
	event.preventDefault();
} );

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
var delta = new Delta( [ 
	{ insert: 1, attributes: { tag: 'p', open: true } },	// 1
	{ insert: 'Foo ' },										// 4
	{ insert: 'bar', attributes: { bold: true } },			// 3
	{ insert: ' baz' },										// 4
	{ insert: 1, attributes: { tag: 'p', close: true } },	// 1
	{ insert: 1, attributes: { tag: 'ul', open: true } },	// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },	// 1
	{ insert: 'foo' },										// 3
	{ insert: 1, attributes: { tag: 'ul', open: true } },	// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },	// 1
	{ insert: 'qux' },										// 3
	{ insert: 1, attributes: { tag: 'li', close: true } },	// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },	// 1
	{ insert: 'quux' },										// 4
	{ insert: 1, attributes: { tag: 'li', close: true } },	// 1
	{ insert: 1, attributes: { tag: 'ul', close: true } },	// 1
	{ insert: 1, attributes: { tag: 'li', close: true } },	// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },	// 1
	{ insert: 'bar' },										// 3
	{ insert: 1, attributes: { tag: 'li', close: true } },	// 1
	{ insert: 1, attributes: { tag: 'li', open: true } },	// 1
	{ insert: 'baz' },										// 3
	{ insert: 1, attributes: { tag: 'li', close: true } },	// 1
	{ insert: 1, attributes: { tag: 'ul', close: true } },	// 1
	{ insert: 1, attributes: { tag: 'p', open: true } },	// 1
	{ insert: 'Lorem ipsum dolor sit amet.' },				// 27
	{ insert: 1, attributes: { tag: 'p', close: true } }	// 1
] );

writer.write( delta );




// TEMPORARY STUFF

// var delta = new Delta( [ {
// 	insert: 'Gandalf',
// 	attributes: {
// 		bold: true
// 	}
// }, {
// 	insert: ' the ',
// 	attributes: {
// 		'font-style': 'italic'
// 	}
// }, {
// 	insert: 'Grey',
// 	attributes: {
// 		color: '#ccc'
// 	}
// } ] );

// var death = new Delta()
// 	.retain( 4, {
// 		color: '#f00'
// 	} )
// 	.retain( 8 )
// 	.delete( 4 )
// 	.insert( 'White', {
// 		color: '#fff',
// 		'font-style': 'italic'
// 	} );

// delta.compose( death );

// delta.ops.forEach( function( op ) {
// 	console.log( op.insert, op.attributes );
// } );

// writer.write( delta );