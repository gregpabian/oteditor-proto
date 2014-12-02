var Delta = require( 'rich-text' ).Delta,
	Observer = require( './observer' ),
	Converter = require( './converter' ),
	Normalizer = require( './normalizer' );

function Document( el ) {
	this.el = el;
	this.converter = new Converter();
	this.observer = new Observer( el );
	this.normalizer = new Normalizer( [
		'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ol', 'ul'
	] );
	this.delta = null;
	this.setHTML( this.el.innerHTML );
}

Document.prototype = {
	setHTML: function( html ) {
		html = this.normalizer.normalize( html );
		this.el.innerHTML = html;
		this.delta = this.converter.domToDelta( this.el );
	},

	getHTML: function() {
		return this.el.innerHTML;
	},

	getDelta: function() {
		return this.delta;
	},

	setDelta: function( delta ) {
		this.delta = delta;
		this.rebuild();
	},

	rebuild: function() {
		this.observer.lock();
		this.converter.deltaToDom( this.delta, this.el );
	}
};

module.exports = Document;