'use strict';

var Node = require( '../node' ),
	utils = require( 'utils' );

function TextNode() {
	Node.apply( this, arguments );
}

utils.inherit( TextNode, Node );

TextNode.name = 'text';

module.exports = TextNode;