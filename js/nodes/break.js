'use strict';

var Node = require( '../node' ),
	utils = require( 'utils' );

function BreakNode() {
	Node.apply( this, arguments );
}

utils.inherit( BreakNode, Node );

BreakNode.name = 'break';
BreakNode.matchTags = [ 'br' ];
BreakNode.isEmpty = true;

module.exports = BreakNode;