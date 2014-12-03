'use strict';

var Converter = require( './converter' ),
	EventEmitter = require( 'events' ).EventEmitter,
	utils = require( './utils' );

function Editor( selector ) {
	EventEmitter.apply( this, arguments );

	this.el = document.querySelector( selector );

	this.converter = new Converter();

	// TODO register nodes with nodeManager

	this.document = this.converter.getDocForDom( this.el );
}

utils.inherit( Editor, EventEmitter );

utils.extend( Editor.prototype, {

} );

module.exports = Editor;