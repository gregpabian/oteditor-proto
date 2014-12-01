var Delta = require( 'rich-text' ).Delta;

function Document( target ) {
	this.target = target;
	this.delta = null;
}

Document.prototype = {
	setHTML: function( html ) {
		this.delta = new Delta();

		// TODO normalize html first
		// TODO create operations from the html
	},

	getHTML: function() {
		// TODO convert the delta to the html (dom builder to the rescue?)
	},

	getDelta: function() {
		return this.delta;
	}
};

module.exports = Document;